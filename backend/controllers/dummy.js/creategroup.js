// In your Express.js route file (e.g., groupRoutes.js)
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your already configured mysql2/promise pool

router.post('/groups-with-invites', async (req, res) => {
    const { groupName, groupDescription, invitees, inviterId } = req.body;

    // Basic validation (you'd add more robust validation in a real app)
    if (!groupName || !invitees || !Array.isArray(invitees) || invitees.length === 0 || !inviterId) {
        return res.status(400).json({ message: 'Missing group name, invitees, or inviter ID.' });
    }

    let connection; // This will hold our dedicated connection for the transaction

    try {
        // 1. Get a dedicated connection from the pool
        connection = await db.getConnection();

        // 2. Start the transaction
        await connection.beginTransaction();

        // --- Step A: Create the Group Record ---
        const [groupResult] = await connection.execute(
            'INSERT INTO groups (name, description, created_by_user_id) VALUES (?, ?, ?)', // Adjust columns
            [groupName, groupDescription, inviterId]
        );
        const newGroupId = groupResult.insertId;

        // --- Step B: Automatically create the Account Record (if applicable, as per your previous question) ---
        // Assuming 'accounts' is related to 'groups' (e.g., one account per group)
        // If 'accounts' is a user-group membership table, this part would be different.
        // For this example, I'll assume it's a 1-to-1 relationship with groups.
        const [accountResult] = await connection.execute(
            'INSERT INTO accounts (group_id, /* other account columns like type, status */) VALUES (?, ?)',
            [newGroupId, 'default_type'] // Adjust 'default_type' and other columns
        );
        const newAccountId = accountResult.insertId; // If accounts table has auto_increment ID

        // --- Step C: Process and Send Invites ---
        const invitesToSend = [];
        const invitedUserIds = new Set(); // To track users already invited in this batch

        for (const invitee of invitees) {
            let invitedUserId;

            // Determine user ID based on whether you send email or user ID from frontend
            if (invitee.userId) { // If front-end sends user IDs
                invitedUserId = invitee.userId;
            } else if (invitee.email) { // If front-end sends emails, look up user ID
                // IMPORTANT: In a real app, you'd add more robust email validation
                const [userRows] = await connection.execute(
                    'SELECT id FROM users WHERE email = ?',
                    [invitee.email]
                );

                if (userRows.length > 0) {
                    invitedUserId = userRows[0].id;
                } else {
                    // Handle case where user does not exist:
                    // Option 1: Skip invite for non-existent users (or create placeholder user)
                    console.warn(`User with email ${invitee.email} not found. Skipping invite.`);
                    continue; // Skip to next invitee
                    // Option 2: Create a placeholder user and send invite to them
                    // const [newUserResult] = await connection.execute('INSERT INTO users (email, status) VALUES (?, "pending_registration")', [invitee.email]);
                    // invitedUserId = newUserResult.insertId;
                }
            }

            // Ensure we have a valid invitedUserId and haven't invited this user multiple times in *this batch*
            if (invitedUserId && !invitedUserIds.has(invitedUserId)) {
                // Check if user is already a member of the group (optional but good practice)
                const [membershipCheck] = await connection.execute(
                    'SELECT 1 FROM group_members WHERE group_id = ? AND user_id = ?',
                    [newGroupId, invitedUserId]
                );
                if (membershipCheck.length > 0) {
                    console.log(`User ${invitedUserId} is already a member of group ${newGroupId}. Skipping invite.`);
                    continue;
                }

                // Check for existing pending invites for this user to this group
                // This relies on your `UNIQUE (group_id, user_id, status)` constraint
                const [existingInviteCheck] = await connection.execute(
                    `SELECT id FROM invites WHERE group_id = ? AND user_id = ? AND status = 'pending'`,
                    [newGroupId, invitedUserId]
                );

                if (existingInviteCheck.length === 0) {
                    invitesToSend.push([
                        newGroupId,
                        invitedUserId,
                        inviterId,
                        'pending',
                        connection.raw('NOW()'), // Use connection.raw for NOW()
                        connection.raw('NOW() + INTERVAL 14 DAY') // 14 days expiry
                    ]);
                    invitedUserIds.add(invitedUserId); // Mark user as invited in this batch
                } else {
                    console.log(`Pending invite already exists for user ${invitedUserId} to group ${newGroupId}.`);
                    // You might choose to update the existing invite or skip.
                    // For this example, we skip if pending exists.
                }
            }
        }

        // Bulk insert invites if any
        if (invitesToSend.length > 0) {
            // mysql2/promise supports batch inserts directly
            await connection.query(
                `INSERT INTO invites (group_id, user_id, inviter_id, status, created_at, expires_at) VALUES ?`,
                [invitesToSend]
            );
        }

        // --- Step D: Commit the transaction if all steps succeeded ---
        await connection.commit();

        res.status(201).json({
            message: 'Group created and invites sent successfully.',
            groupId: newGroupId,
            accountId: newAccountId, // If applicable
            invitesSentCount: invitesToSend.length
        });

    } catch (error) {
        // --- Step E: Roll back if any error occurred ---
        if (connection) {
            await connection.rollback();
        }
        console.error('Error creating group and sending invites:', error);
        // Provide more user-friendly error messages in a production app
        res.status(500).json({ message: 'Failed to create group and send invites.', error: error.message });
    } finally {
        // --- Step F: Always release the connection ---
        if (connection) {
            connection.release();
        }
    }
});


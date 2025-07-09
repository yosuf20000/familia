const mydb = require('../db')



const createGroup = async (req, res) => {
    let connection
    //title.replace(/\s+/g, '')	
    const { title, invitees } = req.body
    // Basic validation: groupName and inviterId are still mandatory
    if (!title) {
        return res.status(400).json({ message: 'Missing group name or inviter ID.' });
    }

    // Ensure invitees is an array if provided, otherwise it's an empty array from the default
    if (!Array.isArray(invitees)) {
        return res.status(400).json({ message: 'Invites must be an array if provided.' });
    }


    try {
        console.log("here");

        const user_email = req.tokens.idToken.email
        let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sqlUserId);
        let userId = [user_id[0].id]



        connection = await mydb.getConnection()
        await connection.beginTransaction()
        let sql = 'INSERT INTO groups_names (title, leader) VALUES (?, ?)'
        const [groupResult] = await connection.execute(sql, [title, userId[0]])

        const newGroupId = groupResult.insertId;
        sql = 'INSERT INTO accounts (group_id) VALUES (?)'

        const invitesToSend = []
        const invitedUserIds = new Set()

        for (const invitee of invitees) {
            let invitedUserId
            if (invitee.userId) {
                invitedUserId = invitee.userId

            }

            if (invitedUserId && !invitedUserIds.has(invitedUserId)) {
                const [isMemberOfTheGroup] = await connection.execute(
                    'SELECT 1 FROM users_join_groups WHERE group_id = ? AND user_id = ?',
                    [newGroupId, invitedUserId]
                )
                if (isMemberOfTheGroup.length > 0) {
                    console.log(`User ${invitedUserId} is already a member of group ${newGroupId}. Skipping invite.`);
                    continue;
                }


                const [existingInviteCheck] = await connection.execute(
                    `SELECT id FROM invites WHERE group_id = ? AND user_id = ? AND  status = 'pending'  `,
                    [newGroupId, invitedUserId]

                )

                if (existingInviteCheck.length === 0) {
                    invitesToSend.push([
                        newGroupId,
                        invitedUserId,
                        userId,
                        'pending',
                        connection.raw('NOW()'),
                        connection.raw('NOW() + INTERVAL 14 DAY '),

                    ])
                    invitedUserIds.add(invitedUserId)
                } else {
                    console.log(`Pending invite already exists for user ${invitedUserId} to group ${newGroupId}.`);
                }
            }
        }

        if (invitesToSend.length > 0) {
            await connection.query(
                `INSERT INTO invites (group_id, user_id, inviter_id, status, created_at, expires_at) VALUES ?`,
                [invitesToSend]
            );
        }

        await connection.query(
            `INSERT INTO users_join_groups (user_id, group_id) VALUES (? , ?) `,
            [userId[0], newGroupId]
        );



        await connection.commit()

        res.status(201).json({
            status: true,
            message: 'Group created and invites sent successfully.',
            groupId: newGroupId,
            invitesSentCount: invitesToSend.length
        });



    } catch (error) {
        console.log(error);

        if (connection) {
            await connection.rollback()
        }
        console.error('Error creating group and account:', error);
        res.status(500).json({ message: 'Failed to create group and account', error: error.message });
    } finally {
        // Always release the connection back to the pool, whether it succeeded or failed
        if (connection) {
            connection.release();
        }
    }

}
const getGroupuUsers = async (req, res) => {
    try {

        let sql = `
            SELECT 
                g.id AS groupId,
                g.title AS groupTitle,
                g.created_at AS groupCreationDate,
                g.leader AS groupLeader,
                UjoinG.user_id AS gUserId,
                UjoinG.group_id AS gGroupId,
                UjoinG.joined_date AS joiningDate,
                u.fname AS fname,
                u.lname AS lname
            FROM groups_names AS g 
            JOIN users_join_groups AS UjoinG ON UjoinG.group_id = g.id
            JOIN users AS u ON u.id = UjoinG.user_id
            WHERE g.id = 1 `
        const [rows] = await mydb.execute(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getGroupsInfo = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email
        let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sqlUserId);

        let sql = `
      WITH grouped AS (
            SELECT g.group_id, COUNT(*) AS usersCount
            FROM users_join_groups AS g
            GROUP BY g.group_id
            )
            SELECT 
                DISTINCT  g.id AS groupId ,
                g.title AS groupTitle,
                u.fname AS leaderFname, 
                u.lname AS leaderLname, 
                gr.usersCount, 
                UjoinG.joined_date AS joiningDate
            FROM grouped gr
            JOIN groups_names g ON gr.group_id = g.id
            JOIN users_join_groups AS UjoinG  ON UjoinG.group_id = g.id AND UjoinG.user_id =${user_id[0].id}
            JOIN users AS u  ON u.id = g.leader
            WHERE UjoinG.group_id IN (
                    SELECT group_id 
                    FROM users_join_groups AS ujg
                    WHERE ujg.user_id = ${user_id[0].id}
                ) `
        const [rows] = await mydb.execute(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getOneUserGroups = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email
        let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sqlUserId);

        let sql = `
            WITH grouped AS (
            SELECT g.group_id, COUNT(*) AS usersCount
            FROM users_join_groups AS g
            GROUP BY g.group_id
            )
            SELECT 
                  g.id AS groupId ,
                g.title AS groupTitle,
                u.id AS userId,
                u.fname AS fname, 
                u.lname AS lanme, 
                gr.usersCount, 
				g.leader AS groupLeader,
                UjoinG.joined_date AS joiningDate
            FROM grouped gr
            JOIN groups_names g ON gr.group_id = g.id
            JOIN users_join_groups AS UjoinG  ON UjoinG.group_id = g.id
            JOIN users AS u  ON u.id = UjoinG.user_id
            WHERE UjoinG.group_id IN (
                    SELECT group_id 
                    FROM users_join_groups AS ujg
                    WHERE ujg.user_id = ${user_id[0].id}
                    ) `


        const [rows] = await mydb.execute(sql);
        // Grouping flat rows by groupId
        const groupedData = Object.values(
            rows.reduce((acc, row) => {
                if (!acc[row.groupId]) {
                    acc[row.groupId] = {
                        groupId: row.groupId,
                        groupTitle: row.groupTitle,
                        groupLeader: row.groupLeader,
                        usersCount: row.usersCount,
                        members: []
                    }
                }

                acc[row.groupId].members.push({
                    userId: row.userId,
                    fname: row.fname,
                    lanme: row.lname,
                    joiningDate: row.joiningDate
                })
                return acc
            }, {})
        )

        res.json(groupedData);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const hasGroupAccess = async (req, res) => {
    const groupTitle = req.params.groupTitle
    const user_email = req.tokens.idToken.email
    let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sqlUserId);
    const id = user_id[0].id
    let sql = ''

    try {
        sql = `
        SELECT
            g.id AS group_id,
            g.leader = ? AS is_leader,
            ujg.user_id IS NOT NULL AS is_member
        FROM groups_names g
        LEFT JOIN users_join_groups ujg
            ON ujg.group_id = g.id AND ujg.user_id = ?
        WHERE g.title = ?
        LIMIT 1
        
        `
        const [rows] = await mydb.query(sql, [id, id, groupTitle]);
        if (!rows.length) {
            return res.status(404).json({
                has_access: false,
                groupUserInfo: rows[0]


            })
        }

        res.status(200).json({
            has_access: true,
            groupUserInfo: rows[0]

        });



    } catch (error) {
        console.log(error);
        res.status(404).json({
            has_access: false,
        });



    }
}

const sendInvite = async (req, res) => {
    const { invitedId, message, groupTitle } = req.body;
    const user_email = req.tokens.idToken.email
    let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sqlUserId);
    const inviterId = user_id[0].id; // safer than using req.body
    console.log("here");
    
    try {
        // 1. Get group
        const [groupRows] = await mydb.query(
            'SELECT id FROM groups_names WHERE title = ?',
            [groupTitle]
        );

        if (groupRows.length === 0) {
            return res.status(404).json({ message: 'Group not found' , is_ok: false});
        }

        const groupId = groupRows[0].id;
        console.log(invitedId, inviterId);

        

        

        // 2. Check inviter is the group leader
        const [leaderCheck] = await mydb.query(
            'SELECT 1 FROM groups_names WHERE id = ? AND leader = ?',
            [groupId, inviterId]
        );

        if (leaderCheck.length === 0) {
            return res.status(404).json({ message: 'You are not the group leader', is_ok: false });
        }



        // 4. Check if user is already in the group
        const [existingMembership] = await mydb.query(
            'SELECT 1 FROM users_join_groups WHERE user_id = ? AND group_id = ?',
            [invitedId, groupId]
        );

        if (existingMembership.length > 0) {
            return res.status(404).json({ message: 'User is already a member of the group' , is_ok: false });
        }

        // 5. Check for existing pending invite
        const [existingInvite] = await mydb.query(
            'SELECT 1 FROM invites WHERE user_id = ? AND group_id = ? AND status = "pending"',
            [invitedId, groupId]
        );

        if (existingInvite.length > 0) {
            return res.status(404).json({ message: 'An invite is already pending for this user', is_ok: false });
        }

        // 6. Create new invite
        await mydb.query(
            `INSERT INTO invites (group_id, user_id, inviter_id, message, status)
         VALUES (?, ?, ?, ?, 'pending')`,
            [groupId, invitedId, inviterId, message || null]
        );

        res.status(200).json({ message: 'Invite sent successfully', is_ok: true });

    } catch (err) {
        console.error('Error sending invite:', err);
        res.status(500).json({ message: 'Server error'  , is_ok: false});
    }


}
const viewInvites = async (req, res) => {
    const user_email = req.tokens.idToken.email
    let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sqlUserId);
    const id = user_id[0].id
    console.log("here");


    try {
        const [rows] = await mydb.query(
            `SELECT 
               i.id AS invite_id,
               g.title AS group_title,
               u.Fname AS inviter_fname,
               u.Lname AS inviter_lname,
               i.message,
               i.status,
               i.created_at,
               i.expires_at
             FROM invites i
             JOIN groups_names g ON i.group_id = g.id
             LEFT JOIN users u ON i.inviter_id = u.ID
             WHERE i.user_id = ? AND i.status = 'pending'
             ORDER BY i.created_at DESC`,
            [id]
        );

        res.status(200).json({
            message: 'Invite accepted and joined group',
            invites: rows
        });



    } catch (error) {
        console.log(error);


    }
}

const respondIvaite = async (req, res) => {


    const inviteId = req.params.inviteId;
    const user_email = req.tokens.idToken.email
    let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sqlUserId);
    const id = user_id[0].id
    const connection = await mydb.getConnection(); // optional transaction
    const { action } = req.body;


    try {
        // 1. Get invite 
        const [invites] = await connection.query(
            `   SELECT * FROM  invites
                WHERE id = ? AND user_id = ? AND status = 'pending'
                AND (expires_at IS NULL OR expires_at > NOW())

            `, [inviteId, id]
        )

        if (invites.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired invite' });
        }

        const invite = invites[0];
        if (invite.status !== 'pending') {
            return res.status(400).json({ message: 'Invite already handled' });
        }

        // 2. Add to group
        if (action === 'accept') {
            // Join group
            await connection.query(
                `INSERT IGNORE INTO users_join_groups (user_id, group_id) VALUES (?, ?)`,
                [id, invite.group_id]
            );
        }

        // 3. Mark invite as accepted or rejected
        await connection.query(
            `UPDATE invites SET status = ? WHERE id = ?`,
            [action, inviteId]
        );

        await connection.commit();
        res.status(200).json({ message: `Invite ${action}ed successfully` });

        // res.status(200).json({ message: 'Invite accepted and joined group', group_id: groupId });


    } catch (err) {
        console.error('Error accepting invite:', err);
        await connection.rollback();
        res.status(500).json({ message: 'Server error' });
    } finally {
        connection.release();

    }


}








module.exports = {
    getGroupuUsers,
    getGroupsInfo,
    getOneUserGroups,
    createGroup,
    hasGroupAccess,
    viewInvites,
    sendInvite,
    respondIvaite


}
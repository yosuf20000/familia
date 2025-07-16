const mydb = require('../db')



const updateUserDefaultGroupId = async (req, res) => {
    // const { defaultGroupId } = req.body;
    const user_email = req.tokens.idToken.email
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
            WHERE u.email = "${user_email}"`
    const [rows] = await mydb.execute(sql);



    if (rows[0]) {

        sql = `UPDATE users SET default_group_id = ? WHERE email = "${user_email}"`;
        mydb.execute(sql, [rows[0].groupId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });


    } else {

        return res.status(200).json(rows[0])
    }





}

const searchUsers = async (req, res) => {
    // const { defaultGroupId } = req.body;
    // const user_email = req.tokens.idToken.email
    const q = req.query.q
    console.log(q);

    const isId = /^\d+$/.test(q); // Only digits = treat as ID
    try {
        if (isId) {
            [rows] = await mydb.execute(
                'SELECT * FROM  users WHERE id = ?',
                [parseInt(q)]
            )
        } else {
            [rows] = await mydb.execute(
                'SELECT * FROM users WHERE fname LIKE ? OR email LIKE ?',
                [`%${q}%`, `%${q}%`]
            )
        }
        console.log(rows);

        res.json(rows);

    } catch (err) {
        console.error('DB error:', err);
        res.status(500).json({ error: 'Internal server error' });

    }




}

const getUserByEmail = async (req, res) => { 

    try {
        
        const user_email = req.tokens.idToken.email
        const sql = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await mydb.execute(sql, [user_email]);
        const userId = rows.length ? rows[0].id : null;
        res.status(200).json({ user: rows[0] });
    } catch (error) {
        res.status(200).json({ msg: error });

    }


}






module.exports = {
    updateUserDefaultGroupId,
    searchUsers,
    getUserByEmail
}
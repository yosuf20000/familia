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
            JOIN users_join_groups AS UjoinG  ON UjoinG.group_id = g.id
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
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error }) 
    }
}
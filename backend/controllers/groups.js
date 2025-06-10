const mydb = require('../db')



const createGroup = async (req,res) => {
    
}
const getGroupuUsers = async (req, res) => {
    try {
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
                if(!acc[row.groupId]){
                    acc[row.groupId] = {
                        groupId: row.groupId,
                        groupTitle: row.groupTitle,
                        groupLeader: row.groupLeader,
                        usersCount: row.usersCount,
                        members: []
                    }
                }

                acc[row.groupId].members.push({
                    userId:row.userId,
                    fname: row.fname,
                    lanme:row.lname,
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






module.exports = {
    getGroupuUsers,
    getGroupsInfo,
    getOneUserGroups
}
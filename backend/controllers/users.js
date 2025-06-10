const mydb = require('../db')


const usrSession = async (req, res) => {
    
}
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


    }else{

        return res.status(200).json(rows[0])
    }





}



module.exports = {
    updateUserDefaultGroupId
}
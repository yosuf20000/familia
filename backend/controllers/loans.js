const mydb = require('../db')


const getLoanByUser = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email 
        let sql = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sql);
        sql = `SELECT id, user_id, account_id, amount FROM loans WHERE user_id = ${user_id[0].id} `
        const [rows] = await mydb.execute(sql);
        res.json(rows);  
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getLoanByUser
}
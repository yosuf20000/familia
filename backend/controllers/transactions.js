const mydb = require('../db')

const getAlltransactions = async (req, res) => {

    try {        
        
        const sql = `
            SELECT 
                transactions.id AS id,
                transactions.account_id AS accountId,
                transactions.user_id AS userId,
                transactions.loan_id AS loanId,
                transactions.amount AS amount,
                transactions.created_at AS created_at,
                users.fname ,
                users.lname
                FROM transactions
                INNER JOIN users
                ON transactions.user_id = users.id
                ORDER BY created_at DESC
                LIMIT 10
                 
                


                  `
        const [rows] = await mydb.execute(sql); 
        res.json(rows);  
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTransactionsByUser = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email 
        let sql = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sql);
        sql = `SELECT id, user_id, account_id, amount FROM transactions WHERE user_id = ${user_id[0].id} `
        const [rows] = await mydb.execute(sql);
        res.json(rows);  
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const makeTransaction = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email 
        let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sqlUserId);
        const {accountId, loanId, amount,} = req.body
        const sql = 'INSERT INTO transactions (user_id, account_id, loan_id, amount) VALUES (?, ?, ?, ?)' 
        mydb.query(sql, [user_id[0].id ,accountId, loanId, amount], (err, result) => {
            if(err){
                console.error('Error inserting data:', err);
                return res.status(500).send('Database error');
            }
            res.status(200).json({status: true, msg: 'transaction added successfully'});
        })
            
    } catch (error) { 
        console.log(error);  
        
    }

}


module.exports = {
    getAlltransactions,
    getTransactionsByUser,
    makeTransaction
}
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
        groups_names.title AS groupTitle,
        users.fname,
        users.lname
    FROM transactions
    INNER JOIN users ON transactions.user_id = users.id
    INNER JOIN accounts ON transactions.account_id = accounts.group_id
    LEFT JOIN groups_names ON accounts.group_id = groups_names.id
    WHERE transactions.user_id = 5
    ORDER BY transactions.created_at DESC
                
                 
                


        `
        const [rows] = await mydb.execute(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ msg: error })
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
        res.status(500).json({ msg: error })
    }
}

const makeTransaction = async (req, res) => {
    try {
        const user_email = req.tokens.idToken.email
        let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
        const [user_id] = await mydb.execute(sqlUserId);
        const { accountId, loanId, amount, } = req.body
        const sql = 'INSERT INTO transactions (user_id, account_id, loan_id, amount) VALUES (?, ?, ?, ?)'
        mydb.query(sql, [user_id[0].id, accountId, loanId, amount], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Database error');
            }
            res.status(200).json({ status: true, msg: 'transaction added successfully' });
        })

    } catch (error) {
        console.log(error);

    }

}
const userTransactionsStatics = async (req, res) => {
    const user_email = req.tokens.idToken.email
    let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sqlUserId);
    let sql = ``

    try {

        //  1. Basic Aggregates (per user)
        sql = `
        SELECT 
            u.ID AS user_id,
            u.Fname,
            u.Lname,
            COUNT(t.id) AS total_transactions,
            SUM(t.amount) AS total_amount,
            AVG(t.amount) AS average_transaction,
            MAX(t.amount) AS largest_transaction,
            MIN(t.amount) AS smallest_transaction
        FROM 
            users u
        JOIN users_join_groups ujg ON u.ID = ujg.user_id
        JOIN accounts a ON ujg.group_id = a.group_id
        JOIN transactions t ON t.account_id = a.group_id AND t.user_id = u.ID
        WHERE u.ID =   ${user_id[0].id} 
        GROUP BY u.ID, u.Fname, u.Lname;
    `

        const [basicAggregates] = await mydb.execute(sql);


        // 2. Time-Based Aggregation (monthly)
        sql = `
    
    SELECT
         u.id AS user_id,
        DATE_FORMAT(t.created_at, '%Y-%m') AS month, 
        SUM(t.amount) AS monthly_total 
    FROM 
        users u 
    JOIN users_join_groups ujg ON u.ID = ujg.user_id 
    JOIN accounts a ON ujg.group_id = a.group_id
    JOIN transactions t ON t.account_id = a.group_id AND t.user_id = u.ID
    WHERE u.ID =  ${user_id[0].id}
    GROUP BY u.ID, DATE_FORMAT(t.created_at, '%Y-%m')
    
    ORDER BY month
    
    `

        const [timeBased] = await mydb.execute(sql);

        // 3. Breakdown per Group (joined by the user)
        sql = `
    SELECT 
        u.ID AS user_id,
        g.title AS group_name,
        SUM(t.amount) AS total_in_group,
        COUNT(t.id) AS num_transactions
    FROM 
        users u
    JOIN users_join_groups ujg ON u.ID = ujg.user_id
    JOIN groups_names g ON ujg.group_id = g.id
    JOIN accounts a ON g.id = a.group_id
    JOIN transactions t ON t.account_id = a.group_id AND t.user_id = u.ID
    WHERE u.ID =  ${user_id[0].id}
    GROUP BY u.ID, g.title
    `
        const [breakdownPerGroup] = await mydb.execute(sql);

        //  5. Loan + Transaction Combined Overview

        sql = `
    SELECT 
        u.ID AS user_id,
        u.Fname,
        u.Lname,
        COALESCE(SUM(DISTINCT l.amount), 0) AS total_loan_amount,
        COALESCE(SUM(DISTINCT t.amount), 0) AS total_transaction_amount
    FROM 
        users u
    LEFT JOIN loans l ON u.ID = l.user_id
    LEFT JOIN transactions t ON u.ID = t.user_id
    WHERE u.ID = ${user_id[0].id}
    GROUP BY u.ID, u.Fname, u.Lname
    `
        const [loanTransactionCombined] = await mydb.execute(sql);

        sql = `
SELECT 
  u.ID AS user_id,
  u.Fname,
  u.Lname,
  COUNT(l.id) AS loan_count,
  COALESCE(SUM(l.amount), 0) AS total_loaned
FROM users u
LEFT JOIN loans l ON u.ID = l.user_id
WHERE u.ID = ${user_id[0].id}
GROUP BY u.ID
    `
        const [sumOfLoans] = await mydb.execute(sql);

        sql = `
WITH user_group_totals AS (
  SELECT 
    u.ID AS user_id,
    u.Fname,
    g.id AS group_id,
    g.title AS group_title,
    SUM(t.amount) AS group_total,
    SUM(SUM(t.amount)) OVER (PARTITION BY u.ID) AS user_total,
    ROW_NUMBER() OVER (PARTITION BY u.ID ORDER BY SUM(t.amount) DESC) AS rn
  FROM users u
  JOIN transactions t ON u.ID = t.user_id
  JOIN accounts a ON t.account_id = a.group_id
  JOIN groups_names g ON a.group_id = g.id
  GROUP BY u.ID, g.id
)
SELECT 
  user_id,
  Fname,
  group_title,
  group_total,
  user_total,
  ROUND(100 * group_total / user_total, 2) AS contribution_percent
FROM user_group_totals
WHERE rn = 1 AND user_id = ${user_id[0].id};
        `
        const [mostlyUsedGroup] = await mydb.execute(sql);

        const group = req.query.group; // optional query param

        sql = `
WITH ranked_transactions AS (
  SELECT 
    t.id AS transaction_id,
    t.user_id,
    u.Fname,
    t.amount,
    t.created_at,
    g.title AS group_title,
    ROW_NUMBER() OVER (PARTITION BY t.user_id ORDER BY t.created_at DESC) AS rn
  FROM transactions t
  JOIN users u ON t.user_id = u.ID
  JOIN accounts a ON t.account_id = a.group_id
  JOIN groups_names g ON a.group_id = g.id
)
SELECT 
  user_id,
  Fname,
  transaction_id,
  group_title,
  amount,
  created_at
FROM ranked_transactions
WHERE rn <= 5 AND user_id = ${user_id[0].id}
ORDER BY user_id, created_at DESC;
            `

        const [last5Tranactions] = await mydb.execute(sql);

        sql = `
SELECT 
  u.ID AS user_id,
  u.Fname,

  -- Current Month
  COUNT(CASE 
    WHEN YEAR(t.created_at) = YEAR(CURDATE()) 
     AND MONTH(t.created_at) = MONTH(CURDATE()) THEN 1 
  END) AS transactions_this_month,

  COALESCE(SUM(CASE 
    WHEN YEAR(t.created_at) = YEAR(CURDATE()) 
     AND MONTH(t.created_at) = MONTH(CURDATE()) THEN t.amount 
  END), 0) AS amount_this_month,

  -- Current Year
  COUNT(CASE 
    WHEN YEAR(t.created_at) = YEAR(CURDATE()) THEN 1 
  END) AS transactions_this_year,

  COALESCE(SUM(CASE 
    WHEN YEAR(t.created_at) = YEAR(CURDATE()) THEN t.amount 
  END), 0) AS amount_this_year

FROM users u
LEFT JOIN transactions t ON u.ID = t.user_id
WHERE u.ID = ${user_id[0].id} AND t.account_id IS NOT NULL

GROUP BY u.ID, u.Fname;
                        `
        const [montlyAndYearly] = await mydb.execute(sql);
        res.json({
            basic: basicAggregates[0],
            monthly: timeBased[0],
            perGroup: breakdownPerGroup[0],
            loanTransaction: loanTransactionCombined[0],
            sumOfLoans: sumOfLoans[0],
            mostlyUsedGroup: mostlyUsedGroup[0],
            last5Tranactions,
            montlyAndYearly: montlyAndYearly[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })

    }






}

const updateTransactionStatusToApproved = async (req, res) => {
    const { transactionId, is_ok } = req.body;

    const user_email = req.tokens.idToken.email
    let sql = `SELECT id FROM users where email = "${user_email}" `
    const [user_id] = await mydb.execute(sql);
    let id = user_id[0].id

    try {
        // 1. Check if the current user is the leader of the group for this transaction
        const [rows] = await mydb.query(`
            SELECT g.leader
            FROM transactions t
            JOIN accounts a ON t.account_id = a.group_id
            JOIN groups_names g ON a.group_id = g.id
            WHERE t.id = ?
            LIMIT 1
          `, [transactionId]);

        if (rows.length === 0) {
            return res.status(404).json({success: false , msg: 'Transaction not found' });
        }

        const isLeader = rows[0].leader === id;

        if (!isLeader) {
            return res.status(403).json({ success: false ,msg: 'Not authorized to change this transaction' });
        }
        
        // 2. Update is_ok status

        await mydb.query(`
            UPDATE transactions
            SET is_ok = ?
            WHERE id = ?
          `, [is_ok, transactionId]);

          res.status(204).json({ success: true, msg: 'Transaction status updated.' });



    } catch (error) {
        res.status(500).json({ success: false, msg: 'Server error' });

    }
}

module.exports = {
    getAlltransactions,
    getTransactionsByUser,
    makeTransaction,
    userTransactionsStatics,
    updateTransactionStatusToApproved
}
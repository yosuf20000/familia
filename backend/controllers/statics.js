let a = `WITH ranked_transactions AS (
  SELECT 
    t.id AS transaction_id,
    t.user_id,
    u.Fname,
    t.amount,
    t.created_at,
    g.title AS group_title,
    t.bill_url,
    t.is_ok,
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
  created_at,
  bill_url,
  is_ok,
  CASE WHEN is_ok = 1 THEN 'Approved' ELSE 'Pending' END AS status_label
FROM ranked_transactions
WHERE rn <= 5
ORDER BY user_id, created_at DESC`
const mydb = require('../db')

const last5TranscationsByGroup = async (req, res) => {
  const groupTitle = req.params.groupTitle;
  const user_email = req.tokens.idToken.email
  let sqlUserId = `SELECT id FROM users where email = "${user_email}" `
  const [user_id] = await mydb.execute(sqlUserId);



  try {

    let id = user_id[0].id
    const sql = `
SELECT 
  t.id AS transaction_id,
  t.user_id,
  u.Fname,
  u.Lname,
  t.amount,
  t.created_at,
  g.title AS group_title,
  t.loan_id,
  t.is_ok
FROM transactions t
JOIN users u ON t.user_id = u.ID
JOIN accounts a ON t.account_id = a.group_id
JOIN groups_names g ON a.group_id = g.id
WHERE t.user_id = ?
AND g.title = ? 
ORDER BY t.created_at DESC
LIMIT 5
  `;

    const [rows] = await mydb.query(sql, [id, groupTitle]);

    res.status(200).json({
      last5TranscationsByGroup: rows

    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: error

    });
  }



}
const membersStats = async (req, res) => {
  const groupTitle = req.params.groupTitle;


  try {

  
    const sql = `

    WITH group_info AS (
      SELECT id AS group_id, leader
      FROM groups_names
      WHERE title = ?
    ),
    
    group_members AS (
      SELECT ujg.user_id, ujg.group_id, ujg.joined_date
      FROM users_join_groups ujg
      JOIN group_info gi ON ujg.group_id = gi.group_id
    ),
    
    user_transactions AS (
      SELECT t.user_id, COUNT(*) AS transaction_count, IFNULL(SUM(t.amount), 0) AS transaction_total
      FROM transactions t
      JOIN group_info gi ON t.account_id = gi.group_id
      GROUP BY t.user_id
    ),
    
    user_loans AS (
      SELECT l.user_id, COUNT(*) AS loan_count, IFNULL(SUM(l.amount), 0) AS loan_total
      FROM loans l
      JOIN group_info gi ON l.account_id = gi.group_id
      GROUP BY l.user_id
    )
    
    SELECT
      u.ID AS user_id,
      u.Fname,
      u.Lname,
      gm.joined_date,
      (gi.leader = u.ID) AS is_leader,
    
      IFNULL(ut.transaction_count, 0) AS transaction_count,
      IFNULL(ut.transaction_total, 0) AS transaction_total,
    
      IFNULL(ul.loan_count, 0) AS loan_count,
      IFNULL(ul.loan_total, 0) AS loan_total,
    
      IFNULL(ut.transaction_total, 0) - IFNULL(ul.loan_total, 0) AS net_contribution
    
    FROM group_members gm
    JOIN users u ON u.ID = gm.user_id
    JOIN group_info gi ON gm.group_id = gi.group_id
    
    LEFT JOIN user_transactions ut ON ut.user_id = gm.user_id
    LEFT JOIN user_loans ul ON ul.user_id = gm.user_id
    
    ORDER BY net_contribution DESC;
  `;

    const [rows] = await mydb.query(sql, [groupTitle]);

    res.status(200).json({
      membersStats: rows

    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error

    });

  }



}

const indivdualGroupStats = async (req, res) => {
  const groupTitle = req.params.groupTitle;

  try {
    console.log("here1");
    
    const sql = `
SELECT 
  g.title,
  g.created_at,

  -- ✅ Group Leader Full Name
  CONCAT(u.Fname, ' ', IFNULL(u.Lname, '')) AS leader_name,

  -- ✅ Number of Transactions
  (
    SELECT COUNT(*) 
    FROM transactions t 
    JOIN accounts a ON t.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS transaction_count,

  -- ✅ Total Amount of Transactions
  (
    SELECT IFNULL(SUM(t.amount), 0)
    FROM transactions t 
    JOIN accounts a ON t.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS transaction_total,

  -- ✅ Total Amount of Approved Transactions
  (
    SELECT IFNULL(SUM(t.amount), 0)
    FROM transactions t 
    JOIN accounts a ON t.account_id = a.group_id
    WHERE a.group_id = g.id AND t.is_ok = 1
  ) AS approved_transaction_total,

  -- ✅ Average Transaction Amount
  (
    SELECT ROUND(AVG(t.amount), 2)
    FROM transactions t
    JOIN accounts a ON t.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS transaction_avg,

  -- ✅ Number of Loans
  (
    SELECT COUNT(*) 
    FROM loans l 
    JOIN accounts a ON l.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS loan_count,

  -- ✅ Total Amount of Loans
(
  SELECT IFNULL(SUM(DISTINCT l.amount), 0)
  FROM loans l
  JOIN accounts a ON l.account_id = a.group_id
  WHERE a.group_id = g.id
) AS loan_total,

  -- ✅ Average Loan Amount
  (
    SELECT ROUND(AVG(l.amount), 2)
    FROM loans l 
    JOIN accounts a ON l.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS loan_avg,

  -- ✅ Total Amount Repaid
  (
    SELECT IFNULL(SUM(t.amount), 0)
    FROM transactions t
    JOIN loans l ON t.loan_id = l.id
    JOIN accounts a ON l.account_id = a.group_id
    WHERE a.group_id = g.id
  ) AS total_repaid,

  -- ✅ Repayment Percentage
  ROUND(
    (
      (SELECT IFNULL(SUM(t.amount), 0)
       FROM transactions t
       JOIN loans l ON t.loan_id = l.id
       JOIN accounts a ON l.account_id = a.group_id
       WHERE a.group_id = g.id
      ) /
      (SELECT IFNULL(SUM(l.amount), 1)
       FROM loans l
       JOIN accounts a ON l.account_id = a.group_id
       WHERE a.group_id = g.id
      ) * 100
    ), 2
  ) AS repayment_percentage

FROM groups_names g
LEFT JOIN users u ON g.leader = u.ID
WHERE g.title = ?
LIMIT 1;
  `;

    const [rows] = await mydb.query(sql, [groupTitle]);

    res.status(200).json({
      indivdualGroupStats: rows[0]

    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      msg: error
    });
    
  }

}


module.exports = {
  last5TranscationsByGroup,
  membersStats,
  indivdualGroupStats

} 
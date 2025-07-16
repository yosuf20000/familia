const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT, // must be number
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE 
})

async function testConnection() { 
    try {
      const connection = await pool.getConnection();
      console.log('✅ MySQL Connected Successfully');
  

  
      connection.release(); // Always release the connection
    } catch (err) {
      console.error('❌ MySQL Connection Error:', err.message);
    } finally {
      // await pool.end(); // Close the pool after test 
    }
  }

  testConnection();    



module.exports = pool
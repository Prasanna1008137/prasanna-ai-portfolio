const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, 'backend', '.env') });

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'PPrashu@2310',
    database: process.env.DB_NAME || 'prasanna_portfolio'
  });

  try {
    const [rows] = await connection.query('SELECT * FROM admin_users');
    console.log('--- ADMIN USERS ---');
    console.log(rows);
    console.log('-------------------');
  } catch (err) {
    console.error('Error fetching admin users:', err);
  } finally {
    await connection.end();
  }
}

check();

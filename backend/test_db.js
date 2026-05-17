const db = require('./src/config/db');

async function test() {
  try {
    const [rows] = await db.query('SHOW TABLES');
    console.log('Successfully connected to MySQL!');
    console.log('Existing tables in prasanna_portfolio:', rows.map(r => Object.values(r)[0]));
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error.message);
    process.exit(1);
  }
}

test();

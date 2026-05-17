const db = require('./src/config/db');

async function checkDb() {
  try {
    const [rows] = await db.query('SELECT * FROM chatbot_messages ORDER BY id DESC LIMIT 5');
    console.log('Last 5 chatbot messages logged in DB:');
    console.log(rows);
    process.exit(0);
  } catch (err) {
    console.error('DB Check Error:', err);
    process.exit(1);
  }
}

checkDb();

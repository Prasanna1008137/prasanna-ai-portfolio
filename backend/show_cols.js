const db = require('./src/config/db');

async function show() {
  try {
    const [cols] = await db.query('SHOW COLUMNS FROM personal_info');
    console.log(cols.map(c => c.Field));
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

show();

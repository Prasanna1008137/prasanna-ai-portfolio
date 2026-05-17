const db = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  console.log('Creating Admin User in MySQL...');
  try {
    const [existing] = await db.query('SELECT * FROM admin_users WHERE admin_email = ?', ['admin@prasanna.ai']);
    if (existing.length > 0) {
      console.log('Admin already exists! Updating password just in case...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.query('UPDATE admin_users SET admin_password = ? WHERE admin_email = ?', [hashedPassword, 'admin@prasanna.ai']);
      console.log('Admin password updated successfully!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.query(
      'INSERT INTO admin_users (admin_name, admin_email, admin_password, role) VALUES (?, ?, ?, ?)',
      ['Admin', 'admin@prasanna.ai', hashedPassword, 'ADMIN']
    );
    console.log('Admin user successfully created!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to create admin:', error);
    process.exit(1);
  }
}

createAdmin();

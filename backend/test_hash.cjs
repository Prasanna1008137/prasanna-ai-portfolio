const bcrypt = require('bcryptjs'); // check if it's bcrypt or bcryptjs

async function checkHash() {
  try {
    const hash = '$2b$10$4PjN2UjEHDR72YsTh3y91.YGz.eOZkWgTdD9.hv8Pz//jhF31tGQ6';
    const password = 'admin123';
    
    // Some projects use bcrypt instead of bcryptjs
    const isMatch = await bcrypt.compare(password, hash);
    console.log('Match?', isMatch);
  } catch (err) {
    console.error(err);
  }
}

checkHash();

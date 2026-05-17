const db = require('./src/config/db');

async function test() {
  console.log('Testing personal_info update query...');
  try {
    const query = `
      UPDATE personal_info 
      SET full_name = ?, role_name = ?, email = ?, linkedin = ?, github = ?, 
          education = ?, specialization = ?, university = ?, cgpa = ?, 
          current_year = ?, current_semester = ?
      WHERE id = 1
    `;
    const params = [
      'Mondi Lakshmi Prasanna',
      'AI & Full Stack Developer',
      'prasanna@example.com',
      'https://linkedin.com',
      'https://github.com',
      'B.Tech CSE',
      'AI & ML',
      'KL University',
      8.80,
      '3rd Year',
      '6th Semester'
    ];
    const [result] = await db.query(query, params);
    console.log('Success!', result);
    process.exit(0);
  } catch (error) {
    console.error('ERROR OCCURRED:', error);
    process.exit(1);
  }
}

test();

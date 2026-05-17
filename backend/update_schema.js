const db = require('./src/config/db');

async function migrate() {
  console.log('Starting MySQL database schema migration...');
  try {
    // 1. Add new columns to personal_info if they don't exist
    const [columns] = await db.query('SHOW COLUMNS FROM personal_info');
    const colNames = columns.map(c => c.Field);

    if (!colNames.includes('current_year')) {
      console.log('Adding current_year to personal_info...');
      await db.query('ALTER TABLE personal_info ADD COLUMN current_year VARCHAR(255) DEFAULT "3rd Year"');
    }
    if (!colNames.includes('current_semester')) {
      console.log('Adding current_semester to personal_info...');
      await db.query('ALTER TABLE personal_info ADD COLUMN current_semester VARCHAR(255) DEFAULT "6th Semester"');
    }
    if (!colNames.includes('profile_photo')) {
      console.log('Adding profile_photo to personal_info...');
      await db.query('ALTER TABLE personal_info ADD COLUMN profile_photo VARCHAR(255) DEFAULT "/assets/profile.jpg"');
    }
    if (!colNames.includes('resume_url')) {
      console.log('Adding resume_url to personal_info...');
      await db.query('ALTER TABLE personal_info ADD COLUMN resume_url VARCHAR(255) DEFAULT "/resume/prasanna_resume.pdf"');
    }

    // 2. Create the experiences table
    console.log('Creating experiences table...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(100) NOT NULL, -- 'INTERNSHIP', 'COURSE', 'WORKSHOP', 'HACKATHON', 'EXPERIENCE'
        title VARCHAR(255) NOT NULL, -- title of experience, internship, course, etc.
        organization VARCHAR(255) NOT NULL, -- company name, university, issuer
        status VARCHAR(50) DEFAULT 'Completed', -- 'Completed', 'Ongoing', 'In Progress'
        duration VARCHAR(100), -- e.g. "June 2025 - Present"
        description TEXT,
        certificate_file VARCHAR(255), -- local uploads path
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 3. Make sure at least one row exists in personal_info
    const [infoRows] = await db.query('SELECT COUNT(*) as count FROM personal_info');
    if (infoRows[0].count === 0) {
      console.log('Initializing personal_info table...');
      await db.query(`
        INSERT INTO personal_info (full_name, role, email, linkedin, github, education, specialization, university, cgpa, current_year, current_semester, profile_photo) 
        VALUES ('Mondi Lakshmi Prasanna', 'AI & Full Stack Developer', 'mondiprasanna8@gmail.com', 'https://www.linkedin.com/in/prasanna-mondi-5018b034a', 'https://github.com/Prasanna1008137', 'B.Tech CSE (AI & ML)', 'Artificial Intelligence & Machine Learning', 'Koneru Lakshmaiah University', 8.80, '3rd Year', '6th Semester', '/assets/profile.jpg')
      `);
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();

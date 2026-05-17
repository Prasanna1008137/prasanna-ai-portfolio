const db = require('./src/config/db');

async function setup() {
  console.log('Initializing MySQL Tables...');
  
  try {
    // Admin Users Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_name VARCHAR(255) NOT NULL,
        admin_email VARCHAR(255) UNIQUE NOT NULL,
        admin_password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'ADMIN',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Personal Info Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS personal_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255),
        role VARCHAR(255),
        email VARCHAR(255),
        linkedin VARCHAR(255),
        github VARCHAR(255),
        education TEXT,
        specialization VARCHAR(255),
        university VARCHAR(255),
        cgpa DECIMAL(3,2)
      )
    `);

    // Projects Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        tech_stack VARCHAR(255),
        github_link VARCHAR(255),
        live_link VARCHAR(255),
        thumbnail VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Skills Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(100),
        level INT
      )
    `);

    // Certifications Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS certifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        issuer VARCHAR(255),
        issue_date VARCHAR(50),
        image_url VARCHAR(255)
      )
    `);

    // Education Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        degree VARCHAR(255),
        institution VARCHAR(255),
        year VARCHAR(50),
        score VARCHAR(50)
      )
    `);

    // Blogs Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        content LONGTEXT,
        image_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'DRAFT',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact Messages Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        message TEXT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Feedback Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        rating INT,
        comment TEXT,
        is_approved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Analytics Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_type VARCHAR(100),
        event_value VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Chatbot Messages Table
    await db.query(`
      CREATE TABLE IF NOT EXISTS chatbot_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        query TEXT,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('All tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  }
}

setup();

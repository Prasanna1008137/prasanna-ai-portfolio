const db = require('../config/db');

// PERSONAL INFO
exports.getPersonalInfo = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM personal_info LIMIT 1');
    const info = rows[0] || {};
    if (info) {
      info.education = info.degree_name;
      info.role = info.role_name;
    }
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProject = async (req, res) => {
  const { title, description, tech_stack, github_link, live_link } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO projects (title, description, tech_stack, github_link, live_link) VALUES (?, ?, ?, ?, ?)',
      [title, description, tech_stack, github_link, live_link]
    );
    res.status(201).json({ id: result.insertId, message: 'Project added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tech_stack, github_link, live_link } = req.body;
  try {
    await db.query(
      'UPDATE projects SET title = ?, description = ?, tech_stack = ?, github_link = ?, live_link = ? WHERE id = ?',
      [title, description, tech_stack, github_link, live_link, id]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SKILLS
exports.getSkills = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSkill = async (req, res) => {
  const { skill_name, percentage } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO skills (skill_name, percentage) VALUES (?, ?)',
      [skill_name, percentage]
    );
    res.status(201).json({ id: result.insertId, message: 'Skill added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  const { id } = req.params;
  const { skill_name, percentage } = req.body;
  try {
    await db.query(
      'UPDATE skills SET skill_name = ?, percentage = ? WHERE id = ?',
      [skill_name, percentage, id]
    );
    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM skills WHERE id = ?', [id]);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CERTIFICATIONS
exports.getCertifications = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM certifications ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCertification = async (req, res) => {
  const { certificate_name, issuer } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO certifications (certificate_name, issuer) VALUES (?, ?)',
      [certificate_name, issuer]
    );
    res.status(201).json({ id: result.insertId, message: 'Certification added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCertification = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM certifications WHERE id = ?', [id]);
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBlog = async (req, res) => {
  const { title, content, image_url, status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO blogs (title, content, image_url, status) VALUES (?, ?, ?, ?)',
      [title, content, image_url, status || 'DRAFT']
    );
    res.status(201).json({ id: result.insertId, message: 'Blog post created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, status } = req.body;
  try {
    await db.query(
      'UPDATE blogs SET title = ?, content = ?, image_url = ?, status = ? WHERE id = ?',
      [title, content, image_url, status, id]
    );
    res.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM blogs WHERE id = ?', [id]);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CONTACT MESSAGES
exports.addMessage = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.query(
      'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// FEEDBACK (TESTIMONIALS)
exports.getFeedback = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM feedback ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFeedback = async (req, res) => {
  const { user_name, rating, comment } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO feedback (user_name, rating, comment, is_approved) VALUES (?, ?, ?, ?)',
      [user_name, rating, comment, false]
    );
    res.status(201).json({ id: result.insertId, message: 'Testimonial submitted and awaiting approval' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveFeedback = async (req, res) => {
  const { id } = req.params;
  const { is_approved } = req.body;
  try {
    await db.query('UPDATE feedback SET is_approved = ? WHERE id = ?', [is_approved, id]);
    res.json({ message: 'Feedback approval status updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM feedback WHERE id = ?', [id]);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ANALYTICS
exports.getAnalytics = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM analytics ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logEvent = async (req, res) => {
  const { event_type, event_value } = req.body;
  try {
    await db.query('INSERT INTO analytics (event_type, event_value) VALUES (?, ?)', [event_type, event_value]);
    res.status(201).json({ message: 'Event logged successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PERSONAL INFO (Including file uploads for Profile Photo and Resume)
exports.updatePersonalInfo = async (req, res) => {
  const {
    full_name, role, email, linkedin, github, education, 
    specialization, university, cgpa, current_year, current_semester
  } = req.body;

  try {
    // Build update dynamic fields
    let query = `
      UPDATE personal_info 
      SET full_name = ?, role_name = ?, email = ?, linkedin = ?, github = ?, 
          degree_name = ?, specialization = ?, university = ?, cgpa = ?, 
          current_year = ?, current_semester = ?
    `;
    const params = [
      full_name, role, email, linkedin, github, education, 
      specialization, university, cgpa, current_year, current_semester
    ];

    // Append file paths if files were uploaded
    if (req.files) {
      if (req.files.profile_photo) {
        query += `, profile_photo = ?`;
        params.push(`/uploads/profile/${req.files.profile_photo[0].filename}`);
      }
      if (req.files.resume) {
        query += `, resume_url = ?`;
        params.push(`/uploads/resumes/${req.files.resume[0].filename}`);
      }
    }

    // Always assume single row (id=1 or first row)
    query += ` WHERE id = 1`;

    const [result] = await db.query(query, params);
    res.json({ message: 'Personal info updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EXPERIENCES CRUD
exports.getExperiences = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM experiences ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addExperience = async (req, res) => {
  const { type, title, organization, status, duration, description } = req.body;
  let certificate_file = null;

  if (req.file) {
    certificate_file = `/uploads/certificates/${req.file.filename}`;
  }

  try {
    const [result] = await db.query(
      'INSERT INTO experiences (type, title, organization, status, duration, description, certificate_file) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [type, title, organization, status || 'Completed', duration, description, certificate_file]
    );
    res.status(201).json({ id: result.insertId, message: 'Experience entry added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { type, title, organization, status, duration, description } = req.body;
  
  try {
    let query = `
      UPDATE experiences 
      SET type = ?, title = ?, organization = ?, status = ?, duration = ?, description = ?
    `;
    const params = [type, title, organization, status, duration, description];

    if (req.file) {
      query += `, certificate_file = ?`;
      params.push(`/uploads/certificates/${req.file.filename}`);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await db.query(query, params);
    res.json({ message: 'Experience entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM experiences WHERE id = ?', [id]);
    res.json({ message: 'Experience entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


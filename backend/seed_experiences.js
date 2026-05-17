const db = require('./src/config/db');

async function seed() {
  console.log('Seeding experiences into MySQL...');
  try {
    const [countRows] = await db.query('SELECT COUNT(*) as count FROM experiences');
    if (countRows[0].count > 0) {
      console.log('Experiences table already has entries. Skipping seed.');
      process.exit(0);
    }

    const items = [
      {
        type: 'INTERNSHIP',
        title: 'AI Research Intern',
        organization: 'KL-CIIE (Incubation Cell)',
        status: 'Ongoing',
        duration: 'June 2025 - Present',
        description: 'Orchestrating agentic workflows and advanced neural architectures. Leading development of autonomous RAG applications.'
      },
      {
        type: 'COURSE',
        title: 'IBM Professional AI/ML Certification',
        organization: 'IBM',
        status: 'Completed',
        duration: '2024',
        description: 'Deep dive into computer vision, NLP, and model optimization. Gained expertise in TensorFlow, PyTorch, and SciKit-Learn.'
      },
      {
        type: 'INTERNSHIP',
        title: 'Full Stack Engineer Intern',
        organization: 'TechCorp Solutions',
        status: 'Completed',
        duration: 'Jan 2025 - May 2025',
        description: 'Architected reactive luxury glassmorphic frontends and secure Express REST APIs. Optimized MySQL connection pools for high load.'
      },
      {
        type: 'HACKATHON',
        title: 'Smart India Hackathon National Finalist',
        organization: 'Ministry of Education, GoI',
        status: 'Completed',
        duration: '2024',
        description: 'Pioneered RBAC-driven missing person recognition platform using biometric edge-computing pipelines.'
      }
    ];

    for (const item of items) {
      await db.query(
        'INSERT INTO experiences (type, title, organization, status, duration, description) VALUES (?, ?, ?, ?, ?, ?)',
        [item.type, item.title, item.organization, item.status, item.duration, item.description]
      );
    }

    console.log('Experiences table successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding experiences failed:', error);
    process.exit(1);
  }
}

seed();

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure directory exists
const dir = path.join(__dirname, 'public', 'resume');
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

const doc = new PDFDocument({ margin: 36, size: 'A4' });
const writeStream = fs.createWriteStream(path.join(dir, 'prasanna_resume.pdf'));
doc.pipe(writeStream);

// Styles
const colors = {
  primary: '#111827',
  secondary: '#374151',
  muted: '#6B7280',
  line: '#E5E7EB'
};

// Header
doc.font('Helvetica-Bold').fontSize(20).fillColor(colors.primary).text('Mondi Lakshmi Prasanna', { align: 'center' });
doc.moveDown(0.2);
doc.font('Helvetica').fontSize(9).fillColor(colors.secondary).text(
  '+91 6302325920  |  mondiprasanna8@gmail.com  |  LinkedIn  |  GitHub  |  CodeChef',
  { align: 'center' }
);
doc.moveDown(0.8);

const drawSectionHeader = (title) => {
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(colors.primary).text(title.toUpperCase(), { characterSpacing: 0.5 });
  doc.moveDown(0.2);
  const currentY = doc.y;
  doc.strokeColor(colors.line).lineWidth(0.5).moveTo(36, currentY).lineTo(doc.page.width - 36, currentY).stroke();
  doc.moveDown(0.35);
};

// 1. SUMMARY
drawSectionHeader('Summary');
doc.font('Helvetica').fontSize(9).fillColor(colors.secondary).text(
  'Motivated Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning with strong foundations in programming, web development and databases. Passionate about building innovative technology solutions and improving technical skills through projects and certifications.',
  { lineGap: 2.5 }
);
doc.moveDown(0.8);

// 2. TECHNICAL SKILLS
drawSectionHeader('Technical Skills');
const skills = [
  { label: 'Programming Languages', value: 'C, Python, Java' },
  { label: 'Databases', value: 'MySQL, PostgreSQL' },
  { label: 'Computer Science Subjects', value: 'Data Structures, Object-Oriented Programming, Operating Systems' },
  { label: 'Operating Systems', value: 'Windows, Ubuntu' },
  { label: 'Web Development', value: 'HTML, CSS, JavaScript, React.js' },
  { label: 'Tools', value: 'Git, Microsoft Word, Microsoft PowerPoint, MS Excel, VS Code' },
  { label: 'Specialization', value: 'Machine Learning, Natural Language Processing' }
];

skills.forEach(s => {
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.secondary).text(`  ${s.label}: `, { continued: true })
     .font('Helvetica').fillColor(colors.secondary).text(s.value);
  doc.moveDown(0.25);
});
doc.moveDown(0.6);

// 3. PROJECTS
drawSectionHeader('Projects');

const renderProject = (title, year, subtitle, role, bullets) => {
  const startY = doc.y;
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.primary).text(title, 36, startY);
  doc.font('Helvetica').fontSize(9).fillColor(colors.primary).text(year, doc.page.width - 36 - 100, startY, { align: 'right', width: 100 });
  
  doc.moveDown(0.1);
  const subY = doc.y;
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(colors.secondary).text(subtitle, 36, subY);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(colors.secondary).text(role, doc.page.width - 36 - 150, subY, { align: 'right', width: 150 });
  
  doc.moveDown(0.25);
  doc.x = 36;
  bullets.forEach(b => {
    doc.font('Helvetica').fontSize(8.5).fillColor(colors.secondary).text(`  •  ${b}`, { lineGap: 1.5 });
    doc.moveDown(0.15);
  });
  doc.moveDown(0.35);
};

renderProject(
  'Sustainable Development Project', '2024',
  'Environmental Technology Project', 'Research and Development',
  [
    'Designed a project focused on sustainable technology solutions.',
    'Conducted research and implemented innovative ideas for environmental improvement.'
  ]
);

renderProject(
  'Open-Source Contribution', '2025',
  'GitHub', 'Git',
  [
    'Contributed to open-source repositories by fixing issues and improving code.',
    'Collaborated with developers and improved Git workflow experience.',
    'Participated in community discussions and pull requests.'
  ]
);

renderProject(
  'Online Course Registration System', '2025',
  'Web Development', 'HTML, CSS, JavaScript',
  [
    'Developed a web-based platform that allows students to browse and register for courses through a user-friendly interface.',
    'Built the front-end using HTML, CSS, and JavaScript with responsive design.',
    'Improved the registration process by automating enrollment and reducing manual work.'
  ]
);
doc.moveDown(0.5);

// 4. EDUCATION
drawSectionHeader('Education');

const renderEducation = (school, location, degree, period) => {
  const startY = doc.y;
  doc.font('Helvetica-Bold').fontSize(9).fillColor(colors.primary).text(school, 36, startY);
  doc.font('Helvetica').fontSize(9).fillColor(colors.primary).text(location, doc.page.width - 36 - 150, startY, { align: 'right', width: 150 });
  
  doc.moveDown(0.1);
  const subY = doc.y;
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(colors.secondary).text(degree, 36, subY);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(colors.secondary).text(period, doc.page.width - 36 - 100, subY, { align: 'right', width: 100 });
  
  doc.moveDown(0.55);
  doc.x = 36;
};

renderEducation(
  'Koneru Lakshmaiah University', 'Vijayawada, India',
  'B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning) – CGPA: 8.8', '2024 – 2028'
);

renderEducation(
  'Sasi Junior College for Girls', 'Velivennu, India',
  'Intermediate (MPC) – GPA: 96.1%', '2022 – 2024'
);

renderEducation(
  'Loyola English Medium School', 'Tuni, India',
  'CBSE – GPA: 78.1%', '2022'
);
doc.moveDown(0.3);

// 5. CERTIFICATIONS
drawSectionHeader('Certifications');
const certs = [
  'GitHub Copilot Certification',
  'HTML Essentials – Cisco Networking Academy',
  'Operating System – Cisco Networking Academy',
  'IBM AI/ML Course – Coursera',
  'Introduction to Operating Systems – Coursera',
  'CSS Essentials – Cisco Networking Academy',
  'JavaScript Essentials – Cisco Networking Academy'
];
certs.forEach(c => {
  doc.font('Helvetica').fontSize(8.5).fillColor(colors.secondary).text(`  •  ${c}`);
  doc.moveDown(0.15);
});
doc.moveDown(0.5);

// 6. ACTIVITIES
drawSectionHeader('Activities');
const activities = [
  'Member, KL-CIIE (Koneru Lakshmaiah University Center for Innovation, Incubation & Entrepreneurship)',
  'Participated in technical workshops and hackathons',
  'Active contributor to collaborative technical projects'
];
activities.forEach(a => {
  doc.font('Helvetica').fontSize(8.5).fillColor(colors.secondary).text(`  •  ${a}`);
  doc.moveDown(0.15);
});
doc.moveDown(0.5);

// 7. COMMUNICATION SKILLS
drawSectionHeader('Communication Skills');
const comms = [
  { lang: 'English', level: 'Fluent' },
  { lang: 'Telugu', level: 'Native' },
  { lang: 'Hindi', level: 'Familiar' }
];
comms.forEach(c => {
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.secondary).text(`  •  ${c.lang} – `, { continued: true })
     .font('Helvetica').text(c.level);
  doc.moveDown(0.15);
});
doc.moveDown(0.5);

// 8. HOBBIES
drawSectionHeader('Hobbies');
const hobbies = [
  'Exploring New Technologies',
  'Participating in Hackathons',
  'Playing Badminton',
  'Listening to Music'
];
hobbies.forEach(h => {
  doc.font('Helvetica').fontSize(8.5).fillColor(colors.secondary).text(`  •  ${h}`);
  doc.moveDown(0.15);
});

doc.end();

writeStream.on('finish', () => {
  console.log('PDF Compiled successfully at: public/resume/prasanna_resume.pdf');
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, '../../uploads'),
  path.join(__dirname, '../../uploads/profile'),
  path.join(__dirname, '../../uploads/certificates'),
  path.join(__dirname, '../../uploads/resumes')
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile_photo') {
      cb(null, path.join(__dirname, '../../uploads/profile'));
    } else if (file.fieldname === 'resume') {
      cb(null, path.join(__dirname, '../../uploads/resumes'));
    } else {
      cb(null, path.join(__dirname, '../../uploads/certificates'));
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (file.fieldname === 'profile_photo') {
    // Profile photo only supports images
    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, and WEBP images are supported for profile photo!'), false);
    }
  } else {
    // Certificates and resumes support PDFs and images
    if (allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPG, PNG, WEBP, and PDF documents are supported!'), false);
    }
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = upload;

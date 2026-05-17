const express = require('express');
const router = express.Router();
const controller = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

const chatController = require('../controllers/chatController');
const upload = require('../middleware/upload');

// Public endpoints
router.get('/personal-info', controller.getPersonalInfo);
router.get('/projects', controller.getProjects);
router.get('/skills', controller.getSkills);
router.get('/certifications', controller.getCertifications);
router.get('/blogs', controller.getBlogs);
router.get('/feedback', controller.getFeedback);
router.get('/experiences', controller.getExperiences); // Public experiences list
router.post('/messages', controller.addMessage); // Public contact form submission
router.post('/feedback', controller.addFeedback); // Public feedback submission
router.post('/analytics', controller.logEvent); // Public event logging
router.post('/chat', chatController.handleChat); // AI Chatbot

// Protected admin endpoints
router.put('/personal-info', authMiddleware, upload.fields([
  { name: 'profile_photo', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), controller.updatePersonalInfo); // Admin profile/academic updates

router.post('/projects', authMiddleware, controller.addProject);
router.put('/projects/:id', authMiddleware, controller.updateProject);
router.delete('/projects/:id', authMiddleware, controller.deleteProject);

router.post('/skills', authMiddleware, controller.addSkill);
router.put('/skills/:id', authMiddleware, controller.updateSkill);
router.delete('/skills/:id', authMiddleware, controller.deleteSkill);

router.post('/certifications', authMiddleware, controller.addCertification);
router.delete('/certifications/:id', authMiddleware, controller.deleteCertification);

router.post('/blogs', authMiddleware, controller.addBlog);
router.put('/blogs/:id', authMiddleware, controller.updateBlog);
router.delete('/blogs/:id', authMiddleware, controller.deleteBlog);

router.post('/experiences', authMiddleware, upload.single('certificate_file'), controller.addExperience);
router.put('/experiences/:id', authMiddleware, upload.single('certificate_file'), controller.updateExperience);
router.delete('/experiences/:id', authMiddleware, controller.deleteExperience);

router.get('/messages', authMiddleware, controller.getMessages); // Admin message inbox
router.delete('/messages/:id', authMiddleware, controller.deleteMessage); // Admin delete message
router.put('/feedback/:id/approve', authMiddleware, controller.approveFeedback);
router.delete('/feedback/:id', authMiddleware, controller.deleteFeedback);
router.get('/analytics', authMiddleware, controller.getAnalytics); // Admin diagnostic telemetrics

module.exports = router;

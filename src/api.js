import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatic JWT Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- Public Endpoints ---
export const getPersonalInfo = () => api.get('/personal-info');
export const getProjects = () => api.get('/projects');
export const getSkills = () => api.get('/skills');
export const getCertifications = () => api.get('/certifications');
export const getBlogs = () => api.get('/blogs');
export const getFeedback = () => api.get('/feedback');

export const sendMessage = (data) => api.post('/messages', data);
export const addFeedback = (data) => api.post('/feedback', data);
export const logEvent = (data) => api.post('/analytics', data);
export const sendChatMessage = (message) => api.post('/chat', { message });

// --- Auth Endpoints ---
export const login = (data) => api.post('/auth/login', data);

// --- Protected Admin Endpoints ---

// Projects
export const addProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Skills
export const addSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

// Certifications
export const addCertification = (data) => api.post('/certifications', data);
export const deleteCertification = (id) => api.delete(`/certifications/${id}`);

// Experiences
export const getExperiences = () => api.get('/experiences');
export const addExperience = (formData) => api.post('/experiences', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateExperience = (id, formData) => api.put(`/experiences/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

// Personal Info
export const updatePersonalInfo = (formData) => api.put('/personal-info', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

// Blogs
export const addBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Admin Inbox & Feedback Management
export const getMessages = () => api.get('/messages');
export const deleteMessage = (id) => api.delete(`/messages/${id}`);
export const approveFeedback = (id, isApproved) => api.put(`/feedback/${id}/approve`, { is_approved: isApproved });
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);
export const getAnalytics = () => api.get('/analytics');

export default api;

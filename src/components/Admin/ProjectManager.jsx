import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { getProjects, addProject, updateProject, deleteProject } from '../../api';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github_link: '',
    live_link: ''
  });

  const fetchProjectsData = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to load dashboard projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectsData();
  }, []);

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        tech_stack: project.tech_stack || '',
        github_link: project.github_link || '',
        live_link: project.live_link || ''
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', description: '', tech_stack: '', github_link: '', live_link: '' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await addProject(formData);
      }
      setIsModalOpen(false);
      fetchProjectsData(); // Reload projects from database
    } catch (err) {
      console.error("Failed to save project:", err);
      alert("Error saving project data to MySQL. Please verify server connection.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you absolutely sure you want to permanently delete this project from the database?')) {
      try {
        await deleteProject(id);
        fetchProjectsData(); // Reload projects
      } catch (err) {
        console.error("Failed to delete project:", err);
        alert("Error deleting project. Please try again.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">System Module</div>
          <h2 className="text-2xl font-bold tracking-tight">Project <span className="text-teal">Inventory</span></h2>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-teal text-void font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] transition-all font-display text-xs uppercase"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="glass-card p-6 h-20 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel p-8 text-center text-white/30 text-sm border-white/5">
          No projects registered. Click "Add Project" to launch.
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <motion.div 
              layout
              key={project.id}
              className="glass-card p-6 flex items-center justify-between group border-white/5"
            >
              <div className="space-y-1 pr-6 flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-teal transition-colors tracking-tight">{project.title}</h3>
                <p className="text-white/40 text-xs line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech_stack ? (
                    project.tech_stack.split(',').map((t, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 uppercase font-mono">
                        {t.trim()}
                      </span>
                    ))
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button onClick={() => openModal(project)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-teal transition-all">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020408]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-8 w-full max-w-lg relative z-10 border-white/10 rounded-[2rem]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">{editingProject ? 'Edit Project Node' : 'Initialize Project Node'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Project Title</label>
                  <input 
                    type="text" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Description</label>
                  <textarea 
                    required rows="3"
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Tech Stack (comma separated)</label>
                  <input 
                    type="text" required
                    value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                    placeholder="React, Node.js, MySQL"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">GitHub Link</label>
                    <input 
                      type="url"
                      value={formData.github_link} onChange={e => setFormData({...formData, github_link: e.target.value})}
                      className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Live Link</label>
                    <input 
                      type="url"
                      value={formData.live_link} onChange={e => setFormData({...formData, live_link: e.target.value})}
                      className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all duration-300">
                  <Save size={14} /> {editingProject ? 'Update Subsystem' : 'Deploy Subsystem'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

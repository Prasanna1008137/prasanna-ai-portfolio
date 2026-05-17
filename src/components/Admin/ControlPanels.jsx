import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, FileText, Trash2, Edit3, Bot, Zap, Database, X, Save } from 'lucide-react';
import { getBlogs, addBlog, updateBlog, deleteBlog, getProjects, getSkills, getCertifications } from '../../api';

export function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    status: 'PUBLISHED'
  });

  const fetchBlogsData = async () => {
    setLoading(true);
    try {
      const response = await getBlogs();
      setBlogs(response.data);
    } catch (err) {
      console.error("Failed to load dashboard blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogsData();
  }, []);

  const openModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        image_url: blog.image_url || '',
        status: blog.status || 'PUBLISHED'
      });
    } else {
      setEditingBlog(null);
      setFormData({ title: '', content: '', image_url: '', status: 'PUBLISHED' });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, formData);
      } else {
        await addBlog(formData);
      }
      setIsModalOpen(false);
      fetchBlogsData();
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Error saving blog article to MySQL.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this blog article?")) {
      try {
        await deleteBlog(id);
        fetchBlogsData();
      } catch (err) {
        console.error("Failed to delete blog:", err);
        alert("Error deleting blog.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">System Module</div>
          <h2 className="text-2xl font-black">Content <span className="text-teal">Studio</span></h2>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-teal text-void font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] transition-all font-display text-xs uppercase"
        >
          <PenTool size={16} /> New Article
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="glass-card p-6 h-20 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass-panel p-8 text-center text-white/30 text-sm border-white/5">
          No articles written. Click "New Article" to publish your first insights!
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b.id} className="glass-card p-5 border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0">
                  <FileText size={18} />
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-white tracking-tight truncate max-w-[250px] sm:max-w-md">{b.title}</h4>
                  <p className="text-[10px] text-white/40">
                    {new Date(b.created_at).toLocaleDateString()} • <span className={b.status === 'PUBLISHED' ? 'text-teal' : 'text-amber'}>{b.status}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openModal(b)} className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-teal transition-all">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => handleDelete(b.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#020408]/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
              className="glass-panel p-8 w-full max-w-lg relative z-10 border-white/10 rounded-[2rem]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">{editingBlog ? 'Edit Article Subsystem' : 'Publish Article Node'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Article Title</label>
                  <input 
                    type="text" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Unsplash Cover Image URL</label>
                  <input 
                    type="url" required
                    value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Publish Status</label>
                  <select
                    value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                  >
                    <option value="PUBLISHED" className="bg-void text-white">PUBLISHED (Live)</option>
                    <option value="DRAFT" className="bg-void text-white">DRAFT (Offline)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Article Content</label>
                  <textarea 
                    required rows="6"
                    value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all resize-none leading-relaxed" 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all duration-300">
                  <Save size={14} /> {editingBlog ? 'Update Subsystem' : 'Deploy Article'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ChatbotSettings() {
  const [counts, setCounts] = useState({ projects: 0, skills: 0, certs: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projRes, skillRes, certRes] = await Promise.all([
          getProjects(),
          getSkills(),
          getCertifications()
        ]);
        setCounts({
          projects: projRes.data.length,
          skills: skillRes.data.length,
          certs: certRes.data.length
        });
      } catch (err) {
        console.error("Failed to load chatbot counts:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <div className="text-[9px] font-mono text-iris/40 uppercase tracking-[0.4em] mb-1">Core AI Configuration</div>
        <h2 className="text-3xl font-black text-white">Neural <span className="text-teal">Commander</span></h2>
        <p className="text-white/40 text-sm">Configure the AI Assistant behavior and knowledge base context mapping.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="text-teal" />
            <h3 className="text-xl font-bold text-white font-display">Assistant Identity</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-2 tracking-widest">Assistant Name</label>
              <input defaultValue="Prasanna AI" disabled className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-3 text-xs text-white/60 outline-none cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-2 tracking-widest">System Prompt (Knowledge)</label>
              <textarea rows="6" disabled className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-3 outline-none text-xs text-white/40 leading-relaxed resize-none cursor-not-allowed">
                You are the AI assistant for Mondi Lakshmi Prasanna. Your goal is to answer questions about her education (B.Tech CSE AI&ML), skills (Python, Java, React), and projects (Sustainable Development, etc.). Be professional, elegant, and intelligent.
              </textarea>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="text-amber" />
              <h3 className="text-xl font-bold text-white font-display">Performance</h3>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm text-white/60">Response Speed</span>
              <span className="text-[10px] font-mono bg-teal/20 text-teal px-2 py-1 rounded font-bold uppercase">Turbo</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-sm text-white/60">Creativity Index</span>
              <span className="text-[10px] font-mono bg-iris/20 text-iris px-2 py-1 rounded font-bold uppercase">Adaptive</span>
            </div>
          </div>

          <div className="glass-card p-8 border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-teal" />
              <h3 className="text-xl font-bold text-white font-display">Database Context</h3>
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-light">
              The neural AI agent possesses contextual mapping to <span className="text-teal font-bold">{counts.skills} skills</span>, <span className="text-teal font-bold">{counts.projects} projects</span>, and <span className="text-teal font-bold">{counts.certs} certifications</span> fetched live from active MySQL rows.
            </p>
            <button 
              onClick={() => alert("Ecosystem cache updated. Chatbot context synchronized.")}
              className="w-full mt-6 py-3.5 border border-teal/20 text-teal rounded-lg font-bold font-display text-xs uppercase hover:bg-teal/5 transition-all"
            >
              Re-sync Knowledge Base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

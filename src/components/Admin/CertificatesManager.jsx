import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Plus, Trash2, X, Save } from 'lucide-react';
import { getCertifications, addCertification, deleteCertification } from '../../api';

export default function CertificatesManager() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    certificate_name: '',
    issuer: ''
  });

  const fetchCertsData = async () => {
    setLoading(true);
    try {
      const response = await getCertifications();
      setCerts(response.data);
    } catch (err) {
      console.error("Failed to load dashboard certificates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertsData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await addCertification(formData);
      setIsModalOpen(false);
      setFormData({ certificate_name: '', issuer: '' });
      fetchCertsData();
    } catch (err) {
      console.error("Failed to save certification:", err);
      alert("Error saving certificate to database.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certificate permanently from database?')) {
      try {
        await deleteCertification(id);
        fetchCertsData();
      } catch (err) {
        console.error("Failed to delete certification:", err);
        alert("Error deleting certificate.");
      }
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">System Module</div>
          <h2 className="text-2xl font-black">Credential <span className="text-teal">Vault</span></h2>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-teal text-void font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] transition-all font-display text-xs uppercase"
        >
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="glass-card p-6 h-24 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="glass-panel p-8 text-center text-white/30 text-sm border-white/5">
          No certificates registered. Click "Add Certificate" to launch.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <motion.div 
              layout key={cert.id}
              className="glass-card p-6 flex items-center gap-4 relative overflow-hidden group border-white/5"
            >
              <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0">
                <Award size={24} />
              </div>
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-white group-hover:text-teal transition-colors truncate">{cert.certificate_name}</h4>
                <p className="text-xs text-white/40 truncate">{cert.issuer}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => handleDelete(cert.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#020408]/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
              className="glass-panel p-8 w-full max-w-md relative z-10 border-white/10 rounded-[2rem]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">New Credential Node</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Certificate Title</label>
                  <input 
                    type="text" required
                    placeholder="e.g. GitHub Copilot Certification"
                    value={formData.certificate_name} 
                    onChange={e => setFormData({...formData, certificate_name: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Issuer Agency</label>
                  <input 
                    type="text" required
                    placeholder="e.g. GitHub, IBM" 
                    value={formData.issuer}
                    onChange={e => setFormData({...formData, issuer: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all duration-300">
                  <Save size={14} /> Save to Vault
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

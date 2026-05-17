import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Award, Plus, Trash2, X, Save, Edit, FileText, Upload } from 'lucide-react';
import { 
  getExperiences, addExperience, updateExperience, deleteExperience,
  getCertifications, addCertification, deleteCertification 
} from '../../api';

const getExperienceStyles = (type) => {
  switch (type?.toUpperCase()) {
    case 'INTERNSHIP':
      return { icon: <Briefcase size={16} />, color: 'border-teal/20', text: 'text-teal' };
    case 'COURSE':
    case 'LEARNING EXPERIENCES':
      return { icon: <Award size={16} />, color: 'border-iris/20', text: 'text-iris' };
    case 'HACKATHON':
    case 'WORKSHOP':
      return { icon: <Award size={16} />, color: 'border-ember/20', text: 'text-ember' };
    default:
      return { icon: <Briefcase size={16} />, color: 'border-teal/20', text: 'text-teal' };
  }
};

export default function ExperiencesManager() {
  const [activeTab, setActiveTab] = useState('experiences'); // 'experiences' or 'certificates'
  const [experiences, setExperiences] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Experience Modal / Edit States
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [expFormData, setExpFormData] = useState({
    type: 'INTERNSHIP',
    title: '',
    organization: '',
    status: 'Completed',
    duration: '',
    description: ''
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [certFileName, setCertFileName] = useState('');

  // Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certFormData, setCertFormData] = useState({
    certificate_name: '',
    issuer: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, certRes] = await Promise.all([
        getExperiences(),
        getCertifications()
      ]);
      setExperiences(expRes.data);
      setCerts(certRes.data);
    } catch (err) {
      console.error("Failed to load operational vault:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- EXPERIENCES HANDLERS ---
  const handleExpFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
      setCertFileName(file.name);
    }
  };

  const handleOpenAddExp = () => {
    setEditingExp(null);
    setExpFormData({
      type: 'INTERNSHIP',
      title: '',
      organization: '',
      status: 'Completed',
      duration: '',
      description: ''
    });
    setCertificateFile(null);
    setCertFileName('');
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (exp) => {
    setEditingExp(exp);
    setExpFormData({
      type: exp.type,
      title: exp.title,
      organization: exp.organization,
      status: exp.status,
      duration: exp.duration,
      description: exp.description
    });
    setCertificateFile(null);
    setCertFileName(exp.certificate_file ? exp.certificate_file.split('/').pop() : '');
    setIsExpModalOpen(true);
  };

  const handleSaveExp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(expFormData).forEach(key => {
        formData.append(key, expFormData[key]);
      });

      if (certificateFile) {
        formData.append('certificate_file', certificateFile);
      }

      if (editingExp) {
        await updateExperience(editingExp.id, formData);
      } else {
        await addExperience(formData);
      }

      setIsExpModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Failed to sync experience node:", err);
      alert("Error synchronizing experience node with database.");
    }
  };

  const handleDeleteExp = async (id) => {
    if (window.confirm('Delete this experience node permanently?')) {
      try {
        await deleteExperience(id);
        fetchData();
      } catch (err) {
        console.error("Failed to delete experience node:", err);
        alert("Deletion failed.");
      }
    }
  };

  // --- CERTIFICATIONS HANDLERS ---
  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      await addCertification(certFormData);
      setIsCertModalOpen(false);
      setCertFormData({ certificate_name: '', issuer: '' });
      fetchData();
    } catch (err) {
      console.error("Failed to save certification:", err);
      alert("Vault insertion failed.");
    }
  };

  const handleDeleteCert = async (id) => {
    if (window.confirm('Delete this certification from credentials vault?')) {
      try {
        await deleteCertification(id);
        fetchData();
      } catch (err) {
        console.error("Failed to delete certificate:", err);
        alert("Deletion failed.");
      }
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">Dossier Operations</div>
          <h2 className="text-2xl font-black">Certifications & <span className="text-teal">Experiences</span></h2>
        </div>
        
        <div className="flex gap-2">
          {activeTab === 'experiences' ? (
            <button 
              onClick={handleOpenAddExp}
              className="flex items-center gap-2 px-4 py-2 bg-teal text-void font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] transition-all font-display text-xs uppercase"
            >
              <Plus size={18} /> Add Experience
            </button>
          ) : (
            <button 
              onClick={() => setIsCertModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal text-void font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,170,0.4)] transition-all font-display text-xs uppercase"
            >
              <Plus size={18} /> Add Certificate
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 gap-6 text-xs font-mono">
        <button 
          onClick={() => setActiveTab('experiences')}
          className={`pb-4 px-2 relative transition-colors ${activeTab === 'experiences' ? 'text-teal' : 'text-white/30 hover:text-white'}`}
        >
          Operational History ({experiences.length})
          {activeTab === 'experiences' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />}
        </button>
        <button 
          onClick={() => setActiveTab('certificates')}
          className={`pb-4 px-2 relative transition-colors ${activeTab === 'certificates' ? 'text-teal' : 'text-white/30 hover:text-white'}`}
        >
          Credentials Vault ({certs.length})
          {activeTab === 'certificates' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-teal" />}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="glass-card p-6 h-28 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : activeTab === 'experiences' ? (
        experiences.length === 0 ? (
          <div className="glass-panel p-10 text-center text-white/30 text-sm border-white/5">
            No experiences currently registered in database.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {experiences.map((exp) => {
              const styles = getExperienceStyles(exp.type);
              return (
                <motion.div 
                  layout key={exp.id}
                  className={`glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border ${styles.color} group`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center ${styles.text}`}>
                      {styles.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{exp.type}</span>
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono border bg-white/[0.02] border-white/10 text-white/60">{exp.status}</span>
                      </div>
                      <h4 className="font-bold text-white group-hover:text-teal transition-colors mt-0.5">{exp.title}</h4>
                      <p className="text-xs text-white/40">{exp.organization} &bull; {exp.duration}</p>
                      {exp.certificate_file && (
                        <a 
                          href={`http://localhost:5000${exp.certificate_file}`} 
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-[10px] text-teal hover:underline"
                        >
                          <FileText size={10} /> View Document
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 self-end sm:self-center">
                    <button 
                      onClick={() => handleOpenEditExp(exp)}
                      className="p-2 hover:bg-teal/10 rounded-lg text-white/40 hover:text-teal transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )
      ) : (
        certs.length === 0 ? (
          <div className="glass-panel p-10 text-center text-white/30 text-sm border-white/5">
            No credentials currently registered in vault.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certs.map((cert) => (
              <motion.div 
                layout key={cert.id}
                className="glass-card p-6 flex items-center gap-4 border-white/5 group"
              >
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0">
                  <Award size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold text-white group-hover:text-teal transition-colors truncate">{cert.certificate_name}</h4>
                  <p className="text-xs text-white/40 truncate">{cert.issuer}</p>
                </div>
                <button 
                  onClick={() => handleDeleteCert(cert.id)} 
                  className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        )
      )}

      {/* --- EXPERIENCE MODAL --- */}
      <AnimatePresence>
        {isExpModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsExpModalOpen(false)} className="absolute inset-0 bg-[#020408]/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
              className="glass-panel p-8 w-full max-w-lg relative z-10 border-white/10 rounded-[2.5rem] overflow-y-auto max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">{editingExp ? 'Edit Operational Node' : 'New Operational Node'}</h3>
                <button onClick={() => setIsExpModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>

              <form onSubmit={handleSaveExp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Node Type</label>
                    <select 
                      value={expFormData.type} 
                      onChange={e => setExpFormData({...expFormData, type: e.target.value})}
                      className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                    >
                      <option value="INTERNSHIP">INTERNSHIP</option>
                      <option value="COURSE">COURSE</option>
                      <option value="LEARNING EXPERIENCES">LEARNING EXPERIENCE</option>
                      <option value="WORKSHOP">WORKSHOP</option>
                      <option value="HACKATHON">HACKATHON</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Status</label>
                    <select 
                      value={expFormData.status} 
                      onChange={e => setExpFormData({...expFormData, status: e.target.value})}
                      className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Title / Role</label>
                  <input 
                    type="text" required placeholder="e.g. Prompt Engineering Internship"
                    value={expFormData.title} 
                    onChange={e => setExpFormData({...expFormData, title: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Company / Organization</label>
                  <input 
                    type="text" required placeholder="e.g. KL-CIIE Incubation Cell"
                    value={expFormData.organization} 
                    onChange={e => setExpFormData({...expFormData, organization: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Duration</label>
                  <input 
                    type="text" required placeholder="e.g. June 2025 - Present"
                    value={expFormData.duration} 
                    onChange={e => setExpFormData({...expFormData, duration: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Description</label>
                  <textarea 
                    rows={3} required placeholder="Detail the duties, achievements, or concepts learned..."
                    value={expFormData.description} 
                    onChange={e => setExpFormData({...expFormData, description: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all resize-none" 
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Certificate / Document Node</label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-teal/30 hover:bg-teal/5 text-white/60 hover:text-teal rounded-lg font-bold font-mono text-[10px] uppercase cursor-pointer transition-all">
                      <Upload size={12} /> Select File
                      <input type="file" accept=".pdf,image/*" className="hidden" onChange={handleExpFileChange} />
                    </label>
                    <span className="text-[10px] text-white/40 truncate flex-1">{certFileName || 'No file selected'}</span>
                  </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all">
                  <Save size={14} /> Synchronize Node
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CERTIFICATE Vault MODAL --- */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCertModalOpen(false)} className="absolute inset-0 bg-[#020408]/80 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} 
              className="glass-panel p-8 w-full max-w-md relative z-10 border-white/10 rounded-[2rem]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold font-display">New Vault Node</h3>
                <button onClick={() => setIsCertModalOpen(false)} className="text-white/40 hover:text-white"><X size={20} /></button>
              </div>
              
              <form onSubmit={handleSaveCert} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Certificate Title</label>
                  <input 
                    type="text" required placeholder="e.g. GitHub Copilot Certification"
                    value={certFormData.certificate_name} 
                    onChange={e => setCertFormData({...certFormData, certificate_name: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Issuer Agency</label>
                  <input 
                    type="text" required placeholder="e.g. IBM, Cisco Academy" 
                    value={certFormData.issuer}
                    onChange={e => setCertFormData({...certFormData, issuer: e.target.value})}
                    className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
                  />
                </div>
                <button type="submit" className="w-full py-3.5 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg flex items-center justify-center gap-2 mt-4 hover:shadow-[0_0_20px_rgba(0,212,170,0.3)] transition-all">
                  <Save size={14} /> Synchronize Vault
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

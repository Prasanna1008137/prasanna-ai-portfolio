import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Upload, User, GraduationCap, FileText, Trash2 } from 'lucide-react';
import { getPersonalInfo, updatePersonalInfo } from '../../api';

export default function ProfileAcademicManager() {
  const [personalInfo, setPersonalInfo] = useState({
    full_name: '',
    role: '',
    email: '',
    linkedin: '',
    github: '',
    education: '',
    specialization: '',
    university: '',
    cgpa: '',
    current_year: '',
    current_semester: '',
    profile_photo: '',
    resume_url: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // File preview states
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeName, setResumeName] = useState('');

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await getPersonalInfo();
      if (response.data) {
        setPersonalInfo(response.data);
        if (response.data.profile_photo) {
          setPhotoPreview(`http://localhost:5000${response.data.profile_photo}`);
        }
        if (response.data.resume_url) {
          setResumeName(response.data.resume_url.split('/').pop());
        }
      }
    } catch (err) {
      console.error("Failed to load personal details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeName('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(personalInfo).forEach(key => {
        // Skip paths if we are uploading new files
        if (key !== 'profile_photo' && key !== 'resume_url') {
          formData.append(key, personalInfo[key]);
        }
      });

      if (photoFile) {
        formData.append('profile_photo', photoFile);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      await updatePersonalInfo(formData);
      alert('Administrative profile and academic sync completed!');
      fetchProfileData();
    } catch (err) {
      console.error("Sync error:", err);
      alert("Failed to synchronize with MySQL cluster.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-8 animate-pulse space-y-6">
        <div className="h-8 bg-white/5 rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-12 bg-white/5 rounded" />
          <div className="h-12 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">Control System</div>
        <h2 className="text-2xl font-black">Academic & <span className="text-teal">Profile</span> Manager</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
        {/* Profile Photo Manager */}
        <div className="glass-panel p-8 border-white/5 rounded-[2rem] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/[0.01] rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="font-display text-lg font-bold flex items-center gap-3 border-b border-white/5 pb-4">
            <User size={18} className="text-teal" /> Profile Photo Manager
          </h3>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image Preview Container */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-white/10 relative glass-luxury flex items-center justify-center">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-white/20 font-mono text-[10px] uppercase">/NO_IMAGE</div>
                )}
              </div>
              {photoPreview && (
                <button 
                  type="button" 
                  onClick={handleRemovePhoto}
                  className="absolute -top-1 -right-1 p-2 rounded-full bg-red-500/80 border border-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left">
              <h4 className="font-display font-semibold text-sm">Upload Avatar Node</h4>
              <p className="text-xs text-white/30 font-light leading-relaxed max-w-md">
                Supported specifications: JPG, PNG, WEBP. Live changes will synchronize across all frontend components instantly upon cluster sync.
              </p>
              
              <div className="inline-flex gap-3">
                <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-teal/30 hover:bg-teal/5 text-white/60 hover:text-teal rounded-lg font-bold font-mono text-xs uppercase cursor-pointer transition-all">
                  <Upload size={14} /> Upload Image
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information Management */}
        <div className="glass-panel p-8 border-white/5 rounded-[2rem] space-y-6">
          <h3 className="font-display text-lg font-bold flex items-center gap-3 border-b border-white/5 pb-4">
            <GraduationCap size={18} className="text-teal" /> Academic Information Management
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Current Study Year</label>
              <input 
                type="text" required placeholder="e.g. 3rd Year"
                value={personalInfo.current_year || ''} 
                onChange={e => setPersonalInfo({...personalInfo, current_year: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Current Semester</label>
              <input 
                type="text" required placeholder="e.g. 6th Semester"
                value={personalInfo.current_semester || ''} 
                onChange={e => setPersonalInfo({...personalInfo, current_semester: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Degree / Education Title</label>
              <input 
                type="text" required placeholder="e.g. B.Tech CSE"
                value={personalInfo.education || ''} 
                onChange={e => setPersonalInfo({...personalInfo, education: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Specialization Focus</label>
              <input 
                type="text" required placeholder="e.g. AI & ML"
                value={personalInfo.specialization || ''} 
                onChange={e => setPersonalInfo({...personalInfo, specialization: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">University / Academy</label>
              <input 
                type="text" required placeholder="e.g. KL University"
                value={personalInfo.university || ''} 
                onChange={e => setPersonalInfo({...personalInfo, university: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Current CGPA Score</label>
              <input 
                type="number" step="0.01" max="10" required placeholder="e.g. 8.80"
                value={personalInfo.cgpa || ''} 
                onChange={e => setPersonalInfo({...personalInfo, cgpa: e.target.value})}
                className="w-full bg-void/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:border-teal/50 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Credentials & General Node */}
        <div className="glass-panel p-8 border-white/5 rounded-[2rem] space-y-6">
          <h3 className="font-display text-lg font-bold flex items-center gap-3 border-b border-white/5 pb-4">
            <FileText size={18} className="text-teal" /> Dossier / Resume Sync
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 overflow-hidden w-full">
              <label className="block text-[10px] font-mono uppercase text-white/40 mb-1.5">Active Technical Dossier (Resume PDF)</label>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-void/30">
                <FileText size={24} className="text-teal shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate text-white">{resumeName || 'No resume file synced'}</div>
                  <div className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">System Document</div>
                </div>
                {resumeName && (
                  <button 
                    type="button" 
                    onClick={handleRemoveResume}
                    className="p-1.5 ml-auto hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <label className="flex justify-center items-center gap-2 px-6 py-4 bg-teal text-void font-bold font-display text-xs uppercase rounded-lg cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]">
                <Upload size={14} /> Upload Dossier
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
              </label>
            </div>
          </div>
        </div>

        {/* Form Submission Button */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 px-8 py-4 bg-teal text-void font-black uppercase tracking-widest font-display text-xs rounded-xl hover:shadow-[0_0_35px_rgba(0,212,170,0.45)] transition-all disabled:opacity-40"
          >
            <Save size={16} /> {saving ? 'Synchronizing Cluster...' : 'Synchronize Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

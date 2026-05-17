import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { getPersonalInfo, getProjects, getCertifications } from '../api';

const techWords = ['React', 'Python', 'AI/ML', 'Node.js', 'MySQL', 'TensorFlow'];

const getImageUrl = (path) => {
  if (!path) return '/assets/profile.jpg';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return `http://localhost:5000${path}`;
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [personalInfo, setPersonalInfo] = useState(null);
  const [stats, setStats] = useState([
    { value: '8.8', label: 'CGPA', color: 'text-teal' },
    { value: '0+', label: 'Projects', color: 'text-ember' },
    { value: '0+', label: 'Certifications', color: 'text-iris' },
  ]);
  
  const [roleText, setRoleText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);

  // CV Feature States
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvTab, setCvTab] = useState('interactive'); // 'interactive' or 'pdf'
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const [infoRes, projRes, certRes] = await Promise.all([
          getPersonalInfo(),
          getProjects(),
          getCertifications()
        ]);
        
        const info = infoRes.data;
        if (info) {
          setPersonalInfo(info);
          setStats([
            { value: info.cgpa || '8.80', label: 'CGPA', color: 'text-teal' },
            { value: `${projRes.data.length || 0}+`, label: 'Projects', color: 'text-ember' },
            { value: `${certRes.data.length || 0}+`, label: 'Certifications', color: 'text-iris' }
          ]);
        }
      } catch (err) {
        console.error("Error fetching Hero telemetry:", err);
      }
    };
    fetchTelemetry();
  }, []);

  const roles = personalInfo?.role_name 
    ? [personalInfo.role_name, "Machine Learning Engineer", "Innovation Architect"] 
    : ["AI & Full Stack Developer", "Machine Learning Engineer", "Innovation Architect"];

  useEffect(() => {
    let currentText = '';
    let isDeleting = false;
    let charIdx = 0;
    const typeSpeed = 100;
    
    const type = () => {
      const fullText = roles[roleIdx];
      if (!fullText) return;
      if (isDeleting) {
        currentText = fullText.substring(0, charIdx - 1);
        charIdx--;
      } else {
        currentText = fullText.substring(0, charIdx + 1);
        charIdx++;
      }
      
      setRoleText(currentText);
      
      let delta = typeSpeed;
      if (isDeleting) delta /= 2;
      
      if (!isDeleting && currentText === fullText) {
        delta = 2000;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        setRoleIdx((prev) => (prev + 1) % roles.length);
        delta = 500;
      }
      
      setTimeout(type, delta);
    };
    
    const timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [roleIdx, personalInfo]);

  // Handle premium download action
  const handleDownload = (e) => {
    if (e) e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      const link = document.createElement('a');
      link.href = getImageUrl(personalInfo?.resume_url) || '/resume/prasanna_resume.pdf';
      link.download = 'Mondi_Lakshmi_Prasanna_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200); // Premium interactive micro-sync delay
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-teal/[0.03] blur-[150px] pointer-events-none" />
      <motion.div style={{ y: y1 }} className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-iris/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-teal" />
            <span className="text-teal">Intelligence Infrastructure v2.0</span>
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] tracking-tighter mb-6">
            <span className="block text-white/40">Architecting</span>
            <span className="block text-white relative">
              Intelligent 
              <span className="absolute -right-8 top-0 text-teal/20 text-4xl hidden md:block">01</span>
            </span>
            <span className="block gradient-text-teal">Experiences.</span>
          </h1>

          {personalInfo?.current_year && (
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/5 border border-teal/20 text-teal text-xs font-mono backdrop-blur-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
              Currently Pursuing {personalInfo.current_year} {personalInfo.education || 'B.Tech CSE'} ({personalInfo.specialization || 'AI & ML'}) at {personalInfo.university || 'KL University'}
            </div>
          )}

          <div className="flex items-center gap-4 mb-8 h-8">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="font-mono text-lg text-white/60 tracking-tight">
              {roleText}<span className="animate-pulse text-teal">|</span>
            </span>
          </div>

          <p className="text-white/40 text-lg max-w-lg leading-relaxed mb-10 font-light italic">
            "{personalInfo?.summary || "Merging the logic of AI with the aesthetics of cinematic design to build the next generation of digital ecosystems."}"
          </p>

          {/* Premium Integrated Buttons panel */}
          <div className="flex flex-wrap gap-3.5 max-w-xl">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-white text-void font-display font-bold text-xs hover:scale-105 hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-all uppercase tracking-wider"
            >
              View Projects
            </a>
            
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-6 py-3.5 rounded-full bg-teal text-void font-display font-bold text-xs hover:scale-105 hover:shadow-[0_0_35px_rgba(0,212,170,0.45)] transition-all uppercase tracking-wider flex items-center gap-2 relative overflow-hidden"
            >
              {downloading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-void border-t-transparent rounded-full animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 animate-pulse text-void" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </>
              )}
            </button>

            <button
              onClick={() => setIsCvModalOpen(true)}
              className="px-6 py-3.5 rounded-full border border-teal/30 bg-teal/5 text-teal font-display font-bold text-xs hover:scale-105 hover:bg-teal/10 hover:border-teal/50 hover:shadow-[0_0_30px_rgba(0,212,170,0.25)] transition-all uppercase tracking-wider flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View CV
            </button>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-full border border-white/10 text-white/70 font-display font-bold text-xs hover:border-white/20 hover:text-white transition-all uppercase tracking-wider backdrop-blur-sm"
            >
              Contact Me
            </a>

            <a
              href="/admin/login"
              className="px-6 py-3.5 rounded-full border border-white/5 bg-white/[0.01] text-white/40 font-display font-bold text-xs hover:border-white/20 hover:text-teal transition-all uppercase tracking-wider flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 text-white/40 group-hover:text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Admin Login
            </a>
          </div>
        </motion.div>

        {/* Right Content - Profile Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
            {/* Animated Rings */}
            <div className="absolute inset-0 border border-teal/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-[-20px] border border-iris/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            
            {/* Glow Background */}
            <div className="absolute inset-4 bg-gradient-to-tr from-teal/20 via-transparent to-iris/20 rounded-full blur-2xl animate-pulse" />
            
            {/* Photo Container */}
            <div className="absolute inset-0 rounded-full p-2 glow-ring overflow-hidden antigravity-float">
               <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 relative group">
                  <img 
                    src={getImageUrl(personalInfo?.profile_photo)} 
                    alt="Mondi Lakshmi Prasanna"
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                  />
                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Interactive Scan Line */}
                  <motion.div 
                    animate={{ top: ['-100%', '200%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-[2px] bg-teal shadow-[0_0_15px_#00d4aa] opacity-30 pointer-events-none"
                  />
               </div>
            </div>

            {/* Floating Stats Orbs */}
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4 + i, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
                className={`absolute glass-luxury p-4 rounded-2xl hidden md:block`}
                style={{
                  top: i === 0 ? '10%' : i === 1 ? '70%' : '40%',
                  right: i === 0 ? '-10%' : i === 1 ? '85%' : '-15%',
                  zIndex: 20
                }}
              >
                <div className={`font-display font-bold text-xl ${stat.color}`}>{stat.value}</div>
                <div className="text-[9px] font-mono uppercase tracking-widest text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Tech Badges */}
      <div className="absolute bottom-12 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 text-6xl font-display font-black text-white/5 uppercase"
        >
          {Array(10).fill(0).map((_, i) => (
            <span key={i}>AI ARCHITECT • FULL STACK • DATA ENGINEER • </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Vertical Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-teal to-transparent" />
      </motion.div>

      {/* Premium Futuristic CV Viewer Modal */}
      <AnimatePresence>
        {isCvModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCvModalOpen(false)}
              className="absolute inset-0 bg-[#020408]/90 backdrop-blur-xl"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="glass-panel p-6 sm:p-10 w-full max-w-5xl relative z-10 border border-white/10 rounded-[2.5rem] flex flex-col max-h-[88vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/30 flex items-center justify-center text-teal shadow-[0_0_20px_rgba(0,212,170,0.15)] animate-pulse">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Mondi Lakshmi Prasanna</h3>
                    <p className="text-xs text-white/40 font-mono tracking-widest uppercase">Specialization: Artificial Intelligence & Machine Learning</p>
                  </div>
                </div>

                {/* Actions & Tab toggles */}
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <div className="flex bg-white/5 border border-white/10 rounded-full p-1 shrink-0">
                    <button
                      onClick={() => setCvTab('interactive')}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
                        cvTab === 'interactive' ? 'bg-teal text-void shadow-[0_0_15px_rgba(0,212,170,0.3)]' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Interactive CV
                    </button>
                    <button
                      onClick={() => setCvTab('pdf')}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold transition-all duration-300 ${
                        cvTab === 'pdf' ? 'bg-teal text-void shadow-[0_0_15px_rgba(0,212,170,0.3)]' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      Print PDF
                    </button>
                  </div>

                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-teal hover:border-teal/50 hover:bg-teal/5 transition-all shrink-0"
                    title="Download Document"
                  >
                    {downloading ? (
                      <span className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin block" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => setIsCvModalOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Viewer Body viewport */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-[50vh]">
                
                {/* 1. Interactive Digital CV Layout */}
                {cvTab === 'interactive' && (
                  <div className="space-y-8 animate-fadeIn text-left pb-6">
                    {/* Summary bento */}
                    <div className="glass-card p-6 border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-white pointer-events-none font-display font-black text-6xl">SUMMARY</div>
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-teal mb-3">Executive Summary</h4>
                      <p className="text-sm text-white/70 font-light leading-relaxed leading-6">
                        Motivated Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning with strong foundations in programming, web development and databases. Passionate about building innovative technology solutions and improving technical skills through projects and certifications.
                      </p>
                    </div>

                    {/* Skill categorized lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 border-white/5">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-iris mb-4">Core Technology Stack</h4>
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1">PROGRAMMING</span>
                            <div className="flex flex-wrap gap-2">
                              {['C', 'Python', 'Java'].map(s => <span key={s} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80 font-mono">{s}</span>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1">WEB ARCHITECTURE</span>
                            <div className="flex flex-wrap gap-2">
                              {['HTML', 'CSS', 'JavaScript', 'React.js'].map(s => <span key={s} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-teal font-mono">{s}</span>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1">DATABASES & ORM</span>
                            <div className="flex flex-wrap gap-2">
                              {['MySQL', 'PostgreSQL'].map(s => <span key={s} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80 font-mono">{s}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="glass-card p-6 border-white/5">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-ember mb-4">Specialization & Tools</h4>
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1">AI/ML FIELDS</span>
                            <div className="flex flex-wrap gap-2">
                              {['Machine Learning', 'Natural Language Processing'].map(s => <span key={s} className="text-xs px-2.5 py-1 rounded bg-teal/5 border border-teal/20 text-teal font-mono">{s}</span>)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-white/40 block mb-1">DEVELOPER UTILITIES</span>
                            <div className="flex flex-wrap gap-2">
                              {['Git', 'VS Code', 'Microsoft PowerPoint', 'Microsoft Word', 'MS Excel'].map(s => <span key={s} className="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/60 font-mono">{s}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Projects grid */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-teal border-b border-white/5 pb-2">Technical Subsystems</h4>
                      
                      <div className="space-y-4">
                        {[
                          {
                            title: 'Sustainable Development Project',
                            category: 'Environmental Technology Project',
                            role: 'Research and Development',
                            year: '2024',
                            bullets: [
                              'Designed a project focused on sustainable technology solutions.',
                              'Conducted research and implemented innovative ideas for environmental improvement.'
                            ]
                          },
                          {
                            title: 'Open-Source Contribution',
                            category: 'GitHub Contribution',
                            role: 'Git Version Control',
                            year: '2025',
                            bullets: [
                              'Contributed to open-source repositories by fixing issues and improving code.',
                              'Collaborated with developers and improved Git workflow experience.'
                            ]
                          },
                          {
                            title: 'Online Course Registration System',
                            category: 'Web Development Platform',
                            role: 'Full Stack Integration',
                            year: '2025',
                            bullets: [
                              'Developed a web-based platform that allows students to browse and register for courses through a user-friendly interface.',
                              'Built the front-end using HTML, CSS, and JavaScript with responsive mobile layouts.'
                            ]
                          }
                        ].map(p => (
                          <div key={p.title} className="glass-luxury p-5 border border-white/5 rounded-2xl relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-bold text-white group-hover:text-teal transition-colors text-sm">{p.title}</h5>
                                <p className="text-[10px] font-mono text-teal/60 italic">{p.category} • {p.role}</p>
                              </div>
                              <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/50 px-2 py-0.5 rounded">{p.year}</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1.5 text-xs text-white/60 font-light mt-3 pl-1">
                              {p.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Education grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          school: 'Koneru Lakshmaiah University',
                          degree: 'B.Tech CSE (AI & ML)',
                          score: 'CGPA: 8.8',
                          period: '2024 – 2028',
                          color: 'border-teal/20 text-teal bg-teal/[0.01]'
                        },
                        {
                          school: 'Sasi Junior College for Girls',
                          degree: 'Intermediate (MPC)',
                          score: 'GPA: 96.1%',
                          period: '2022 – 2024',
                          color: 'border-iris/20 text-iris bg-iris/[0.01]'
                        },
                        {
                          school: 'Loyola English Medium School',
                          degree: 'Secondary CBSE School',
                          score: 'GPA: 78.1%',
                          period: '2022',
                          color: 'border-ember/20 text-ember bg-ember/[0.01]'
                        }
                      ].map(e => (
                        <div key={e.school} className={`glass-card p-5 border ${e.color} flex flex-col justify-between h-40`}>
                          <div>
                            <h5 className="font-bold text-white text-xs truncate" title={e.school}>{e.school}</h5>
                            <p className="text-[10px] text-white/50 font-light mt-1">{e.degree}</p>
                            <p className="text-xs font-mono font-bold text-white mt-2">{e.score}</p>
                          </div>
                          <span className="text-[9px] font-mono text-white/30 uppercase mt-4 block">{e.period}</span>
                        </div>
                      ))}
                    </div>

                    {/* Certifications and Activities row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="glass-card p-6 border-white/5">
                        <h4 className="text-[10px] font-mono uppercase tracking-widest text-teal mb-4 border-b border-white/5 pb-2">Technical Certifications</h4>
                        <ul className="space-y-2.5">
                          {[
                            'GitHub Copilot Certification',
                            'HTML Essentials – Cisco Networking Academy',
                            'Operating System – Cisco Networking Academy',
                            'IBM AI/ML Course – Coursera',
                            'Introduction to Operating Systems – Coursera',
                            'CSS Essentials – Cisco Networking Academy',
                            'JavaScript Essentials – Cisco Networking Academy'
                          ].map(c => (
                            <li key={c} className="text-xs text-white/70 font-light flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-6">
                        <div className="glass-card p-6 border-white/5">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-iris mb-4 border-b border-white/5 pb-2">Activities & Memberships</h4>
                          <ul className="space-y-2.5">
                            {[
                              'Member, KL-CIIE (Center for Innovation, Incubation & Entrepreneurship)',
                              'Participated in technical workshops and hackathons',
                              'Active contributor to collaborative technical projects'
                            ].map(a => (
                              <li key={a} className="text-xs text-white/70 font-light flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-iris shrink-0" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="glass-card p-6 border-white/5">
                          <h4 className="text-[10px] font-mono uppercase tracking-widest text-ember mb-4 border-b border-white/5 pb-2">Communication & Hobbies</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[9px] font-mono text-white/40 uppercase block mb-1">Languages</span>
                              <div className="space-y-1">
                                <div className="text-xs text-white/80"><span className="font-bold">English</span> (Fluent)</div>
                                <div className="text-xs text-white/80"><span className="font-bold">Telugu</span> (Native)</div>
                                <div className="text-xs text-white/80"><span className="font-bold">Hindi</span> (Familiar)</div>
                              </div>
                            </div>
                            <div>
                              <span className="text-[9px] font-mono text-white/40 uppercase block mb-1">Hobbies</span>
                              <div className="text-xs text-white/60 font-light leading-relaxed">
                                Exploring Technologies, Hackathons, Badminton, Music
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Embedded Standard PDF Viewer Tab */}
                {cvTab === 'pdf' && (
                  <div className="w-full h-[65vh] rounded-2xl overflow-hidden border border-white/10 bg-void animate-fadeIn flex flex-col">
                    <iframe
                      src={getImageUrl(personalInfo?.resume_url) || "/resume/prasanna_resume.pdf"}
                      className="w-full h-full border-0 bg-[#0e121a]"
                      title="Mondi Lakshmi Prasanna - CV"
                    />
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

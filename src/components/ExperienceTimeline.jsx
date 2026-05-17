import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Sparkles, FileText } from 'lucide-react';
import { getExperiences } from '../api';

const getExperienceStyles = (type) => {
  switch (type?.toUpperCase()) {
    case 'INTERNSHIP':
      return { icon: <Briefcase size={20} />, accent: 'text-teal', glow: 'shadow-teal/20' };
    case 'COURSE':
    case 'LEARNING EXPERIENCES':
      return { icon: <GraduationCap size={20} />, accent: 'text-iris', glow: 'shadow-iris/20' };
    case 'CERTIFICATE':
      return { icon: <Award size={20} />, accent: 'text-ember', glow: 'shadow-ember/20' };
    case 'HACKATHON':
      return { icon: <Sparkles size={20} />, accent: 'text-teal', glow: 'shadow-teal/20' };
    case 'WORKSHOP':
      return { icon: <Sparkles size={20} />, accent: 'text-iris', glow: 'shadow-iris/20' };
    default:
      return { icon: <Briefcase size={20} />, accent: 'text-teal', glow: 'shadow-teal/20' };
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'Ongoing':
      return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    case 'In Progress':
      return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    default:
      return 'bg-blue-500/10 border-blue-500/30 text-blue-400'; // Completed
  }
};

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await getExperiences();
        setExperiences(response.data);
      } catch (err) {
        console.error("Error loading timeline experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <div className="section-label mb-4 justify-center flex items-center gap-3">
            <span className="w-8 h-px bg-iris" />
            <span>Operational History</span>
            <span className="w-8 h-px bg-iris" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            The <span className="gradient-text-teal">Timeline</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs text-white/40 uppercase">Loading history...</span>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-20 text-white/30 font-mono text-sm">
            /NO OPERATIONAL ENTRIES FOUND IN DATABASE
          </div>
        ) : (
          <div className="relative">
            {/* Central Progress Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-white/5">
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-teal via-iris to-ember shadow-[0_0_15px_rgba(0,212,170,0.5)]"
              />
            </div>

            <div className="space-y-24">
              {experiences.map((exp, i) => {
                const styles = getExperienceStyles(exp.type);
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:w-[42%] ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <div className="p-8 rounded-3xl glass-card border-white/5 hover:border-white/10 relative group">
                        <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">{exp.duration}</span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-mono border ${getStatusBadge(exp.status)}`}>
                            {exp.status}
                          </span>
                        </div>
                        
                        <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-teal transition-colors">
                           {exp.title}
                        </h3>
                        <div className={`text-sm font-bold ${styles.accent} mb-4`}>{exp.organization}</div>
                        <p className="text-white/40 text-sm leading-relaxed font-light">
                           {exp.description}
                        </p>

                        {exp.certificate_file && (
                          <div className={`mt-4 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                            <a 
                              href={`http://localhost:5000${exp.certificate_file}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-teal hover:text-white transition-colors border border-teal/20 px-3 py-1 rounded-full bg-teal/5"
                            >
                              <FileText size={12} />
                              View Certificate
                            </a>
                          </div>
                        )}
                        
                        {/* Floating Glow */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                    </div>

                    {/* Center Node */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl glass-luxury border-white/10 flex items-center justify-center ${styles.accent} z-20 shadow-2xl antigravity-float`}>
                        {styles.icon}
                      </div>
                    </div>

                    {/* Spacer for layout */}
                    <div className="hidden md:block w-[42%]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { getProjects } from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await getProjects();
        // Enrich data with UI specific aesthetic properties dynamically
        const enrichedProjects = response.data.map((proj, index) => ({
          id: proj.id,
          title: proj.title,
          description: proj.description,
          tech: proj.tech_stack ? proj.tech_stack.split(',').map(t => t.trim()) : [],
          github: proj.github_link || 'https://github.com/Prasanna1008137',
          live: proj.live_link || '#',
          status: index === 0 ? 'Operational' : index === 1 ? 'V2.0 Active' : 'Stable Release',
          preview: proj.title.split(' ').slice(0, 2).join(' '),
          featured: index === 0, // Make the first project take double width
          accent: index % 3 === 0 ? 'from-teal/20' : index % 3 === 1 ? 'from-iris/20' : 'from-ember/20'
        }));
        setProjects(enrichedProjects);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsData();
  }, []);

  return (
    <section id="projects" className="py-28 md:py-36 relative">
      <div className="absolute inset-0 line-grid opacity-5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="section-label mb-4 flex items-center gap-3 text-teal">
            <span className="w-8 h-px bg-teal" />
            <span>Artifact Depository</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Selected <span className="gradient-text-teal">Intelligence.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className={`glass-card h-80 animate-pulse bg-white/[0.02] border-white/5 ${i === 0 ? 'lg:col-span-2' : ''}`} />
            ))
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card group relative overflow-hidden flex flex-col p-8 md:p-10 ${project.featured ? 'lg:col-span-2' : ''} bg-gradient-to-br ${project.accent} to-transparent border-white/5`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-10">
                  {/* Preview Image Mockup */}
                  <div className="lg:w-1/2 aspect-video bg-void/80 rounded-[2rem] border border-white/5 relative overflow-hidden group-hover:border-teal/30 transition-all duration-500 antigravity-float">
                     <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-white/[0.03] group-hover:text-teal/10 text-3xl uppercase tracking-tighter text-center px-4 transition-colors">
                        {project.preview}
                     </div>
                     <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-void/80 border border-white/10 text-[10px] font-mono text-white/60 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                        {project.status}
                     </div>
                     
                     <motion.div 
                       animate={{ top: ['-100%', '200%'] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                       className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-teal/5 to-transparent pointer-events-none"
                     />
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                         <Zap size={14} className="text-teal" />
                         <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">DEPLOYMENT_READY</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-4xl font-bold mb-4 text-white group-hover:text-teal transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/40 font-light leading-relaxed mb-6 text-sm">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map(t => (
                          <span key={t} className="px-3 py-1.5 text-[9px] font-mono rounded-lg bg-white/5 border border-white/5 text-white/50 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all font-display font-bold text-xs uppercase"
                      >
                        <Github size={16} />
                        Source
                      </a>
                      {project.live && project.live !== '#' && (
                        <a 
                          href={project.live} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal/10 text-teal border border-teal/20 hover:bg-teal/20 transition-all font-display font-bold text-xs uppercase"
                        >
                          Live <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

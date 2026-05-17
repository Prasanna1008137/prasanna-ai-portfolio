import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

export default function ResumePreview() {
  return (
    <section id="resume" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label mb-6 text-ember">Credentials</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
              Curriculum <span className="gradient-text-warm">Vitae</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
              Detailed technical dossier outlining academic excellence, project leadership, and engineering certifications. 
              Available for high-impact opportunities in AI and system architecture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <a 
                 href="/resume.png" 
                 download="Mondi_Lakshmi_Prasanna_Resume.png"
                 className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-ember to-[#ffb347] text-void font-display font-bold hover:shadow-[0_0_30px_rgba(255,107,53,0.3)] transition-all"
               >
                  <Download size={20} />
                  DOWNLOAD DOSSIER
               </a>
               <a 
                 href="/resume.png" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all font-display font-bold"
               >
                  <ExternalLink size={20} />
                  VIEW FULL SCREEN
               </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Holographic Frame */}
            <div className="absolute inset-[-20px] bg-gradient-to-br from-ember/20 via-transparent to-iris/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
            
            <div className="relative glass-luxury rounded-[2.5rem] p-4 border-white/10 overflow-hidden antigravity-float">
               <div className="aspect-[3/4] bg-void/80 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                  {/* Actual Resume Content */}
                  <img 
                    src="/resume.png" 
                    alt="Resume Preview" 
                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  
                  {/* Fallback Faux Content (Visible only if image fails to load) */}
                  <div className="hidden p-8 space-y-6">
                     <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-lg bg-ember/20" />
                        <div className="space-y-2">
                           <div className="w-24 h-2 bg-white/10 rounded-full" />
                           <div className="w-16 h-2 bg-white/10 rounded-full ml-auto" />
                        </div>
                     </div>
                     <div className="w-full h-px bg-white/5" />
                     <div className="space-y-3">
                        <div className="w-3/4 h-3 bg-white/5 rounded-full" />
                        <div className="w-full h-3 bg-white/5 rounded-full" />
                        <div className="w-5/6 h-3 bg-white/5 rounded-full" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 rounded-xl bg-white/5" />
                        <div className="h-20 rounded-xl bg-white/5" />
                     </div>
                  </div>

                  {/* Animated Scanner Effect */}
                  <motion.div 
                    animate={{ top: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 w-full h-1/4 bg-gradient-to-b from-transparent via-ember/20 to-transparent pointer-events-none"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-void/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="p-6 rounded-full bg-ember text-void animate-bounce">
                        <FileText size={32} />
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

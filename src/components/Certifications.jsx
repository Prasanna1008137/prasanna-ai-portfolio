import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCertifications } from '../api';

const getCertIcon = (issuer, name) => {
  const text = (issuer + ' ' + name).toLowerCase();
  if (text.includes('github') || text.includes('copilot')) return '🤖';
  if (text.includes('ibm') || text.includes('ai') || text.includes('machine learning')) return '🧠';
  if (text.includes('cloud') || text.includes('nptel')) return '☁️';
  if (text.includes('google') || text.includes('data')) return '📊';
  return '📜'; // Fallback
};

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertsData = async () => {
      try {
        const response = await getCertifications();
        const mappedCerts = response.data.map((cert, index) => {
          const formattedDate = cert.created_at 
            ? new Date(cert.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : '2024';
          
          return {
            id: cert.id,
            title: cert.certificate_name,
            issuer: cert.issuer,
            date: formattedDate,
            icon: getCertIcon(cert.issuer, cert.certificate_name),
            color: index % 3 === 0 ? 'border-teal/20' : index % 3 === 1 ? 'border-iris/20' : 'border-ember/20',
            glow: index % 3 === 0 ? 'group-hover:shadow-teal/10' : index % 3 === 1 ? 'group-hover:shadow-iris/10' : 'group-hover:shadow-ember/10',
            verifyUrl: 'https://github.com/Prasanna1008137'
          };
        });
        setCerts(mappedCerts);
      } catch (err) {
        console.error("Error loading certifications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCertsData();
  }, []);

  return (
    <section id="certifications" className="py-28 md:py-36 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Credentials</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Certified <span className="gradient-text-teal">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-card h-60 animate-pulse bg-white/[0.02] border-white/5" />
            ))
          ) : (
            certs.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelected(cert)}
                className={`group glass-card p-8 flex flex-col items-center text-center cursor-pointer border ${cert.color} ${cert.glow} transition-all duration-500`}
              >
                <div className="text-4xl mb-6 transform group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500">
                  {cert.icon}
                </div>
                <h3 className="font-display font-bold text-white/90 group-hover:text-white transition-colors mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                  {cert.issuer}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/5 w-full">
                  <span className="text-[10px] font-mono text-teal/60">{cert.date}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-void/90 backdrop-blur-xl"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel max-w-2xl w-full p-10 rounded-[3rem] border-white/10 relative"
              onClick={e => e.stopPropagation()}
            >
               <button 
                 className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors"
                 onClick={() => setSelected(null)}
               >
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>

               <div className="text-6xl mb-8">{selected.icon}</div>
               <div className="text-xs font-mono text-teal tracking-[0.3em] uppercase mb-4">Verification Active</div>
               <h3 className="font-display text-4xl font-bold text-white mb-6 leading-tight">{selected.title}</h3>
               
               <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                     <span className="text-white/30 font-mono text-xs uppercase">Issuer</span>
                     <span className="text-white font-medium">{selected.issuer}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-white/5">
                     <span className="text-white/30 font-mono text-xs uppercase">Date Issued</span>
                     <span className="text-white font-medium">{selected.date}</span>
                  </div>
               </div>

               {selected.verifyUrl && (
                 <a 
                   href={selected.verifyUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block w-full py-5 rounded-2xl bg-teal text-void font-display font-bold text-center hover:shadow-[0_0_40px_rgba(0,212,170,0.4)] transition-all"
                 >
                   Verify Credential
                 </a>
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

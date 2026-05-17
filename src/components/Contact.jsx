import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendMessage } from '../api';

const socials = [
  { 
    label: 'GitHub', 
    href: 'https://github.com/Prasanna1008137', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    )
  },
  { 
    label: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/prasanna-mondi-5018b034a', 
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
    )
  },
  { 
    label: 'Email', 
    href: 'mailto:mondiprasanna8@gmail.com', 
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
    )
  },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage({ name, email, message });
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error("Transmission error:", err);
      alert("Failed to deliver transmission. Please verify server connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="section-label mb-4 justify-center flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Contact</span>
            <span className="w-8 h-px bg-teal" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Initiate <span className="gradient-text-teal">Collaboration</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto font-light">
            Ready to build the next generation of intelligent systems? Reach out and let's discuss your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
           {/* Social Sidebar */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="md:col-span-2 space-y-4"
           >
             {socials.map((s) => (
               <a
                 key={s.label}
                 href={s.href}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 p-5 rounded-2xl glass-card border-white/5 hover:border-teal/30 group transition-all duration-500"
               >
                 <div className="w-12 h-12 rounded-xl bg-void/50 flex items-center justify-center text-white/40 group-hover:text-teal group-hover:scale-110 transition-all">
                    {s.icon}
                 </div>
                 <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-white/30 group-hover:text-teal/60 transition-colors">{s.label}</div>
                    <div className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                       {s.label === 'Email' ? 'mondiprasanna8@gmail.com' : s.label === 'GitHub' ? 'Prasanna1008137' : 'Prasanna Mondi'}
                    </div>
                 </div>
               </a>
             ))}
           </motion.div>

           {/* Form */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="md:col-span-3"
           >
             <form
               onSubmit={handleSubmit}
               className="glass-panel p-8 rounded-3xl border-white/5 space-y-4"
             >
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <input
                   type="text"
                   placeholder="Name"
                   required
                   value={name}
                   onChange={e => setName(e.target.value)}
                   className="w-full px-5 py-4 rounded-xl bg-void/40 border border-white/5 focus:border-teal/30 focus:outline-none focus:ring-1 focus:ring-teal/10 text-white placeholder-white/20 text-sm transition-all"
                 />
                 <input
                   type="email"
                   placeholder="Email"
                   required
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="w-full px-5 py-4 rounded-xl bg-void/40 border border-white/5 focus:border-teal/30 focus:outline-none focus:ring-1 focus:ring-teal/10 text-white placeholder-white/20 text-sm transition-all"
                 />
               </div>
               <textarea
                 rows="5"
                 placeholder="How can I help you?"
                 required
                 value={message}
                 onChange={e => setMessage(e.target.value)}
                 className="w-full px-5 py-4 rounded-xl bg-void/40 border border-white/5 focus:border-teal/30 focus:outline-none focus:ring-1 focus:ring-teal/10 text-white placeholder-white/20 text-sm resize-none transition-all"
               />
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full py-4 rounded-xl bg-teal text-void font-display font-semibold text-sm hover:shadow-[0_0_40px_rgba(0,212,170,0.3)] transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-50"
               >
                 {sent ? (
                   <>
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                     Transmission Received
                   </>
                 ) : loading ? (
                   <>
                     <svg className="animate-spin h-5 w-5 text-void" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                     Transmitting...
                   </>
                 ) : (
                   <>
                     Send Transmission
                     <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                   </>
                 )}
               </button>
             </form>
           </motion.div>
        </div>
      </div>
    </section>
  );
}

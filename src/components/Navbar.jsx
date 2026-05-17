import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between p-2 rounded-2xl transition-all duration-500 ${
            scrolled ? 'glass-luxury px-6 shadow-2xl border-white/10' : ''
          }`}>
            <a href="#" className="font-display font-black text-2xl tracking-tighter group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/40 flex items-center justify-center text-teal group-hover:scale-110 transition-transform">P</div>
              <span className="text-white group-hover:text-teal transition-colors">PRASANNA</span>
            </a>

            {/* Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-5 py-2 text-[10px] font-mono font-bold text-white/40 hover:text-teal transition-all tracking-[0.2em]"
                >
                  {link.label}
                </a>
              ))}
              <div className="w-px h-4 bg-white/10 mx-2" />
              <a
                href="#contact"
                className="px-6 py-2.5 text-[10px] font-mono font-bold rounded-xl bg-white text-void hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all tracking-[0.2em]"
              >
                INITIALIZE_SYNC
              </a>
            </nav>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 glass-luxury rounded-xl"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-white origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block w-4 h-[1px] bg-white ml-auto"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-[1px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-void/98 backdrop-blur-3xl flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-20">
               <div className="font-display font-black text-2xl tracking-tighter text-white">P.</div>
               <button onClick={() => setOpen(false)} className="w-12 h-12 rounded-2xl glass-luxury flex items-center justify-center text-white/40">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <div className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-display font-bold text-white/30 hover:text-teal transition-colors tracking-tighter"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.a
              href="#contact"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto w-full py-6 rounded-3xl bg-teal text-void font-display font-black text-center text-lg tracking-widest shadow-[0_0_40px_rgba(0,212,170,0.3)]"
            >
              INITIALIZE CONTACT
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


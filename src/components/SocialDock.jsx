import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaInstagram } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />, href: 'https://github.com/Prasanna1008137', label: 'GitHub' },
  { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/in/prasanna-mondi-5018b034a', label: 'LinkedIn' },
  { icon: <FaEnvelope />, href: 'mailto:mondiprasanna8@gmail.com', label: 'Email' },
];

export default function SocialDock() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4"
    >
      <div className="flex items-center gap-2 p-2 rounded-2xl glass-luxury border-white/10 shadow-2xl backdrop-blur-2xl">
        {socials.map((social, i) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all relative group"
          >
            <span className="text-xl">{social.icon}</span>
            
            {/* Tooltip */}
            <span className="absolute bottom-full mb-4 px-3 py-1 rounded-lg bg-void border border-white/10 text-[10px] font-mono text-teal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {social.label}
            </span>
          </motion.a>
        ))}
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <button className="px-4 text-[10px] font-mono text-white/40 hover:text-teal transition-colors tracking-widest uppercase">
          Status: Online
        </button>
      </div>
    </motion.div>
  );
}

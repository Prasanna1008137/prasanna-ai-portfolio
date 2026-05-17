import React from 'react';
import { motion } from 'framer-motion';

const tech = [
  { name: 'TensorFlow', icon: '🔥', color: 'text-[#FF6F00]' },
  { name: 'PyTorch', icon: '⚡', color: 'text-[#EE4C2C]' },
  { name: 'OpenCV', icon: '👁️', color: 'text-[#5C3EE8]' },
  { name: 'FastAPI', icon: '🚀', color: 'text-[#05998B]' },
  { name: 'HuggingFace', icon: '🤗', color: 'text-[#FFD21E]' },
  { name: 'Scikit-Learn', icon: '🤖', color: 'text-[#F7931E]' },
  { name: 'Pandas', icon: '🐼', color: 'text-[#150458]' },
  { name: 'NumPy', icon: '🔢', color: 'text-[#013243]' },
];

export default function AIStack() {
  return (
    <section className="py-24 relative overflow-hidden bg-abyss/40 border-y border-white/[0.03]">
      <div className="absolute inset-0 line-grid opacity-10" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="section-label mb-4 text-iris">Neural Architecture</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            The <span className="gradient-text-teal">AI Stack</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {tech.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: i * 0.1 
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl glass-luxury flex items-center justify-center text-4xl shadow-2xl group-hover:border-teal/30 group-hover:shadow-teal/10 transition-all duration-500">
                <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      {Array(5).fill(0).map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 5 + i * 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-2 h-2 rounded-full bg-teal blur-sm pointer-events-none"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
        />
      ))}
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function AdminShowcase() {
  return (
    <section className="py-28 relative overflow-hidden bg-void/50">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3 text-ember">
            <span className="w-8 h-px bg-ember" />
            <span>Internal Systems</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Admin <span className="gradient-text-warm">Intelligence</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl font-light">
            Enterprise-grade management interfaces with real-time analytics, RBAC, and seamless data orchestration.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative glass-panel rounded-3xl border-white/10 overflow-hidden shadow-2xl shadow-black/50"
        >
          {/* Dashboard UI Mockup */}
          <div className="flex h-[500px] md:h-[600px]">
            {/* Sidebar */}
            <div className="w-16 md:w-64 border-r border-white/5 bg-abyss/40 flex flex-col p-4 gap-4">
              <div className="w-8 h-8 rounded-lg bg-teal/20 border border-teal/40 mb-6" />
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 group-hover:border-teal/30 transition-all" />
                  <div className="hidden md:block h-3 w-24 bg-white/5 rounded group-hover:bg-white/10 transition-all" />
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                <div className="h-6 w-32 md:w-48 bg-white/10 rounded-full" />
                <div className="flex gap-4">
                  <div className="h-10 w-10 md:w-32 bg-teal/10 border border-teal/20 rounded-xl" />
                  <div className="h-10 w-10 bg-white/5 border border-white/5 rounded-xl" />
                </div>
              </div>

              {/* Grid of cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map(i => (
                  <div key={i} className="glass-card p-6 border-white/5 h-32 flex flex-col justify-between">
                    <div className="h-3 w-20 bg-white/10 rounded" />
                    <div className="h-6 w-24 bg-white/20 rounded" />
                  </div>
                ))}
              </div>

              {/* Chart Mockup */}
              <div className="glass-card p-8 border-white/5 h-64 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-32 flex items-end gap-1 px-4 opacity-30">
                   {[...Array(20)].map((_, i) => (
                     <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       whileInView={{ height: `${Math.random() * 100}%` }}
                       className="flex-1 bg-teal"
                     />
                   ))}
                </div>
                <div className="relative z-10 h-4 w-40 bg-white/10 rounded mb-4" />
                <div className="relative z-10 h-8 w-56 bg-white/20 rounded" />
              </div>
            </div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 right-20 glass-panel p-6 border-teal/20 rounded-2xl hidden lg:block shadow-xl"
          >
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal/20 border border-teal/40" />
                <div>
                   <div className="h-3 w-24 bg-white/20 rounded mb-2" />
                   <div className="h-2 w-16 bg-white/10 rounded" />
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

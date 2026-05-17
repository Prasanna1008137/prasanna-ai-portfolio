import React from 'react';
import { motion } from 'framer-motion';

const techGroups = [
  {
    name: "Languages",
    tools: ["Python", "Java", "JavaScript", "C++", "SQL"],
    color: "from-teal/20 to-teal/10",
    text: "text-teal"
  },
  {
    name: "Frameworks",
    tools: ["React", "Node.js", "Express", "Flask", "TensorFlow"],
    color: "from-iris/20 to-iris/10",
    text: "text-iris"
  },
  {
    name: "Tools & DB",
    tools: ["MySQL", "PostgreSQL", "Git", "GitHub", "Linux"],
    color: "from-ember/20 to-ember/10",
    text: "text-ember"
  }
];

export default function TechStack() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Tech Stack</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            The <span className="gradient-text-teal">Infrastructure</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techGroups.map((group, idx) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`p-8 glass-card border-white/5 relative group overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <h3 className={`font-display text-xl font-bold mb-6 relative z-10 ${group.text}`}>
                {group.name}
              </h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {group.tools.map((tool) => (
                  <span 
                    key={tool}
                    className="px-4 py-2 text-sm font-mono bg-void/40 border border-white/5 rounded-lg text-white/60 group-hover:text-white/90 group-hover:border-white/10 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

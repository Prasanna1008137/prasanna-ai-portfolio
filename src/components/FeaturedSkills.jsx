import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'Deep Learning', level: '95%', icon: '🧠', color: 'from-teal/20 to-teal/5' },
  { name: 'Full Stack Architecture', level: '90%', icon: '🏗️', color: 'from-iris/20 to-iris/5' },
  { name: 'Data Orchestration', level: '85%', icon: '📊', color: 'from-ember/20 to-ember/5' },
  { name: 'Neural Networks', level: '92%', icon: '🕸️', color: 'from-teal/20 to-teal/5' },
  { name: 'Cloud Infrastructure', level: '88%', icon: '☁️', color: 'from-iris/20 to-iris/5' },
  { name: 'Predictive Analytics', level: '80%', icon: '📈', color: 'from-ember/20 to-ember/5' },
];

export default function FeaturedSkills() {
  return (
    <section id="skills-featured" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="section-label mb-4 justify-center flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Specialized Intelligence</span>
            <span className="w-8 h-px bg-teal" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold">
            Core <span className="gradient-text-teal">Competencies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2rem] glass-card bg-gradient-to-br ${skill.color} border-white/5 relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-6 text-4xl opacity-10 group-hover:opacity-30 transition-opacity">
                {skill.icon}
              </div>
              
              <div className="relative z-10">
                <div className="text-3xl mb-4">{skill.icon}</div>
                <h3 className="font-display text-xl font-bold mb-6 text-white">{skill.name}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono text-white/40">
                    <span>PROFICIENCY</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: skill.level }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                      className="h-full bg-gradient-to-r from-teal to-iris"
                    />
                  </div>
                </div>
              </div>
              
              {/* Interactive Decoration */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal/5 rounded-full blur-2xl group-hover:bg-teal/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

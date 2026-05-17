import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkills } from '../api';

const categories = ['All', 'Languages', 'Frontend', 'AI/ML', 'Backend', 'Tools'];

const getCategoryBySkillName = (name) => {
  const lowercase = name.toLowerCase();
  if (['python', 'java', 'javascript', 'c++', 'go', 'c#', 'c', 'sql'].includes(lowercase)) return 'Languages';
  if (['react.js', 'react', 'html & css', 'html', 'css', 'tailwind css', 'tailwind', 'bootstrap', 'javascript (react)'].includes(lowercase)) return 'Frontend';
  if (['machine learning', 'nlp', 'tensorflow', 'pytorch', 'deep learning', 'computer vision', 'ai/ml', 'artificial intelligence', 'ai'].includes(lowercase)) return 'AI/ML';
  if (['node.js', 'node', 'mysql', 'postgresql', 'express.js', 'express', 'mongodb', 'backend', 'database', 'sqlite', 'django', 'flask'].includes(lowercase)) return 'Backend';
  return 'Tools'; // Fallback to Tools (e.g. Git, Linux, Docker, etc.)
};

const levelColor = (level) => {
  if (level >= 85) return 'from-teal to-teal/60';
  if (level >= 75) return 'from-iris to-iris/60';
  return 'from-ember to-ember/60';
};

export default function Skills() {
  const [active, setActive] = useState('All');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const response = await getSkills();
        // Map database skill_name and percentage to expected format
        const mappedSkills = response.data.map(skill => ({
          id: skill.id,
          name: skill.skill_name,
          level: parseInt(skill.percentage || '80'),
          category: getCategoryBySkillName(skill.skill_name)
        }));
        setSkills(mappedSkills);
      } catch (err) {
        console.error("Error loading technical skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkillsData();
  }, []);

  const filtered = active === 'All' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="py-28 md:py-36 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-iris/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Skills</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Technical <span className="gradient-text-teal">Arsenal</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 border ${
                active === cat
                  ? 'bg-teal/10 border-teal/30 text-teal'
                  : 'bg-transparent border-white/[0.06] text-white/30 hover:text-white/60 hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="glass-card p-5 h-24 animate-pulse bg-white/[0.02] border-white/5" />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.map((skill) => (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card p-5 group border-white/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-semibold text-sm text-white/80 group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-xs text-white/25">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${levelColor(skill.level)}`}
                    />
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-white/20">
                    {skill.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}

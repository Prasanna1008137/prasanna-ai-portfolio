import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    period: '2022 — Present',
    title: 'B.Tech CSE (AI & ML)',
    org: 'KL University, Vijayawada',
    description: 'Pursuing Computer Science with specialization in Artificial Intelligence and Machine Learning. Maintaining 8.8 CGPA while actively contributing to technical communities.',
    accent: 'bg-teal',
  },
  {
    period: '2024',
    title: 'Open Source Contributor',
    org: 'GitHub & Community Projects',
    description: 'Contributing to open-source ML libraries and web development tools. Active participation in hackathons and coding challenges.',
    accent: 'bg-iris',
  },
  {
    period: '2023 — 2024',
    title: 'KL-CIIE Member',
    org: 'Innovation & Entrepreneurship Cell',
    description: 'Engaged in innovation activities, organizing technical workshops and mentoring fellow students in AI/ML concepts.',
    accent: 'bg-ember',
  },
  {
    period: '2023',
    title: 'AI/ML Research Projects',
    org: 'Academic & Personal',
    description: 'Developed multiple AI-powered applications including facial recognition systems, NLP tools, and intelligent web platforms.',
    accent: 'bg-teal',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 md:py-36 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Experience</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            My <span className="gradient-text-teal">Journey</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-teal/20 via-white/[0.06] to-transparent" />

          <div className="space-y-2">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex gap-6 group"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0 mt-7">
                  <div className={`w-[10px] h-[10px] md:w-3 md:h-3 rounded-full ${step.accent} ring-4 ring-void z-10 relative group-hover:scale-125 transition-transform duration-300`} />
                </div>

                {/* Card */}
                <div className="glass-card p-6 md:p-8 flex-1 mb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="font-display font-semibold text-lg text-white/90 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-xs font-mono text-white/25 tracking-wider">{step.period}</span>
                  </div>
                  <p className="text-sm font-medium text-teal/60 mb-3">{step.org}</p>
                  <p className="text-sm text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

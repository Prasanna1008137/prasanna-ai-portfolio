import React from 'react';
import { motion } from 'framer-motion';

export default function Resume() {
  return (
    <section id="resume" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-teal/10"
        >
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
              Want the full picture?
            </h3>
            <p className="text-white/40 text-sm">
              Download my resume for a detailed overview of skills, projects, and experience.
            </p>
          </div>
          <a
            href="/resume.png"
            download="Mondi_Lakshmi_Prasanna_Resume.png"
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-lg bg-teal/10 text-teal border border-teal/20 hover:bg-teal/20 hover:border-teal/40 font-display font-semibold text-sm transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPersonalInfo, getSkills } from '../api';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [infoRes, skillsRes] = await Promise.all([
          getPersonalInfo(),
          getSkills()
        ]);
        setPersonalInfo(infoRes.data);
        setSkills(skillsRes.data);
      } catch (err) {
        console.error("Error loading About telemetry:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const cgpaValue = parseFloat(personalInfo?.cgpa || '8.8');
  const cgpaPercentage = Math.min((cgpaValue / 10) * 100, 100);

  const cards = [
    {
      span: 'md:col-span-2',
      content: (
        <div className="space-y-4">
          <p className="text-white/70 leading-relaxed text-sm md:text-base">
            I'm <span className="text-teal font-semibold">{personalInfo?.full_name || 'Mondi Lakshmi Prasanna'}</span>, an enthusiastic developer with strong analytical and logical skills. Pursuing 
            <span className="text-teal font-medium"> {personalInfo?.degree_name || 'B.Tech in Computer Science and Engineering'}</span> with a specialization in 
            <span className="text-iris font-medium"> {personalInfo?.specialization || 'Artificial Intelligence & Machine Learning'}</span> at <span className="text-teal font-medium">{personalInfo?.university || 'KL University'}</span>.
          </p>
          <p className="text-white/50 leading-relaxed text-xs md:text-sm">
            {personalInfo?.summary || "Merging the logic of AI with the aesthetics of cinematic design to build the next generation of digital ecosystems. Approaching every challenge with creativity and a commitment to excellence."}
          </p>
        </div>
      ),
    },
    {
      span: '',
      content: (
        <div className="text-center py-2 flex flex-col justify-between h-full">
          <div>
            <div className="font-display font-bold text-4xl gradient-text-teal mb-2">
              {cgpaValue.toFixed(2)}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/30">CGPA Score</div>
          </div>
          <div className="mt-3 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${cgpaPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-teal to-iris rounded-full"
            />
          </div>
        </div>
      ),
    },
    {
      span: '',
      content: (
        <div className="flex flex-col items-center justify-center py-2 text-center h-full">
          <div className="w-12 h-12 rounded-xl bg-ember/10 flex items-center justify-center mb-3 text-ember shadow-[0_0_15px_rgba(255,107,53,0.15)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
          </div>
          <div className="font-display font-semibold text-sm text-white/80 line-clamp-1">{personalInfo?.university || 'KL University'}</div>
          <div className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">Vijayawada, AP</div>
        </div>
      ),
    },
    {
      span: '',
      content: (
        <div className="flex flex-col items-center justify-center py-2 text-center h-full">
          <div className="w-12 h-12 rounded-xl bg-iris/10 flex items-center justify-center mb-3 text-iris shadow-[0_0_15px_rgba(124,92,252,0.15)]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
          </div>
          <div className="font-display font-semibold text-sm text-white/80 line-clamp-1">{personalInfo?.specialization || 'AI & ML'}</div>
          <div className="text-[10px] text-white/30 mt-1 uppercase tracking-widest">Specialization</div>
        </div>
      ),
    },
    {
      span: 'md:col-span-2',
      content: (
        <div className="flex flex-wrap gap-2 py-1 items-center justify-center md:justify-start h-full">
          {skills.length > 0 ? (
            skills.slice(0, 10).map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 uppercase hover:border-teal/30 hover:text-white transition-all duration-300"
              >
                {skill.skill_name}
              </span>
            ))
          ) : (
            ['Python', 'React', 'Node.js', 'Machine Learning', 'MySQL', 'Java', 'Git', 'NLP'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-[10px] font-mono rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 uppercase"
              >
                {tag}
              </span>
            ))
          )}
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-28 md:py-36 relative">
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
            <span>About</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Who I <span className="gradient-text-teal">Am</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="glass-card p-6 h-40 animate-pulse bg-white/[0.02] border-white/5" />
            ))
          ) : (
            cards.map((card, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className={`glass-card p-6 ${card.span} flex flex-col justify-center min-h-[150px] border-white/5`}
              >
                {card.content}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

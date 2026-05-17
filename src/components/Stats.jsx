import React from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const stats = [
  { value: 10, label: 'Intelligent Artifacts', suffix: '+', color: 'from-teal/40 to-teal/10' },
  { value: 8.8, label: 'Academic Index', suffix: '', color: 'from-iris/40 to-iris/10' },
  { value: 5, label: 'Validated Credentials', suffix: '+', color: 'from-ember/40 to-ember/10' },
  { value: 100, label: 'System Uptime', suffix: '%', color: 'from-teal/40 to-teal/10' },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (inView) {
      count.set(value);
    }
  }, [inView, value, count]);

  useEffect(() => {
    rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: value % 1 !== 0 ? 1 : 0,
          maximumFractionDigits: 1,
        }).format(latest) + suffix;
      }
    });
  }, [rounded, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-3xl glass-card bg-gradient-to-br ${stat.color} border-white/5 text-center relative group overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div className="font-display font-black text-4xl md:text-5xl text-white mb-3">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 group-hover:text-teal transition-colors">
                {stat.label}
              </div>
              
              {/* Animated Glow */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-teal/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

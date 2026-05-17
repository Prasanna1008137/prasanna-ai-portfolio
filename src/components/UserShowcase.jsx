import React from 'react';
import { motion } from 'framer-motion';

export default function UserShowcase() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-right flex flex-col items-end"
        >
          <div className="section-label mb-4 flex items-center gap-3 text-iris">
            <span>Customer Experience</span>
            <span className="w-8 h-px bg-iris" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            User <span className="gradient-text-teal">Ecosystem</span>
          </h2>
          <p className="mt-4 text-white/40 max-w-xl font-light">
            Intuitive storefronts, real-time tracking, and personalized dashboards designed for maximum engagement and retention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-panel p-4 rounded-[2rem] border-white/5 relative z-10 aspect-video overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-iris/20 via-transparent to-teal/10 opacity-50" />
              
              {/* Product Grid Mockup */}
              <div className="grid grid-cols-2 gap-4 h-full relative z-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/5 rounded-2xl p-4 flex flex-col justify-end group-hover:bg-white/10 transition-all">
                    <div className="w-full h-24 bg-white/5 rounded-xl mb-3" />
                    <div className="h-3 w-3/4 bg-white/20 rounded mb-2" />
                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                  </div>
                ))}
              </div>

              {/* Floating Cart Widget */}
              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-8 right-8 glass-panel py-3 px-6 rounded-full border-iris/30 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span className="text-xs font-mono text-white/80">3 Items In Cart</span>
                </div>
              </motion.div>
            </div>

            {/* Background elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-iris/20 rounded-full blur-[100px] pointer-events-none" />
          </motion.div>

          {/* Feature List */}
          <div className="space-y-8">
            {[
              { title: "Dynamic Storefront", desc: "Real-time product inventory and personalized recommendations." },
              { title: "Secure Checkout", desc: "Integrated payment gateways with encrypted transaction handling." },
              { title: "Live Tracking", desc: "Interactive order status timelines with push notifications." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center shrink-0 border-white/5 group-hover:border-iris/40 transition-all">
                   <div className="w-2 h-2 rounded-full bg-iris group-hover:scale-150 transition-transform" />
                </div>
                <div>
                   <h3 className="text-xl font-display font-bold mb-2 text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                   <p className="text-white/40 font-light leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBlogs } from '../api';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await getBlogs();
        // Only show published blogs
        setBlogs(response.data.filter(b => b.status === 'PUBLISHED'));
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogsData();
  }, []);

  return (
    <section id="blogs" className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-teal/[0.02] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-iris/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-8 h-px bg-teal" />
            <span>Publications</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Cognitive <span className="gradient-text-teal">Insights</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="glass-card h-[400px] animate-pulse bg-white/[0.02] border-white/5" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="glass-card p-10 text-center border-white/5">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="font-display text-xl font-bold text-white/80">Deploying Content Nodes</h3>
            <p className="text-white/40 text-sm mt-2 max-w-md mx-auto">
              New insights and architectural summaries are currently compiling. Check back shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, i) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card group flex flex-col overflow-hidden border-white/5 bg-void/30"
              >
                {/* Image Cover */}
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={blog.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[0.8] group-hover:saturate-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-void/80 border border-white/10 text-[9px] font-mono text-teal">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-teal transition-colors line-clamp-2 leading-snug mb-4">
                      {blog.title}
                    </h3>
                    <p className="text-white/50 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {blog.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-teal group-hover:translate-x-1 transition-transform font-mono text-xs font-semibold tracking-wider">
                    READ PUBLICATION <span>→</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

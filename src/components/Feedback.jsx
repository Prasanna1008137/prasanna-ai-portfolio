import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFeedback, addFeedback } from '../api';

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Review Form States
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await getFeedback();
        // Publicly display only approved feedback
        const approved = response.data.filter(f => f.is_approved === 1 || f.is_approved === true || f.is_approved === '1');
        setFeedbacks(approved);
      } catch (err) {
        console.error("Error loading feedback testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackData();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addFeedback({ user_name: userName, rating, comment });
      setSubmitted(true);
      setUserName('');
      setComment('');
      setRating(5);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Failed to post testimonial:", err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="feedback" className="py-28 md:py-36 relative overflow-hidden bg-void/20">
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-iris/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] bg-teal/[0.02] rounded-full blur-[120px] pointer-events-none" />

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
            <span>Testimonials</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            User <span className="gradient-text-teal">Feedback</span>
          </h2>
        </motion.div>

        {/* Dynamic Reviews grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-20">
          {/* Feedbacks Column */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="glass-card p-8 h-40 animate-pulse bg-white/[0.02] border-white/5" />
              ))
            ) : feedbacks.length === 0 ? (
              <div className="glass-card p-10 text-center border-white/5">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="font-display text-lg font-semibold text-white/80">Ecosystem Warmup</h3>
                <p className="text-white/40 text-sm mt-2">
                  No public reviews have been verified yet. Be the first to catalog your feedback in the panel to the right!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedbacks.map((f, i) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="glass-card p-8 border-white/5 flex flex-col justify-between hover:border-teal/20 transition-all duration-300 min-h-[200px]"
                  >
                    <p className="text-white/70 italic text-sm font-light leading-relaxed mb-6">
                      "{f.comment}"
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="font-display text-xs font-semibold text-white/90">
                        {f.user_name}
                      </div>
                      <div className="flex gap-0.5 text-amber text-xs font-mono">
                        {Array(parseInt(f.rating || '5')).fill('★').join('')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Leave a Review Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-3xl border-white/5 bg-void/50"
            >
              <h3 className="font-display text-lg font-bold text-white mb-2">Leave Testimony</h3>
              <p className="text-xs text-white/40 mb-6 font-light leading-relaxed">
                Log your collaborative reviews directly into our active MySQL portfolio system.
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Name / Role"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-void/40 border border-white/5 focus:border-teal/30 focus:outline-none focus:ring-1 focus:ring-teal/10 text-white placeholder-white/20 text-xs transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-mono uppercase text-white/40 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-xl transition-all ${star <= rating ? 'text-amber scale-110' : 'text-white/10 hover:text-white/30'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    rows="4"
                    required
                    placeholder="Comment on your experience..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-void/40 border border-white/5 focus:border-teal/30 focus:outline-none focus:ring-1 focus:ring-teal/10 text-white placeholder-white/20 text-xs resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-teal text-void font-display font-bold text-xs uppercase hover:shadow-[0_0_30px_rgba(0,212,170,0.3)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                      Queued For Moderation
                    </>
                  ) : submitting ? (
                    'Transmitting...'
                  ) : (
                    'Publish Testimony'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

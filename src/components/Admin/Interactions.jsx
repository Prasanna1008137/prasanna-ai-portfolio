import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Trash2, User, Star, Eye } from 'lucide-react';
import { getMessages, deleteMessage, getFeedback, approveFeedback, deleteFeedback } from '../../api';

export function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessagesData = async () => {
    setLoading(true);
    try {
      const response = await getMessages();
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to load contact inbox:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this message?")) {
      try {
        await deleteMessage(id);
        fetchMessagesData();
      } catch (err) {
        console.error("Failed to delete message:", err);
        alert("Error deleting message from database.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[9px] font-mono text-teal/40 uppercase tracking-[0.4em] mb-1">Incoming Feeds</div>
        <h2 className="text-2xl font-black">Inbound <span className="text-teal">Communications</span></h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="glass-card h-24 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="glass-panel p-8 text-center text-white/30 text-sm border-white/5">
          Inbox is clean. No messages received yet.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="glass-card p-5 border-white/5 flex items-start gap-4 transition-all">
              <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal shrink-0">
                <User size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="font-bold text-white tracking-tight">{m.name}</h4>
                  <span className="text-[10px] font-mono text-teal/60">{m.email}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light">{m.message}</p>
                <div className="text-[9px] font-mono text-white/20 mt-2">
                  {new Date(m.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex gap-2 self-center shrink-0">
                <button onClick={() => handleDelete(m.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function FeedbackManager() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbackData = async () => {
    setLoading(true);
    try {
      const response = await getFeedback();
      setFeedback(response.data);
    } catch (err) {
      console.error("Failed to load feedback list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveFeedback(id);
      fetchFeedbackData();
    } catch (err) {
      console.error("Failed to approve review:", err);
      alert("Error approving review.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimony from the database?")) {
      try {
        await deleteFeedback(id);
        fetchFeedbackData();
      } catch (err) {
        console.error("Failed to delete review:", err);
        alert("Error deleting review.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[9px] font-mono text-iris/40 uppercase tracking-[0.4em] mb-1">Testimonials Panel</div>
        <h2 className="text-2xl font-black">Voice of <span className="text-iris">Collaborators</span></h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(2).fill(0).map((_, i) => (
            <div key={i} className="glass-card h-40 animate-pulse bg-white/[0.02]" />
          ))}
        </div>
      ) : feedback.length === 0 ? (
        <div className="glass-panel p-8 text-center text-white/30 text-sm border-white/5">
          No feedback testimonials filed yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedback.map((f) => {
            const isApproved = f.is_approved === 1 || f.is_approved === true || f.is_approved === '1';
            
            return (
              <div 
                key={f.id} 
                className={`glass-card p-6 border flex flex-col justify-between group relative overflow-hidden ${
                  isApproved ? 'border-white/5' : 'border-teal/20 bg-teal/[0.01]'
                }`}
              >
                {!isApproved && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[8px] font-mono uppercase bg-teal text-void font-bold">
                    Pending
                  </div>
                )}
                
                <div>
                  <div className="flex gap-1 mb-4 text-amber">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={12} className={i < parseInt(f.rating || '5') ? 'fill-amber text-amber' : 'text-white/10'} />
                    ))}
                  </div>
                  <p className="text-white/70 text-xs mb-6 italic font-light leading-relaxed">"{f.comment}"</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[11px] font-bold text-white/60 truncate max-w-[150px]">{f.user_name}</span>
                  <div className="flex gap-2">
                    {!isApproved && (
                      <button 
                        onClick={() => handleApprove(f.id)}
                        className="text-[9px] uppercase font-mono tracking-widest text-teal hover:underline flex items-center gap-1"
                      >
                        <Check size={10} /> Approve
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(f.id)}
                      className="text-[9px] uppercase font-mono tracking-widest text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={10} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

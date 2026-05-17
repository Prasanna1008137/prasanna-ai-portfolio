import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Greetings. I am the portfolio intelligence unit. How can I assist you with information about Prasanna's expertise?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, the AI assistant is temporarily unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass-luxury rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-teal/20 to-iris/20 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal/20 flex items-center justify-center text-teal shadow-[0_0_15px_rgba(0,212,170,0.2)]">
                  <Bot size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tight font-display">PRASANNA-AI</div>
                  <div className="text-[10px] text-teal/60 font-mono flex items-center gap-1 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    System Online
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-void/60 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0 border border-teal/20">
                      <Bot size={16} />
                    </div>
                  )}
                  <div 
                    className={`p-4 text-xs leading-relaxed max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'bg-teal text-void rounded-2xl rounded-tr-none font-medium' 
                        : 'bg-white/5 border border-white/10 text-white/80 rounded-2xl rounded-tl-none font-light'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0 border border-teal/20">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#020408] border-t border-white/10">
              <form onSubmit={handleSubmit} className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Ask system..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:border-teal/50 outline-none transition-all pr-12 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-teal hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-teal text-void flex items-center justify-center shadow-[0_0_40px_rgba(0,212,170,0.4)] relative group"
      >
        <div className="absolute inset-[-4px] border border-teal/20 rounded-full animate-ping opacity-30" />
        {isOpen ? <X size={28} /> : <Bot size={28} />}
        
        {/* Interaction Prompt */}
        {!isOpen && (
          <div className="absolute right-full mr-4 px-3 py-1.5 rounded-lg glass-panel text-[10px] font-mono text-teal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-teal/20">
            COMMUNICATE WITH AI
          </div>
        )}
      </motion.button>
    </div>
  );
}

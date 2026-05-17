import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CursorGlow from '../components/CursorGlow';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary mock login
    if (email === 'admin@prasanna.ai' && password === 'admin123') {
      localStorage.setItem('token', 'mock-jwt-token');
      navigate('/admin');
    } else {
      alert('Invalid credentials. Use admin@prasanna.ai / admin123 for now.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden">
      <CursorGlow />
      <div className="absolute inset-0 bg-hero-glow opacity-50"></div>
      <div className="noise-bg"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-12 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin <span className="gradient-text">Access</span></h2>
          <p className="text-white/60 text-sm">Sign in to manage the AI Portfolio Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition-all text-white placeholder-white/30"
              placeholder="admin@prasanna.ai"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-pink focus:outline-none focus:ring-1 focus:ring-brand-pink transition-all text-white placeholder-white/30"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-lavender to-brand-pink text-brand-darker font-bold hover:shadow-[0_0_20px_rgba(255,158,205,0.4)] transition-all">
            Authenticate
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-brand-lavender hover:text-brand-pink transition-colors">
            &larr; Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}

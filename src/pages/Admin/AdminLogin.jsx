import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Access Denied: Authentication Failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Cinematic Elements */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-teal/[0.03] rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-iris/[0.04] rounded-full blur-[100px] animate-pulse" />
      
      {/* Animated Scan Lines */}
      <motion.div 
        animate={{ top: ['-100%', '200%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-teal/[0.02] to-transparent pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-luxury p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden">
           {/* Decorative Border Glow */}
           <div className="absolute inset-0 border border-teal/10 rounded-[2.5rem] pointer-events-none" />
           
           <div className="flex flex-col items-center mb-10">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.8 }}
                className="w-20 h-20 rounded-3xl bg-teal/10 border border-teal/40 flex items-center justify-center text-teal mb-6 shadow-[0_0_30px_rgba(0,212,170,0.2)]"
              >
                 <ShieldCheck size={40} />
              </motion.div>
              <h1 className="font-display text-3xl font-black text-white mb-2 tracking-tighter">SECURE <span className="text-teal">UPLINK</span></h1>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Administrative Access Required</p>
           </div>

           {error && (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono text-center flex items-center justify-center gap-2"
             >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {error}
             </motion.div>
           )}

           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
               <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-teal transition-colors">
                    <User size={18} />
                 </div>
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="System Identity"
                   required
                   className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder-white/10 focus:border-teal/50 outline-none transition-all"
                 />
               </div>
             </div>

             <div className="space-y-2">
               <div className="relative group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-teal transition-colors">
                    <Lock size={18} />
                 </div>
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Access Cipher"
                   required
                   className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-sm text-white placeholder-white/10 focus:border-teal/50 outline-none transition-all"
                 />
               </div>
             </div>

             <button 
               type="submit"
               disabled={loading}
               className="w-full py-5 rounded-2xl bg-white text-void font-display font-black text-xs uppercase tracking-widest hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
             >
               {loading ? (
                 <>
                   <Loader2 size={18} className="animate-spin" />
                   AUTHENTICATING...
                 </>
               ) : (
                 <>
                   INITIALIZE ACCESS
                   <ArrowRight size={18} />
                 </>
               )}
             </button>
           </form>

           <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                 <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Quantum Secured</span>
              </div>
              <button onClick={() => navigate('/')} className="text-[9px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest">
                 &larr; Return to Base
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

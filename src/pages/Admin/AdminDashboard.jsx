import React from 'react';
import { useNavigate, NavLink, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, FolderKanban, Award, MessageSquare, Settings, LogOut, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Connected Administrative Subsystems
import Analytics from '../../components/Admin/Analytics';
import ProjectManager from '../../components/Admin/ProjectManager';
import ExperiencesManager from '../../components/Admin/ExperiencesManager';
import { MessagesManager, FeedbackManager } from '../../components/Admin/Interactions';
import { BlogManager, ChatbotSettings } from '../../components/Admin/ControlPanels';
import ProfileAcademicManager from '../../components/Admin/ProfileAcademicManager';

const menuItems = [
  { label: 'Overview', path: 'dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Projects', path: 'projects', icon: <FolderKanban size={20} /> },
  { label: 'Vault & History', path: 'certificates', icon: <Award size={20} /> },
  { label: 'Messages', path: 'messages', icon: <MessageSquare size={20} /> },
  { label: 'Settings', path: 'settings', icon: <Settings size={20} /> },
];

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] flex flex-col md:flex-row text-white overflow-hidden font-body">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-void/40 border-r border-white/[0.03] p-8 flex flex-col relative z-20 backdrop-blur-3xl shrink-0">
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-teal/20 to-transparent" />
        
        <div className="flex items-center gap-4 mb-16 px-2">
           <div className="w-12 h-12 rounded-2xl bg-teal/10 border border-teal/40 flex items-center justify-center font-display font-black text-2xl text-teal shadow-[0_0_20px_rgba(0,212,170,0.2)]">P.</div>
           <div>
              <div className="text-lg font-display font-bold tracking-tight">Admin<span className="text-teal">OS</span></div>
              <div className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Quantum Edition</div>
           </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) => 
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative ${
                  isActive 
                    ? 'bg-teal/5 text-teal shadow-[inset_0_0_20px_rgba(0,212,170,0.05)]' 
                    : 'text-white/30 hover:text-white hover:bg-white/[0.02]'
                }`
              }
            >
              <span className="relative z-10 transition-transform group-hover:scale-110">{item.icon}</span>
              <span className="text-sm font-bold tracking-tight relative z-10">{item.label}</span>
              
              {({ isActive }) => isActive && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute inset-0 border border-teal/20 rounded-2xl z-0"
                />
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
           <div className="p-5 rounded-2xl glass-luxury border-white/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal/20 to-iris/20 border border-white/10 flex items-center justify-center text-white/60">
                 <Cpu size={20} />
              </div>
              <div className="overflow-hidden">
                 <div className="text-xs font-bold truncate text-white/80">{user?.email?.split('@')[0]}</div>
                 <div className="text-[10px] font-mono text-teal/50 uppercase tracking-tighter">System Root</div>
              </div>
           </div>
           
           <button 
             onClick={handleLogout}
             className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 text-white/30 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all duration-500 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2"
           >
             <LogOut size={16} /> Terminate
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-16 relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-iris/[0.02] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal/[0.01] rounded-full blur-[150px] pointer-events-none" />
        
        <Routes>
          <Route path="dashboard" element={<Analytics />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="certificates" element={<ExperiencesManager />} />
          <Route 
            path="messages" 
            element={
              <div className="space-y-16 max-w-4xl">
                <MessagesManager />
                <hr className="border-white/5" />
                <FeedbackManager />
              </div>
            } 
          />
          <Route 
            path="settings" 
            element={
              <div className="space-y-16 max-w-4xl">
                <ProfileAcademicManager />
                <hr className="border-white/5" />
                <BlogManager />
                <hr className="border-white/5" />
                <ChatbotSettings />
              </div>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

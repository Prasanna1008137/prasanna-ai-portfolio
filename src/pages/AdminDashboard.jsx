import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Award, 
  Mail, 
  FileText, 
  MessageSquare,
  Bot,
  Settings,
  LogOut,
  BarChart3
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
  <Link to={path}>
    <motion.div 
      whileHover={{ x: 5 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        active ? 'bg-brand-pink/20 text-brand-pink border border-brand-pink/30' : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </motion.div>
  </Link>
);

import ProjectManager from '../components/Admin/ProjectManager';
import Analytics from '../components/Admin/Analytics';
import CertificatesManager from '../components/Admin/CertificatesManager';
import { MessagesManager, FeedbackManager } from '../components/Admin/Interactions';
import { BlogManager, ChatbotSettings } from '../components/Admin/ControlPanels';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simple auth check for now
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: FolderKanban, label: 'Projects', path: '/admin/projects' },
    { icon: Award, label: 'Certificates', path: '/admin/certificates' },
    { icon: FileText, label: 'Blogs', path: '/admin/blogs' },
    { icon: Mail, label: 'Messages', path: '/admin/messages' },
    { icon: MessageSquare, label: 'Feedback', path: '/admin/feedback' },
    { icon: Bot, label: 'AI Chatbot', path: '/admin/chatbot' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex font-sans text-white selection:bg-brand-pink/30">
      <div className="noise-bg"></div>
      
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 h-screen sticky top-0 flex flex-col z-20">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-xl font-bold tracking-tighter block hover:opacity-80 transition-opacity">
            Prasanna<span className="text-brand-pink">.AI</span>
          </Link>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-widest font-semibold">Admin Portal</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.label} 
              {...item} 
              active={location.pathname === item.path}
            />
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 p-8 h-screen overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/projects" element={<ProjectManager />} />
            <Route path="/certificates" element={<CertificatesManager />} />
            <Route path="/blogs" element={<BlogManager />} />
            <Route path="/messages" element={<MessagesManager />} />
            <Route path="/feedback" element={<FeedbackManager />} />
            <Route path="/chatbot" element={<ChatbotSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function DashboardOverview() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back, Prasanna</h1>
          <p className="text-white/60">Here is what's happening with your portfolio today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-lavender to-brand-pink flex items-center justify-center text-brand-darker font-bold">
            P
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Total Visitors', value: '12,405', growth: '+14%' },
          { label: 'Messages Received', value: '48', growth: '+5%' },
          { label: 'Resume Downloads', value: '312', growth: '+22%' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
              <BarChart3 size={64} />
            </div>
            <p className="text-white/60 text-sm font-medium mb-2">{stat.label}</p>
            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
            <p className="text-brand-pink text-sm font-semibold">{stat.growth} this month</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-8 min-h-[400px] flex items-center justify-center">
        <p className="text-white/40 text-lg">Charts and graphs will be rendered here.</p>
      </div>
    </motion.div>
  );
}

function PlaceholderPanel({ title }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="glass-card p-8 min-h-[500px] flex items-center justify-center border-dashed border-2 border-white/20">
        <p className="text-white/40 text-lg">{title} interface under construction.</p>
      </div>
    </motion.div>
  );
}

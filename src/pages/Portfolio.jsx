import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import FeaturedSkills from '../components/FeaturedSkills';
import Stats from '../components/Stats';
import AIStack from '../components/AIStack';
import Projects from '../components/Projects';
import ExperienceTimeline from '../components/ExperienceTimeline';
import Certifications from '../components/Certifications';
import Blogs from '../components/Blogs';
import Feedback from '../components/Feedback';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';
import SocialDock from '../components/SocialDock';
import AIAssistant from '../components/AIAssistant';
import CursorGlow from '../components/CursorGlow';

export default function Portfolio() {
  return (
    <div className="relative bg-void min-h-screen selection:bg-teal/30">
      <div className="noise-overlay" />
      <CursorGlow />
      <Navbar />
      <SocialDock />
      <AIAssistant />

      <main className="relative z-10">
        <Hero />

        {/* Global Cinematic Accent */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        </div>

        <About />
        
        <FeaturedSkills />

        <Stats />
        
        <AIStack />
        
        <Skills />
        
        <Projects />

        <ExperienceTimeline />
        
        <Certifications />

        <Blogs />

        <Feedback />
        
        <Contact />
      </main>

      <footer className="py-20 border-t border-white/[0.04] bg-abyss/40 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="space-y-6">
              <div className="font-display font-bold text-3xl tracking-tighter text-white">
                P<span className="text-teal">.</span>
              </div>
              <p className="text-sm text-white/30 font-light leading-relaxed">
                Engineering intelligent systems with a focus on deep learning and cinematic user experiences. 
                Based in Vijayawada, available globally.
              </p>
            </div>
            
            <div className="space-y-4">
               <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/60">Navigation</h4>
               <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a href="#about" className="text-white/30 hover:text-teal transition-colors">/ABOUT</a>
                  <a href="#projects" className="text-white/30 hover:text-teal transition-colors">/PROJECTS</a>
                  <a href="#experience" className="text-white/30 hover:text-teal transition-colors">/EXPERIENCE</a>
                  <a href="#contact" className="text-white/30 hover:text-teal transition-colors">/CONTACT</a>
               </div>
            </div>

            <div className="space-y-4 text-right md:text-left">
               <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white/60">System Version</h4>
               <div className="text-xs font-mono text-teal/40">
                  CORE_VERSION_2.5.0_PRO
               </div>
               <div className="text-[10px] font-mono text-white/10 uppercase tracking-tighter">
                  LATENCY: 14MS | SYNC: OPTIMAL
               </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Mondi Lakshmi Prasanna. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
               <a href="https://github.com/Prasanna1008137" className="text-white/30 hover:text-white transition-colors">
                  <span className="text-[10px] font-mono tracking-widest uppercase">GITHUB</span>
               </a>
               <a href="https://www.linkedin.com/in/prasanna-mondi-5018b034a" className="text-white/30 hover:text-white transition-colors">
                  <span className="text-[10px] font-mono tracking-widest uppercase">LINKEDIN</span>
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


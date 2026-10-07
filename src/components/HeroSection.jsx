import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, ArrowDownRight, Download, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Text Entrance Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const textFadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } },
  };

  return (
    <section id="hero" className="min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-16 font-mono flex flex-col justify-between border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 text-xs text-neutral-500 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-none h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold">STATUS: AVAILABLE_FOR_ROLES</span>
          <span className="text-neutral-400">|</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Nashik / Pune, IN</span>
        </div>

        <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
          <span>SYS_TIME: <strong className="text-emerald-500">{time}</strong></span>
        </div>
      </div>

      {/* Main Workstation Grid */}
      <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Headline Column */}
        <motion.div 
          className="lg:col-span-7 space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={textFadeUp} className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>FULL STACK DEVELOPER | MERN &amp; REACT NATIVE</span>
          </motion.div>

          <motion.h1 
            variants={textFadeUp}
            className="text-4xl sm:text-6xl font-sans font-black tracking-tight leading-[1.05] text-neutral-900 dark:text-white uppercase"
          >
            DIPAK SAHANI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">
              BUILDING SCALABLE WEB &amp; MOBILE SYSTEMS
            </span>
          </motion.h1>

          <motion.p 
            variants={textFadeUp}
            className="font-sans text-neutral-600 dark:text-neutral-400 text-base sm:text-lg max-w-2xl font-normal leading-relaxed"
          >
            Full Stack Developer with hands-on experience building AI-powered healthcare platforms, real-time IoT dashboards, and cloud-deployed business applications. Skilled in React, React Native, Node.js, Redis, and AWS.
          </motion.p>

          {/* Direct CTA Buttons */}
          <motion.div variants={textFadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-sans font-bold text-sm hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-colors group cursor-pointer border-none"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="/Dipak_Sahani.pdf"
              download="Dipak_Sahani.pdf"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-emerald-500 text-neutral-800 dark:text-neutral-200 text-xs transition-colors"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>DOWNLOAD RESUME</span>         
            </a>
          </motion.div>

          {/* Quick Contact Bar */}
          <motion.div variants={textFadeUp} className="flex flex-wrap gap-4 pt-2 text-xs text-neutral-500">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-500" /> dipaksahani050@gmail.com</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-500" /> +91 8080014894</span>
          </motion.div>
        </motion.div>

        {/* Right Terminal Workstation Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="bg-neutral-100 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-5 space-y-4 shadow-xl">
            
            {/* Terminal Window Bar */}
            <div className="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-neutral-700 dark:text-neutral-300 font-bold">manifest.json</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-700" />
                <div className="w-2.5 h-2.5 bg-neutral-400 dark:bg-neutral-700" />
              </div>
            </div>

            {/* Live Stack Output Lines */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-neutral-500 border-b border-neutral-200 dark:border-neutral-900 pb-1">
                <span>COMPONENT</span>
                <span>STACK / ARCHITECTURE</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">&gt; Web Frontend</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">React.js / Tailwind CSS</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">&gt; Mobile App</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">React Native (Cross-Platform)</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">&gt; Backend API</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">Node.js / Express.js / REST</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">&gt; Databases</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">MongoDB / Postgres / Redis</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-neutral-600 dark:text-neutral-400">&gt; Cloud Infrastructure</span>
                <span className="text-neutral-800 dark:text-neutral-200 font-semibold">AWS (EC2, S3) / Cloudflare</span>
              </div>
            </div>

            {/* Prompt Line */}
            <div className="pt-2 border-t border-neutral-300 dark:border-neutral-800 flex items-center gap-2 text-xs">
              <span className="text-emerald-500">$</span>
              <span className="animate-pulse text-neutral-700 dark:text-neutral-300">ready for engineering roles...</span>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Footer System Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
        <div>
          <span className="block text-neutral-400 uppercase text-[10px]">Education</span>
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold">B.E. Computer (CGPA 8.15)</span>
        </div>
        <div>
          <span className="block text-neutral-400 uppercase text-[10px]">Experience</span>
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold">3 Internships + Freelance</span>
        </div>
        <div>
          <span className="block text-neutral-400 uppercase text-[10px]">Hackathons</span>
          <span className="text-neutral-800 dark:text-neutral-200 font-semibold">SGGS Nanded &amp; VIT Pune</span>
        </div>
        <div>
          <span className="block text-neutral-400 uppercase text-[10px]">Target Role</span>
          <span className="text-emerald-500 font-semibold">SDE / Full Stack Engineer</span>
        </div>
      </div>

    </section>
  );
}
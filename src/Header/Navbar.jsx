import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, User, Cpu, FolderGit2, Mail, Sun, Moon, GitBranch } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, darkMode, setDarkMode }) {
  const items = [
    { id: 'hero', label: 'Terminal', icon: <Terminal size={15} /> },
    { id: 'about', label: 'About', icon: <User size={15} /> },
    { id: 'skills', label: 'Stack', icon: <Cpu size={15} /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={15} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={15} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080a]/90 dark:bg-[#08080a]/90 bg-white/90 dark:bg-[#08080a]/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 font-mono text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
        
        {/* Brand System Status */}
        <button 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-bold tracking-tight hover:opacity-80 transition-opacity cursor-pointer border-none bg-transparent"
        >
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none inline-block animate-pulse" />
          <span>DIPAK_SAHANI // SYS_V4.0</span>
        </button>

        {/* Section Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 border border-neutral-300 dark:border-neutral-800">
          {items.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 transition-all cursor-pointer border-none ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-[11px]">
            <GitBranch className="w-3 h-3 text-emerald-500" />
            <span>main</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

      </div>
    </header>
  );
}
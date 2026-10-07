import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, FileText, Video, Play } from 'lucide-react';
import { FigmaIcon, GithubIcon } from './icons/BrandIcons';

const getLinkIcon = (type) => {
  switch (type) {
    case 'github':
      return <GithubIcon className="w-3.5 h-3.5 text-emerald-500" />;
    case 'demo':
      return <Play className="w-3.5 h-3.5 text-emerald-500" />;
    case 'docs':
      return <FileText className="w-3.5 h-3.5 text-emerald-500" />;
    case 'youtube':
      return <Video className="w-3.5 h-3.5 text-emerald-500" />;
    case 'figma':
      return <FigmaIcon className="w-3.5 h-3.5 text-emerald-500" />;
    default:
      return <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />;
  }
};

export default function ProjectsSection({ sectionRef }) {
  const projects = [
    {
      title: 'Medflow AI Healthcare System',
      tagline: 'Hackathon Project at SGGS Nanded (8th SEM)',
      tech: ['MERN Stack', 'React Native', 'Firebase', 'Redis Cloud', 'Gemini API'],
      description: 'Built an AI-powered healthcare platform with medicine ordering, prescription extraction, appointments, and video consultation features. Developed an admin dashboard for inventory and stock management.',
      category: 'AI Healthcare Platform',
      links: [
        { label: 'Live Demo', url: 'https://lnkd.in/p/edDxDdSN', type: 'demo' },
        { label: 'GitHub Repo', url: 'https://github.com/Dipak-sahani/hackfusion3-website-frontend', type: 'github' },
        // { label: 'Architecture Docs', url: 'https://docs.example.com', type: 'docs' },
      ]
    },
    
    {
      title: 'Godavari Publication Online Ordering',
      tagline: 'Freelance Production Client — Feb 2026',
      tech: ['React.js', 'Node.js', 'Cloudflare Workers', 'REST APIs'],
      description: 'Developed a full-stack e-commerce website for Godavari Publication enabling online product ordering and order tracking.',
      category: 'Freelance Production App',
      links: [
        { label: 'Live Website', url: 'https://www.godavaripublication.in', type: 'demo' },
      ]
    },
    
    {
      title: 'Real-Time IoT Monitoring Dashboard',
      tagline: 'Freelance System — Apr 2026',
      tech: ['React.js', 'Firebase', 'Live Analytics'],
      description: 'Developed a real-time IoT monitoring dashboard for live sensor data tracking, synchronization, and visualization with dynamic analytics.',
      category: 'Analytics Dashboard',
      links: [
        { label: 'Live Website', url: 'https://smart-dam-monetring-system.netlify.app/', type: 'demo' },
      ]
    },
    {
      title: 'Digital Notice Board with IoT Updates',
      tagline: 'VIT Pune Hackathon — 7th Place out of 250+ Teams (7th SEM)',
      tech: ['MERN Stack', 'Socket.io', 'IoT Hardware', 'JWT Auth'],
      description: 'Developed 65% of frontend and backend for a real-time digital notice system with Admin & Display portals.',
      category: 'IoT Real-Time System',
      links: [
        { label: 'GitHub Repo', url: 'https://raspmain1.netlify.app/', type: 'github' },
        // { label: 'Demo Video', url: 'https://youtube.com', type: 'youtube' },
      ]
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 px-4 sm:px-8 lg:px-16 font-mono border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs">
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>PRODUCTION &amp; HACKATHON WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            FEATURED PROJECTS
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 sm:p-8 space-y-4 hover:border-emerald-500 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 uppercase font-bold tracking-wider">{project.category}</span>
                  <h3 className="text-2xl font-sans font-bold text-neutral-900 dark:text-white">{project.title}</h3>
                </div>
                <span className="text-xs text-neutral-500 bg-neutral-200 dark:bg-neutral-900 px-3 py-1 border border-neutral-300 dark:border-neutral-800">
                  {project.tagline}
                </span>
              </div>

              <p className="font-sans text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1 pb-2">
                {project.tech.map((t, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-2.5 py-1 bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Dynamic Links Section */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
                  {project.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                    >
                      {getLinkIcon(link.type)}
                      <span>{link.label}</span>
                      <span className="text-[10px] text-neutral-400">↗</span>
                    </a>
                  ))}
                </div>
              )}

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
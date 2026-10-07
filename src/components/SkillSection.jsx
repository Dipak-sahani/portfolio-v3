import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layout, Server, Database, Cloud, Code } from 'lucide-react';

export default function SkillsSection({ sectionRef }) {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Layout,
      skills: ['React.js', 'React Native', 'Tailwind CSS', 'Responsive Design', 'JavaScript (ES6+)', 'TypeScript']
    },
    {
      title: 'Backend Architecture',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Socket.io', 'Microservices']
    },
    {
      title: 'Databases & Caching',
      icon: Database,
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase Realtime DB']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS (EC2, S3, IAM)', 'Docker', 'Cloudflare Workers', 'Git / GitHub']
    },
    {
      title: 'Languages & AI Tooling',
      icon: Code,
      skills: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Java', 'Gemini API', 'LangChain']
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
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
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span>TECHNICAL CAPABILITY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            SKILLS &amp; ABILITIES
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 space-y-4 hover:border-emerald-500 transition-colors"
              >
                <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                  <Icon className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-sans font-bold text-base text-neutral-900 dark:text-white">{cat.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 bg-neutral-200/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
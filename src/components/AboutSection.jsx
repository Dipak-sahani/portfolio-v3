import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ sectionRef }) {
  const experiences = [
    {
      role: 'React Native Developer Intern',
      company: 'Medygharcarehub',
      location: 'Remote',
      period: 'Dec 22, 2025 – Present',
      type: 'Internship',
      details: [
        'Designed, developed, and maintained cross-platform mobile application features using React Native.',
        'Created reusable, scalable, and performance-optimized UI components following industry best practices.',
        'Integrated REST APIs and handled dynamic data rendering seamlessly.'
      ]
    },
    {
      role: 'Full Stack Developer Intern',
      company: 'BucketStudy',
      location: 'Remote',
      period: 'Dec 03, 2025 – Jan 04, 2026',
      type: 'Internship',
      details: [
        'Designed and developed responsive user interfaces using React.js.',
        'Created scalable backend services and APIs using Node.js and Express.js.',
        'Worked with MongoDB for database design, CRUD operations, and data optimization.'
      ]
    },
    {
      role: 'AIML with Data Science Intern',
      company: 'YBI Foundation',
      location: 'Remote',
      period: 'Dec 23, 2024 – Jan 23, 2025',
      type: 'Internship',
      details: [
        'Developed a Movie Recommendation System using Machine Learning techniques.',
        'Implemented content-based filtering to suggest movies based on user preferences.',
        'Performed data preprocessing, cleaning, and feature extraction.'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.E. in Computer Engineering',
      institution: 'SITRC Nashik',
      score: 'CGPA 8.15',
      period: '2022 – 2026'
    },
    {
      degree: '12th Grade (HSC)',
      institution: 'KTHM College Nashik',
      score: '62.33%',
      period: '2021 – 2022'
    },
    {
      degree: '10th Grade (SSC)',
      institution: 'S. S. V. Madhyamika Vidyalaya',
      score: '86.4%',
      period: '2019 – 2020'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 px-4 sm:px-8 lg:px-16 font-mono border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs">
            <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
            <span>BACKGROUND &amp; TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-neutral-900 dark:text-white uppercase tracking-tight">
            WORK EXPERIENCE &amp; EDUCATION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Work & Internships */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-800 pb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-emerald-500" />
              INTERNSHIPS &amp; PROFESSIONAL ROLES
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-6 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
                    <div>
                      <h4 className="font-sans text-lg font-bold text-neutral-900 dark:text-white">{exp.role}</h4>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-[11px] bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                    {exp.details.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">›</span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Education Box */}
            <div className="space-y-6">
              <h3 className="text-xl font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                ACADEMIC QUALIFICATIONS
              </h3>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-4 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-sans font-bold text-sm text-neutral-900 dark:text-white">{edu.degree}</h4>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{edu.score}</span>
                    </div>
                    <p className="text-xs text-neutral-500">{edu.institution} | {edu.period}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-sans font-bold text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-neutral-800 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-500" />
                VERIFIED CERTIFICATIONS
              </h3>

              <div className="bg-neutral-50 dark:bg-[#0e0e12] border border-neutral-300 dark:border-neutral-800 p-5 space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white">FreeCodeCamp:</span>
                    <p className="text-neutral-500">Backend Development &amp; APIs</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-900 dark:text-white">Infosys Springboard:</span>
                    <p className="text-neutral-500">CSS3, TypeScript, and UX Fundamentals</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
import React, { useRef, useState, useEffect } from 'react';
import Navbar from './Header/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillSection';
import ProjectsSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  const refs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const handleNavigate = (id) => {
    setActiveSection(id);
    const ref = refs[id];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="bg-white dark:bg-[#08080a] text-neutral-900 dark:text-neutral-100 min-h-screen transition-colors duration-300 selection:bg-emerald-500 selection:text-black">
        
        {/* Navbar Command Bar */}
        <Navbar 
          activeSection={activeSection} 
          onNavigate={handleNavigate} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Hero Section */}
        <div ref={refs.hero}>
          <HeroSection onExploreClick={() => handleNavigate('projects')} />
        </div>

        {/* About & Experience Section */}
        <AboutSection sectionRef={refs.about} />

        {/* Skills Section */}
        <SkillsSection sectionRef={refs.skills} />

        {/* Projects & Hackathons Section */}
        <ProjectsSection sectionRef={refs.projects} />

        {/* Contact Section */}
        <ContactSection sectionRef={refs.contact} />

      </main>
    </div>
  );
}
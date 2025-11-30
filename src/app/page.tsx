'use client';

import AboutSection from '@/components/classic/about-section';
import BlogSection from '@/components/classic/blog-section';
import CertificationsSection from '@/components/classic/certifications-section';
import EducationSection from '@/components/classic/education-section';
import ExperienceSection from '@/components/classic/experience-section';
import Footer from '@/components/classic/footer';
import Hero from '@/components/classic/hero';
import ProjectsSection from '@/components/classic/projects-section';
import SkillsSection from '@/components/classic/skills-section';
import ModeToggle from '@/components/shared/mode-toggle';
import Terminal from '@/components/terminal/terminal';
import { useTerminalStore } from '@/store/terminal-store';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const mode = useTerminalStore(state => state.mode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence initial={false} mode="wait">
      {mode === 'terminal' ? (
        <motion.div
          key="terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-screen w-full"
        >
          <Terminal />
        </motion.div>
      ) : (
        <motion.main
          key="classic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          <div className="fixed top-4 right-4 z-50">
            <ModeToggle />
          </div>
          <main>
            <Hero />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <EducationSection />
            <CertificationsSection />
            <BlogSection />
          </main>
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  );
}

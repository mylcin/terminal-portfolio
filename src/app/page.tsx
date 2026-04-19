'use client';

import AboutSection from '@/features/classic/components/about-section';
import BlogSection from '@/features/classic/components/blog-section';
import CertificationsSection from '@/features/classic/components/certifications-section';
import EducationSection from '@/features/classic/components/education-section';
import ExperienceSection from '@/features/classic/components/experience-section';
import Footer from '@/features/classic/components/footer';
import Hero from '@/features/classic/components/hero';
import ProjectsSection from '@/features/classic/components/projects-section';
import SkillsSection from '@/features/classic/components/skills-section';
import ModeToggle from '@/shared/components/mode-toggle';
import Terminal from '@/features/terminal/components/terminal';
import { useTerminalStore } from '@/features/terminal/store/terminal-store';
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

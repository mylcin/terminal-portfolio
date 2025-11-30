'use client';

import { Button } from '@/components/ui/button';
import { aboutConfig } from '@/config/about';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { DockText } from '../ui/dock-text';

export default function Hero() {
  const { name, title, bio } = aboutConfig;

  const socialLinks = [
    { href: siteConfig.links.github, icon: Github, label: 'GitHub' },
    { href: siteConfig.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
    { href: siteConfig.links.instagram, icon: Instagram, label: 'Instagram' },
    { href: `mailto:${siteConfig.author.email}`, icon: Mail, label: 'Email' },
  ];

  const [firstName, lastName] = name.split(' ');

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center gap-2">
              <DockText text={firstName} />
              <DockText text={lastName} />
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mb-4 text-xl md:text-2xl"
          >
            {title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg"
          >
            {bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 flex items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <a href="#blog">Read Blog</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            {socialLinks.map((link, index) => (
              <SocialLink
                key={index}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-linear-to-br from-blue-500/20 to-transparent blur-3xl"
        />
      </div>
    </section>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType | string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="hover:bg-accent rounded-full p-2 transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

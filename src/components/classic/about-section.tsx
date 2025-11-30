'use client';

import { aboutConfig } from '@/config/about';
import { motion, MotionProps } from 'framer-motion';

export default function AboutSection() {
  const { highlights } = aboutConfig;

  const cardMotionProps: MotionProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    whileHover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    viewport: { once: true, amount: 0.3 },
  };

  const cards = [
    {
      title: 'Build',
      description:
        'Creating scalable web applications with modern technologies and best practices.',
      gradient: 'from-blue-500/10 to-cyan-500/10',
      hoverGradient: 'hover:from-blue-500/15 hover:to-cyan-500/15',
    },
    {
      title: 'Design',
      description:
        'Crafting intuitive user experiences with attention to detail and accessibility.',
      gradient: 'from-purple-500/10 to-pink-500/10',
      hoverGradient: 'hover:from-purple-500/15 hover:to-pink-500/15',
    },
    {
      title: 'Optimize',
      description:
        'Improving performance and ensuring applications run smoothly at scale.',
      gradient: 'from-orange-500/10 to-yellow-500/10',
      hoverGradient: 'hover:from-orange-500/15 hover:to-yellow-500/15',
    },
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            About Me
          </h2>

          <div className="space-y-3">
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-black dark:bg-white" />
                <span className="text-muted-foreground">{highlight}</span>
              </motion.div>
            ))}
          </div>

          {/* Bottom - What I Do */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8"
          >
            {cards.map(card => (
              <motion.div key={card.title} {...cardMotionProps}>
                <ColorfulCard {...card} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ColorfulCard({
  title,
  description,
  gradient,
  hoverGradient,
}: {
  title: string;
  description: string;
  gradient: string;
  hoverGradient: string;
}) {
  return (
    <div
      className={`group rounded-2xl bg-linear-to-br p-6 ${gradient} ${hoverGradient} border-border/50 hover:border-border border transition-all duration-300 hover:shadow-lg`}
    >
      <h3 className="group-hover:text-foreground mb-2 text-xl font-semibold transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground group-hover:text-foreground/80 text-sm transition-colors">
        {description}
      </p>
    </div>
  );
}

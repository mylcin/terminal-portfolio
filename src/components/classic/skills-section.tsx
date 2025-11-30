'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { skillsConfig } from '@/config/skills';
import { motion } from 'framer-motion';
import { CometCard } from '../ui/comet-card';

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Skills & Technologies
          </h2>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {skillsConfig.map((category, i) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex"
              >
                <CometCard className="flex-1">
                  <Card className="h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                    <h3 className="text-lg font-semibold">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </CometCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

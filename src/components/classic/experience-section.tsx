'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { experienceConfig } from '@/config/experience';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { BorderBeam } from '../ui/border-beam';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Work Experience
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="bg-border absolute top-0 bottom-0 left-0 w-0.5 transform md:left-1/2 md:-translate-x-px" />

            {experienceConfig.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-8 md:mb-12 ${
                  index % 2 === 0
                    ? 'md:mr-auto md:ml-0 md:pr-8 md:text-right'
                    : 'md:mr-0 md:ml-auto md:pl-8'
                } pl-8 md:w-1/2 md:pl-0`}
              >
                {/* Timeline dot */}
                <div
                  className={`bg-primary border-background absolute top-6 h-3 w-3 rounded-full border-4 ${
                    index % 2 === 0
                      ? 'left-0 md:-right-1.5 md:left-auto'
                      : 'left-0 md:-left-1.5'
                  }`}
                />

                <Card className="relative p-6 transition-shadow hover:shadow-lg">
                  <div
                    className={`mb-4 flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Briefcase className="text-primary h-5 w-5" />
                    </div>
                    <div
                      className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}
                    >
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                  </div>

                  <div
                    className={`text-muted-foreground mb-4 flex flex-wrap gap-3 text-sm ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {exp.startDate} - {exp.endDate}
                    </span>
                    <Badge variant="secondary">{exp.type}</Badge>
                  </div>

                  <p
                    className={`text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}
                  >
                    {exp.description}
                  </p>

                  <div className={`mb-4 space-y-2`}>
                    <p className="text-sm font-medium">Key Achievements:</p>
                    <ul className={`text-muted-foreground space-y-1 text-sm`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}
                  >
                    {exp.technologies.map(tech => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <BorderBeam duration={5 + index} delay={index} />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

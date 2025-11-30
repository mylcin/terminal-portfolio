'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { educationConfig } from '@/config/education';
import { motion } from 'framer-motion';
import { Award, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { ShineBorder } from '../ui/shine-border';

export default function EducationSection() {
  return (
    <section id="education" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Education
          </h2>

          <div className="space-y-6">
            {educationConfig.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative p-6 transition-shadow hover:shadow-lg">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Icon */}
                    <div className="w-fit shrink-0">
                      <div className="bg-primary/10 rounded-full p-4">
                        <GraduationCap className="text-primary h-8 w-8" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">
                            {edu.degree}
                          </h3>
                          <p className="text-primary text-lg">{edu.field}</p>
                        </div>
                        {edu.gpa && (
                          <Badge variant="secondary" className="w-fit">
                            GPA: {edu.gpa}
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-3 text-lg font-medium">
                        {edu.institution}
                      </p>

                      <div className="text-muted-foreground mb-4 flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>

                      {edu.achievements && edu.achievements.length > 0 && (
                        <div>
                          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                            <Award className="h-4 w-4" />
                            Achievements
                          </p>
                          <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            {edu.achievements.map((achievement, i) => (
                              <li
                                key={i}
                                className="text-muted-foreground flex items-start gap-2 text-sm"
                              >
                                <span className="mt-0.5 text-green-500">✓</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

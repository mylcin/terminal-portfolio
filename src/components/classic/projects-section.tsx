'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectsConfig } from '@/config/projects';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { CardSpotlight } from '../ui/card-spotlight';

export default function ProjectsSection() {
  const featuredProjects = projectsConfig.filter(p => p.featured);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
            Featured Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CardSpotlight className="h-full p-6 transition-shadow hover:shadow-lg">
                  <div className="relative z-20 mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Badge>{project.status}</Badge>
                  </div>

                  <p className="text-muted-foreground relative z-20 mb-4">
                    {project.description}
                  </p>

                  <div className="relative z-20 mb-4 flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="relative z-20 flex gap-2">
                    {project.links.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button size="sm" asChild>
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

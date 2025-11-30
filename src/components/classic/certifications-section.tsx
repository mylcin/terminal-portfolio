'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { certificationsConfig } from '@/config/certifications';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink } from 'lucide-react';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Certifications
          </h2>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {certificationsConfig.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="flex h-full flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="rounded-lg bg-yellow-500/10 p-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                    {cert.name}
                  </h3>

                  <p className="text-muted-foreground mb-3">{cert.issuer}</p>

                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {cert.date}
                  </div>

                  {cert.credentialId && (
                    <p className="text-muted-foreground mb-4 text-xs">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  <div className="mt-auto">
                    {cert.credentialUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Verify
                        </a>
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

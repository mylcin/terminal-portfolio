'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { filterPublishedPosts, sortPostsByDate } from '@/lib/blog-utils';
import { formatDate } from '@/lib/utils';
import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function BlogSection() {
  const posts = sortPostsByDate(filterPublishedPosts(allPosts)) as Post[];
  const featuredPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">
                Latest Blog Posts
              </h2>
              <p className="text-muted-foreground">
                Thoughts, tutorials, and insights about web development
              </p>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="hidden md:flex">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
              <p className="text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            </Card>
          ) : (
            <>
              <div className="mb-8 grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={post.url}>
                      <Card className="group h-full cursor-pointer p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                        <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </div>

                        <h3 className="group-hover:text-primary mb-3 line-clamp-2 text-xl font-semibold transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                          {post.description}
                        </p>

                        <div className="mb-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <span className="text-primary flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
                          Read more
                          <ArrowRight className="mt-1 h-4 w-4" />
                        </span>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-center md:hidden">
                <Link href="/blog">
                  <Button variant="outline">
                    View All Posts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import type { Post } from 'contentlayer/generated';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

interface BlogPostListProps {
  posts: Post[];
  hasActiveFilters: boolean;
}

export default function BlogPostList({
  posts,
  hasActiveFilters,
}: BlogPostListProps) {
  if (posts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">
          {hasActiveFilters
            ? 'No posts match your filters. Try adjusting your search.'
            : 'No blog posts yet. Check back soon!'}
        </p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {posts.map(post => (
        <Link key={post.slug} href={post.url}>
          <Card className="group cursor-pointer p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <h2 className="group-hover:text-primary text-2xl font-semibold transition-colors">
                {post.title}
              </h2>
              <div className="text-muted-foreground flex items-center gap-2 text-sm whitespace-nowrap">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{post.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 5).map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 5 && (
                  <Badge variant="secondary">
                    +{post.tags.length - 5} more
                  </Badge>
                )}
              </div>

              <span className="flex items-center gap-2 text-sm font-medium">
                Read more
                <span className="relative flex items-center overflow-hidden">
                  <ArrowRight className="mt-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-[150%]" />
                  <ArrowRight className="absolute mt-1 h-4 w-4 -translate-x-[150%] transition-transform duration-300 group-hover:translate-x-0" />
                </span>
              </span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

import BlogHeader from '@/components/blog/blog-header';
import MDXContent from '@/components/shared/mdx-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { calculateReadingTime, formatDate } from '@/lib/utils';
import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((post: Post) => post.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((post: Post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.body.raw);

  return (
    <>
      <BlogHeader />
      <main className="min-h-screen py-10 md:py-20">
        <article className="container mx-auto max-w-5xl px-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <header className="mb-8">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              {post.title}
            </h1>

            <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime}
              </span>
              <span>By {post.author}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          <MDXContent code={post.body.code} />
        </article>
      </main>
    </>
  );
}

import BlogContent from '@/features/blog/components/blog-content';
import BlogHeader from '@/features/blog/components/blog-header';
import {
  filterPublishedPosts,
  getAllTags,
  sortPostsByDate,
} from '@/features/blog/lib/blog-utils';
import type { Post } from 'contentlayer/generated';
import { allPosts } from 'contentlayer/generated';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest articles and thoughts on web development',
};

export default function BlogPage() {
  const posts = sortPostsByDate(filterPublishedPosts(allPosts)) as Post[];
  const allTags = getAllTags(posts);

  return (
    <>
      <BlogHeader />
      <main className="min-h-screen py-10 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Blog</h1>
            <p className="text-muted-foreground text-lg">
              Thoughts, tutorials, and insights about web development
            </p>
          </div>
          <BlogContent posts={posts} allTags={allTags} />
        </div>
      </main>
    </>
  );
}

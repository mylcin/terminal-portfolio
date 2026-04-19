'use client';

import type { Post } from 'contentlayer/generated';
import { useState } from 'react';
import BlogFilters from './blog-filters';
import BlogPagination from './blog-pagination';
import BlogPostList from './blog-post-list';

interface BlogContentProps {
  posts: Post[];
  allTags: string[];
}

const POSTS_PER_PAGE = 6;

export default function BlogContent({ posts, allTags }: BlogContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagCount, setTagCount] = useState(10);

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag =>
        post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      );

    return matchesSearch && matchesTags;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const handleTagCountChange = (count: number) => {
    setTagCount(count);
  };

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0;

  return (
    <>
      <BlogFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        allTags={allTags}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        onClearFilters={clearFilters}
        totalPosts={posts.length}
        filteredCount={filteredPosts.length}
        tagCount={tagCount}
        onTagCountChange={handleTagCountChange}
      />
      <BlogPostList
        posts={paginatedPosts}
        hasActiveFilters={hasActiveFilters}
      />
      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

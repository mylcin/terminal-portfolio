'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

interface BlogFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearFilters: () => void;
  totalPosts: number;
  filteredCount: number;
  tagCount: number;
  onTagCountChange: (count: number) => void;
}

export default function BlogFilters({
  searchQuery,
  onSearchChange,
  allTags,
  selectedTags,
  onToggleTag,
  onClearFilters,
  totalPosts,
  filteredCount,
  tagCount,
  onTagCountChange,
}: BlogFiltersProps) {
  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium">Filter by tags:</p>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-auto text-sm"
              >
                Clear all
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, tagCount).map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => onToggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
            {allTags.length > tagCount && (
              <Badge
                variant="outline"
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => onTagCountChange(allTags.length)}
              >
                +{allTags.length - tagCount} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="text-muted-foreground text-sm">
          Showing {filteredCount} of {totalPosts} posts
        </div>
      )}
    </div>
  );
}

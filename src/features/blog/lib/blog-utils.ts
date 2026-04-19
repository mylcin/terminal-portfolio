export function sortPostsByDate<T extends { date: Date | string }>(
  posts: T[]
): T[] {
  return posts.sort((a, b) => {
    const dateA = typeof a.date === 'string' ? new Date(a.date) : a.date;
    const dateB = typeof b.date === 'string' ? new Date(b.date) : b.date;
    return dateB.getTime() - dateA.getTime();
  });
}

export function filterPublishedPosts<T extends { published?: boolean }>(
  posts: T[]
): T[] {
  return posts.filter(post => post.published !== false);
}

export function getPostsByTag<T extends { tags: string[] }>(
  posts: T[],
  tag: string
): T[] {
  return posts.filter(post =>
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags<T extends { tags: string[] }>(posts: T[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
}

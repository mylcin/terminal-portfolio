export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: Date;
  published: boolean;
  tags: string[];
  author: string;
  readingTime?: string;
  content?: string;
}

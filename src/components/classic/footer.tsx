'use client';

import { siteConfig } from '@/config/site';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
          © {currentYear} {siteConfig.author.name}. Built with{' '}
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          and Next.js
        </div>
      </div>
    </footer>
  );
}

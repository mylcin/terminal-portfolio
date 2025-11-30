'use client';

import { Button } from '@/components/ui/button';
import { useTerminalStore } from '@/store/terminal-store';
import { Home, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../shared/theme-toggle';

export default function BlogHeader() {
  const setMode = useTerminalStore(state => state.setMode);
  const router = useRouter();

  const handleTerminalMode = () => {
    setMode('terminal');
    router.push('/');
  };

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left - Logo/Brand */}
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleTerminalMode}
              className="gap-2"
            >
              <Terminal className="h-4 w-4" />
              <span className="hidden sm:inline">Terminal</span>
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

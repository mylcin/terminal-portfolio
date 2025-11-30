'use client';

import { Button } from '@/components/ui/button';
import { useTerminalStore } from '@/store/terminal-store';
import { format } from 'date-fns';
import { DeleteIcon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '../shared/theme-toggle';
import { Spinner } from '../ui/spinner';

export default function TerminalHeader() {
  const setMode = useTerminalStore(state => state.setMode);
  const resetTerminal = useTerminalStore(state => state.resetTerminal);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(format(new Date(), 'MMM dd, yyyy HH:mm:ss'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-border bg-muted/50 supports-backdrop-filter:bg-muted/50 border-b backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2">
        {/* Left: Terminal Info */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
        </div>

        <div className="text-muted-foreground hidden text-center text-sm font-medium md:block">
          {time || <Spinner className="h-4 w-4" />}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMode('classic')}
            title="Switch to classic mode"
          >
            <Monitor className="h-4 w-4" />
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={resetTerminal}
            title="Reset terminal"
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

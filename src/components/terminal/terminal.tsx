'use client';

import { useTerminalStore } from '@/store/terminal-store';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';
import TerminalHeader from './terminal-header';
import TerminalInput from './terminal-input';
import TerminalOutput from './terminal-output';
import TerminalWelcomeMessage from './terminal-welcome-message';

export default function Terminal() {
  const history = useTerminalStore(state => state.history);
  const setCallbacks = useTerminalStore(state => state.setCallbacks);

  const { setTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCallbacks({
      onThemeChange: theme => setTheme(theme),
      onDownloadResume: () => window.open('/resume.pdf', '_blank'),
    });
  }, [setTheme, setCallbacks]);

  return (
    <div className="bg-terminal-background flex h-screen flex-col overflow-hidden">
      <TerminalHeader />

      <div ref={scrollRef} className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="mx-auto flex min-h-full max-w-5xl flex-col p-4 font-mono text-sm">
          {/* Welcome Message */}
          {history.length === 0 && <TerminalWelcomeMessage />}

          {/* Command History */}
          {history.map(entry => (
            <div key={entry.id} className="mb-4">
              <CommandLine command={entry.command} />
              <TerminalOutput output={entry.output} scrollRef={scrollRef} />
            </div>
          ))}
          <div>
            <TerminalInput />
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandLine({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-1 font-bold">
      <span className="text-black dark:text-white">visitor@portfolio:</span>
      <span className="text-yellow-500">~</span>
      <span className="text-white">$</span>
      <span className="text-gray-500">{command}</span>
    </div>
  );
}

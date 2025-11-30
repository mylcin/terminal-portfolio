'use client';

import { Button } from '@/components/ui/button';
import { useTerminalStore } from '@/store/terminal-store';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Terminal } from 'lucide-react';

export default function ModeToggle() {
  const mode = useTerminalStore(state => state.mode);
  const setMode = useTerminalStore(state => state.setMode);

  return (
    <AnimatePresence mode="wait">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setMode(mode === 'terminal' ? 'classic' : 'terminal')}
        className="relative gap-2 overflow-hidden"
      >
        {mode === 'terminal' ? (
          <motion.span
            key="classic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <Monitor className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Classic Mode</span>
          </motion.span>
        ) : (
          <motion.span
            key="terminal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-2"
          >
            <Terminal className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Terminal Mode</span>
          </motion.span>
        )}
      </Button>
    </AnimatePresence>
  );
}

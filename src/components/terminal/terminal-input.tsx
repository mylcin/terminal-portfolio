'use client';

import { AVAILABLE_COMMANDS } from '@/config/commands';
import { cn } from '@/lib/utils';
import { useTerminalStore } from '@/store/terminal-store';
import { useEffect, useRef, useState } from 'react';

export default function TerminalInput() {
  const addToHistory = useTerminalStore(state => state.addToHistory);
  const isProcessing = useTerminalStore(state => state.isProcessing);
  const getCommandHistory = useTerminalStore(state => state.getCommandHistory);

  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    await addToHistory(input);
    setInput('');
    setHistoryIndex(-1);
    setSuggestions([]);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const commandHistory = getCommandHistory();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      if (!input.trim()) return;

      const matches = AVAILABLE_COMMANDS.filter(
        cmd =>
          cmd.name.startsWith(input.toLowerCase()) ||
          cmd.aliases?.some(a => a.startsWith(input.toLowerCase()))
      );

      if (matches.length === 1) {
        setInput(matches[0].name);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches.map(m => m.name));
      }
    }

    if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setHistoryIndex(-1);

    if (value.trim()) {
      const matches = AVAILABLE_COMMANDS.filter(
        cmd =>
          cmd.name.startsWith(value.toLowerCase()) ||
          cmd.aliases?.some(a => a.startsWith(value.toLowerCase()))
      );
      setSuggestions(
        matches.length > 0 && matches.length <= 5
          ? matches.map(m => m.name)
          : []
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex shrink-0 items-center gap-1 font-bold">
          <span className="text-black dark:text-white">visitor@portfolio:</span>
          <span className="text-yellow-500">~</span>
          <span className="text-black dark:text-white">$</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          className={cn(
            'flex-1 bg-transparent font-mono font-bold text-black outline-none dark:text-white',
            'placeholder:text-gray-500',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
          placeholder={isProcessing ? '' : 'Type a command...'}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
        />

        {isProcessing && (
          <span className="animate-pulse text-gray-500">...</span>
        )}
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="border-border bg-background/95 absolute top-full left-0 mt-2 w-full max-w-xs space-y-1 rounded border p-2 text-xs backdrop-blur">
          <div className="mb-1 text-gray-500">Suggestions:</div>
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className="hover:bg-accent block w-full rounded px-2 py-1 text-left font-bold text-black transition-colors dark:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

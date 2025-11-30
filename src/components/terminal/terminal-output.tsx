'use client';

import { LINE_TYPES } from '@/lib/terminal-formatter';
import { cn } from '@/lib/utils';
import type { CommandOutput } from '@/types/terminal';
import { RefObject, useEffect, useState } from 'react';

interface TerminalOutputProps {
  output: CommandOutput;
  animate?: boolean;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const lineStyles: Record<string, string> = {
  [LINE_TYPES.TITLE]: 'text-black dark:text-white font-bold',
  [LINE_TYPES.SUBTITLE]: 'text-blue-600 dark:text-blue-400',
  [LINE_TYPES.SUCCESS]: 'text-green-400',
  [LINE_TYPES.ERROR]: 'text-red-400',
  [LINE_TYPES.WARNING]: 'text-yellow-400',
  [LINE_TYPES.DIM]: 'text-gray-500',
  [LINE_TYPES.HIGHLIGHT]: 'text-yellow-300',
};

interface TerminalOutputProps {
  output: CommandOutput;
  animate?: boolean;
  scrollRef: RefObject<HTMLDivElement | null>;
}

export default function TerminalOutput({
  output,
  animate = true,
  scrollRef,
}: TerminalOutputProps) {
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [isComplete, setIsComplete] = useState(!animate);

  const content = String(output.content || '');
  const lines = content.split('\n');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'auto',
      });
    }
  }, [displayedLines, scrollRef]);

  useEffect(() => {
    if (!animate || !content) {
      setDisplayedLines(lines.length);
      setIsComplete(true);
      return;
    }

    setDisplayedLines(0);
    setIsComplete(false);

    const totalLines = lines.length;
    const baseDelay = 20;
    const maxDelay = 500;

    const delayPerLine = Math.min(baseDelay, maxDelay / totalLines);

    let currentLine = 0;
    const interval = setInterval(() => {
      currentLine++;
      setDisplayedLines(currentLine);

      if (currentLine >= totalLines) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, delayPerLine);

    return () => clearInterval(interval);
  }, [content, animate, lines.length]);

  if (!content) return null;

  const baseColorMap: Record<string, string> = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
  };

  const renderWithLinks = (text: string): React.ReactNode[] => {
    const parts = text.split(URL_REGEX);
    return parts.map((part, i) => {
      if (URL_REGEX.test(part)) {
        URL_REGEX.lastIndex = 0;
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline transition-colors hover:text-blue-100"
          >
            {part}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderLine = (line: string, index: number): React.ReactNode => {
    let style = '';
    let lineContent = line;

    for (const [marker, className] of Object.entries(lineStyles)) {
      if (line.includes(marker)) {
        style = className;
        lineContent = line.replace(
          new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          ''
        );
        break;
      }
    }

    return (
      <span key={index} className={cn(style, 'animate-fade-in')}>
        {renderWithLinks(lineContent)}
      </span>
    );
  };

  const visibleLines = lines.slice(0, displayedLines);

  return (
    <pre
      className={cn(
        'mt-2 font-mono text-sm leading-relaxed whitespace-pre-wrap',
        baseColorMap[output.type]
      )}
    >
      {visibleLines.map((line: string, index: number) => (
        <span key={index}>
          {renderLine(line, index)}
          {index < visibleLines.length - 1 && '\n'}
        </span>
      ))}
      {!isComplete && <span className="animate-pulse">▌</span>}
    </pre>
  );
}

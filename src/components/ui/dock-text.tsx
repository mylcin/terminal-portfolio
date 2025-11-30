'use client';

import { motion } from 'motion/react';
import React, { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface DockTextProps {
  text: string;
  down?: boolean;
  className?: string;
}

export function DockText({ text, down = false, className }: DockTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.children;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    Array.from(letters).forEach((letter, index) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX =
        letterRect.left + letterRect.width / 2 - containerRect.left;
      const distance = Math.abs(mouseX - letterCenterX);

      if (distance <= 10) {
        setHoveredIndex(index);
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const totalLetters = text.length;

  return (
    <motion.h1
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'my-8 flex cursor-pointer items-center text-4xl font-bold uppercase md:text-5xl lg:text-6xl',
        className
      )}
    >
      {text.split('').map((letter, index) => {
        const progress = index / totalLetters;
        let hue: number;
        let saturation: number;

        if (progress < 0.5) {
          hue = 210 - progress * 2 * 13;
          saturation = 24 - progress * 2 * 16;
        } else {
          hue = 197 - (progress - 0.5) * 2 * 12;
          saturation = 8 + (progress - 0.5) * 2 * 14;
        }
        const lightness = 50;
        return (
          <motion.span
            key={index}
            animate={{
              scaleY:
                hoveredIndex === null
                  ? 1
                  : Math.max(1, 1.3638 - Math.abs(index - hoveredIndex) * 0.1),
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 20,
              mass: 0.5,
            }}
            style={{
              display: 'inline-block',
              transformOrigin: down ? 'top' : 'bottom',
              color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            }}
            className="dark:brightness-130"
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

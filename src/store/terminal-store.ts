import { STORAGE_KEYS } from '@/lib/storage';
import { processCommand } from '@/lib/terminal-parser';
import { formatDate, generateId } from '@/lib/utils';
import type { CommandHistory, TerminalState } from '@/types/terminal';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

async function handleBlogList(): Promise<string> {
  try {
    const { allPosts } = await import('contentlayer/generated');
    const { sortPostsByDate, filterPublishedPosts } = await import(
      '@/lib/blog-utils'
    );

    const posts = sortPostsByDate(filterPublishedPosts(allPosts));

    if (posts.length === 0) {
      return 'No blog posts found.';
    }

    const lines = [
      '@@TITLE@@━━━ BLOG POSTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
    ];

    posts.forEach((post, i) => {
      lines.push(`@@TITLE@@${i + 1}. ${post.title} <${post.slug}>`);
      lines.push(
        `   ${formatDate(post.date)} | ${post.tags.slice(0, 3).join(', ')}`
      );
      lines.push(`   ${post.description}\n`);
    });

    lines.push(`@@DIM@@Total: ${posts.length} posts`);
    lines.push(`@@DIM@@Tip: Use "blog show <slug>" to show a specific post`);

    return lines.join('\n');
  } catch {
    return 'Error loading blog posts.';
  }
}

async function handleBlogShow(slug: string): Promise<string> {
  try {
    const { allPosts } = await import('contentlayer/generated');
    const post = allPosts.find(p => p.slug === slug);

    if (!post) {
      return `Post "${slug}" not found.\n\nUse "blog list" to see available posts.`;
    }

    const plainText = post.body.raw
      .replace(/^---[\s\S]*?---\n/, '')
      .replace(/```[\s\S]*?```/g, '[code block]')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .trim();

    const lines = [
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      post.title.toUpperCase(),
      '',
      `By ${post.author} | ${formatDate(post.date)}`,
      `Tags: ${post.tags.join(', ')}`,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      plainText,
      '',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      `@@DIM@@Read full post with formatting: /blog/${post.slug}`,
    ];

    return lines.join('\n');
  } catch {
    return 'Error loading blog post.';
  }
}

async function handleBlogTags(): Promise<string> {
  try {
    const { allPosts } = await import('contentlayer/generated');
    const { getAllTags, filterPublishedPosts } = await import(
      '@/lib/blog-utils'
    );

    const posts = filterPublishedPosts(allPosts);
    const tags = getAllTags(posts);

    if (tags.length === 0) {
      return 'No tags found.';
    }

    const lines = [
      '@@TITLE@@━━━ BLOG TAGS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      tags.map(tag => `  • ${tag}`).join('\n'),
      '',
      `@@DIM@@Total: ${tags.length} tags`,
    ];

    return lines.join('\n');
  } catch {
    return 'Error loading tags.';
  }
}

type SpecialCommandCallback = {
  onThemeChange?: (theme: 'dark' | 'light') => void;
  onDownloadResume?: () => void;
};

interface TerminalStore extends TerminalState {
  callbacks: SpecialCommandCallback;
  setCallbacks: (callbacks: SpecialCommandCallback) => void;
  addToHistory: (command: string) => Promise<void>;
  resetTerminal: () => void;
  setMode: (mode: 'terminal' | 'classic') => void;
  setCurrentInput: (input: string) => void;
  getCommandHistory: () => string[];
}

export const useTerminalStore = create<TerminalStore>()(
  persist(
    (set, get) => ({
      history: [],
      currentInput: '',
      isProcessing: false,
      mode: 'terminal',
      callbacks: {},

      setCallbacks: (callbacks: SpecialCommandCallback) => {
        set({ callbacks });
      },

      addToHistory: async (command: string) => {
        if (!command.trim()) return;

        set({ isProcessing: true });

        const output = await processCommand(command);
        const content = String(output.content);
        const { callbacks } = get();

        let finalContent = content;
        if (content === '__CLEAR__') {
          finalContent = '';
          set({ history: [], isProcessing: false, currentInput: '' });
        }

        if (content.startsWith('__MODE_')) {
          const newMode = content.includes('CLASSIC') ? 'classic' : 'terminal';
          set({ mode: newMode, isProcessing: false, currentInput: '' });
          finalContent = `✓ Switched to ${newMode} mode`;
        }

        if (content === '__THEME_DARK__') {
          callbacks.onThemeChange?.('dark');
          finalContent = '✓ Switched to Dark theme';
        } else if (content === '__THEME_LIGHT__') {
          callbacks.onThemeChange?.('light');
          finalContent = '✓ Switched to Light theme';
        }

        if (content === '__DOWNLOAD_RESUME__') {
          callbacks.onDownloadResume?.();
          finalContent = '✓ Opening resume...';
        }

        if (content === '__BLOG_LIST__') {
          finalContent = await handleBlogList();
        } else if (content.startsWith('__BLOG_SHOW__')) {
          const slug = content.replace('__BLOG_SHOW__', '');
          finalContent = await handleBlogShow(slug);
        } else if (content === '__BLOG_TAGS__') {
          finalContent = await handleBlogTags();
        }

        const newEntry: CommandHistory = {
          id: generateId(),
          command,
          output: { ...output, content: finalContent ?? '' },
          timestamp: new Date(),
        };

        set(state => ({
          history: [...state.history, newEntry],
          currentInput: '',
          isProcessing: false,
        }));
      },

      resetTerminal: () => {
        set({ history: [] });
      },

      setMode: (mode: 'terminal' | 'classic') => {
        set({ mode });
      },

      setCurrentInput: (input: string) => {
        set({ currentInput: input });
      },

      getCommandHistory: () => {
        return get().history.map(h => h.command);
      },
    }),
    {
      name: STORAGE_KEYS.TERMINAL_HISTORY,
      partialize: state => ({
        mode: state.mode,
      }),
    }
  )
);

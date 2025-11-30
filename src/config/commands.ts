import type { Command } from '@/types/terminal';

export const AVAILABLE_COMMANDS: Command[] = [
  {
    name: 'help',
    description: 'Display all available commands',
    usage: 'help',
    aliases: ['h', '?'],
  },
  {
    name: 'about',
    description: 'Learn more about me',
    usage: 'about',
    aliases: ['whoami'],
  },
  {
    name: 'ascii',
    description: 'Display an ASCII art',
    usage: 'ascii [<ascii-name>]',
  },
  {
    name: 'blog',
    description: 'Read my blog posts',
    usage: 'blog [list | show <slug> | tags]',
  },
  {
    name: 'certifications',
    description: 'List my certifications',
    usage: 'certifications',
    aliases: ['certs', 'certificates'],
  },
  {
    name: 'clear',
    description: 'Clear the terminal',
    usage: 'clear',
    aliases: ['cls'],
  },
  {
    name: 'contact',
    description: 'Get my contact information',
    usage: 'contact',
    aliases: ['email'],
  },
  {
    name: 'echo',
    description: 'Display a line of text',
    usage: 'echo <text...>',
    aliases: ['print'],
  },
  {
    name: 'education',
    description: 'Display my educational background',
    usage: 'education',
    aliases: ['edu'],
  },
  {
    name: 'experience',
    description: 'View my work experience',
    usage: 'experience --detailed',
    aliases: ['exp', 'work'],
  },
  {
    name: 'projects',
    description: 'See my projects',
    usage: 'projects [all | show <id>]',
    aliases: ['proj'],
  },
  {
    name: 'mode',
    description: 'Switch between terminal and classic mode',
    usage: 'mode [terminal | classic]',
  },
  {
    name: 'resume',
    description: 'Download my resume',
    usage: 'resume --download',
    aliases: ['cv'],
  },
  {
    name: 'skills',
    description: 'View my technical skills',
    usage: 'skills',
    aliases: ['tech'],
  },
  {
    name: 'social',
    description: 'View my social media links',
    usage: 'social',
  },
  {
    name: 'theme',
    description: 'Change color theme',
    usage: 'theme [dark | light]',
  },
];

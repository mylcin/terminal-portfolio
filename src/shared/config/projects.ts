export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: 'Web App' | 'Mobile App' | 'CLI Tool' | 'Library' | 'Other';
  featured: boolean;
  status: 'In Progress' | 'Completed' | 'Maintained';
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
  image?: string;
  highlights: string[];
}

export const projectsConfig: Project[] = [
  {
    id: 'proj-1',
    title: 'Terminal Portfolio',
    description: 'A modern portfolio website built with Next.js and TypeScript',
    longDescription: `A hybrid portfolio experience that combines a classic website layout with an 
interactive terminal interface. Users can switch between modes seamlessly, exploring content either 
through traditional navigation or by typing commands. Features include blog integration with MDX, 
real-time command suggestions, and a fully responsive design that works across all devices.`,
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
      'Framer Motion',
      'Vercel',
    ],
    category: 'Web App',
    featured: true,
    status: 'Completed',
    links: {
      github: 'https://github.com/mylcin/terminal-portfolio',
      demo: process.env.NEXT_PUBLIC_SITE_URL,
    },
    image: '/projects/portfolio.png',
    highlights: [
      'Modern UI/UX design',
      'Responsive layout',
      'Smooth animations',
      'SEO optimized with 95+ Lighthouse score',
    ],
  },
  {
    id: 'proj-2',
    title: 'Weather CLI',
    description: 'Terminal-based weather application with forecast',
    longDescription: `A command-line weather tool that fetches and displays weather information 
with beautiful ASCII art and color-coded output. Supports multiple cities and forecast data.`,
    technologies: ['Node.js', 'TypeScript', 'Commander.js', 'Chalk'],
    category: 'CLI Tool',
    featured: true,
    status: 'In Progress',
    links: {},
    highlights: [
      'Beautiful ASCII art visualization',
      'Supports 100+ cities worldwide',
    ],
  },
  {
    id: 'proj-3',
    title: 'React Form Builder',
    description: 'Drag-and-drop form builder library for React',
    longDescription: `An open-source form builder library that allows developers to create 
complex forms with drag-and-drop interface. Includes validation, conditional logic, and export functionality.`,
    technologies: ['React', 'TypeScript', 'React DnD', 'Zod'],
    category: 'Library',
    featured: false,
    status: 'In Progress',
    links: {},
    highlights: [
      'Full TypeScript support',
      'Comprehensive documentation',
      'Beta version',
    ],
  },
];

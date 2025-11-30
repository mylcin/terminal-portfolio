export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsConfig: SkillCategory[] = [
  {
    category: 'Front-End',
    skills: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Material UI',
      'Chakra UI',
      'Framer Motion',
      'Redux',
      'Zustand',
      'React Query',
    ],
  },
  {
    category: 'Back-End',
    skills: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'GraphQL',
      'RESTful API',
      'Prisma',
      'TypeORM',
      'Sequelize',
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      'Docker',
      'Git',
      'GitHub',
      'Vercel',
      'Linux',
      'Jenkins',
      'Figma',
      'Vite',
      'Vitest',
      'Postman',
      'Antigravity',
    ],
  },
];

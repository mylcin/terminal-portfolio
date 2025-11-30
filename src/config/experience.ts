export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  startDate: string;
  endDate: string | 'Present';
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experienceConfig: Experience[] = [
  {
    id: 'exp-1',
    company: 'PITON Technology',
    position: 'Front-End Developer',
    location: 'Eskişehir, Türkiye',
    type: 'Full-time',
    startDate: '2023-01',
    endDate: 'Present',
    description:
      'Developing and maintaining web applications using modern technologies.',
    achievements: [
      'Designed and built multiple real-time dashboards serving 10K+ users',
      'Reduced page load time by 70% through optimization',
      'GIS integration for location tracking',
      'Mentored 5 junior developers',
      'Implemented CI/CD pipeline reducing deployment time by 80%',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Material UI',
      'Chakra UI',
      'Zustand',
      'React Query',
    ],
  },
  {
    id: 'exp-2',
    company: 'Freelance',
    position: 'Front-End Web Developer',
    location: 'Isparta, Türkiye',
    type: 'Contract',
    startDate: '2021-12',
    endDate: '2023-01',
    description: 'Freelance work as a front-end web developer.',
    achievements: [
      'Designed and developed for 7 client websites',
      'Reviewed and provided feedback across multiple projects',
      'Optimized and improved performance of legacy applications',
    ],
    technologies: [
      'React',
      'jQuery',
      'Bootstrap',
      'MongoDB',
      'Node.js',
      'Figma',
    ],
  },
  {
    id: 'exp-3',
    company: 'harmonyERP',
    position: 'Software Developer',
    location: 'Sakarya, Türkiye',
    type: 'Internship',
    startDate: '2021-07',
    endDate: '2021-08',
    description: 'Completed 2 months of software development internship.',
    achievements: [
      'Developed 2 projects for local clients',
      'Learned and applied new technologies',
      'Gained experience in team work',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Kotlin', 'Firebase', 'Git'],
  },
];

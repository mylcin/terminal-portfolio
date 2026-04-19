interface SiteConfig {
  name: string;
  description?: string;
  url?: string;
  author: {
    name: string;
    email: string;
    github: string;
    linkedin: string;
  };
  links: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Mustafa Yalçın',
  description: 'Front-End Software Developer Portfolio with Terminal Interface',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  author: {
    name: 'Mustafa Yalçın',
    email: 'mustafa00yalcin@gmail.com',
    github: 'https://github.com/mylcin',
    linkedin: 'https://linkedin.com/in/mustfylcin',
  },
  links: {
    github: 'https://github.com/mylcin',
    linkedin: 'https://linkedin.com/in/mustfylcin',
    instagram: 'https://instagram.com/mustfylcin',
  },
} as const;

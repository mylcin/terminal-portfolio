interface Contact {
  email: string;
  location: string;
  timezone: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
  };
}

export const contactConfig: Contact = {
  email: 'mustafa00yalcin@gmail.com',
  location: 'Eskişehir, Türkiye',
  timezone: 'GMT+3',
  social: {
    github: 'https://github.com/mylcin',
    linkedin: 'https://linkedin.com/in/mustfylcin',
    instagram: 'https://instagram.com/mustfylcin',
  },
} as const;

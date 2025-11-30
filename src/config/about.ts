interface About {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  highlights: string[];
}

export const aboutConfig: About = {
  name: 'Mustafa Yalçın',
  title: 'Front-End Developer',
  bio: `I build interfaces where simplicity and usability come first. 
Most of my work revolves around React, Next.js, and occasionally Node.js for backend tasks. 
I balance screen time with... well, different screen time—books and video games.`,
  location: 'Eskişehir, Türkiye',
  email: 'mustafa00yalcin@gmail.com',
  highlights: [
    '4+ years creating professional software solutions',
    'Shipped 10+ applications to production environments',
    'Proven track record building scalable web platforms',
    'Deep expertise in modern JavaScript frameworks and GIS technologies',
  ],
} as const;

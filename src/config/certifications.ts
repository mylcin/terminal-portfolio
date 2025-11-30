export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export const certificationsConfig: Certification[] = [
  {
    id: 'cert-1',
    name: 'Front-End Developer Bootcamp (with React)',
    issuer: 'techcareer.net',
    date: '2022-11',
    credentialId: '61686239515503',
    credentialUrl: 'https://verified.sertifier.com/tr/verify/61686239515503/',
  },
  {
    id: 'cert-2',
    name: 'Mastering TypeScript - 2022 Edition',
    issuer: 'Udemy',
    date: '2022-12',
    credentialId: 'UC-3df504fe-988b-40d6-b5e5-934ee862a796',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-3df504fe-988b-40d6-b5e5-934ee862a796/',
  },
  {
    id: 'cert-3',
    name: 'Next.js 15 & React - The Complete Guide',
    issuer: 'Udemy',
    date: '2022-12',
    credentialId: 'UC-5e64a055-7dd6-42a7-8b27-eb5165ea4e03',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-5e64a055-7dd6-42a7-8b27-eb5165ea4e03/',
  },
];

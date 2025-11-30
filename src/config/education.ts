export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}

export const educationConfig: Education[] = [
  {
    id: 'edu-1',
    institution: 'Süleyman Demirel University',
    degree: "Bachelor's Degree",
    field: 'Computer Engineering',
    location: 'Isparta, Türkiye',
    startDate: '2018-09',
    endDate: '2022-10',
    gpa: '3.28/4.0',
    achievements: [
      'Graduation with Honor Certificate',
      'Core Team Member of Google Developer Student Clubs',
      'Led multiple technical workshops and coding sessions',
      'Participated in hackathons and coding competitions',
    ],
  },
];

export interface Degree {
  school: string;
  degree: string;
  link: string;
  /** Graduation or completion year shown when no date range is set. */
  year: number;
  startDate?: string;
  endDate?: string;
  location?: string;
  highlights?: string[];
}

const degrees: Degree[] = [
  {
    school: 'University of Texas at Dallas',
    degree:
      'B.S. Business Analytics and Artificial Intelligence, Financial Risk Analysis Concentration',
    link: 'https://www.utdallas.edu/',
    year: 2026,
    startDate: '2024-01-01',
    endDate: '2026-12-01',
    location: 'Richardson, TX',
    highlights: [
      'Relevant coursework: Advanced Applied Artificial Intelligence/Machine Learning, Business Analytics',
      'GPA: 3.9',
      'Honors & awards: Academic Excellence Scholarship, Nash Fellowship, Owlie Award, 3× VASE State Medalist & Gold Seal Winner',
    ],
  },
  {
    school: 'Universidad de Salamanca',
    degree: 'Study abroad — Intermediate Spanish, Grammar, and Conversation',
    link: 'https://www.usal.es/',
    year: 2024,
    startDate: '2024-05-01',
    endDate: '2024-08-31',
    location: 'Salamanca, Spain',
  },
];

export default degrees;

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  url?: string;
}

const certifications: Certification[] = [
  {
    name: 'Agile Foundations',
    issuer: 'Project Management Institute',
    issueDate: '2026-07-01',
    url: 'https://www.pmi.org/',
  },
  {
    name: 'Project Management Foundations',
    issuer: 'Project Management Institute',
    issueDate: '2026-07-01',
    url: 'https://www.pmi.org/',
  },
  {
    name: 'AI Strategy Foundations for Data Scientists and Team Leaders',
    issuer: 'International Institute of Business Analysis (IIBA)',
    issueDate: '2026-07-01',
    url: 'https://www.iiba.org/',
  },
  {
    name: 'Python for Data Science and Machine Learning Essential Training Part 2',
    issuer: 'LinkedIn Learning',
    issueDate: '2026-07-01',
    url: 'https://www.linkedin.com/learning/',
  },
  {
    name: 'AI Solution Design Patterns: Data, Model Training, and Application Architectures',
    issuer: 'LinkedIn Learning',
    issueDate: '2026-07-01',
    url: 'https://www.linkedin.com/learning/',
  },
  {
    name: 'Data Analyst in Python',
    issuer: 'DataCamp',
    issueDate: '2026-05-01',
    url: 'https://www.datacamp.com/',
  },
  {
    name: 'Financial Analyst Job Simulation',
    issuer: 'New York Jobs CEO Council',
    issueDate: '2025-10-01',
  },
  {
    name: "CS50's Web Programming with Python and JavaScript (CS50W)",
    issuer: 'Harvard Online',
    issueDate: '2023-01-01',
    url: 'https://cs50.harvard.edu/web/',
  },
];

export default certifications;

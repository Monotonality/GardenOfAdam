export interface Course {
  title: string;
  number: string;
  link: string;
  university: string;
}

const courses: Course[] = [
  {
    title: 'Advanced Applied Artificial Intelligence/Machine Learning',
    number: 'BUAN 4383',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Business Analytics',
    number: 'BUAN 4353',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Business Finance',
    number: 'FIN 3320',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Data Science for Business Applications',
    number: 'BUAN 4373',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Foundations of Risk Analytics and Applications',
    number: 'FIN 4338',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Probability and Statistics for Management and Economics',
    number: 'STAT 3360',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Quantitative Business Analysis',
    number: 'OPRE 3333',
    link: 'https://www.utdallas.edu/',
    university: 'UT Dallas',
  },
  {
    title: 'Spanish Language and Culture',
    number: 'Study abroad',
    link: 'https://www.usal.es/',
    university: 'Universidad de Salamanca',
  },
  {
    title: 'Web Programming with Python and JavaScript',
    number: 'CS50W',
    link: 'https://cs50.harvard.edu/web/',
    university: 'Harvard University',
  },
];

export default courses;

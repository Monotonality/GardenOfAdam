export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
}

const data: WritingItem[] = [
  {
    title: 'Bridging theory and practice: my internship at Motorola Solutions',
    url: 'https://www.linkedin.com/pulse/bridging-theory-practice-my-internship-motorola-solutions-adam-torres-3gpmc/',
    date: '2026-08-15',
    description:
      'Workflow telemetry, operational optimization, and AI/ML forensics from a Software Systems internship at Motorola Solutions.',
  },
  {
    title: 'Congratulations, OWLIEs: Here are the 2026 winners',
    url: 'https://jindal.utdallas.edu/blog/congratulations-owlies-here-are-the-2026-winners/',
    date: '2026-04-08',
    description:
      'JSOM’s OWLIE recap names me as a Dean’s Council Super OWL honoree for leadership and Apollo—the council operations platform I built as Head of Finance.',
  },
];

export default data;

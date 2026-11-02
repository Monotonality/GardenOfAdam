export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
}

const data: WritingItem[] = [
  {
    title:
      'Empowering peers and saving lives: reflection from 100+ hours of service',
    url: 'https://www.linkedin.com/pulse/empowering-peers-saving-lives-reflection-from-100-hours-adam-torres-hcxmc/',
    date: '2026-11-02',
    description:
      'Harm reduction outreach with End Overdose, academic accessibility support, and student governance work from 100+ hours of community service at UT Dallas.',
  },
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

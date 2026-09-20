/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Actriant',
    position: 'Consulting',
    url: 'https://www.linkedin.com/company/actriant',
    startDate: '2025-08-01',
    summary: `Helping businesses identify people problems and build technical
    solutions to solve them.`,
  },
  {
    name: 'Motorola Solutions',
    position: 'Software Systems Intern',
    url: 'https://www.motorolasolutions.com/',
    startDate: '2026-05-01',
    endDate: '2026-08-31',
    highlights: [
      'Engineered a telemetry pipeline to identify bottlenecks across team operations, identified an opportunity to capture 3,665 annual hours of activity ($818K in 5-year outlook), and delivered 34.8% improvement in targeted workflow processes.',
      'Developed a heuristic matching pipeline using TF-IDF, cosine similarity, and multi-field identity matching to track repeat customer incidents, discovering 16.2% of ticket resolutions returned within 7 days (peaking at 36.2% over 60 days).',
      'Trained Random Forest and Gradient Boosting models on North America ticket metadata to predict resolution time; proved that open-time data lacked predictive signal needed for duration forecasting while identifying a 19.1% false RMA rate.',
      'Conducted cross-regional incident analysis across 5 global teams’ data to evaluate multi-window return rates and data gaps; recommendations target recapturing 11,500+ hours of repeat rework and recovering 34K–37K non-compliant SLA tickets over the next 5 years globally (+12% to +13% lift in SLA-compliant resolution).',
    ],
  },
  {
    name: 'Dallas Formula Racing',
    position: 'Web Team Member / Data Engineer',
    url: 'https://www.utdallas.edu/orgs/dfr/',
    startDate: '2025-08-01',
    endDate: '2026-05-31',
    highlights: [
      'Architected a centralized sponsor analytics platform, structuring relational data models for high-value partners such as Tesla, Ansys, Siemens, and more ($100K+ in sponsors), improving reporting accuracy and stakeholder visibility.',
      'Implemented standardized data workflows and mentored team members on Git-based development and database best practices, improving delivery consistency and data integrity.',
      'Developed and deployed a full-stack data-driven application supporting 80+ internal users and external collaborators.',
    ],
  },
  {
    name: "Undergraduate Dean's Council",
    position: 'Head of Technology (Formerly Head of Finance)',
    url: 'https://jindal.utdallas.edu/',
    startDate: '2024-12-01',
    highlights: [
      'Designed and engineered Apollo, a centralized operations platform built to track attendance, funding requests, and engagement metrics, supporting operational workflows across initiatives for 6,300+ undergraduate students.',
      'Promoted to Head of Technology to standardize and permanently integrate Apollo (an internal analytics and operations platform) into council infrastructure; created a dedicated data and technology team to ensure post-graduation continuity of the project.',
      'Managed organizational fund allocation within a tier-1 university ecosystem ($940M+ operating budget), maintaining strict fiscal compliance and delivering data-backed financial recommendations to JSOM leadership.',
    ],
  },
];

export default work;

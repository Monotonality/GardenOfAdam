import type { MediaSlot, ProjectLink } from "./technical"

export interface ImpactStat {
  value: string
  label: string
  detail: string
}

export interface BusinessCase {
  slug: string
  title: string
  org: string
  period: string
  role: string
  status?: "building"
  summary: string
  points: string[]
  media?: MediaSlot[]
  links?: ProjectLink[]
}

export const businessIntro = {
  name: "Adam Torres",
  eyebrow: "Business Analytics & AI",
  tagline:
    "I turn data into decisions — analytics, data strategy, and technology advisory for leadership teams and the organizations they run.",
  chips: ["Data Strategy", "Analytics", "Advisory", "Leadership"],
}

export const impactStats: ImpactStat[] = [
  {
    value: "$1.19M",
    label: "Annual waste surfaced",
    detail: "Operational waste identified across global datasets at Motorola Solutions.",
  },
  {
    value: "13%",
    label: "SLA compliance lift",
    detail: "34,000–37,000 recaptured tickets projected as recaptured annually worldwide.",
  },
  {
    value: "16,230 hrs",
    label: "Redundant effort exposed",
    detail: "Repeated engineering hours surfaced by ML root-cause classification.",
  },
  {
    value: "$476K",
    label: "Labor waste found",
    detail: "Burdened labor lost to system friction; recaptured $96K+ in annual value.",
  },
  {
    value: "6,300+",
    label: "Students served",
    detail: "Operational platform for the Undergraduate Dean's Council.",
  },
  {
    value: "50 yrs",
    label: "Records digitized",
    detail: "Physical invoices converted to a queryable database (OCR capstone).",
  },
]

export const businessCases: BusinessCase[] = [
  {
    slug: "apollo",
    title: "Apollo — Governance & Advisory Platform",
    org: "Undergraduate Dean's Council · JSOM · UT Dallas",
    period: "Jan 2025 – May 2026",
    role: "Founder · Head of Technology",
    summary:
      "Rebuilt how a 7-committee governance body tracks funding, attendance, and engagement for 6,300+ undergraduate students.",
    points: [
      "Replaced spreadsheet chaos with a single platform and structured data flows.",
      "Provided data-driven financial guidance to JSOM leadership within a $940M+ university operating budget.",
      "Budget allocations and engagement metrics reported directly to executive leadership.",
    ],
  },
  {
    slug: "alias",
    title: "ALIAS — Scholars Program Rebuild",
    org: "AI Leadership & Integrated Analytics Scholars · UT Dallas",
    period: "2026 – Present",
    role: "Engineering Lead · Scope Elicitation",
    status: "building",
    summary:
      "Co-rebuilding the ALIAS scholars program's operating model while building its management platform.",
    points: [
      "Managing committees, structured reporting, and role-based access for the program.",
      "Working alongside the Program Director on organization redesign and business process definition.",
      "Stakeholder scope elicitation feeding the rebuild of program operations.",
    ],
  },
  {
    slug: "housecall",
    title: "HouseCall Teaching — Client CRM",
    org: "HouseCall Teaching · Small Business",
    period: "Mar 2022 – Apr 2025",
    role: "Full-Stack Developer",
    summary: "Centralized client scheduling, student progress tracking, and reporting for a private-lesson business.",
    points: [
      "Unified scheduling, client records, and instruction analytics in one CRM.",
      "Improved visibility into student progress trends to optimize lesson delivery.",
      "Stripe-backed billing integrated into the customer flow.",
    ],
  },
  {
    slug: "lapidary-arts",
    title: "Historical Records Digitization — PM",
    org: "Lapidary Arts · Capstone",
    period: "2026",
    role: "Project Manager — led a team of 5",
    summary: "Directed a capstone team preserving 50 years of physical invoices as a queryable digital archive.",
    points: [
      "Led scope elicitation, planning, meeting minutes, and bottleneck analysis across a 5-person team.",
      "Shipped an OCR pipeline (jina-ocr-1) converting physical invoices into a searchable database.",
      "Delivered with clear milestones and consistent stakeholder communication.",
    ],
  },
  {
    slug: "housing-research",
    title: "Housing Affordability — Rent vs. Buy",
    org: "Independent Research",
    period: "2026 – Present",
    role: "Lead Researcher",
    status: "building",
    summary:
      "Quantifying how the post-pandemic surge in home prices and mortgage rates shifted the breakeven between owning and renting across U.S. metros, 2000–2024.",
    points: [
      "Analyzing FMR, FHFA HPI, 30-year fixed mortgage rates, median income, and CPI rent across thousands of counties.",
      "Identifying metros with the greatest affordability deterioration and price-to-rent shifts.",
      "Producing a paper and presentation for homebuyers, REIT investors, and housing policy boards.",
    ],
    media: [
      {
        kind: "image",
        alt: "Price-to-rent ratio trends by metro",
        caption: "Placeholder — price-to-rent ratio graphs will live here in the final report.",
      },
    ],
    links: [{ label: "Report (coming soon)", href: "#" }],
  },
]

export const businessLeadership: { role: string; org: string; detail: string }[] = [
  {
    role: "Head of Technology (formerly Head of Finance)",
    org: "Undergraduate Dean's Council · UT Dallas",
    detail:
      "Governance and financial oversight for a 7-committee body within a $940M+ university operating budget; built Apollo into core council infrastructure with a dedicated technology team for continuity.",
  },
  {
    role: "Web Team Member / Data Engineer",
    org: "Dallas Formula Racing",
    detail:
      "Sponsor analytics platform and relational data models for $100K+ in corporate partnerships; standardized data pipelines and mentored members on Git and database best practices.",
  },
]

export const businessMemberships = [
  "Motorola Solutions Unidos Business Council",
  "Banking & Financial Markets Association / FinTech Club",
  "Association of Latino Professionals for America (ALPFA)",
  "Business Analytics & AI Leadership Council (ALIAS)",
  "SPYCED Dance Group",
  "National Honor Society",
]

export const businessCredentials = {
  education: [
    {
      school: "University of Texas at Dallas",
      detail: "B.S. Business Analytics & AI · Financial Risk Analysis Concentration · Jan 2024 – Dec 2026",
      extra: "GPA 3.92 · Academic Excellence Scholarship · Nash Fellowship · Owlie Award · 3x VASE State Medalist",
    },
    {
      school: "Universidad de Salamanca",
      detail: "Study Abroad — Intermediate Spanish · May 2024 – Aug 2024",
    },
  ],
  certifications: [
    "AI Strategy Foundations for Data Scientists and Team Leaders (IIBA)",
    "Agile Foundations (PMI)",
    "CS50W (Harvard)",
  ],
  languages: ["English (Native)", "Spanish (Limited Working Proficiency)"],
}
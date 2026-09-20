export interface ProjectLink {
  label: string
  href: string
}

export type ProjectStatus = "building" | "active" | "prototype" | "delivered"

export interface Project {
  slug: string
  title: string
  org: string
  period: string
  role?: string
  status: ProjectStatus
  preview: string
  summary: string
  highlights: string[]
  stack: string[]
  links?: ProjectLink[]
}

export interface ImpactStat {
  value: string
  label: string
  detail: string
}

export const about = {
  name: "Adam Torres",
  roles: "Engineer, ML builder, data and analytics lead.",
  line: "I build systems that turn messy operations into structured, measurable ones.",
  bio: [
    "Full-stack engineer focused on AI/ML systems, real-time retrieval, and data pipelines at Motorola Solutions.",
    "Founder and head of technology behind the governance and analytics platform that runs the Undergraduate Dean's Council at UT Dallas.",
    "I also grow a small garden of personal tools — live now at ",
  ],
  email: "adam.j.tor@gmail.com",
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
    detail: "34,000–37,000 recaptured tickets projected annually worldwide.",
  },
  {
    value: "16,230 hrs",
    label: "Redundant effort exposed",
    detail: "Repeated engineering hours surfaced by ML root-cause classification.",
  },
  {
    value: "$96K+",
    label: "Annual value recaptured",
    detail: "Burdened labor lost to system friction, now recovered.",
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

export const projects: Project[] = [
  {
    slug: "signal",
    title: "SIGNAL — Real-Time Knowledge Retrieval",
    org: "Motorola Solutions · Hackolades 2026",
    period: "May 2026 – Jul 2026",
    status: "prototype",
    preview: "Voice-to-retrieval RAG pipeline putting live troubleshooting knowledge in front of support technicians.",
    summary:
      "Prototyped an end-to-end, asynchronous RAG pipeline that delivers real-time troubleshooting knowledge to live support technicians.",
    highlights: [
      "Voice-to-intent pipeline converting call audio to text streams with heuristic parsing for dynamic query formulation.",
      "Parallel async queries across four enterprise knowledge bases: vector store, MSI library, ServiceNow KB, Salesforce.",
      "Unstructured data ETL ingesting team docs and chat history into searchable vector embeddings.",
      "Ranked and pushed relevant context payloads to the SIGNAL dashboard UI in real time.",
    ],
    stack: ["RAG", "Vector DB", "ETL", "Async", "Frontend"],
  },
  {
    slug: "ticket-recurrence",
    title: "Ticket Recurrence Diagnostic Pipeline",
    org: "Motorola Solutions",
    period: "Jun 2026 – Present",
    status: "active",
    preview: "Diagnosing recurring 'boomerang' tickets with text similarity and hypothesis testing.",
    summary:
      "Heuristic and rule-based pipeline for detecting recurring ticket pairs and diagnosing the root causes behind boomerang tickets.",
    highlights: [
      "Boomerang detection via short-description text similarity and operational category tiers.",
      "RMA and defect correlation: 19% of 60-day boomerangs involved RMAs; 72% of repeat cases classified as core engineering or system defects rather than user errors.",
      "Hypothesis testing debunked rushed closures by comparing close-note word counts and RCA keyword density against non-boomerang controls.",
    ],
    stack: ["Python", "Pandas", "Text Similarity", "Hypothesis Testing"],
  },
  {
    slug: "sla-pipeline",
    title: "SLA Breach Predictive Diagnostics",
    org: "Motorola Solutions",
    period: "May 2026 – Present",
    status: "active",
    preview: "Predictive classifiers on 1,000+ annual SLA breaches to find the real drivers.",
    summary:
      "Random Forest and Gradient Boosting classifiers on historical ticket metadata, diagnosing the drivers behind 1,000+ annual SLA breaches.",
    highlights: [
      "Trained and evaluated random forest and gradient boosting classifiers on historical ticket metadata.",
      "Feature importance surfaced the open-time attributes most tied to calendar duration: company state, time opened, assignee.",
      "Found open-time metadata lacks consistent predictive power for duration, guiding a shift toward continuous prediction.",
    ],
    stack: ["Random Forest", "Gradient Boosting", "Scikit-learn", "Python", "Pandas"],
  },
  {
    slug: "apollo",
    title: "Apollo — Governance Operations ERP",
    org: "Undergraduate Dean's Council · JSOM · UT Dallas",
    period: "Jan 2025 – May 2026",
    role: "Founder · Head of Technology",
    status: "delivered",
    preview: "A governance ERP replacing spreadsheets for 40+ members across 7 committees.",
    summary:
      "Designed, engineered, and deployed a centralized operations and analytics platform for governance, resource distribution, and engagement tracking.",
    highlights: [
      "Full-stack React and Next.js portal with PostgreSQL and Supabase, replacing fragmented spreadsheets with structured relational pipelines.",
      "Automated attendance, budget allocations, and engagement metrics for 40+ members across 7 committees serving 6,300+ students.",
      "Streamlined capital funding requests and multi-committee workflow tracking, cutting administrative overhead and manual reporting.",
      "Built Apollo into core council infrastructure with a dedicated technology team for continuity.",
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase"],
  },
  {
    slug: "alias",
    title: "ALIAS — Scholars Program Operations",
    org: "AI Leadership & Integrated Analytics Scholars · UT Dallas",
    period: "2026 – Present",
    role: "Engineering Lead · Scope Elicitation",
    status: "building",
    preview: "An operations platform and program rebuild for the ALIAS scholars program.",
    summary:
      "Building an operations platform for the ALIAS scholars program — committees, reporting, and role-based access — while helping rebuild the program's business processes.",
    highlights: [
      "Manages committees, structured reporting, and role-based access across the scholars program.",
      "Working directly with the Program Director to rebuild organization and business processes.",
      "Driving scope elicitation and requirements discovery with stakeholders.",
    ],
    stack: ["PostgreSQL", "Supabase", "Vercel", "Next.js"],
  },
  {
    slug: "housecall",
    title: "HouseCall Teaching — Client CRM",
    org: "HouseCall Teaching · Small business",
    period: "Mar 2022 – Apr 2025",
    role: "Full-Stack Developer",
    status: "delivered",
    preview: "One place for scheduling, progress, and billing across a private-lesson business.",
    summary:
      "Centralized client scheduling, student progress tracking, and billing for a private-lesson business.",
    highlights: [
      "Unified scheduling, client records, and instruction analytics in one CRM.",
      "Improved visibility into student progress trends to optimize lesson delivery.",
      "Stripe-backed billing integrated into the customer flow.",
    ],
    stack: ["Next.js", "Stripe"],
  },
  {
    slug: "lapidary-arts",
    title: "Historical Records Digitization",
    org: "Lapidary Arts · Capstone",
    period: "2026",
    role: "Project Manager (led a team of 5)",
    status: "delivered",
    preview: "OCR digitization of 50 years of physical invoices into a queryable archive.",
    summary:
      "OCR pipeline converting 50 years of physical invoices into a digital, queryable database for historical data preservation.",
    highlights: [
      "Deployed jina-ocr-1, a 3.4B parameter model, for high-accuracy invoice extraction.",
      "Converted physical invoices into a structured, queryable digital database.",
      "Owned project management: scope elicitation, minutes, planning, and bottleneck analysis.",
    ],
    stack: ["jina-ocr", "Python", "OCR", "PostgreSQL"],
  },
  {
    slug: "dfr",
    title: "Sponsor Analytics & Operations Platform",
    org: "Dallas Formula Racing",
    period: "Aug 2025 – Nov 2025",
    role: "Web Team Member · Data Engineer",
    status: "delivered",
    preview: "Sponsor analytics platform for $100K+ in annual corporate partnerships.",
    summary:
      "Web-based data application replacing ad-hoc tracking with structured relational pipelines for corporate partnerships.",
    highlights: [
      "Partner analytics modules improving reporting accuracy for sponsorships valued at $100K+ annually.",
      "Standardized Git-based development workflows and mentored members on relational database best practices.",
      "Django and Next.js app serving 80+ internal team members and external stakeholders.",
    ],
    stack: ["Django", "Django REST", "PostgreSQL", "Next.js", "Git"],
  },
  {
    slug: "housing-research",
    title: "Housing Affordability — Rent vs. Buy",
    org: "Independent research",
    period: "2026 – Present",
    role: "Lead Researcher",
    status: "building",
    preview: "Quantifying rent-vs-own breakevens across U.S. metros, 2000–2024.",
    summary:
      "Quantifying how the post-pandemic surge in home prices and mortgage rates shifted the breakeven between owning and renting across U.S. metros, 2000–2024.",
    highlights: [
      "Analyzing FMR, FHFA HPI, 30-year fixed mortgage rates, median income, and CPI rent across thousands of counties.",
      "Identifying metros with the greatest affordability deterioration and price-to-rent shifts.",
      "Producing a paper and presentation for homebuyers, REIT investors, and housing policy boards.",
    ],
    stack: ["Python", "Pandas", "NumPy"],
  },
]

export interface ExperienceEntry {
  role: string
  org: string
  period: string
  detail: string
}

export const resume = {
  experience: [
    {
      role: "Contributor — ML Diagnostics",
      org: "Motorola Solutions",
      period: "May 2026 – Present",
      detail:
        "Predictive and root-cause diagnostics across 1,000+ annual SLA breaches and recurring tickets. Surfaced $1.19M in annual operational waste and projected 34,000–37,000 recaptured tickets worldwide.",
    },
    {
      role: "Head of Technology (formerly Head of Finance)",
      org: "Undergraduate Dean's Council · UT Dallas",
      period: "Jan 2025 – May 2026",
      detail:
        "Governance and financial oversight for a 7-committee body within a $940M+ university operating budget. Built Apollo into core council infrastructure with a dedicated technology team for continuity.",
    },
    {
      role: "Web Team Member / Data Engineer",
      org: "Dallas Formula Racing",
      period: "Aug 2025 – Nov 2025",
      detail:
        "Sponsor analytics platform and relational data models for $100K+ in corporate partnerships. Standardized data pipelines and mentored members on Git and database best practices.",
    },
    {
      role: "Full-Stack Developer",
      org: "HouseCall Teaching",
      period: "Mar 2022 – Apr 2025",
      detail:
        "Centralized client scheduling, student progress tracking, and billing in one CRM for a private-lesson business.",
    },
  ],
  education: [
    {
      school: "University of Texas at Dallas",
      detail: "B.S. Business Analytics & AI · Financial Risk Analysis Concentration",
      period: "Jan 2024 – Dec 2026",
      extra:
        "GPA 3.92 · Academic Excellence Scholarship · Nash Fellowship · Owlie Award · 3x VASE State Medalist",
    },
    {
      school: "Universidad de Salamanca",
      detail: "Study abroad, Intermediate Spanish",
      period: "May 2024 – Aug 2024",
    },
  ],
  certifications: [
    "AI Strategy Foundations for Data Scientists and Team Leaders (IIBA)",
    "Agile Foundations (PMI)",
    "CS50W (Harvard)",
  ],
  languages: ["English (native)", "Spanish (limited working proficiency)"],
  memberships: [
    "Motorola Solutions Unidos Business Council",
    "Banking & Financial Markets Association / FinTech Club",
    "Association of Latino Professionals for America (ALPFA)",
    "Business Analytics & AI Leadership Council (ALIAS)",
    "SPYCED Dance Group",
    "National Honor Society",
  ],
  skills: [
    {
      label: "Data, ML and AI",
      items: [
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Random Forest",
        "Gradient Boosting",
        "Supervised Learning",
        "Feature Importance",
        "Hypothesis Testing",
        "TF-IDF",
        "Vector Databases",
        "RAG",
        "OCR",
      ],
    },
    {
      label: "Programming and frameworks",
      items: [
        "Python",
        "R",
        "SQL",
        "TypeScript",
        "JavaScript",
        "C++",
        "Java",
        "Next.js",
        "React",
        "Django",
        "HTML/CSS",
        "Git",
      ],
    },
    {
      label: "Data infrastructure and tools",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Supabase",
        "Firebase",
        "Power BI",
        "Tableau",
        "ServiceNow",
        "Excel",
      ],
    },
  ],
}
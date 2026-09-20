export type Mode = "technical" | "business"

export interface MediaSlot {
  kind: "image" | "video"
  /** Optional — when undefined, renders a captioned placeholder slot. */
  src?: string
  alt: string
  caption: string
}

export interface ProjectLink {
  label: string
  href: string
}

export interface TechnicalProject {
  slug: string
  title: string
  org: string
  period: string
  role?: string
  status?: "building"
  preview: string
  summary: string
  highlights: string[]
  stack: string[]
  media?: MediaSlot[]
  links?: ProjectLink[]
}

export const technicalIntro = {
  name: "Adam Torres",
  prompt: "adam@torres ~ %",
  tagline: "> engineer + ml builder — turning messy operations into structured systems",
  bio: "Full-stack engineer focused on AI/ML systems, real-time retrieval, and data pipelines. I build products that replace spreadsheets, surface defects, and serve decisions in real time.",
  chips: ["Next.js", "React", "Python", "SQL", "RAG", "ML"],
}

export const technicalProjects: TechnicalProject[] = [
  {
    slug: "signal",
    title: "SIGNAL — Real-Time Knowledge Retrieval",
    org: "Motorola Solutions · Hackolades 2026",
    period: "May 2026 – Jul 2026",
    preview: "Voice-to-retrieval RAG pipeline putting live troubleshooting knowledge in front of support technicians.",
    summary:
      "Prototyped an end-to-end, asynchronous RAG pipeline delivering real-time troubleshooting knowledge to live support technicians.",
    highlights: [
      "Voice-to-intent pipeline converting call audio to text streams with heuristic parsing for dynamic query formulation.",
      "Parallel async queries across 4 enterprise knowledge bases (Vector Store, MSI Library, ServiceNow KB, Salesforce).",
      "Unstructured data ETL ingesting team docs and chat history into searchable vector embeddings.",
      "Ranked and pushed relevant context payloads to the SIGNAL dashboard UI in real time.",
    ],
    stack: ["RAG", "Vector DB", "ETL", "Async", "Frontend"],
    media: [
      {
        kind: "image",
        alt: "SIGNAL system architecture diagram",
        caption:
          "End-to-end voice-to-retrieval pipeline: transcript → intent → parallel KB queries → ranking → dashboard.",
      },
    ],
    links: [{ label: "Demo", href: "#" }],
  },
  {
    slug: "ticket-recurrence",
    title: "Ticket Recurrence Diagnostic Pipeline",
    org: "Motorola Solutions",
    period: "Jun 2026 – Present",
    preview: "Diagnosing recurring 'boomerang' tickets with text similarity and hypothesis testing.",
    summary:
      "Heuristic/rule-based pipeline for detecting recurring ticket pairs and diagnosing the root causes behind 'boomerang' tickets.",
    highlights: [
      "Boomerang detection via short-description text similarity and operational category tiers.",
      "RMA & defect correlation: 19% of 60-day boomerangs involved RMAs; 72% of repeat cases classified as core engineering/system defects rather than user errors.",
      "Hypothesis testing debunked 'rushed closures' by comparing close-note word counts and RCA keyword density against non-boomerang controls.",
    ],
    stack: ["Python", "Pandas", "Text Similarity", "Hypothesis Testing"],
    media: [
      {
        kind: "image",
        alt: "Boomerang ticket issue classification chart",
        caption: "72% of recurring incidents stem from core engineering/system defects.",
      },
    ],
  },
  {
    slug: "sla-pipeline",
    title: "SLA Breach Predictive Diagnostics",
    org: "Motorola Solutions",
    period: "May 2026 – Present",
    preview: "Predictive classifiers on 1,000+ annual SLA breaches to find the real drivers.",
    summary:
      "Random Forest and Gradient Boosting classifiers on historical ticket metadata diagnosing the drivers behind 1,000+ annual SLA breaches.",
    highlights: [
      "Trained and evaluated RF / gradient boosting classifiers on historical ticket metadata.",
      "Feature importance surfaced open-time attributes most tied to calendar duration (company state, time opened, assignee).",
      "Concluded open-time metadata lacks consistent predictive power for duration — guiding a shift toward continuous prediction.",
    ],
    stack: ["Random Forest", "Gradient Boosting", "Scikit-learn", "Python", "Pandas"],
  },
  {
    slug: "apollo",
    title: "Apollo — Governance Operations ERP",
    org: "Undergraduate Dean's Council · JSOM · UT Dallas",
    period: "Jan 2025 – May 2026",
    role: "Founder · Head of Technology",
    preview: "A governance ERP replacing spreadsheets for 40+ members across 7 committees.",
    summary:
      "Designed, engineered, and deployed a centralized operations and analytics platform for governance, resource distribution, and engagement tracking.",
    highlights: [
      "Full-stack React/Next.js + PostgreSQL/Supabase portal replacing fragmented spreadsheets with structured relational pipelines.",
      "Automated attendance tracking, budget allocations, and engagement metrics for 40+ members across 7 committees serving 10,000+ students.",
      "Streamlined capital funding requests and multi-committee workflow tracking, cutting administrative overhead and manual reporting.",
    ],
    stack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase"],
  },
  {
    slug: "alias",
    title: "ALIAS — Scholars Program Operations",
    org: "AI Leadership & Integrated Analytics Scholars · UT Dallas",
    period: "2026 – Present",
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
    slug: "lapidary-arts",
    title: "Historical Records Digitization",
    org: "Lapidary Arts · Capstone",
    period: "2026",
    role: "Project Manager — led a team of 5",
    preview: "OCR digitization of 50 years of physical invoices into a queryable archive.",
    summary:
      "OCR pipeline converting 50 years of physical invoices into a digital, queryable database for historical data preservation.",
    highlights: [
      "Deployed jina-ocr-1 (3.4B parameter model) for high-accuracy invoice extraction.",
      "Converted physical invoices into a structured, queryable digital database.",
      "Owned project management: scope elicitation, minutes, planning, and bottleneck analysis.",
    ],
    stack: ["jina-ocr", "Python", "OCR", "PostgreSQL"],
    links: [{ label: "Project", href: "#" }],
  },
  {
    slug: "dfr",
    title: "Sponsor Analytics & Operations Platform",
    org: "Dallas Formula Racing",
    period: "Aug 2025 – Nov 2025",
    preview: "Sponsor analytics platform for $100K+ in annual corporate partnerships.",
    summary:
      "Web-based data application replacing ad-hoc tracking with structured relational pipelines for corporate partnerships.",
    highlights: [
      "Partner analytics modules improving reporting accuracy for sponsorships valued at $100K+ annually.",
      "Standardized Git-based development workflows and mentored members on relational database best practices.",
      "Django/PostgreSQL/Next.js app serving 80+ internal team members and external stakeholders.",
    ],
    stack: ["Django", "Django REST", "PostgreSQL", "Next.js", "Git"],
  },
]

export const technicalSkillGroups: { label: string; items: string[] }[] = [
  {
    label: "Data, ML & AI",
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
    label: "Programming & Frameworks",
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
    label: "Data Infrastructure & Tools",
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
]
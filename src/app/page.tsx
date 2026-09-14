import Link from "next/link"

interface ResumeEntry {
  heading: string
  org: string
  location: string
  dates: string
  details: string[]
}

interface EducationEntry {
  school: string
  location: string
  degree: string
  dates: string
  details: string[]
}

const education: EducationEntry[] = [
  {
    school: "University of Texas at Dallas",
    location: "Richardson, TX",
    degree:
      "B.S. Business Analytics and Artificial Intelligence, Financial Risk Analysis Concentration",
    dates: "Jan 2024 – Dec 2026",
    details: [
      "Relevant Coursework: Advanced Applied Artificial Intelligence/Machine Learning, Business Analytics | GPA: 3.92",
      "Honors & Awards: Academic Excellence Scholarship, Nash Fellowship, Owlie Award, 3x VASE State Medalist & Gold Seal Winner",
    ],
  },
  {
    school: "Universidad de Salamanca",
    location: "Salamanca, Spain",
    degree: "Study Abroad — Intermediate Spanish, Grammar, and Conversation",
    dates: "May 2024 – Aug 2024",
    details: [],
  },
]

const experience: ResumeEntry[] = [
  {
    heading: "Software Systems Intern",
    org: "Motorola Solutions",
    location: "Allen, TX",
    dates: "May 2026 – Aug 2026",
    details: [
      "Conducted advanced analytics over global operational datasets to identify workflow bottlenecks and business process improvements, surfacing $1,198,684 in total annual waste.",
      "Devised targeted optimization strategies across 5 international teams to recapture non-SLA compliant tickets, projecting 34,000–37,000 recaptured tickets annually (~13% lift in worldwide SLA compliance rate).",
      "Deployed machine learning models to identify repeat ticket root causes and classify recurring issues, exposing 16,230 hours of redundant engineering effort.",
      "Pinpointed $476,000+ in wasted burdened labor costs from system friction within a primary North American team; designed and executed immediate workflow solutions to recapture $96,000+ in annual value.",
      "Presented weekly analytical findings, data visualizations, and strategic implementation roadmaps directly to executive leadership and boards of management.",
    ],
  },
]

const leadership: ResumeEntry[] = [
  {
    heading: "Head of Technology (Formerly Head of Finance)",
    org: "Undergraduate Dean's Council",
    location: "Richardson, TX",
    dates: "Dec 2024 – Present",
    details: [
      "Designed and engineered \"Apollo,\" a centralized operations platform built to track attendance, funding requests, and engagement metrics for 6,300+ undergraduate students.",
      "Promoted to Head of Technology to standardize Apollo into core council infrastructure and established a dedicated technology team to ensure post-graduation continuity.",
      "Managed organizational fund allocations within a tier-1 university ecosystem ($940M+ operating budget), ensuring strict compliance and providing data-driven financial guidance to JSOM leadership.",
    ],
  },
  {
    heading: "Web Team Member / Data Engineer",
    org: "Dallas Formula Racing",
    location: "Richardson, TX",
    dates: "Aug 2025 – May 2026",
    details: [
      "Architected a sponsor analytics platform and structured relational data models for key corporate partners ($100K+ sponsorship value), enhancing reporting precision and stakeholder visibility.",
      "Established standardized data pipelines and mentored members on Git workflows and database best practices to strengthen code quality and data integrity.",
      "Engineered and deployed full-stack data applications serving 80+ internal team members and external stakeholders.",
    ],
  },
]

const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Data, ML & AI",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Random Forest",
      "Gradient Boosting",
      "Supervised Learning",
      "Feature Importance Analysis",
      "Hypothesis Testing",
      "TF-IDF Vectorization",
      "Cosine Similarity",
      "Vector Databases",
      "RAG (Retrieval-Augmented Generation)",
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
      "SCSS",
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
      "Power BI",
      "Tableau",
      "ServiceNow",
      "Excel",
      "Google Sheets",
    ],
  },
]

const certifications = [
  "AI Strategy Foundations for Data Scientists and Team Leaders (IIBA)",
  "Agile Foundations (PMI)",
  "CS50W (Harvard)",
]

const languages = ["English (Native)", "Spanish (Limited Working Proficiency)"]

const clubs = [
  "Motorola Solutions Unidos Business Council",
  "FinTech Club",
  "Association of Latino Professionals for America (ALPFA)",
  "Business Analytics and Artificial Intelligence Leadership Council (ALIAS)",
  "SPYCED Dance Group",
  "National Honor Society",
]

const interests = [
  "Statistics",
  "Piano",
  "Fine Art",
  "Muay Thai",
  "History",
  "Philosophy",
  "Teaching",
  "Reading",
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="border-b border-zinc-800 pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
        {title}
      </h2>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  )
}

function Entry({ entry }: { entry: ResumeEntry }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">{entry.heading}</h3>
          <p className="text-xs text-zinc-400">
            {entry.org} · {entry.location}
          </p>
        </div>
        <p className="shrink-0 text-xs text-zinc-500">{entry.dates}</p>
      </div>
      {entry.details.length > 0 && (
        <ul className="space-y-1.5">
          {entry.details.map((detail) => (
            <li key={detail} className="text-sm leading-relaxed text-zinc-400">
              {detail}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-zinc-800 bg-zinc-900/50 px-2 py-1 text-xs text-zinc-300"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased">
      <main className="mx-auto max-w-3xl px-6 py-16">
        <header className="border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Adam Torres</h1>
          <p className="mt-3 text-base text-zinc-300">
            Software engineer &amp; data analyst — Motorola Solutions · UT Dallas · Harvard ·
            Dean&apos;s Council
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-500">
            <a href="mailto:adam.j.tor@gmail.com" className="underline-offset-4 hover:text-zinc-300 hover:underline">
              adam.j.tor@gmail.com
            </a>
          </div>
        </header>

        <Section title="Education">
          {education.map((entry) => (
            <div key={entry.school} className="space-y-2">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-100">{entry.school}</h3>
                  <p className="text-xs text-zinc-400">
                    {entry.degree}
                    {entry.location && ` — ${entry.location}`}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-zinc-500">{entry.dates}</p>
              </div>
              {entry.details.length > 0 && (
                <ul className="space-y-1.5">
                  {entry.details.map((detail) => (
                    <li key={detail} className="text-sm leading-relaxed text-zinc-400">
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        <Section title="Experience">
          {experience.map((entry) => (
            <Entry key={entry.heading} entry={entry} />
          ))}
        </Section>

        <Section title="Leadership & Activities">
          {leadership.map((entry) => (
            <Entry key={entry.heading} entry={entry} />
          ))}
        </Section>

        <Section title="Skills">
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label} className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {group.label}
                </h3>
                <TagList items={group.items} />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Certifications">
          <TagList items={certifications} />
        </Section>

        <Section title="Languages">
          <ul className="space-y-1.5">
            {languages.map((language) => (
              <li key={language} className="text-sm text-zinc-400">
                {language}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Clubs & Societies">
          <ul className="space-y-1.5">
            {clubs.map((club) => (
              <li key={club} className="text-sm text-zinc-400">
                {club}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Interests">
          <TagList items={interests} />
        </Section>
      </main>

      <footer className="flex flex-col items-center gap-2 pb-8">
        <p className="text-xs text-zinc-700">© {new Date().getFullYear()} Adam Torres</p>
        <Link
          href="/apps"
          aria-label="Apps"
          title="Apps"
          className="text-zinc-700 transition-colors hover:text-zinc-400"
        >
          ✦
        </Link>
      </footer>
    </div>
  )
}
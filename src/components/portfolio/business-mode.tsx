import {
  businessCases,
  businessCredentials,
  businessIntro,
  businessLeadership,
  businessMemberships,
  impactStats,
} from "@/lib/portfolio/business"
import { EngagementReader } from "./engagement-reader"

export function BusinessMode() {
  const { education, certifications, languages } = businessCredentials

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <section>
        <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
          {businessIntro.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {businessIntro.tagline}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {businessIntro.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-burgundy/30 px-3 py-1 text-xs font-medium text-burgundy"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h2 className="font-serif text-xl font-semibold tracking-tight">Measured impact</h2>
        <dl className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-burgundy/40 pl-4">
              <dd className="font-serif text-3xl font-semibold leading-none">{stat.value}</dd>
              <dt className="mt-2 text-sm font-medium">{stat.label}</dt>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Selected engagements</h2>
        <EngagementReader cases={businessCases} />
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Leadership</h2>
        <div className="mt-6 space-y-5">
          {businessLeadership.map((item) => (
            <div key={`${item.role}-${item.org}`}>
              <h3 className="font-medium">{item.role}</h3>
              <p className="text-sm text-muted-foreground">{item.org}</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground/75">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-serif text-2xl font-medium tracking-tight">Credentials</h2>
        <div className="mt-6 space-y-5">
          {education.map((item) => (
            <div key={item.school}>
              <h3 className="font-medium">{item.school}</h3>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
              {item.extra && <p className="mt-1 text-sm text-foreground/75">{item.extra}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground">Certifications</h3>
          <ul className="mt-2 space-y-1">
            {certifications.map((cert) => (
              <li key={cert} className="text-sm text-foreground/80">
                {cert}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground">Languages</h3>
          <ul className="mt-2 space-y-1">
            {languages.map((lang) => (
              <li key={lang} className="text-sm text-foreground/80">
                {lang}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium text-muted-foreground">Involvement</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">
            {businessMemberships.join(", ")}
          </p>
        </div>
      </section>
    </div>
  )
}
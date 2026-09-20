"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { resume } from "@/lib/portfolio"

function MetaLine({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs text-muted-foreground">{children}</p>
}

function ExperienceBlock() {
  return (
    <div className="space-y-7">
      {resume.experience.map((entry) => (
        <div key={entry.role} className="print-avoid-break">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-medium">{entry.role}</h3>
            <MetaLine>{`${entry.org} · ${entry.period}`}</MetaLine>
          </div>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {entry.detail}
          </p>
        </div>
      ))}
    </div>
  )
}

function EducationBlock() {
  return (
    <div className="space-y-7">
      {resume.education.map((entry) => (
        <div key={entry.school} className="print-avoid-break">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-base font-medium">{entry.school}</h3>
            <MetaLine>{entry.period}</MetaLine>
          </div>
          <p className="mt-1.5 text-sm text-foreground/90">{entry.detail}</p>
          {entry.extra ? (
            <p className="mt-1 text-sm text-muted-foreground">{entry.extra}</p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function CertificationsBlock() {
  return (
    <ul className="space-y-2">
      {resume.certifications.map((certification) => (
        <li key={certification} className="flex items-baseline gap-3 text-sm leading-relaxed">
          <span className="size-1 shrink-0 translate-y-[-2px] rounded-full bg-moss" aria-hidden />
          <span>{certification}</span>
        </li>
      ))}
    </ul>
  )
}

function SkillsBlock() {
  const groups = [{ label: "All", items: resume.skills.flatMap((group) => group.items) }, ...resume.skills]
  const [active, setActive] = useState(0)

  const items = groups[active].items

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 print-hide" role="group" aria-label="Filter skills">
        {groups.map((group, index) => (
          <button
            key={group.label}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
              active === index
                ? "border-moss bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-live="polite">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
      {active === 0 ? null : (
        <p className="mt-6 border-t border-border pt-2 font-mono text-xs text-muted-foreground print-hide">
          Showing {items.length} of{" "}
          {resume.skills.reduce((total, group) => total + group.items.length, 0)} skills in{" "}
          {groups[active].label}.
        </p>
      )}
    </div>
  )
}

function SideBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <MetaLine>{title}</MetaLine>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-foreground/90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Section({
  id,
  heading,
  hint,
  children,
}: {
  id: string
  heading: string
  hint?: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border pt-8">
      <div className="mb-7 flex items-baseline gap-3">
        <h2 className="font-display text-3xl font-medium tracking-tight">{heading}</h2>
        {hint ? <span className="font-mono text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </section>
  )
}

export function Resume() {
  return (
    <div className="space-y-14 print-avoid-break">
      <Section id="experience" heading="Experience" hint={`(${resume.experience.length})`}>
        <ExperienceBlock />
      </Section>
      <Section id="education" heading="Education" hint={`(${resume.education.length})`}>
        <EducationBlock />
      </Section>
      <Section id="certifications" heading="Certifications" hint={`(${resume.certifications.length})`}>
        <div className="max-w-2xl">
          <CertificationsBlock />
        </div>
      </Section>
      <Section id="skills" heading="Skills" hint="(filterable)">
        <SkillsBlock />
      </Section>
      <Section id="elsewhere" heading="Elsewhere">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <SideBlock title="Languages" items={resume.languages} />
          <SideBlock title="Involvement" items={resume.memberships} />
        </div>
      </Section>
    </div>
  )
}
"use client"

import { useId, useState } from "react"
import { ChevronDown } from "lucide-react"
import { projects, type Project, type ProjectStatus } from "@/lib/portfolio"

const STATUS_LABELS: Record<ProjectStatus, { label: string; className: string }> = {
  delivered: { label: "Delivered", className: "text-moss" },
  active: { label: "In progress", className: "text-foreground/80" },
  building: { label: "Building", className: "text-foreground/80" },
  prototype: { label: "Prototype", className: "text-muted-foreground" },
}

function ProjectRow({
  project,
  baseId,
  open,
  onToggle,
}: {
  project: Project
  baseId: string
  open: boolean
  onToggle: () => void
}) {
  const status = STATUS_LABELS[project.status]
  const detailId = `${baseId}-${project.slug}`

  return (
    <li className="border-b border-border print-avoid-break">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={detailId}
        className="group flex w-full items-start gap-4 py-6 text-left sm:items-baseline sm:gap-6"
      >
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs text-muted-foreground">
            {project.org}
            {project.period ? ` · ${project.period}` : ""}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-medium tracking-tight group-hover:text-moss sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.preview}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 pt-0.5 sm:mt-5">
          <span className={`whitespace-nowrap font-mono text-[11px] ${status.className}`}>
            {status.label}
          </span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </div>
      </button>
      <div
        id={detailId}
        className={open ? "pb-8" : "hidden"}
      >
        <div className="max-w-2xl space-y-4">
          <p className="text-sm leading-relaxed text-foreground/90">{project.summary}</p>
          <ul className="space-y-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-moss" aria-hidden />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-1.5 pt-1 print-hide">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
              >
                {item}
              </span>
            ))}
            {project.role ? (
              <span className="ml-auto text-xs text-muted-foreground">{project.role}</span>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  )
}

export function ProjectList() {
  const baseId = useId()
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <ul className="border-t border-border">
      {projects.map((project) => (
        <ProjectRow
          key={project.slug}
          project={project}
          baseId={baseId}
          open={openSlug === project.slug}
          onToggle={() => setOpenSlug((current) => (current === project.slug ? null : project.slug))}
        />
      ))}
    </ul>
  )
}
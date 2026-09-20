"use client"

import { useId, useState } from "react"
import { Minus, Plus, Wrench } from "lucide-react"
import type { TechnicalProject } from "@/lib/portfolio/technical"
import { MediaSlot } from "./media-slot"

export function ProjectExplorer({ projects }: { projects: TechnicalProject[] }) {
  const baseId = useId()
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const toggle = (slug: string) => setOpenSlug((current) => (current === slug ? null : slug))

  return (
    <ul className="mt-6 border-y border-border">
      {projects.map((project, i) => {
        const open = openSlug === project.slug
        const hover = hovered === project.slug
        const index = String(i + 1).padStart(2, "0")
        const active = hover || open
        const detailId = `${baseId}-${project.slug}`

        return (
          <li
            key={project.slug}
            className={open ? "bg-card" : undefined}
          >
            <button
              type="button"
              onClick={() => toggle(project.slug)}
              onMouseEnter={() => setHovered(project.slug)}
              onMouseLeave={() => setHovered(null)}
              aria-expanded={open}
              aria-controls={detailId}
              className="group flex w-full items-start gap-4 py-5 text-left outline-none focus-visible:bg-card sm:items-baseline sm:py-6"
            >
              <span
                className={`mt-0.5 w-10 shrink-0 font-mono text-sm tabular-nums transition-colors sm:mt-0 ${
                  active ? "text-terminal" : "text-muted-foreground"
                }`}
              >
                {index}.
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={`font-mono text-lg font-semibold tracking-tight transition-colors sm:text-xl ${
                      active ? "text-terminal" : "text-foreground"
                    }`}
                  >
                    {project.title}
                  </span>
                  {project.status === "building" && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                      <Wrench className="size-3" />
                      Building
                    </span>
                  )}
                </span>

                <span
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="mt-2 block max-w-2xl font-mono text-sm leading-relaxed text-terminal">
                      {project.preview}
                    </span>
                  </span>
                </span>
              </span>

              <span className="hidden pt-1 text-sm text-muted-foreground sm:block">{project.period}</span>

              <span
                aria-hidden="true"
                className={`mt-0.5 shrink-0 text-muted-foreground transition-transform duration-300 sm:mt-0 ${
                  open ? "rotate-45" : ""
                }`}
              >
                {open ? <Minus className="size-5" /> : <Plus className="size-5" />}
              </span>
            </button>

            <div
              id={detailId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-w-0 border-l-2 border-terminal/30 pl-5 pb-7 sm:ml-14 sm:pl-6">
                  {project.role && (
                    <p className="text-xs text-muted-foreground">
                      {project.role} · {project.org}
                    </p>
                  )}
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/80">
                    {project.summary}
                  </p>

                  {project.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                          <span className="shrink-0 select-none text-terminal">›</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.media && project.media.length > 0 && (
                    <div className="mt-5 max-w-xl">
                      <MediaSlot media={project.media} />
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {project.links && project.links.length > 0 && (
                      <span className="flex gap-4">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => {
                              if (link.href === "#") e.preventDefault()
                            }}
                            className="font-mono text-xs text-terminal underline-offset-4 hover:underline"
                          >
                            {link.label}
                          </a>
                        ))}
                      </span>
                    )}
                    <span className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-border bg-muted/50 px-2 py-1 text-[11px] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
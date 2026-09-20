"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { BusinessCase } from "@/lib/portfolio/business"
import { MediaSlot } from "./media-slot"

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

export function EngagementReader({ cases }: { cases: BusinessCase[] }) {
  const [selected, setSelected] = useState(cases[0].slug)
  const [expanded, setExpanded] = useState(false)
  const [hoverSlug, setHoverSlug] = useState<string | null>(null)

  const active = cases.find((c) => c.slug === (hoverSlug ?? selected)) ?? cases[0]
  const showDetails = expanded && active.slug === selected

  const select = (slug: string) => {
    if (slug === selected) {
      setExpanded((current) => !current)
    } else {
      setSelected(slug)
      setExpanded(true)
    }
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <nav
        aria-label="Selected engagements"
        className="self-start lg:sticky lg:top-24"
      >
        <ol className="border-l border-border">
          {cases.map((item, i) => {
            const isSelected = item.slug === selected
            const isHovered = item.slug === hoverSlug
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => select(item.slug)}
                  onMouseEnter={() => setHoverSlug(item.slug)}
                  onMouseLeave={() => setHoverSlug(null)}
                  aria-current={isSelected ? "true" : undefined}
                  aria-expanded={item.slug === selected && expanded}
                  className={`group flex w-full items-baseline gap-2.5 border-l py-2.5 pl-4 text-left transition-colors ${
                    isSelected
                      ? "-ml-px border-burgundy text-foreground"
                      : "border-transparent text-muted-foreground hover:border-burgundy/40 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`w-7 shrink-0 font-serif text-sm italic transition-colors ${
                      isSelected ? "text-burgundy" : isHovered ? "text-burgundy/70" : "text-muted-foreground/60"
                    }`}
                  >
                    {ROMAN[i]}.
                  </span>
                  <span className="font-serif text-base leading-snug">
                    {item.title.split(" — ")[0]}
                  </span>
                  {item.status === "building" && (
                    <span className="ml-auto shrink-0 pl-2 text-[10px] font-medium uppercase tracking-widest text-burgundy/80">
                      In progress
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
        <p className="mt-5 hidden pl-4 text-xs text-muted-foreground lg:block">
          Hover to preview · click to open
        </p>
      </nav>

      <div
        key={`${active.slug}-${showDetails ? "open" : "preview"}`}
        className="panel-reveal border-t border-burgundy/40 pt-5 lg:pt-6"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {active.org} · {active.period}
            </p>
            <p className="mt-0.5 text-sm font-medium text-burgundy">{active.role}</p>
          </div>
          {showDetails && (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse case study"
              className="mt-1 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-5" />
            </button>
          )}
        </div>

        <div className="mt-5">
          {showDetails ? (
            <div>
              <p className="max-w-xl leading-relaxed text-foreground/85">{active.summary}</p>
              {active.points.length > 0 && (
                <ul className="mt-4 max-w-xl space-y-2.5">
                  {active.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-foreground/75">
                      <span aria-hidden="true" className="mt-px shrink-0 select-none text-burgundy">
                        —
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {active.media && active.media.length > 0 && (
                <div className="mt-6 max-w-lg">
                  <MediaSlot media={active.media} />
                </div>
              )}

              {active.links && active.links.length > 0 && (
                <div className="mt-6 flex gap-5">
                  {active.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => {
                        if (link.href === "#") e.preventDefault()
                      }}
                      className="text-sm font-medium text-burgundy underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="mt-8 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground"
              >
                Collapse case study
              </button>
            </div>
          ) : (
            <p className="max-w-xl text-base leading-relaxed text-foreground/75">{active.preview}</p>
          )}
        </div>
      </div>
    </div>
  )
}
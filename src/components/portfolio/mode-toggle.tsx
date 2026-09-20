"use client"

import { Code2, BriefcaseBusiness } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mode } from "@/lib/portfolio/technical"

const options: { value: Mode; label: string; icon: typeof Code2 }[] = [
  { value: "technical", label: "Technical", icon: Code2 },
  { value: "business", label: "Business", icon: BriefcaseBusiness },
]

export function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode
  onChange: (mode: Mode) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Portfolio mode"
      className="flex items-center rounded-full border border-border bg-muted/50 p-1"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = mode === value
        return (
          <button
            key={value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-background text-foreground shadow-sm ring-1 ring-ring/50"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
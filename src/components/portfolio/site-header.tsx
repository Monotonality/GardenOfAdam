import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import type { Mode } from "@/lib/portfolio/technical"
import { GithubIcon, LinkedinIcon } from "./social-icons"

const GITHUB_URL = "https://github.com/Monotonality"
// TODO: add LinkedIn profile URL when ready
const LINKEDIN_URL = "#"

export function SiteHeader({ mode, toggle }: { mode: Mode; toggle: ReactNode }) {
  const technical = mode === "technical"
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href={technical ? "/?mode=technical" : "/?mode=business"}
          className={cn(
            "transition-colors",
            technical
              ? "font-mono text-sm text-terminal hover:text-terminal"
              : "font-serif text-xl font-semibold tracking-tight"
          )}
        >
          {technical ? "adam@torres" : "Adam Torres"}
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            href={LINKEDIN_URL}
            aria-label="LinkedIn"
            title="Soon"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-5" />
          </a>
          {toggle}
        </div>
      </div>
    </header>
  )
}
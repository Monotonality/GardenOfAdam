import Link from "next/link"
import { about } from "@/lib/portfolio"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-4xl px-6 pb-12 pt-24">
      <div className="border-t border-border pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-lg font-medium tracking-tight">Garden of Adam</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              A small collection of tools, grown one at a time.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/apps" className="text-muted-foreground transition-colors hover:text-moss">
              Apps
            </Link>
            <a
              href={`mailto:${about.email}`}
              className="text-muted-foreground transition-colors hover:text-moss"
            >
              {about.email}
            </a>
          </div>
        </div>
        <p className="mt-8 font-mono text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} Adam Torres
        </p>
      </div>
    </footer>
  )
}
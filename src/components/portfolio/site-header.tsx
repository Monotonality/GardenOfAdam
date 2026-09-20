import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

const NAV_LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Résumé" },
]

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
      <Link href="#top" className="font-display text-lg font-medium tracking-tight">
        Adam Torres
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/apps"
          className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Apps
        </Link>
        <span className="px-1">
          <ThemeToggle />
        </span>
      </nav>
    </header>
  )
}
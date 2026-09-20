import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-10">
        <Link
          href="/apps"
          aria-label="Apps"
          title="Apps"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          ✦
        </Link>
        <a
          href="mailto:adam.j.tor@gmail.com"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          adam.j.tor@gmail.com
        </a>
        <p className="text-xs text-muted-foreground/70">© {new Date().getFullYear()} Adam Torres</p>
      </div>
    </footer>
  )
}
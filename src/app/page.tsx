import { SiteHeader } from "@/components/portfolio/site-header"
import { Hero } from "@/components/portfolio/hero"
import { ProjectList } from "@/components/portfolio/project-list"
import { Resume } from "@/components/portfolio/resume"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <main id="top" className="flex min-h-screen flex-col">
      <SiteHeader />
      <Hero />
      <div className="mx-auto w-full max-w-4xl px-6 pb-10 pt-20">
        <div className="mb-8 flex items-baseline gap-3">
          <h2 id="projects" className="scroll-mt-24 font-display text-3xl font-medium tracking-tight">
            Projects
          </h2>
          <span className="font-mono text-xs text-muted-foreground">(9)</span>
        </div>
        <ProjectList />
      </div>
      <div className="mx-auto w-full max-w-4xl px-6 pt-14">
        <div className="mb-8 flex items-baseline gap-3">
          <h2 id="resume" className="scroll-mt-24 font-display text-3xl font-medium tracking-tight">
            Résumé
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            (print-friendly — hits Ctrl+P)
          </span>
        </div>
        <Resume />
      </div>

      <div className="flex-1" />
      <SiteFooter />
    </main>
  )
}
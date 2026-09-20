import Link from "next/link"
import { apps } from "@/lib/apps"
import { technicalIntro, technicalProjects } from "@/lib/portfolio/technical"
import { ProjectExplorer } from "./project-explorer"

export function TechnicalMode() {
  const liveApps = apps.filter((app) => app.status === "live")

  return (
    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
      <section>
        <p className="font-mono text-sm text-terminal">{technicalIntro.prompt}</p>
        <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight sm:text-5xl">
          {technicalIntro.name}
        </h1>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-terminal">
          {technicalIntro.tagline} {technicalIntro.bio}
        </p>
      </section>

      <div className="mt-8 flex items-baseline justify-between">
          <h2 className="font-mono text-sm text-muted-foreground">
            <span className="text-terminal">##</span> built
            <span className="ml-1 text-muted-foreground/70">({technicalProjects.length})</span>
          </h2>
          <p className="hidden font-mono text-xs text-muted-foreground sm:block">hover to preview · click to expand</p>
        </div>
        <ProjectExplorer projects={technicalProjects} />

      {liveApps.length > 0 && (
        <section className="mt-16">
          <h2 className="font-mono text-sm text-muted-foreground">
            <span className="text-terminal">##</span> personal tools
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {liveApps.map((app) => {
              const Icon = app.icon
              return (
                <Link
                  key={app.slug}
                  href={`/${app.slug}`}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-ring/40"
                >
                  <Icon className="size-4 text-terminal" />
                  {app.name}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
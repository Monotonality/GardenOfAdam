import { technicalIntro, technicalProjects } from "@/lib/portfolio/technical"
import { GitHubStreak } from "./github-streak"
import { ProjectExplorer } from "./project-explorer"

export function TechnicalMode() {
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

      <GitHubStreak />
    </div>
  )
}
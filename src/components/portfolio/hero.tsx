import Link from "next/link"
import { about, impactStats } from "@/lib/portfolio"

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 pt-14 sm:pt-20">
      <p className="font-mono text-sm text-moss">{about.roles}</p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-tight sm:text-7xl">
        {about.name}
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/90">{about.line}</p>
      <div className="mt-4 max-w-2xl space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>{about.bio[0]}</p>
        <p>{about.bio[1]}</p>
        <p>
          {about.bio[2]}
          <Link href="/apps" className="text-moss underline-offset-4 hover:underline">
            /apps
          </Link>
        </p>
      </div>

      <div className="mt-14 border-t border-border pt-8 print-avoid-break">
        <h2 className="flex items-baseline gap-2 font-mono text-sm text-muted-foreground">
          <span>Measured impact</span>
          <span className="text-muted-foreground/60">({impactStats.length})</span>
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat) => (
            <div key={stat.label} className="border-t border-border pt-4">
              <dd className="font-mono text-2xl tabular-nums tracking-tight">{stat.value}</dd>
              <dt className="mt-1 text-sm font-medium">{stat.label}</dt>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
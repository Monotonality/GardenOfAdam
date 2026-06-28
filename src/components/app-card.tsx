import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { App } from "@/lib/apps"

export function AppCard({ app }: { app: App }) {
  return (
    <Link
      href={`/${app.slug}`}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5",
        "transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900",
        "hover:shadow-lg hover:shadow-black/20",
        app.slug === "hub" && "cursor-default pointer-events-none opacity-60"
      )}
    >
      <div className={cn(
        "flex size-12 items-center justify-center rounded-lg bg-gradient-to-br text-xl",
        app.color
      )}>
        {app.icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-zinc-100">{app.name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "h-5 px-1.5 text-[10px] uppercase tracking-wider",
              app.status === "live" && "border-emerald-500/30 text-emerald-400",
              app.status === "building" && "border-amber-500/30 text-amber-400",
              app.status === "planned" && "border-zinc-600 text-zinc-500"
            )}
          >
            {app.status}
          </Badge>
        </div>
        <p className="text-sm text-zinc-500">{app.description}</p>
      </div>
    </Link>
  )
}

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import type { App } from "@/lib/apps"

export function AppRow({ app }: { app: App }) {
  return (
    <Link
      href={`/${app.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-transparent px-4 py-3",
        "transition-all duration-200 hover:border-zinc-800 hover:bg-zinc-900/50",
        app.slug === "hub" && "cursor-default pointer-events-none opacity-60"
      )}
    >
      <div className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg",
        app.color
      )}>
        {app.icon}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-zinc-100 truncate">{app.name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "h-5 px-1.5 text-[10px] uppercase tracking-wider shrink-0",
              app.status === "live" && "border-emerald-500/30 text-emerald-400",
              app.status === "building" && "border-amber-500/30 text-amber-400",
              app.status === "planned" && "border-zinc-600 text-zinc-500"
            )}
          >
            {app.status}
          </Badge>
        </div>
        <p className="text-sm text-zinc-500 truncate">{app.description}</p>
      </div>
      <ChevronRight className="size-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" />
    </Link>
  )
}

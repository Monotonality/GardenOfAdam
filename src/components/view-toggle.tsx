"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

export type ViewMode = "grid" | "list"

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("grid")}
        data-active={value === "grid"}
        className="size-8 data-[active=true]:bg-zinc-700 data-[active=true]:text-zinc-100 text-zinc-500 hover:text-zinc-300"
      >
        <LayoutGrid className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange("list")}
        data-active={value === "list"}
        className="size-8 data-[active=true]:bg-zinc-700 data-[active=true]:text-zinc-100 text-zinc-500 hover:text-zinc-300"
      >
        <List className="size-4" />
      </Button>
    </div>
  )
}

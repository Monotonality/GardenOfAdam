"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
      <Input
        placeholder="Search apps..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-zinc-800 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500/50"
      />
    </div>
  )
}

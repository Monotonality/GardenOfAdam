import type { LucideIcon } from "lucide-react"
import { StickyNote } from "lucide-react"

export type AppAccess = "public" | "user" | "approved" | "owner"

export interface App {
  slug: string
  name: string
  description: string
  status: "planned" | "building" | "live"
  access: AppAccess
  icon: LucideIcon
}

export const apps: App[] = [
  {
    slug: "scratch",
    name: "Scratch",
    description: "Quick notes and scratchpad",
    status: "live",
    access: "owner",
    icon: StickyNote,
  },
]

export const OWNER_EMAIL = "adam.j.tor@gmail.com"

import type { LucideIcon } from "lucide-react"
import { StickyNote, ListTodo, Repeat } from "lucide-react"

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
  {
    slug: "todo",
    name: "Todo",
    description: "Track tasks with active, completed, and failed states",
    status: "live",
    access: "owner",
    icon: ListTodo,
  },
  {
    slug: "habits",
    name: "Habits",
    description: "Recurring routines with contribution grid tracking",
    status: "live",
    access: "owner",
    icon: Repeat,
  },
]

export const OWNER_EMAIL = "adam.j.tor@gmail.com"

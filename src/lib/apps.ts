export type AppAccess = "public" | "user" | "approved" | "owner"

export interface App {
  slug: string
  name: string
  description: string
  status: "planned" | "building" | "live"
  access: AppAccess
  color: string
  icon: string
}

export const apps: App[] = [
  {
    slug: "hub",
    name: "Hub",
    description: "Your personal dashboard and launchpad",
    status: "live",
    access: "public",
    color: "from-emerald-500 to-teal-600",
    icon: "🌿",
  },
  {
    slug: "scratch",
    name: "Scratch",
    description: "Quick notes and scratchpad",
    status: "live",
    access: "owner",
    color: "from-orange-500 to-red-500",
    icon: "✏️",
  },
]

export const OWNER_EMAIL = "adam.j.tor@gmail.com"

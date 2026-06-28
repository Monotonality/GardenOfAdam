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
]

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { apps, OWNER_EMAIL } from "@/lib/apps"
import { getAccessibleApps, type UserPermissions } from "@/lib/permissions"
import { SearchBar } from "@/components/search-bar"
import { ViewToggle, type ViewMode } from "@/components/view-toggle"
import { UserButton } from "@/components/user-button"
import { AppCard } from "@/components/app-card"
import { AppRow } from "@/components/app-row"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

function buildPermissions(user: User): UserPermissions {
  return {
    userId: user.id,
    email: user.email ?? "",
    isOwner: user.email === OWNER_EMAIL,
    approvedApps: [],
  }
}

export default function AppsPage() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [view, setView] = useState<ViewMode>("list")
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      if (!u || u.email !== OWNER_EMAIL) {
        router.push("/auth/login?next=/apps")
        return
      }
      setUser(u)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null
      if (!u || u.email !== OWNER_EMAIL) {
        router.push("/auth/login?next=/apps")
        return
      }
      setUser(u)
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    )
  }

  const permissions = user ? buildPermissions(user) : null
  const visibleApps = getAccessibleApps(apps, permissions)

  const filtered = visibleApps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex items-center gap-3">
            <SearchBar value={search} onChange={setSearch} />
            <ViewToggle value={view} onChange={setView} />
          </div>
        </div>
        <UserButton />
      </header>

      <main className="mt-12 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Apps</h1>
          <p className="mt-1 text-zinc-500">A collection of tools and apps</p>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center text-zinc-600">
            <p>No apps found</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {filtered.map((app) => (
              <AppRow key={app.slug} app={app} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { apps, OWNER_EMAIL } from "@/lib/apps"
import { getAccessibleApps, type UserPermissions } from "@/lib/permissions"
import { SearchBar } from "@/components/search-bar"
import { ViewToggle, type ViewMode } from "@/components/view-toggle"
import { UserButton } from "@/components/user-button"
import { AppCard } from "@/components/app-card"
import { AppRow } from "@/components/app-row"
import type { User } from "@supabase/supabase-js"

function buildPermissions(user: User | null): UserPermissions | null {
  if (!user) return null
  return {
    userId: user.id,
    email: user.email ?? "",
    isOwner: user.email === OWNER_EMAIL,
    approvedApps: [],
  }
}

export default function HubPage() {
  const [search, setSearch] = useState("")
  const [view, setView] = useState<ViewMode>("grid")
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const permissions = buildPermissions(user)
  const visibleApps = getAccessibleApps(apps, permissions)

  const filtered = visibleApps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <SearchBar value={search} onChange={setSearch} />
          <ViewToggle value={view} onChange={setView} />
        </div>
        <UserButton />
      </header>

      <main className="mt-12 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Garden of Adam</h1>
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

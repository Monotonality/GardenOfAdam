"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, LogIn } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function UserButton() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (!user) {
    return (
      <a
        href="/auth/login"
        className="inline-flex h-7 items-center gap-1 rounded-[min(var(--radius-md),12px)] border border-transparent bg-clip-padding px-2.5 text-[0.8rem] font-medium whitespace-nowrap text-zinc-400 transition-all hover:text-zinc-100"
      >
        <LogIn className="size-3.5" />
        Sign In
      </a>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-9 items-center justify-center rounded-full border border-zinc-800 bg-transparent outline-none">
        <Avatar className="size-9">
          <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs">
            {user.email?.charAt(0).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl border-zinc-800 bg-zinc-900 text-zinc-100">
        <div className="px-2 py-1.5 text-sm text-zinc-400">{user.email}</div>
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-zinc-400 hover:text-red-400 focus:text-red-400">
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

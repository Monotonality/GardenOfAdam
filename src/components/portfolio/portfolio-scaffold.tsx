"use client"

import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import type { Mode } from "@/lib/portfolio/technical"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { ModeToggle } from "./mode-toggle"
import { TechnicalMode } from "./technical-mode"
import { BusinessMode } from "./business-mode"

export function PortfolioScaffold({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)

  useEffect(() => {
    document.documentElement.classList.toggle("theme-business", mode === "business")
  }, [mode])

  function switchMode(next: Mode) {
    if (next === mode) return
    const apply = () => {
      document.documentElement.classList.toggle("theme-business", next === "business")
      setMode(next)
      const url = new URL(window.location.href)
      url.searchParams.set("mode", next)
      window.history.replaceState(null, "", url)
    }

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => flushSync(apply))
    } else {
      apply()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader mode={mode} toggle={<ModeToggle mode={mode} onChange={switchMode} />} />
      <main className="flex-1">{mode === "business" ? <BusinessMode /> : <TechnicalMode />}</main>
      <SiteFooter />
    </div>
  )
}
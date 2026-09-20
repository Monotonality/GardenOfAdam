"use client"

import { useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import type { Mode } from "@/lib/portfolio/technical"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"
import { ModeToggle } from "./mode-toggle"
import { TechnicalMode } from "./technical-mode"
import { BusinessMode } from "./business-mode"

export function PortfolioScaffold({ initialMode }: { initialMode: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)
  const supportsViewTransition =
    typeof document !== "undefined" && "startViewTransition" in document

  useEffect(() => {
    document.documentElement.classList.toggle("theme-business", mode === "business")

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (supportsViewTransition) return

    const el = mainRef.current
    if (!el) return
    el.classList.remove("mode-swap-fade")
    void el.offsetWidth
    el.classList.add("mode-swap-fade")
  }, [mode, supportsViewTransition])

  function switchMode(next: Mode) {
    if (next === mode) return
    const apply = () => {
      document.documentElement.classList.toggle("theme-business", next === "business")
      setMode(next)
      const url = new URL(window.location.href)
      url.searchParams.set("mode", next)
      window.history.replaceState(null, "", url)
    }

    if (supportsViewTransition) {
      document.startViewTransition(() => flushSync(apply))
    } else {
      apply()
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader mode={mode} toggle={<ModeToggle mode={mode} onChange={switchMode} />} />
      <main ref={mainRef} className="flex-1">
        {mode === "business" ? <BusinessMode /> : <TechnicalMode />}
      </main>
      <SiteFooter />
    </div>
  )
}
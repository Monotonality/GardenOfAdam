"use client"

import { useState } from "react"

const GITHUB_PROFILE = "https://github.com/Monotonality"

const STREAK_IMG = [
  "https://github-readme-streak-stats.herokuapp.com/?user=Monotonality",
  "theme=dark",
  "hide_border=true",
  "ring=43C251",
  "fire=43C251",
  "sideNums=43C251",
  "sideLabels=6B7280",
  "currStreakNum=E5E7EB",
  "dates=9CA3AF",
].join("&")

export function GitHubStreak() {
  const [live, setLive] = useState(true)

  return (
    <section className="mt-16">
      <h2 className="font-mono text-sm text-muted-foreground">
        <span className="text-terminal">##</span> github
      </h2>
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted-foreground">adam@torres ~ % gh streak</p>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-terminal underline-offset-4 hover:underline"
          >
            github.com/Monotonality
          </a>
        </div>
        {live ? (
          <div className="mt-4 overflow-x-auto pb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={STREAK_IMG}
              alt="Monotonality contribution streak — total contributions, current streak, and longest streak on GitHub."
              width={495}
              height={195}
              loading="lazy"
              onError={() => setLive(false)}
            />
          </div>
        ) : (
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            streak service unavailable — see the{" "}
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noreferrer"
              className="text-terminal underline-offset-4 hover:underline"
            >
              profile
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
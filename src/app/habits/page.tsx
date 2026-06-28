"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  getHabits,
  createHabit,
  archiveHabit,
  generateTodosForHabit,
  generateAllTodos,
  getHabitGridData,
  type Habit,
  type HabitInput,
  type DayStatus,
} from "@/lib/habits"
import { OWNER_EMAIL } from "@/lib/apps"
import { ArrowLeft, Plus, X, Archive, Repeat, Clock } from "lucide-react"
import Link from "next/link"

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const DAY_SHORT = ["S", "M", "T", "W", "T", "F", "S"]
const DAY_VALUES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

function gridColor(status: string): string {
  switch (status) {
    case "completed": return "bg-emerald-500"
    case "failed": return "bg-red-500"
    case "active": return "bg-zinc-600"
    default: return "bg-zinc-800"
  }
}

function ContributionGrid({ days }: { days: DayStatus[] }) {
  const weeks: DayStatus[][] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  return (
    <div className="flex gap-0.5">
      {weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-0.5">
          {week.map((day, di) => (
            <div
              key={di}
              className={`size-2.5 rounded-sm ${gridColor(day.status)}`}
              title={`${day.date}: ${day.status}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function formatSchedule(habit: Habit): string {
  if (habit.schedule_type === "daily") return `Daily at ${habit.schedule_time.slice(0, 5)}`
  if (habit.schedule_type === "weekly") {
    const names = habit.schedule_days.map((d) => DAY_LABELS[DAY_VALUES.indexOf(d)]).filter(Boolean)
    return `${names.join(", ")} at ${habit.schedule_time.slice(0, 5)}`
  }
  const days = habit.schedule_days.map((d) => `${ordinal(Number(d))}`)
  return `${days.join(", ")} at ${habit.schedule_time.slice(0, 5)}`
}

function ordinal(n: number): string {
  if (n > 3 && n < 21) return `${n}th`
  switch (n % 10) {
    case 1: return `${n}st`
    case 2: return `${n}nd`
    case 3: return `${n}rd`
    default: return `${n}th`
  }
}

export default function HabitsPage() {
  const [loading, setLoading] = useState(true)
  const [habits, setHabits] = useState<Habit[]>([])
  const [gridData, setGridData] = useState<Map<string, DayStatus[]>>(new Map())
  const [showCreate, setShowCreate] = useState(false)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user
      if (!u || u.email !== OWNER_EMAIL) {
        router.push("/auth/login")
        return
      }
      await generateAllTodos()
      await loadData()
      setLoading(false)
    })
  }, [])

  const loadData = async () => {
    const habitsData = await getHabits()
    setHabits(habitsData)
    const map = new Map<string, DayStatus[]>()
    for (const h of habitsData) {
      if (h.status === "active") {
        map.set(h.id, await getHabitGridData(h.id))
      }
    }
    setGridData(map)
  }

  const handleArchive = async (id: string) => {
    await archiveHabit(id)
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, status: "archived" as const } : h)))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    )
  }

  const activeHabits = habits.filter((h) => h.status === "active")
  const archivedHabits = habits.filter((h) => h.status === "archived")

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col bg-zinc-950">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="flex-1 text-sm font-medium text-zinc-100">Habits</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          <Plus className="size-3.5" />
          New Habit
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeHabits.length === 0 && (
          <p className="py-8 text-center text-sm text-zinc-600">No habits yet</p>
        )}
        {activeHabits.map((habit) => (
          <div key={habit.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-zinc-100">{habit.title}</h3>
                <p className="text-xs text-zinc-500 mt-0.5">{formatSchedule(habit)}</p>
                {habit.do_by_minutes && (
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Complete within {habit.do_by_minutes >= 1440 ? `${habit.do_by_minutes / 1440}d` : habit.do_by_minutes >= 60 ? `${habit.do_by_minutes / 60}h` : `${habit.do_by_minutes}m`}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleArchive(habit.id)}
                className="shrink-0 rounded p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
                title="Archive"
              >
                <Archive className="size-4" />
              </button>
            </div>
            <ContributionGrid days={gridData.get(habit.id) ?? []} />
          </div>
        ))}

        {archivedHabits.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer text-xs font-medium uppercase tracking-wider text-zinc-600 hover:text-zinc-400 transition-colors px-1 py-2">
              Archived ({archivedHabits.length})
            </summary>
            <div className="mt-2 space-y-2">
              {archivedHabits.map((habit) => (
                <div key={habit.id} className="rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-3 opacity-60">
                  <h3 className="text-sm text-zinc-400">{habit.title}</h3>
                  <p className="text-xs text-zinc-600">{formatSchedule(habit)}</p>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {showCreate && (
        <CreateHabitDialog
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false)
            loadData()
          }}
        />
      )}
    </div>
  )
}

function CreateHabitDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState("")
  const [scheduleType, setScheduleType] = useState<"daily" | "weekly" | "monthly">("weekly")
  const [weeklyDays, setWeeklyDays] = useState<string[]>(["mon", "wed", "fri"])
  const [monthlyDays, setMonthlyDays] = useState<number[]>([1])
  const [time, setTime] = useState("08:00")
  const [doByEnabled, setDoByEnabled] = useState(false)
  const [doByHours, setDoByHours] = useState("12")
  const [endCondition, setEndCondition] = useState<"indefinite" | "date" | "occurrences">("indefinite")
  const [endDate, setEndDate] = useState("")
  const [maxOccurrences, setMaxOccurrences] = useState("30")
  const [saving, setSaving] = useState(false)

  const toggleDay = (day: string) => {
    setWeeklyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleCreate = async () => {
    if (!title.trim()) return
    setSaving(true)

    const input: HabitInput = {
      title: title.trim(),
      schedule_type: scheduleType,
      schedule_days: scheduleType === "weekly" ? weeklyDays : scheduleType === "monthly" ? monthlyDays.map(String) : [],
      schedule_time: time + ":00",
      do_by_minutes: doByEnabled ? Number(doByHours) * 60 : null,
      end_condition: endCondition,
      end_date: endCondition === "date" ? endDate : null,
      max_occurrences: endCondition === "occurrences" ? Number(maxOccurrences) : null,
    }

    const habit = await createHabit(input)
    if (habit) {
      await generateTodosForHabit(habit)
      onCreated()
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-12">
      <div className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-6 mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-medium text-zinc-100">New Habit</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Workout"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">Schedule</label>
            <div className="flex gap-2 mb-3">
              {(["daily", "weekly", "monthly"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setScheduleType(type)}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    scheduleType === type
                      ? "border-zinc-500 bg-zinc-700 text-zinc-100"
                      : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {scheduleType === "weekly" && (
              <div className="flex gap-1.5">
                {DAY_VALUES.map((day, i) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`size-8 rounded-md text-xs font-medium transition-colors ${
                      weeklyDays.includes(day)
                        ? "bg-zinc-600 text-zinc-100"
                        : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {DAY_SHORT[i]}
                  </button>
                ))}
              </div>
            )}

            {scheduleType === "monthly" && (
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <button
                    key={d}
                    onClick={() =>
                      setMonthlyDays((prev) =>
                        prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                      )
                    }
                    className={`size-8 rounded-md text-xs font-medium transition-colors ${
                      monthlyDays.includes(d)
                        ? "bg-zinc-600 text-zinc-100"
                        : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-zinc-500 mb-1.5">Do by (optional)</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDoByEnabled(!doByEnabled)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    doByEnabled
                      ? "border-zinc-500 bg-zinc-700 text-zinc-100"
                      : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {doByEnabled ? "On" : "Off"}
                </button>
                {doByEnabled && (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      value={doByHours}
                      onChange={(e) => setDoByHours(e.target.value)}
                      className="w-16 rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-2 text-sm text-zinc-100 text-center focus:outline-none focus:border-zinc-500"
                    />
                    <span className="text-xs text-zinc-500">hours</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-1.5">End condition</label>
            <div className="flex gap-2">
              {(["indefinite", "date", "occurrences"] as const).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setEndCondition(cond)}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    endCondition === cond
                      ? "border-zinc-500 bg-zinc-700 text-zinc-100"
                      : "border-zinc-700 text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {cond === "indefinite" ? "Indefinite" : cond === "date" ? "End date" : "Occurrences"}
                </button>
              ))}
            </div>
            {endCondition === "date" && (
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-zinc-500"
              />
            )}
            {endCondition === "occurrences" && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={maxOccurrences}
                  onChange={(e) => setMaxOccurrences(e.target.value)}
                  className="w-20 rounded-lg border border-zinc-700 bg-zinc-800 px-2 py-2 text-sm text-zinc-100 text-center focus:outline-none focus:border-zinc-500"
                />
                <span className="text-xs text-zinc-500">occurrences</span>
              </div>
            )}
          </div>

          <button
            onClick={handleCreate}
            disabled={!title.trim() || saving}
            className="w-full rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition-colors disabled:opacity-30"
          >
            {saving ? "Creating..." : "Create Habit"}
          </button>
        </div>
      </div>
    </div>
  )
}

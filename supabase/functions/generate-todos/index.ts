import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js"

const DAY_NAMES = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

function getLastDay(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getNthDayOfMonth(year: number, month: number, occurrence: string, dayOfWeek: string): number | null {
  const dayIndex = DAY_NAMES.indexOf(dayOfWeek)
  if (dayIndex === -1) return null
  const lastDay = getLastDay(year, month)

  if (occurrence === "last") {
    for (let d = lastDay; d >= 1; d--) {
      if (new Date(year, month, d).getDay() === dayIndex) return d
    }
    return null
  }

  const occurrenceNum = ["first", "second", "third", "fourth"].indexOf(occurrence)
  if (occurrenceNum === -1) return null

  let count = 0
  for (let d = 1; d <= lastDay; d++) {
    if (new Date(year, month, d).getDay() === dayIndex) {
      if (count === occurrenceNum) return d
      count++
    }
  }
  return null
}

function matchesSchedule(habit: any, date: Date): boolean {
  if (habit.schedule_type === "daily") return true
  if (habit.schedule_type === "weekly") {
    return habit.schedule_days.includes(DAY_NAMES[date.getDay()])
  }
  if (habit.schedule_type === "monthly") {
    const y = date.getFullYear()
    const m = date.getMonth()
    const d = date.getDate()
    const lastDay = getLastDay(y, m)

    for (const daySpec of habit.schedule_days) {
      if (daySpec === "start" && d === 1) return true
      if (daySpec === "end" && d === lastDay) return true

      const parts = daySpec.split("_")
      if (parts.length === 2) {
        const [occurrence, dayOfWeek] = parts
        const nthDay = getNthDayOfMonth(y, m, occurrence, dayOfWeek)
        if (nthDay !== null && d === nthDay) return true
      }
    }
  }
  return false
}

function isAfterEnd(habit: any, date: Date): boolean {
  if (habit.end_date && date > new Date(habit.end_date)) return true
  return false
}

Deno.serve(async (_req: Request) => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("status", "active")

  if (!habits || habits.length === 0) {
    return new Response(JSON.stringify({ generated: 0 }), { headers: { "Content-Type": "application/json" } })
  }

  let totalGenerated = 0
  const now = new Date()
  const lookbackStart = new Date(now.getTime() - 48 * 60 * 60000)
  const allHabitIds = habits.map((h: any) => h.id)

  const { data: existingTodos } = await supabase
    .from("todos")
    .select("habit_id, scheduled_for")
    .in("habit_id", allHabitIds)
    .gte("scheduled_for", lookbackStart.toISOString().split("T")[0])

  const existingSet = new Set<string>()
  for (const t of existingTodos ?? []) {
    existingSet.add(`${t.habit_id}|${t.scheduled_for}`)
  }

  for (const habit of habits) {
    const current = new Date(lookbackStart)
    current.setHours(0, 0, 0, 0)
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)

    let occurrences = 0
    const seenDates = new Set<string>()

    while (current <= end) {
      if (isAfterEnd(habit, current)) break
      if (habit.max_occurrences && occurrences >= habit.max_occurrences) break

      if (matchesSchedule(habit, current)) {
        const [h, m] = habit.schedule_time.split(":").map(Number)
        const dt = new Date(current)
        dt.setHours(h, m, 0, 0)
        const dateKey = dt.toISOString()

        if (!seenDates.has(dateKey)) {
          seenDates.add(dateKey)
          occurrences++

          if (dt <= now) {
            const dateStr = current.toISOString().split("T")[0]
            const key = `${habit.id}|${dateStr}`

            if (!existingSet.has(key)) {
              let dueBy: string | null = null
              if (habit.do_by_minutes) {
                dueBy = new Date(dt.getTime() + habit.do_by_minutes * 60000).toISOString()
              }

              await supabase.from("todos").insert({
                user_id: habit.user_id,
                title: habit.title,
                habit_id: habit.id,
                scheduled_for: dateStr,
                scheduled_at: dt.toISOString(),
                due_by: dueBy,
                status: "active",
              })

              existingSet.add(key)
              totalGenerated++
            }
          }
        }
      }
      current.setDate(current.getDate() + 1)
    }
  }

  return new Response(JSON.stringify({ generated: totalGenerated }), {
    headers: { "Content-Type": "application/json" },
  })
})

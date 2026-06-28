import { createClient } from "@/lib/supabase/client"
import { createTodo } from "@/lib/todos"

export type ScheduleType = "daily" | "weekly" | "monthly"
export type EndCondition = "indefinite" | "date" | "occurrences"
export type HabitStatus = "active" | "archived"

export interface Habit {
  id: string
  user_id: string
  title: string
  schedule_type: ScheduleType
  schedule_days: string[]
  schedule_time: string
  do_by_minutes: number | null
  end_condition: EndCondition
  end_date: string | null
  max_occurrences: number | null
  status: HabitStatus
  created_at: string
  updated_at: string
}

export interface HabitInput {
  title: string
  schedule_type: ScheduleType
  schedule_days: string[]
  schedule_time: string
  do_by_minutes?: number | null
  end_condition: EndCondition
  end_date?: string | null
  max_occurrences?: number | null
}

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

function matchesSchedule(habit: Habit, date: Date): boolean {
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

function isAfterEnd(habit: Habit, date: Date): boolean {
  if (habit.end_date && date > new Date(habit.end_date)) return true
  return false
}

export function computeScheduleDates(habit: Habit, from: Date, to: Date): Date[] {
  const dates: Date[] = []
  const current = new Date(from)
  current.setHours(0, 0, 0, 0)
  const end = new Date(to)
  end.setHours(23, 59, 59, 999)

  let occurrences = 0

  while (current <= end) {
    if (isAfterEnd(habit, current)) break
    if (habit.max_occurrences && occurrences >= habit.max_occurrences) break

    if (matchesSchedule(habit, current)) {
      const [h, m] = habit.schedule_time.split(":").map(Number)
      const dt = new Date(current)
      dt.setHours(h, m, 0, 0)
      dates.push(dt)
      occurrences++
    }
    current.setDate(current.getDate() + 1)
  }
  return dates
}

export async function getHabits(): Promise<Habit[]> {
  const supabase = createClient()
  const { data } = await supabase.from("habits").select("*").order("created_at", { ascending: false })
  return data ?? []
}

export async function createHabit(input: HabitInput): Promise<Habit | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("habits")
    .insert({
      user_id: user.id,
      title: input.title,
      schedule_type: input.schedule_type,
      schedule_days: input.schedule_days,
      schedule_time: input.schedule_time,
      do_by_minutes: input.do_by_minutes ?? null,
      end_condition: input.end_condition,
      end_date: input.end_date ?? null,
      max_occurrences: input.max_occurrences ?? null,
    })
    .select()
    .single()

  return data
}

export async function updateHabit(id: string, updates: Partial<HabitInput>): Promise<void> {
  const supabase = createClient()
  await supabase.from("habits").update(updates).eq("id", id)
}

export async function archiveHabit(id: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("habits").update({ status: "archived" }).eq("id", id)
}

export async function deleteFutureActiveTodos(habitId: string): Promise<void> {
  const supabase = createClient()
  const now = new Date().toISOString()
  await supabase
    .from("todos")
    .delete()
    .eq("habit_id", habitId)
    .eq("status", "active")
    .gt("scheduled_at", now)
}

export async function updateHabitAndRegenerate(
  id: string,
  habit: Habit,
  updates: Partial<HabitInput>
): Promise<void> {
  await updateHabit(id, updates)
  await deleteFutureActiveTodos(id)
}

export async function generateTodosForHabit(habit: Habit): Promise<void> {
  const supabase = createClient()
  const now = new Date()

  // Look back 48h and forward 1m (for clock drift) to catch any just-passed schedules
  const start = new Date(now.getTime() - 48 * 60 * 60000)
  const end = new Date(now.getTime() + 60000)

  const scheduledDates = computeScheduleDates(habit, start, end)

  const { data: existing } = await supabase
    .from("todos")
    .select("scheduled_for")
    .eq("habit_id", habit.id)
    .gte("scheduled_for", start.toISOString().split("T")[0])

  const existingDates = new Set((existing ?? []).map((t: any) => t.scheduled_for))

  for (const dt of scheduledDates) {
    if (dt > now) continue
    const dateStr = dt.toISOString().split("T")[0]
    if (existingDates.has(dateStr)) continue

    let dueBy: string | null = null
    if (habit.do_by_minutes) {
      dueBy = new Date(dt.getTime() + habit.do_by_minutes * 60000).toISOString()
    }

    await createTodo(habit.title, {
      habit_id: habit.id,
      scheduled_for: dateStr,
      scheduled_at: dt.toISOString(),
      due_by: dueBy,
    })
  }
}

export async function generateAllTodos(): Promise<void> {
  const habits = await getHabits()
  for (const habit of habits) {
    if (habit.status !== "active") continue
    await generateTodosForHabit(habit)
  }
}

export interface DayStatus {
  date: string
  status: "none" | "completed" | "failed" | "active"
}

export async function getHabitGridData(habitId: string, weeks: number = 12): Promise<DayStatus[]> {
  const supabase = createClient()

  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const start = new Date()
  start.setDate(start.getDate() - weeks * 7)
  start.setHours(0, 0, 0, 0)

  const { data: todos } = await supabase
    .from("todos")
    .select("scheduled_for, status")
    .eq("habit_id", habitId)
    .gte("scheduled_for", start.toISOString().split("T")[0])
    .lte("scheduled_for", end.toISOString().split("T")[0])
    .order("scheduled_for", { ascending: true })

  const todoMap = new Map<string, string>()
  for (const t of todos ?? []) {
    todoMap.set(t.scheduled_for, t.status)
  }

  const days: DayStatus[] = []
  const current = new Date(start)
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0]
    const status = todoMap.get(dateStr)
    days.push({
      date: dateStr,
      status: status === "completed" ? "completed" : status === "failed" ? "failed" : status === "active" ? "active" : "none",
    })
    current.setDate(current.getDate() + 1)
  }
  return days
}

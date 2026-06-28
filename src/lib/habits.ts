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

function matchesSchedule(habit: Habit, date: Date): boolean {
  if (habit.schedule_type === "daily") return true
  if (habit.schedule_type === "weekly") {
    return habit.schedule_days.includes(DAY_NAMES[date.getDay()])
  }
  if (habit.schedule_type === "monthly") {
    return habit.schedule_days.includes(String(date.getDate()))
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

export async function generateTodosForHabit(habit: Habit, daysAhead: number = 90): Promise<void> {
  const supabase = createClient()

  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setDate(end.getDate() + daysAhead)

  const scheduledDates = computeScheduleDates(habit, start, end)

  const { data: existing } = await supabase
    .from("todos")
    .select("scheduled_for")
    .eq("habit_id", habit.id)
    .gte("scheduled_for", start.toISOString().split("T")[0])
    .lte("scheduled_for", end.toISOString().split("T")[0])

  const existingDates = new Set((existing ?? []).map((t: any) => t.scheduled_for))

  for (const dt of scheduledDates) {
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

export async function generateAllTodos(daysAhead: number = 90): Promise<void> {
  const habits = await getHabits()
  for (const habit of habits) {
    if (habit.status !== "active") continue
    await generateTodosForHabit(habit, daysAhead)
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

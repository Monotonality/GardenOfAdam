import { createClient } from "@/lib/supabase/client"

export interface Todo {
  id: string
  user_id: string
  title: string
  status: "active" | "completed" | "failed"
  habit_id: string | null
  due_by: string | null
  scheduled_for: string | null
  scheduled_at: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
  failed_at: string | null
}

export interface TodoOptions {
  habit_id?: string
  due_by?: string | null
  scheduled_for?: string | null
  scheduled_at?: string | null
}

export async function getTodos(): Promise<Todo[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false })
  return data ?? []
}

export async function getActiveTodos(): Promise<Todo[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from("todos")
    .select("*")
    .eq("status", "active")
    .order("due_by", { ascending: true })
  return data ?? []
}

export async function createTodo(title: string, options?: TodoOptions): Promise<Todo | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const insert: Record<string, any> = { user_id: user.id, title }
  if (options?.habit_id) insert.habit_id = options.habit_id
  if (options?.due_by) insert.due_by = options.due_by
  if (options?.scheduled_for) insert.scheduled_for = options.scheduled_for
  if (options?.scheduled_at) insert.scheduled_at = options.scheduled_at

  const { data } = await supabase
    .from("todos")
    .insert(insert)
    .select()
    .single()
  return data
}

export async function updateStatus(
  id: string,
  status: "active" | "completed" | "failed"
): Promise<void> {
  const supabase = createClient()
  const updates: Record<string, string | null> = { status, updated_at: new Date().toISOString() }
  if (status === "completed") {
    updates.completed_at = new Date().toISOString()
    updates.failed_at = null
  } else if (status === "failed") {
    updates.failed_at = new Date().toISOString()
    updates.completed_at = null
  } else {
    updates.completed_at = null
    updates.failed_at = null
  }
  await supabase.from("todos").update(updates).eq("id", id)
}

export async function deleteTodo(id: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("todos").delete().eq("id", id)
}

import { createClient } from "@/lib/supabase/client"

export interface Note {
  id: string
  user_id: string
  title: string
  content: string
  updated_at: string
  created_at: string
}

export async function getNotes(): Promise<Note[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from("notes")
    .select("*")
    .order("updated_at", { ascending: false })
  return data ?? []
}

export async function createNote(): Promise<Note | null> {
  const supabase = createClient()
  const { data } = await supabase
    .from("notes")
    .insert({ title: "Untitled", content: "" })
    .select()
    .single()
  return data
}

export async function updateNote(
  id: string,
  updates: { title?: string; content?: string }
): Promise<void> {
  const supabase = createClient()
  await supabase
    .from("notes")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
}

export async function deleteNote(id: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("notes").delete().eq("id", id)
}

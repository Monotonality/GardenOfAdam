import { createClient } from "@/lib/supabase/client"

export interface Debt {
  id: string
  user_id: string
  person_name: string
  amount: number
  description: string | null
  status: "active" | "cleared"
  created_at: string
  updated_at: string
  cleared_at: string | null
}

export interface DebtInput {
  person_name: string
  amount: number
  description?: string | null
}

export async function getDebts(status?: "active" | "cleared"): Promise<Debt[]> {
  const supabase = createClient()
  let query = supabase.from("debts").select("*").order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)
  const { data } = await query
  return data ?? []
}

export async function createDebt(input: DebtInput): Promise<Debt | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("debts")
    .insert({
      user_id: user.id,
      person_name: input.person_name,
      amount: input.amount,
      description: input.description ?? null,
    })
    .select()
    .single()
  return data
}

export async function clearDebts(ids: string[]): Promise<void> {
  const supabase = createClient()
  const now = new Date().toISOString()
  await supabase
    .from("debts")
    .update({ status: "cleared", cleared_at: now, updated_at: now })
    .in("id", ids)
}

export async function deleteDebt(id: string): Promise<void> {
  const supabase = createClient()
  await supabase.from("debts").delete().eq("id", id)
}

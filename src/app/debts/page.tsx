"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getDebts, createDebt, clearDebts, deleteDebt, type Debt } from "@/lib/debts"
import { OWNER_EMAIL } from "@/lib/apps"
import { ArrowLeft, Plus, Trash2, X, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function formatAmount(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export default function DebtsPage() {
  const [loading, setLoading] = useState(true)
  const [debts, setDebts] = useState<Debt[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showCleared, setShowCleared] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [personName, setPersonName] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user
      if (!u || u.email !== OWNER_EMAIL) {
        router.push("/auth/login")
        return
      }
      const all = await getDebts()
      setDebts(all)
      setLoading(false)
    })
  }, [])

  const active = debts.filter((d) => d.status === "active")
  const cleared = debts.filter((d) => d.status === "cleared")

  const cumulativeByPerson = new Map<string, number>()
  for (const d of active) {
    cumulativeByPerson.set(d.person_name, (cumulativeByPerson.get(d.person_name) ?? 0) + d.amount)
  }

  const handleCreate = async () => {
    if (!personName.trim() || !amount || Number(amount) <= 0) return
    setSaving(true)
    const debt = await createDebt({
      person_name: personName.trim(),
      amount: Number(amount),
      description: description.trim() || null,
    })
    if (debt) setDebts((prev) => [debt, ...prev])
    setPersonName("")
    setAmount("")
    setDescription("")
    setShowCreate(false)
    setSaving(false)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleClear = async () => {
    if (selectedIds.size === 0) return
    const ids = Array.from(selectedIds)
    await clearDebts(ids)
    const now = new Date().toISOString()
    setDebts((prev) =>
      prev.map((d) => (ids.includes(d.id) ? { ...d, status: "cleared" as const, cleared_at: now } : d))
    )
    setSelectedIds(new Set())
  }

  const handleDelete = async (id: string) => {
    await deleteDebt(id)
    setDebts((prev) => prev.filter((d) => d.id !== id))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col bg-zinc-950">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-sm font-medium text-zinc-100">Debts</h1>
        <div className="flex-1" />
        <button
          onClick={() => setShowCreate(true)}
          className="rounded p-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
          <span className="text-xs text-zinc-400">{selectedIds.size} selected</span>
          <button
            onClick={handleClear}
            className="rounded-lg bg-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-100 hover:bg-zinc-600 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {active.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-zinc-600">No active debts</p>
        )}
        {active.map((debt) => {
          const cumul = cumulativeByPerson.get(debt.person_name)
          const showCumul = cumul !== undefined && cumul > debt.amount
          return (
            <div key={debt.id} className="flex items-center gap-3 border-b border-zinc-800/50 px-4 py-2.5 transition-colors hover:bg-zinc-800/30">
              <input
                type="checkbox"
                checked={selectedIds.has(debt.id)}
                onChange={() => toggleSelect(debt.id)}
                className="size-3.5 shrink-0 rounded border-zinc-600 bg-zinc-800 accent-zinc-100"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-zinc-100 truncate">{debt.person_name}</span>
                  {showCumul && (
                    <span className="shrink-0 text-[10px] text-zinc-500">
                      ({formatAmount(cumul!)} total)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  {debt.description && (
                    <span className="text-xs text-zinc-400 truncate">{debt.description}</span>
                  )}
                  <span className="text-xs text-zinc-600">{formatDate(debt.created_at)}</span>
                </div>
              </div>
              <span className="shrink-0 text-sm font-medium text-zinc-200">{formatAmount(debt.amount)}</span>
              <button
                onClick={() => handleDelete(debt.id)}
                className="shrink-0 rounded p-1 text-zinc-600 hover:text-red-400 transition-colors md:opacity-0 md:group-hover:opacity-100"
                title="Delete"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          )
        })}

        {cleared.length > 0 && (
          <>
            <button
              onClick={() => setShowCleared(!showCleared)}
              className="flex w-full items-center gap-1.5 border-b border-zinc-800/50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showCleared ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
              Cleared ({cleared.length})
            </button>
            {showCleared && cleared.map((debt) => (
              <div key={debt.id} className="flex items-center gap-3 border-b border-zinc-800/50 px-4 py-2.5 transition-colors opacity-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400 truncate">{debt.person_name}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {debt.description && (
                      <span className="text-xs text-zinc-600 truncate">{debt.description}</span>
                    )}
                    <span className="text-xs text-zinc-700">{formatDate(debt.created_at)}</span>
                  </div>
                </div>
                <span className="shrink-0 text-sm text-zinc-500 line-through">{formatAmount(debt.amount)}</span>
                <button
                  onClick={() => handleDelete(debt.id)}
                  className="shrink-0 rounded p-1 text-zinc-700 hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-12">
          <div className="w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-6 mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-medium text-zinc-100">New Debt</h2>
              <button onClick={() => setShowCreate(false)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Person</label>
                <input
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="e.g. John"
                  autoFocus
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5">Description (optional)</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Lunch"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCreate}
                disabled={!personName.trim() || !amount || Number(amount) <= 0 || saving}
                className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-600 transition-colors disabled:opacity-30"
              >
                {saving ? "Saving..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getActiveTodos, createTodo, updateStatus, deleteTodo, type Todo } from "@/lib/todos"
import { generateAllTodos } from "@/lib/habits"
import { OWNER_EMAIL } from "@/lib/apps"
import { ArrowLeft, Check, X, Undo2, Trash2, Plus, ChevronDown, ChevronRight, Clock, Repeat } from "lucide-react"
import Link from "next/link"

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

function formatDueBy(dueBy: string | null): string | null {
  if (!dueBy) return null
  const due = new Date(dueBy)
  const now = Date.now()
  const diff = due.getTime() - now
  if (diff < 0) return "Overdue"
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h`
  return due.toLocaleDateString()
}

export default function TodoPage() {
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState("")
  const [showCompleted, setShowCompleted] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
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
      await loadTodos()
      setLoading(false)
    })
  }, [])

  const loadTodos = async () => {
    const data = await getActiveTodos()
    setTodos(data)
  }

  const handleAdd = async () => {
    const title = input.trim()
    if (!title) return
    setInput("")
    const todo = await createTodo(title)
    if (todo) setTodos((prev) => [todo, ...prev])
  }

  const handleStatus = async (id: string, status: "active" | "completed" | "failed") => {
    await updateStatus(id, status)
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status, updated_at: new Date().toISOString(), completed_at: status === "completed" ? new Date().toISOString() : null, failed_at: status === "failed" ? new Date().toISOString() : null }
          : t
      )
    )
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    )
  }

  const active = todos.filter((t) => t.status === "active")
  const completed = todos.filter((t) => t.status === "completed")
  const failed = todos.filter((t) => t.status === "failed")

  const TodoItem = ({ todo }: { todo: Todo }) => {
    const dueByText = formatDueBy(todo.due_by)
    return (
      <div className="group flex items-center gap-3 border-b border-zinc-800/50 px-4 py-2.5 transition-colors hover:bg-zinc-800/30">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {todo.habit_id && <Repeat className="size-3 shrink-0 text-zinc-600" />}
          <span className="text-sm text-zinc-200 truncate">{todo.title}</span>
          {dueByText && (
            <span className={`shrink-0 text-xs flex items-center gap-1 ${dueByText === "Overdue" ? "text-red-400" : "text-zinc-600"}`}>
              <Clock className="size-3" />
              {dueByText}
            </span>
          )}
          <span className="shrink-0 text-xs text-zinc-600">{relativeTime(todo.created_at)}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {todo.status === "active" ? (
            <>
              <button onClick={() => handleStatus(todo.id, "completed")} className="rounded p-1 text-zinc-600 hover:text-emerald-400 transition-colors" title="Complete">
                <Check className="size-3.5" />
              </button>
              <button onClick={() => handleStatus(todo.id, "failed")} className="rounded p-1 text-zinc-600 hover:text-red-400 transition-colors" title="Fail">
                <X className="size-3.5" />
              </button>
            </>
          ) : (
            <button onClick={() => handleStatus(todo.id, "active")} className="rounded p-1 text-zinc-600 hover:text-zinc-300 transition-colors" title="Reactivate">
              <Undo2 className="size-3.5" />
            </button>
          )}
          <button onClick={() => handleDelete(todo.id)} className="rounded p-1 text-zinc-600 hover:text-red-400 transition-colors md:opacity-0 md:group-hover:opacity-100" title="Delete">
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col bg-zinc-950">
      <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-sm font-medium text-zinc-100">Todo</h1>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a todo..."
          className="flex-1 border-0 bg-transparent p-0 text-base text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="shrink-0 rounded p-1.5 text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-30"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {active.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-zinc-600">No todos yet</p>
        )}
        {active.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        {completed.length > 0 && (
          <>
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className="flex w-full items-center gap-1.5 border-b border-zinc-800/50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showCompleted ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
              Done ({completed.length})
            </button>
            {showCompleted && completed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        )}

        {failed.length > 0 && (
          <>
            <button
              onClick={() => setShowFailed(!showFailed)}
              className="flex w-full items-center gap-1.5 border-b border-zinc-800/50 px-4 py-2 text-xs font-medium uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {showFailed ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
              Failed ({failed.length})
            </button>
            {showFailed && failed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

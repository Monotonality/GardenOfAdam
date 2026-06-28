"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getNotes, createNote, deleteNote, type Note } from "@/lib/notes"
import { OWNER_EMAIL } from "@/lib/apps"
import { NotesList } from "@/components/notes-list"
import { NoteEditor } from "@/components/note-editor"
import { ArrowLeft, PanelLeftClose, PanelLeft } from "lucide-react"
import Link from "next/link"

export default function ScratchPage() {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      if (!u || u.email !== OWNER_EMAIL) {
        router.push("/auth/login")
        return
      }
      setUser(u)
      loadNotes()
      setLoading(false)
    })
  }, [])

  const loadNotes = async () => {
    const data = await getNotes()
    setNotes(data)
  }

  const handleCreate = async () => {
    const note = await createNote()
    if (note) {
      setNotes((prev) => [note, ...prev])
      setSelectedId(note.id)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    )
  }

  const selectedNote = notes.find((n) => n.id === selectedId)

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Sidebar */}
      <div className={`flex flex-col border-r border-zinc-800 bg-zinc-900/50 transition-all duration-200 ${sidebarOpen ? "w-72" : "w-12"}`}>
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-3">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
            <ArrowLeft className="size-4" />
          </Link>
          <span className={`text-sm font-medium text-zinc-100 flex-1 ${sidebarOpen ? "" : "hidden"}`}>Scratch</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {sidebarOpen ? <PanelLeftClose className="size-4" /> : <PanelLeft className="size-4" />}
          </button>
        </div>
        {sidebarOpen && (
          <NotesList
            notes={notes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onCreate={handleCreate}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Editor */}
      <div className="flex-1">
        {selectedNote ? (
          <NoteEditor
            key={selectedNote.id}
            noteId={selectedNote.id}
            initialTitle={selectedNote.title}
            initialContent={selectedNote.content}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-zinc-600">Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  )
}

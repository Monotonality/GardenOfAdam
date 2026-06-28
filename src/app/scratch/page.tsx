"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getNotes, createNote, deleteNote, type Note } from "@/lib/notes"
import { OWNER_EMAIL } from "@/lib/apps"
import { NotesList } from "@/components/notes-list"
import { NoteEditor } from "@/components/note-editor"
import { ArrowLeft, PanelLeftClose, PanelLeft, Menu } from "lucide-react"
import Link from "next/link"

export default function ScratchPage() {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) setSidebarOpen(false)
  }, [isMobile])

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
      if (isMobile) setSidebarOpen(false)
    }
  }

  const handleSelect = (id: string) => {
    setSelectedId(id)
    if (isMobile) setSidebarOpen(false)
  }

  const handleDelete = async (id: string) => {
    await deleteNote(id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const handleBackToList = () => setSelectedId(null)

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
      {/* Sidebar - overlay on mobile, inline on desktop */}
      {isMobile ? (
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex">
              <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
              <div className="relative flex w-72 flex-col bg-zinc-900 border-r border-zinc-800">
                <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                  <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                    <ArrowLeft className="size-4" />
                  </Link>
                  <span className="text-sm font-medium text-zinc-100 flex-1">Scratch</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <PanelLeftClose className="size-4" />
                  </button>
                </div>
                <NotesList
                  notes={notes}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  onCreate={handleCreate}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={`flex flex-col border-r border-zinc-800 bg-zinc-900/50 transition-all duration-200 ${sidebarOpen ? "w-72" : "w-10"}`}>
          <div className={`flex items-center border-b border-zinc-800 py-3 ${sidebarOpen ? "gap-2 px-3" : "justify-center px-0"}`}>
            {sidebarOpen ? (
              <>
                <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
                  <ArrowLeft className="size-4" />
                </Link>
                <span className="text-sm font-medium text-zinc-100 flex-1">Scratch</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <PanelLeftClose className="size-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <PanelLeft className="size-4" />
              </button>
            )}
          </div>
          {sidebarOpen && (
            <NotesList
              notes={notes}
              selectedId={selectedId}
              onSelect={handleSelect}
              onCreate={handleCreate}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}

      {/* Editor */}
      <div className="flex flex-1 flex-col min-w-0">
        {isMobile && selectedNote && (
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <button
              onClick={handleBackToList}
              className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>
            <span className="text-sm font-medium text-zinc-100 truncate flex-1">{selectedNote.title}</span>
            <button
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Menu className="size-4" />
            </button>
          </div>
        )}
        {isMobile && !selectedNote && (
          <NotesList
            notes={notes}
            selectedId={selectedId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
          />
        )}
        <div className="flex-1">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              noteId={selectedNote.id}
              initialTitle={selectedNote.title}
              initialContent={selectedNote.content}
            />
          ) : !isMobile ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-zinc-600">Select a note or create a new one</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

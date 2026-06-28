"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Note } from "@/lib/notes"

interface NotesListProps {
  notes: Note[]
  selectedId: string | null
  onSelect: (id: string) => void
  onCreate: () => void
  onDelete: (id: string) => void
}

export function NotesList({ notes, selectedId, onSelect, onCreate, onDelete }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-sm text-zinc-500">No notes yet</p>
        <Button onClick={onCreate} size="sm" variant="outline">
          <Plus className="mr-1.5 size-3.5" />
          Create Note
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Notes</span>
        <Button onClick={onCreate} size="xs" variant="ghost" className="text-zinc-400 hover:text-zinc-100">
          <Plus className="size-3.5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelect(note.id)}
            className={cn(
              "group flex cursor-pointer items-center gap-2 border-b border-zinc-800/50 px-4 py-2.5 transition-colors hover:bg-zinc-800/50",
              selectedId === note.id && "bg-zinc-800"
            )}
          >
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm text-zinc-200">{note.title}</p>
              <p className="truncate text-xs text-zinc-500">
                {note.content
                  ? note.content.split("\n")[0].slice(0, 60) || "No content"
                  : "No content"}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(note.id)
              }}
              className="shrink-0 rounded p-1 text-zinc-600 opacity-0 transition-all hover:text-red-400 group-hover:opacity-100"
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

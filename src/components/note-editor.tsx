"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateNote } from "@/lib/notes"
import { Check,Loader2 } from "lucide-react"

interface NoteEditorProps {
  noteId: string
  initialTitle: string
  initialContent: string
}

export function NoteEditor({ noteId, initialTitle, initialContent }: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [saved, setSaved] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialMount = useRef(true)
  const titleRef = useRef(title)
  const contentRef = useRef(content)
  const noteIdRef = useRef(noteId)

  titleRef.current = title
  contentRef.current = content
  noteIdRef.current = noteId

  useEffect(() => {
    setTitle(initialTitle)
    setContent(initialContent)
    setSaved(true)
  }, [noteId, initialTitle, initialContent])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setSaved(false)
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      await updateNote(noteIdRef.current, { title: titleRef.current, content: contentRef.current })
      setSaved(true)
    }, 1500)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [title, content])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        updateNote(noteIdRef.current, { title: titleRef.current, content: contentRef.current })
      }
    }
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          {saved ? (
            <>
              <Check className="size-3" />
              Saved
            </>
          ) : (
            <>
              <Loader2 className="size-3 animate-spin" />
              Saving...
            </>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="mb-6 border-0 bg-transparent p-0 text-xl font-semibold text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-0"
        />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="min-h-[60vh] resize-none border-0 bg-transparent p-0 text-sm leading-relaxed text-zinc-300 placeholder:text-zinc-600 focus-visible:ring-0"
        />
      </div>
    </div>
  )
}

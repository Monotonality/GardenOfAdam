import { Image as ImageIcon, Play } from "lucide-react"
import type { MediaSlot as MediaSlotData } from "@/lib/portfolio/technical"

export function MediaSlot({ media }: { media: MediaSlotData[] }) {
  if (!media || media.length === 0) return null
  return (
    <div className="space-y-3">
      {media.map((m) => (
        <figure
          key={`${m.kind}-${m.alt}`}
          className="overflow-hidden rounded-lg border border-dashed border-border bg-muted/30"
        >
          {m.src ? (
            m.kind === "video" ? (
              <video src={m.src} controls className="aspect-video w-full bg-black/10">
                <track kind="captions" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.src} alt={m.alt} className="aspect-video w-full object-cover" />
            )
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 p-4 text-muted-foreground/70">
              {m.kind === "video" ? <Play className="size-6" /> : <ImageIcon className="size-6" />}
              <span className="max-w-sm text-center text-xs">{m.alt}</span>
            </div>
          )}
          <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
            {m.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
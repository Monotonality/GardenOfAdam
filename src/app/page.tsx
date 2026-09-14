import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500">
          Garden of Adam
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Hello, I&apos;m <span className="text-zinc-500">Adam</span>. I build software.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
          Small, focused web apps and tools — crafted for myself, and sometimes
          for people I&apos;m annoyed at.
        </p>
      </main>

      <footer className="flex flex-col items-center gap-2 pb-8">
        <p className="text-xs text-zinc-700">© {new Date().getFullYear()} Adam</p>
        <Link
          href="/apps"
          aria-label="Apps"
          title="Apps"
          className="text-zinc-700 transition-colors hover:text-zinc-400"
        >
          ✦
        </Link>
      </footer>
    </div>
  )
}
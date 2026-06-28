import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Garden of Adam",
  description: "A personal collection of web apps and tools",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
        {children}
      </body>
    </html>
  )
}

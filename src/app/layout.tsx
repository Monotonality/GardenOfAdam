import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Lora } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Adam Torres — Engineer & Business Analyst",
  description:
    "Adam Torres — business analytics & AI. Full-stack engineer building AI systems, and a data strategist advising leadership. Technical and business modes in one place.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark h-full antialiased ${inter.variable} ${jetbrains_mono.variable} ${lora.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(new URLSearchParams(location.search).get("mode")==="business"){document.documentElement.classList.add("theme-business")}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  )
}
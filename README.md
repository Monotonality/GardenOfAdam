# Garden of Adam

A personal web app hub — one place for all the small tools, toys, and utilities I build for myself.

**Stack:** Next.js 16 · Vercel · Supabase · shadcn/ui · Tailwind v4

**Domain:** [gardenofadam.com](https://gardenofadam.com)

---

## Vision

I build small web apps for myself. Instead of spinning up a new project and database every time, this is a single place to host them all. Each app lives at its own route (`/todolist`, `/notes`, ...) and shares one Supabase project while keeping its own tables.

## The Hub

The root URL — [gardenofadam.com](https://gardenofadam.com) — is the hub: a dark-themed minimalist dashboard that lists every app. What you see depends on who you are.

**Features:**
- Search bar to filter apps by name
- Toggle between grid view (squares) and list view (rows)
- User button (top-right) for sign in / account menu
- Each app shown as a card or row with name, description, status badge, and icon

## Access Model

All managed through a single Supabase Auth account. A permissions table maps who can see what.

| Level | Meaning |
|---|---|
| **Public** | Anyone can visit, no account needed |
| **User** | Signed in with Supabase Auth — can access |
| **Approved** | Signed in + manually approved by me |
| **Owner** | Only me |

## Project Structure

```
gardenofadam/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Hub
│   │   ├── layout.tsx             # Root layout (dark theme)
│   │   ├── globals.css            # Tailwind + theme variables
│   │   └── auth/                  # Auth pages
│   │       ├── login/
│   │       ├── sign-up/
│   │       ├── sign-up-success/
│   │       ├── forgot-password/
│   │       ├── update-password/
│   │       ├── error/
│   │       └── confirm/route.ts
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   ├── app-card.tsx           # Grid card
│   │   ├── app-row.tsx            # List row
│   │   ├── search-bar.tsx         # Search input
│   │   ├── view-toggle.tsx        # Grid/List toggle
│   │   ├── user-button.tsx        # Auth-aware user menu
│   │   ├── login-form.tsx
│   │   ├── sign-up-form.tsx
│   │   ├── forgot-password-form.tsx
│   │   ├── update-password-form.tsx
│   │   └── logout-button.tsx
│   ├── lib/
│   │   ├── apps.ts                # App registry (single source of truth)
│   │   ├── permissions.ts         # Access control helpers
│   │   └── supabase/
│   │       ├── client.ts          # Browser Supabase client
│   │       ├── server.ts          # Server Supabase client
│   │       └── middleware.ts      # Proxy session helpers
│   └── proxy.ts                   # Next.js 16 proxy (session refresh)
├── supabase/
│   └── migrations/
│       └── 00001_app_permissions.sql
├── .env.local                     # Supabase credentials (gitignored)
├── components.json                # shadcn config
└── README.md
```

## Adding a New App

1. Create `src/app/<app-slug>/page.tsx`
2. Add any needed Supabase tables (prefixed by app name)
3. Add the app to `src/lib/apps.ts`:
   ```ts
   {
     slug: "todolist",
     name: "Todo List",
     description: "A simple task manager",
     status: "planned",   // "planned" | "building" | "live"
     access: "user",      // "public" | "user" | "approved" | "owner"
     color: "from-sky-500 to-blue-600",
     icon: "✅",
   }
   ```
4. It appears on the hub automatically (filtered by your access level).

## Protecting a Route (per-app auth)

In any app page that requires auth:

```ts
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")
  // ... rest of your app
}
```

## Adding the Supabase Table

Run the migration in `supabase/migrations/00001_app_permissions.sql` in your Supabase SQL editor to create the `app_permissions` table. Make sure to replace `adam@example.com` with your email.

## Owner Setup

In `src/lib/apps.ts`, update `OWNER_EMAIL` to your email address. This grants you full access to all apps.

## Getting Started

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

### Environment Variables

Already set up in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
```

## Deployment

Push to `main` — Vercel auto-deploys.

[github.com/Monotonality/GardenOfAdam](https://github.com/Monotonality/GardenOfAdam)

## App Inventory

| Route | App | Status | Access |
|---|---|---|---|
| `/` | Hub | Live | Public |
| ... | ... | ... | ... |

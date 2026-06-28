-- Create notes table for the Scratch app
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled',
  content text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_notes_user_id on public.notes(user_id);
create index if not exists idx_notes_updated_at on public.notes(updated_at desc);

alter table public.notes enable row level security;

create policy "Users can manage their own notes"
  on public.notes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

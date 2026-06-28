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

-- Auto-set user_id from authenticated session on insert
create or replace function public.set_user_id()
returns trigger as $$
begin
  new.user_id = auth.uid();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_user_id_on_insert
  before insert on public.notes
  for each row
  execute function public.set_user_id();

-- Grant API access for the notes table
grant all on public.notes to anon, authenticated;

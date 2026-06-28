alter table public.todos add column if not exists scheduled_at timestamptz;
create index if not exists idx_todos_scheduled_at on public.todos(scheduled_at);

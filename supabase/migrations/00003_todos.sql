create table public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'active' check (status in ('active', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  failed_at timestamptz
);

create index if not exists idx_todos_user_id on public.todos(user_id);
create index if not exists idx_todos_status on public.todos(status);

alter table public.todos enable row level security;

create policy "Users can manage their own todos"
  on public.todos for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_user_id()
returns trigger as $$
begin
  new.user_id = auth.uid();
  return new;
end;
$$ language plpgsql security definer;

create trigger set_user_id_on_insert
  before insert on public.todos
  for each row
  execute function public.set_user_id();

grant all on public.todos to anon, authenticated;

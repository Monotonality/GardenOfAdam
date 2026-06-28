create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  schedule_type text not null check (schedule_type in ('daily', 'weekly', 'monthly')),
  schedule_days jsonb not null default '[]',
  schedule_time time not null default '08:00:00',
  do_by_minutes integer,
  end_condition text not null default 'indefinite' check (end_condition in ('indefinite', 'date', 'occurrences')),
  end_date date,
  max_occurrences integer,
  status text not null default 'active' check (status in ('active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_habits_user_id on public.habits(user_id);

alter table public.habits enable row level security;

create policy "Owner can manage habits"
  on public.habits for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_user_id_on_insert
  before insert on public.habits
  for each row
  execute function public.set_user_id();

grant all on public.habits to anon, authenticated;

alter table public.todos add column if not exists habit_id uuid references public.habits(id) on delete cascade;
alter table public.todos add column if not exists due_by timestamptz;
alter table public.todos add column if not exists scheduled_for date;
create index if not exists idx_todos_habit_id on public.todos(habit_id);

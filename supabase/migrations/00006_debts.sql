create table public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  person_name text not null,
  amount numeric not null,
  description text,
  status text not null default 'active' check (status in ('active', 'cleared')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cleared_at timestamptz
);

create index if not exists idx_debts_user_id on public.debts(user_id);
create index if not exists idx_debts_user_status on public.debts(user_id, status);

alter table public.debts enable row level security;

create policy "Users can manage their own debts"
  on public.debts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger set_user_id_on_insert
  before insert on public.debts
  for each row
  execute function public.set_user_id();

grant all on public.debts to anon, authenticated;

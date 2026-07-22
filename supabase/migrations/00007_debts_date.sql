alter table public.debts add column if not exists debt_date date not null default current_date;
create index if not exists idx_debts_debt_date on public.debts(debt_date);

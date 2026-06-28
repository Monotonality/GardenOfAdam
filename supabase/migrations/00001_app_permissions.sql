-- Create app_permissions table
-- Maps user_id to the apps they're approved to access.
-- The "owner" check is done by comparing user email against a config value in the app.

create table public.app_permissions (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id) on delete cascade,
  app_slug text not null,
  created_at timestamptz not null default now(),
  granted_by uuid references auth.users(id),

  -- each user can only have one entry per app
  unique (user_id, app_slug)
);

-- Enable RLS
alter table public.app_permissions enable row level security;

-- Only the user themselves and admins can read
create policy "Users can read their own permissions"
  on public.app_permissions
  for select
  using (auth.uid() = user_id);

-- Only authenticated users with owner role can insert/update/delete
create policy "Only owners can manage permissions"
  on public.app_permissions
  for all
  using (
    auth.jwt() ->> 'email' = 'adam.j.tor@gmail.com'
  )
  with check (
    auth.jwt() ->> 'email' = 'adam.j.tor@gmail.com'
  );

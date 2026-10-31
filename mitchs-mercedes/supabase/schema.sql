-- Mitch's Mercedes — run once in Supabase: SQL Editor > New query > paste > Run.
-- Each row keeps the whole record as JSON in `data`, so adding form fields later needs no migration.

create table if not exists public.vehicles (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.repairs (
  id text primary key,
  vehicle_id text not null references public.vehicles(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.recalls (
  id text primary key,
  vehicle_id text not null references public.vehicles(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists repairs_vehicle_idx on public.repairs(vehicle_id);
create index if not exists recalls_vehicle_idx on public.recalls(vehicle_id);

-- Only logged-in staff can read or write anything. Anonymous visitors get nothing.
alter table public.vehicles enable row level security;
alter table public.repairs  enable row level security;
alter table public.recalls  enable row level security;

create policy "staff full access" on public.vehicles for all to authenticated using (true) with check (true);
create policy "staff full access" on public.repairs  for all to authenticated using (true) with check (true);
create policy "staff full access" on public.recalls  for all to authenticated using (true) with check (true);

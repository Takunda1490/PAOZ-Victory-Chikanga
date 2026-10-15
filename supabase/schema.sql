-- PAOZ Victory Tabernacle — database schema
-- Run this once in the Supabase SQL editor (Dashboard -> SQL -> New query).

-- ---------------------------------------------------------------- tables

create table if not exists public.site_content (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id         uuid primary key default gen_random_uuid(),
  day        text        not null,
  time       text        not null default '',
  image_url  text        not null default '',
  sort_order integer     not null default 0
);

create table if not exists public.pillars (
  id         uuid primary key default gen_random_uuid(),
  title      text        not null,
  reference  text        not null default '',
  body       text        not null default '',
  image_url  text        not null default '',
  sort_order integer     not null default 0
);

create table if not exists public.scriptures (
  id         uuid primary key default gen_random_uuid(),
  reference  text        not null,
  title      text        not null default '',
  verse      text        not null default '',
  note       text        not null default '',
  image_url  text        not null default '',
  sort_order integer     not null default 0
);

create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  title        text        not null,
  speaker      text        not null default '',
  event_time   text        not null default '',
  location     text        not null default '',
  description  text        not null default '',
  date_month   text        not null default '',
  date_day     text        not null default '',
  poster_url   text        not null default '',
  show_poster  boolean     not null default true,
  sort_order   integer     not null default 0
);

create table if not exists public.giving_methods (
  id         uuid primary key default gen_random_uuid(),
  label      text        not null,
  value      text        not null default '',
  note       text        not null default '',
  sort_order integer     not null default 0
);

create table if not exists public.admins (
  id         uuid primary key references auth.users on delete cascade,
  email      text unique not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- helpers

-- True only for signed-in users listed in the admins table.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.id = auth.uid());
$$;

-- ---------------------------------------------------------------- RLS

alter table public.site_content    enable row level security;
alter table public.services         enable row level security;
alter table public.pillars         enable row level security;
alter table public.scriptures      enable row level security;
alter table public.events          enable row level security;
alter table public.giving_methods  enable row level security;
alter table public.admins          enable row level security;

-- Everyone can read content (the public website needs it).
drop policy if exists "public read site_content"   on public.site_content;
create policy "public read site_content" on public.site_content
  for select using (true);

drop policy if exists "public read services"       on public.services;
create policy "public read services" on public.services for select using (true);

drop policy if exists "public read pillars"       on public.pillars;
create policy "public read pillars" on public.pillars for select using (true);

drop policy if exists "public read scriptures"    on public.scriptures;
create policy "public read scriptures" on public.scriptures for select using (true);

drop policy if exists "public read events"        on public.events;
create policy "public read events" on public.events for select using (true);

drop policy if exists "public read giving_methods" on public.giving_methods;
create policy "public read giving_methods" on public.giving_methods
  for select using (true);

-- Only admins can change content.
drop policy if exists "admin write site_content" on public.site_content;
create policy "admin write site_content" on public.site_content
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write services" on public.services;
create policy "admin write services" on public.services
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write pillars" on public.pillars;
create policy "admin write pillars" on public.pillars
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write scriptures" on public.scriptures;
create policy "admin write scriptures" on public.scriptures
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write events" on public.events;
create policy "admin write events" on public.events
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin write giving_methods" on public.giving_methods;
create policy "admin write giving_methods" on public.giving_methods
  for all using (public.is_admin()) with check (public.is_admin());

-- Admins can read their own row. No client-side insert/delete allowed:
-- grant yourself admin access with the SQL at the bottom of this file.
drop policy if exists "admin read admins" on public.admins;
create policy "admin read admins" on public.admins
  for select using (public.is_admin());

-- ---------------------------------------------------------------- storage

-- Create a public bucket for event posters and other uploads:
--   insert into storage.buckets (id, name, public)
--   values ('site-assets', 'site-assets', true);
--
-- Then allow admins to upload / manage objects in it:
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "public read site-assets" on storage.objects;
create policy "public read site-assets" on storage.objects
  for select using (bucket_id = 'site-assets');

drop policy if exists "admin upload site-assets" on storage.objects;
create policy "admin upload site-assets" on storage.objects
  for insert with check (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "admin update site-assets" on storage.objects;
create policy "admin update site-assets" on storage.objects
  for update using (bucket_id = 'site-assets' and public.is_admin());

drop policy if exists "admin delete site-assets" on storage.objects;
create policy "admin delete site-assets" on storage.objects
  for delete using (bucket_id = 'site-assets' and public.is_admin());

-- ---------------------------------------------------------------- first admin
-- 1. Create a user: Dashboard -> Authentication -> Users -> Add user
--    (tick "Auto Confirm User").
-- 2. Run the insert below with that user's email:
--
-- insert into public.admins (id, email)
-- select id, email from auth.users where email = 'you@example.com';
-- Grant admin access to an existing Supabase user.
-- 1. Edit the email below to the one you sign in with at /admin.
-- 2. Run this in the Supabase SQL editor (Dashboard -> SQL -> New query).
-- 3. Sign out of /admin and sign back in.
--
-- The id must match the auth user exactly, otherwise every save is rejected
-- with "new row violates row-level security policy".

insert into public.admins (id, email)
select id, email from auth.users where email = 'you@example.com'
on conflict (email) do update set id = excluded.id;

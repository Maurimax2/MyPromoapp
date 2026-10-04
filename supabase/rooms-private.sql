-- Private study rooms: a room only the people holding its link can enter.
--
-- Paste this once into Supabase → SQL editor. It is safe to run twice.
--
--   private   a private room is never listed — not on غرف الدراسة, not in
--             «يدرسون الآن» on الرئيسية — and nobody can read it from the list.
--   code      the secret in the invitation link (/rooms/join/<code>). Whoever
--             has the link can join, from any year; whoever does not, cannot
--             even tell the room exists.
--
-- A public room is exactly as it was.

alter table rooms add column if not exists private boolean not null default false;
alter table rooms add column if not exists code    text;

create unique index if not exists rooms_code_key on rooms (code) where code is not null;

-- A private room is read by its host and by staff only. Everybody else gets in
-- through the server, with the link, which checks the code. (Not by "being a
-- member": a policy here that asked room_members would be a policy on a table
-- whose own policy asks rooms — Postgres refuses that as infinite recursion.)
drop policy if exists rooms_read on rooms;
create policy rooms_read on rooms for select
  using ((is_approved() and promo = my_promo() and not private) or host = auth.uid() or is_staff());

-- Who is in a room is no more public than the room: a private room's members
-- are not listed to the promo.
drop policy if exists members_read on room_members;
create policy members_read on room_members for select
  using (exists (select 1 from rooms r where r.id = room
                 and ((is_approved() and r.promo = my_promo() and not r.private)
                      or r.host = auth.uid() or is_staff())));

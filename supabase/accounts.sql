-- Accounts and tracks — usernames, first-years' WhatsApp numbers, and the
-- pharmacy and dental years.
--
-- Paste the whole file into Supabase → SQL Editor → Run. It is safe to run
-- again: every step looks before it writes, and nothing here uses
-- ON CONFLICT (several unique indexes in this schema are partial, and
-- Postgres will not infer a conflict target from those).
--
-- 1. A username for everybody. It is how classmates find and challenge each
--    other — first-years have no university number yet, and a number is not
--    something anybody remembers about a friend anyway.
-- 2. A WhatsApp number for first-years, in a table of its own. Classmates
--    read each other's profile row (every screen names an author), so a
--    phone column there would be readable by the whole promo. Here only the
--    person and staff can read it; staff use it to check the number is in
--    the faculty's WhatsApp groups before approving.
-- 3. Three tracks at FMPOS — medicine (PCEM/DCEM), pharmacy (PCEP), dental
--    (PCED) — and the first year's shared programme: dental reads medicine's
--    first year all year, pharmacy for the first semester only.
-- 4. The name of a student union that is not the faculty, taken out of the
--    titles students read.

-- ---------------------------------------------------------------------------
-- 1. Usernames
-- ---------------------------------------------------------------------------
alter table profiles add column if not exists username text;

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_username_shape') then
    -- Lower-case letters, digits, dot and underscore; 3 to 20 of them. What
    -- a phone keyboard types without switching layouts, and what fits a URL.
    alter table profiles add constraint profiles_username_shape
      check (username is null or username ~ '^[a-z0-9_.]{3,20}$');
  end if;
end $$;

create unique index if not exists profiles_username_key
  on profiles (username) where username is not null;

-- ---------------------------------------------------------------------------
-- 2. First-years' WhatsApp numbers — readable by the person and staff only
-- ---------------------------------------------------------------------------
create table if not exists profile_private (
  id         uuid primary key references profiles on delete cascade,
  phone      text,
  updated_at timestamptz not null default now()
);

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profile_private_phone_shape') then
    -- Digits, an optional leading +, spaces allowed: +222 36 12 34 56.
    alter table profile_private add constraint profile_private_phone_shape
      check (phone is null or phone ~ '^\+?[0-9 ]{8,20}$');
  end if;
end $$;

alter table profile_private enable row level security;

drop policy if exists private_read on profile_private;
create policy private_read on profile_private for select
  using (id = auth.uid() or is_staff());

drop policy if exists private_insert on profile_private;
create policy private_insert on profile_private for insert
  with check (id = auth.uid());

drop policy if exists private_update on profile_private;
create policy private_update on profile_private for update
  using (id = auth.uid()) with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- 3. Tracks, years, and the shared first year
-- ---------------------------------------------------------------------------
alter table promos add column if not exists track text;
alter table promos add column if not exists year int;
-- A year that studies another year's subjects: dental's first year reads
-- medicine's first year, S1 and S2; pharmacy's first year reads it for S1.
alter table promos add column if not exists reads_from text references promos;
alter table promos add column if not exists reads_semesters text[];

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'promos_track_shape') then
    alter table promos add constraint promos_track_shape
      check (track is null or track in ('medicine', 'pharmacy', 'dental'));
  end if;
end $$;

-- The medicine years that exist, told which track and year they are.
update promos set track = 'medicine', year = 1 where id = 'pcem1' and track is null;
update promos set track = 'medicine', year = 2 where id = 'pcem2' and track is null;
update promos set track = 'medicine', year = 3 where id = 'dcem1' and track is null;
update promos set track = 'medicine', year = 4 where id = 'dcem2' and track is null;
update promos set track = 'medicine', year = 5 where id = 'dcem3' and track is null;
update promos set track = 'medicine', year = 6 where id = 'dcem4' and track is null;

-- The pharmacy and dental first years, added if they are not there.
insert into promos (id, name, label, badge, position, indexed, track, year, reads_from, reads_semesters)
select 'pcep1', 'PCEP1', 'صيدلة — السنة الأولى', '#14555F', 11, false, 'pharmacy', 1, 'pcem1', array['S1']
where not exists (select 1 from promos where id = 'pcep1')
  and exists (select 1 from promos where id = 'pcem1');

insert into promos (id, name, label, badge, position, indexed, track, year, reads_from, reads_semesters)
select 'pced1', 'PCED1', 'طب الأسنان — السنة الأولى', '#8A6A14', 21, false, 'dental', 1, 'pcem1', array['S1', 'S2']
where not exists (select 1 from promos where id = 'pced1')
  and exists (select 1 from promos where id = 'pcem1');

-- The later pharmacy and dental years. Each has its own subjects, which are
-- added in the panel when they are known — nothing is shared with medicine.
-- Pharmacy: PCEP1, PCEP2, DCEP1, DCEP2. Dental: PCED1, PCED2, DCED1.
insert into promos (id, name, label, badge, position, indexed, track, year)
select 'pcep2', 'PCEP2', 'صيدلة — السنة الثانية', '#1C6B6F', 12, false, 'pharmacy', 2
where not exists (select 1 from promos where id = 'pcep2');

insert into promos (id, name, label, badge, position, indexed, track, year)
select 'dcep1', 'DCEP1', 'صيدلة — السنة الثالثة', '#0F4A55', 13, false, 'pharmacy', 3
where not exists (select 1 from promos where id = 'dcep1');

insert into promos (id, name, label, badge, position, indexed, track, year)
select 'dcep2', 'DCEP2', 'صيدلة — السنة الرابعة', '#2A7A72', 14, false, 'pharmacy', 4
where not exists (select 1 from promos where id = 'dcep2');

insert into promos (id, name, label, badge, position, indexed, track, year)
select 'pced2', 'PCED2', 'طب الأسنان — السنة الثانية', '#9A7A22', 22, false, 'dental', 2
where not exists (select 1 from promos where id = 'pced2');

insert into promos (id, name, label, badge, position, indexed, track, year)
select 'dced1', 'DCED1', 'طب الأسنان — السنة الثالثة', '#6E5410', 23, false, 'dental', 3
where not exists (select 1 from promos where id = 'dced1');

-- ---------------------------------------------------------------------------
-- 4. Titles students read: the faculty is FMPOS
-- ---------------------------------------------------------------------------
update question_banks
   set section = nullif(btrim(regexp_replace(section, '\s*[—-]?\s*\(?UNEM\)?', '', 'g')), '')
 where section ~ 'UNEM';

update question_banks
   set title = btrim(regexp_replace(title, '\s*[—-]?\s*\(?UNEM\)?', '', 'g'))
 where title ~ 'UNEM'
   and btrim(regexp_replace(title, '\s*[—-]?\s*\(?UNEM\)?', '', 'g')) <> '';

update documents
   set title = btrim(regexp_replace(title, '\s*[—-]?\s*\(?UNEM\)?', '', 'g'))
 where title ~ 'UNEM'
   and btrim(regexp_replace(title, '\s*[—-]?\s*\(?UNEM\)?', '', 'g')) <> '';

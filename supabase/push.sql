-- Being told when you are not looking — push notifications, friends, and
-- announcements.
--
-- Paste the whole file into Supabase → SQL Editor → Run. Safe to run again,
-- and nothing here uses ON CONFLICT.
--
-- 1. push_devices: the phones and browsers that may be woken. One row per
--    device, not per person — a student with the app and the website open
--    on a laptop is two. A device belongs to whoever registered it last: a
--    phone handed to a sister who signs in with her own account stops
--    receiving the brother's messages that moment.
-- 2. push_prefs: the kinds of push a person has turned off. Absent means
--    everything on.
-- 3. friends: asked by one, accepted by the other. Friends are told when the
--    other posts or opens a study room — the one thing a promo of three
--    hundred cannot be told about every member of.
-- 4. announcements: what the faculty's team says to everybody, or to one
--    year. Each one also becomes a row in every recipient's notifications,
--    so the bell has it after the push is swiped away.
-- 5. push_log: the reminders already sent today, so a reminder is sent once
--    even if the job that sends it runs twice.
--
-- Everything is written by the server alone (it holds the service key).
-- People read their own rows.

-- ---------------------------------------------------------------------------
-- Devices
-- ---------------------------------------------------------------------------

create table if not exists push_devices (
  id         bigint generated always as identity primary key,
  person     uuid   not null references profiles on delete cascade,
  platform   text   not null check (platform in ('android', 'ios', 'web')),
  token      text   not null,        -- an FCM token, or a web push endpoint
  keys       jsonb,                   -- web push only: p256dh and auth
  created_at timestamptz not null default now(),
  seen_at    timestamptz not null default now()
);

create unique index if not exists push_devices_token_key on push_devices (token);
create index if not exists push_devices_person_idx on push_devices (person);

alter table push_devices enable row level security;

-- A token is enough to send somebody a notification, so nobody reads them
-- but the server: no policy at all.

-- ---------------------------------------------------------------------------
-- What each person has turned off
-- ---------------------------------------------------------------------------

create table if not exists push_prefs (
  person     uuid primary key references profiles on delete cascade,
  off        text[] not null default '{}',   -- social|friends|duels|messages|reminders|news
  updated_at timestamptz not null default now()
);

alter table push_prefs enable row level security;

drop policy if exists push_prefs_own on push_prefs;
create policy push_prefs_own on push_prefs for select using (person = auth.uid());

-- ---------------------------------------------------------------------------
-- Friends
-- ---------------------------------------------------------------------------

create table if not exists friends (
  a           uuid not null references profiles on delete cascade,  -- who asked
  b           uuid not null references profiles on delete cascade,  -- who was asked
  created_at  timestamptz not null default now(),
  accepted_at timestamptz,                                          -- null: still asking
  primary key (a, b),
  check (a <> b)
);

-- One friendship per pair, whichever of the two asked first: a second
-- request the other way round is an acceptance, and the server treats it so.
create unique index if not exists friends_pair_key on friends (least(a, b), greatest(a, b));
create index if not exists friends_b_idx on friends (b);

alter table friends enable row level security;

drop policy if exists friends_own on friends;
create policy friends_own on friends for select
  using (a = auth.uid() or b = auth.uid());

-- ---------------------------------------------------------------------------
-- Announcements
-- ---------------------------------------------------------------------------

create table if not exists announcements (
  id         bigint generated always as identity primary key,
  author     uuid references profiles on delete set null,
  promo      text references promos on delete cascade,   -- null: every year
  title      text not null check (char_length(title) between 1 and 80),
  body       text check (body is null or char_length(body) <= 600),
  link       text,
  created_at timestamptz not null default now()
);

create index if not exists announcements_created_idx on announcements (created_at desc);

alter table announcements enable row level security;

drop policy if exists announcements_read on announcements;
create policy announcements_read on announcements for select
  using (is_staff() or (is_approved() and (promo is null or promo = my_promo())));

-- The bell's rows learn where to go and which announcement they are.
alter table notifications add column if not exists link text;
alter table notifications add column if not exists announcement bigint
  references announcements on delete cascade;

-- ---------------------------------------------------------------------------
-- Reminders already sent
-- ---------------------------------------------------------------------------

create table if not exists push_log (
  person uuid not null references profiles on delete cascade,
  kind   text not null,
  day    date not null,
  primary key (person, kind, day)
);

create index if not exists push_log_day_idx on push_log (day);

alter table push_log enable row level security;

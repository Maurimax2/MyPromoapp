-- Who has the app open, and where.
--
-- Paste this once into Supabase → SQL editor. It is safe to run twice.
--
--   presence    one row per person: the screen they were last on, and when the
--               phone last said so. «Online» is a row seen in the last couple of
--               minutes — worked out when it is asked, never stored, so it can
--               never be wrong about somebody who closed the app.
--   app_opens   one row each time the app is opened (a new session, or one after
--               half an hour away). The count of people who opened it, and how
--               often, is read from here.
--
-- Written only by the server with the service key, and read only by the admin
-- panel the same way: nothing here has a policy, so a student's own key sees
-- neither table.

create table if not exists presence (
  person      uuid primary key references profiles on delete cascade,
  promo       text,
  screen      text        not null default 'feed',
  platform    text        not null default 'web',     -- app | desktop | pwa | web
  first_seen  timestamptz not null default now(),
  seen_at     timestamptz not null default now(),
  opens       int         not null default 0
);

create index if not exists presence_seen_idx on presence (seen_at desc);

create table if not exists app_opens (
  id        bigint generated always as identity primary key,
  person    uuid        not null references profiles on delete cascade,
  promo     text,
  platform  text        not null default 'web',
  at        timestamptz not null default now()
);

create index if not exists app_opens_at_idx on app_opens (at desc);
create index if not exists app_opens_person_idx on app_opens (person);

alter table presence  enable row level security;
alter table app_opens enable row level security;

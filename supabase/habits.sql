-- The daily habit — days studied, and the question of the day.
--
-- Paste the whole file into Supabase → SQL Editor → Run. Safe to run again,
-- and nothing here uses ON CONFLICT.
--
-- Two records, and everything else is worked out from them — the streak,
-- the streak freezes, the milestone badges, «N studied today», the weekly
-- leaderboard. Nothing counted is stored, the same rule as the points: a
-- stored streak is a number that can disagree with the days it claims to
-- count.
--
-- 1. study_days: one row per person per day they studied — opened a lecture
--    or answered a question. Opening the app does not count; a streak kept
--    by tapping an icon means nothing. `n` is how much, for the heatmap.
-- 2. daily_answers: the question of the day, one answer per person per day.
--    Which question it is, and whether the answer is right, is decided on
--    the server; the row keeps the promo so a year's result can be counted.
--
-- Both are written by the server alone (it holds the service key), so a
-- browser cannot write itself a streak. People read their own rows; staff
-- read all of them.

create table if not exists study_days (
  person uuid not null references profiles on delete cascade,
  day    date not null,
  n      int  not null default 1,
  primary key (person, day)
);

-- The year the person was in that day, so «N من دفعتك درسوا اليوم» is one
-- count and not the whole faculty's rows shuffled on every load.
alter table study_days add column if not exists promo text;

create index if not exists study_days_day_idx on study_days (day);
create index if not exists study_days_promo_day_idx on study_days (promo, day);

alter table study_days enable row level security;

drop policy if exists study_days_read on study_days;
create policy study_days_read on study_days for select
  using (person = auth.uid() or is_staff());

create table if not exists daily_answers (
  person      uuid   not null references profiles on delete cascade,
  day         date   not null,
  promo       text   not null,
  question    bigint references questions on delete set null,
  correct     boolean not null,
  answered_at timestamptz not null default now(),
  primary key (person, day)
);

create index if not exists daily_answers_promo_day_idx on daily_answers (promo, day);

alter table daily_answers enable row level security;

drop policy if exists daily_answers_read on daily_answers;
create policy daily_answers_read on daily_answers for select
  using (person = auth.uid() or is_staff());

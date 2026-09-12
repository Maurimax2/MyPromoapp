-- MyPromo — the database.
--
-- Everything the app knows now lives in JavaScript files that I edit by hand.
-- That works for one promo catalogued by one person. It cannot work for six
-- promos maintained by four. So the content moves here, and the admin panel
-- writes to it.
--
-- Run this once, in Supabase → SQL Editor → New query → paste → Run.
-- It is safe to run twice: everything is `if not exists`.

-- ---------------------------------------------------------------------------
-- People
-- ---------------------------------------------------------------------------

-- Supabase owns `auth.users`. This is what MyPromo knows on top of it: which
-- promo a student is in, what they are allowed to do, and whether they have
-- been let in yet.
create table if not exists profiles (
  id          uuid primary key references auth.users on delete cascade,
  email       text not null,
  full_name   text,
  promo       text,                                    -- pcem1 … dcem4
  role        text not null default 'student',         -- owner|admin|editor|marketing|student
  status      text not null default 'pending',         -- pending|approved|refused
  created_at  timestamptz not null default now(),
  approved_by uuid references profiles(id),
  approved_at timestamptz
);

create index if not exists profiles_status_idx on profiles (status);
create index if not exists profiles_promo_idx  on profiles (promo);

-- Asked once and answered in a lot of places, so it lives in the database
-- rather than being recomputed in every policy.
create or replace function is_staff() returns boolean
  language sql stable security definer set search_path = public as $$
    select exists (
      select 1 from profiles
      where id = auth.uid() and role in ('owner', 'admin', 'editor')
    );
  $$;

create or replace function is_admin() returns boolean
  language sql stable security definer set search_path = public as $$
    select exists (
      select 1 from profiles
      where id = auth.uid() and role in ('owner', 'admin')
    );
  $$;

create or replace function is_approved() returns boolean
  language sql stable security definer set search_path = public as $$
    select exists (
      select 1 from profiles where id = auth.uid() and status = 'approved'
    );
  $$;

-- ---------------------------------------------------------------------------
-- The archive
-- ---------------------------------------------------------------------------

create table if not exists promos (
  id       text primary key,                            -- pcem2
  name     text not null,                               -- PCEM2
  label    text not null,                               -- السنة الثانية
  badge    text not null,                               -- #6B21B5
  position int  not null default 0,
  indexed  boolean not null default false
);

create table if not exists modules (
  id         text primary key,                          -- anatomie
  promo      text not null references promos on delete cascade,
  semester   text not null,                             -- S1 | S2
  name       text not null,                             -- ANATOMIE
  icon       text not null default 'book',
  tint       text not null default 'purple',
  professors text[] not null default '{}',
  position   int  not null default 0
);

create index if not exists modules_promo_idx on modules (promo);

create table if not exists chapters (
  id       bigint generated always as identity primary key,
  module   text not null references modules on delete cascade,
  title    text not null,                               -- Tête et cou
  subtitle text,
  position int  not null default 0
);

create index if not exists chapters_module_idx on chapters (module);
-- A module names each chapter once, which is what lets an import update a
-- chapter instead of adding a second one with the same name.
create unique index if not exists chapters_module_title_idx on chapters (module, title);

-- One row per openable file. `where_shown` is what decides the screen it
-- appears on: the archive holds what you read, الملخصات what students wrote,
-- اختبر نفسك the question papers.
create table if not exists documents (
  id          bigint generated always as identity primary key,
  module      text   not null references modules on delete cascade,
  chapter     bigint references chapters on delete set null,
  where_shown text   not null default 'archive',        -- archive|notes|quiz
  section     text   not null default 'lecture',        -- lecture|poly|schema|livre|resume|note|exam|isole|qcm
  n           text,                                     -- 5, 5b — the lecture number
  title       text   not null,                          -- French, clean
  prof        text,
  year        int,
  ext         text   not null default 'PDF',
  bytes       bigint,
  drive_id    text,                                     -- the untouched original
  r2_key      text,                                     -- our own copy
  pages       text[],                                   -- a paper photographed page by page
  correction  bigint references documents(id) on delete set null,
  parent      bigint references documents(id) on delete cascade, -- another year's version
  published   boolean not null default true,
  position    int    not null default 0,
  created_at  timestamptz not null default now(),
  created_by  uuid references profiles(id)
);

create index if not exists documents_module_idx  on documents (module, where_shown);
create index if not exists documents_chapter_idx on documents (chapter);
create index if not exists documents_parent_idx  on documents (parent);
create unique index if not exists documents_drive_idx on documents (drive_id) where drive_id is not null;

-- ---------------------------------------------------------------------------
-- Questions
-- ---------------------------------------------------------------------------

-- A bank is one paper: an exam session, an isolé, a teacher's QCM sheet.
create table if not exists question_banks (
  id       bigint generated always as identity primary key,
  module   text   not null references modules on delete cascade,
  document bigint references documents on delete set null,
  title    text   not null,
  section  text,
  position int    not null default 0
);

create index if not exists banks_module_idx on question_banks (module);
create unique index if not exists banks_module_title_idx on question_banks (module, title);

-- `answer` holds the indexes of the true propositions — one or several, which
-- is how UNEM marks them. `source` says who decided: the paper's own key, a
-- member of staff, or Claude. A student is told when it was not the faculty.
create table if not exists questions (
  id          bigint generated always as identity primary key,
  bank        bigint not null references question_banks on delete cascade,
  n           text   not null,                          -- the paper's own numbering
  stem        text   not null,
  options     text[] not null,
  answer      int[]  not null default '{}',
  why         text,
  source      text   not null default 'paper',          -- paper|staff|claude|student
  status      text   not null default 'draft',          -- draft|needs_answer|published|rejected
  created_at  timestamptz not null default now(),
  created_by  uuid references profiles(id),
  reviewed_by uuid references profiles(id),
  reviewed_at timestamptz
);

-- A question that is not multiple choice.
--
-- The clinical years are not examined the way PCEM2 is. Their papers are
-- QROC — write the answer — and clinical cases, and only the most recent year
-- carries any QCM at all. اختبر نفسك assumed propositions and an index into
-- them, so those promos opened it and found an empty screen.
--
-- `kind` says which. A `qroc` carries its answer in `model_answer` as words;
-- `options` and `answer` stay empty for it, and the student marks themselves
-- against what the paper's correction said. The schedule in `reviews` never
-- asked how an answer was judged, so it takes these unchanged.
alter table questions add column if not exists kind text not null default 'qcm';
alter table questions add column if not exists model_answer text;
-- A QROC has no propositions, and the column was written when every question
-- had some.
alter table questions alter column options set default '{}';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'questions_kind_shape') then
    alter table questions add constraint questions_kind_shape
      check (kind in ('qcm', 'qroc'));
  end if;
end $$;

-- Which lecture a question belongs to.
--
-- A bank is the paper a question was printed on — Examen ANATOMIE 2021 — and
-- that is where it came from, not what it is about. A student revising does
-- not revise the 2021 paper; they revise the vessels of the head and neck,
-- and they want the questions on the vessels of the head and neck from every
-- paper at once. The paper stays, because a student sitting a past paper
-- whole is also a real thing; this is the other axis.
--
-- It points at the lecture itself — the `documents` row, the file they open
-- in the archive — so a question and the lecture it revises are the same
-- object, and the lecture's own chapter comes with it. `set null` because a
-- lecture re-uploaded under a new row must not take its questions with it.
alter table questions add column if not exists lecture bigint
  references documents(id) on delete set null;

create index if not exists questions_lecture_idx on questions (lecture)
  where lecture is not null;

create index if not exists questions_bank_idx   on questions (bank);
create index if not exists questions_status_idx on questions (status);
create unique index if not exists questions_bank_n_idx on questions (bank, n);

-- ---------------------------------------------------------------------------
-- Importing
-- ---------------------------------------------------------------------------

-- Pasting a Drive link starts a job rather than a request: crawling a folder,
-- OCRing a scan and copying a 300 MB atlas all take minutes, and nobody should
-- watch a spinner for that long.
create table if not exists import_jobs (
  id         bigint generated always as identity primary key,
  drive_url  text not null,
  module     text references modules on delete set null,
  state      text not null default 'queued',            -- queued|running|review|done|failed
  found      int  not null default 0,
  imported   int  not null default 0,
  questions  int  not null default 0,
  log        text,
  created_at timestamptz not null default now(),
  created_by uuid references profiles(id),
  finished_at timestamptz
);

-- ---------------------------------------------------------------------------
-- Moderation
-- ---------------------------------------------------------------------------

create table if not exists reports (
  id          bigint generated always as identity primary key,
  target_type text not null,                            -- post|comment|note|profile
  target_id   text not null,
  reason      text,
  reporter    uuid references profiles(id),
  state       text not null default 'open',             -- open|actioned|dismissed
  created_at  timestamptz not null default now(),
  handled_by  uuid references profiles(id),
  handled_at  timestamptz
);

create index if not exists reports_state_idx on reports (state);

-- Six people with the power to delete things need a record of who deleted what.
create table if not exists audit_log (
  id          bigint generated always as identity primary key,
  actor       uuid references profiles(id),
  action      text not null,                            -- approved_user|deleted_post|published_question…
  target_type text,
  target_id   text,
  detail      jsonb,
  at          timestamptz not null default now()
);

create index if not exists audit_actor_idx on audit_log (actor, at desc);

-- ---------------------------------------------------------------------------
-- Real constraints, not just indexes
-- ---------------------------------------------------------------------------

-- The unique INDEXES above stop duplicates, but Postgres will only infer an
-- ON CONFLICT target from a unique CONSTRAINT — and never from a partial one
-- like documents(drive_id) where drive_id is not null. Any upsert against
-- them fails with "there is no unique or exclusion constraint matching the
-- ON CONFLICT specification". A plain unique constraint on drive_id behaves
-- the same way in practice, because Postgres already allows many NULLs.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'chapters_module_title_key') then
    alter table chapters add constraint chapters_module_title_key unique (module, title);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'documents_drive_key') then
    alter table documents add constraint documents_drive_key unique (drive_id);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'banks_module_title_key') then
    alter table question_banks add constraint banks_module_title_key unique (module, title);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'questions_bank_n_key') then
    alter table questions add constraint questions_bank_n_key unique (bank, n);
  end if;
end $$;

-- A photographed paper has no text in it. What the reader made of its pages is
-- kept here so the reading is done once, ever, by whoever opened it first —
-- and so the questions can be parsed again later without asking anybody to
-- photograph anything twice.
alter table documents add column if not exists ocr_text text;
alter table documents add column if not exists ocr_at   timestamptz;

-- The number the faculty gave them.
--
-- D04458, and no two students in the school share one — which makes it the
-- thing a student actually knows a classmate by. The email is how they sign
-- in; this is who they are to each other, and it is what you type to find
-- somebody.
--
-- Nullable because every account that already exists has none, and because a
-- member of staff is not a student and may never have one. Unique among the
-- rows that have it: a partial index, so the nulls do not collide with each
-- other. Stored upper-case, and the app upper-cases before it writes, so
-- d04458 and D04458 cannot both be taken.
--
-- The format check is deliberately looser than D0 plus four digits. A cohort
-- whose prefix changes must not find sign-up closed to them on the morning of
-- registration; a wrong number is caught by the person approving it, who has
-- the faculty's own list in front of them.
alter table profiles add column if not exists matricule text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_matricule_shape') then
    alter table profiles add constraint profiles_matricule_shape
      check (matricule is null or matricule ~ '^[A-Z]{1,2}[0-9]{3,8}$');
  end if;
end $$;

create unique index if not exists profiles_matricule_key
  on profiles (matricule) where matricule is not null;

-- ---------------------------------------------------------------------------
-- Who can see and touch what
-- ---------------------------------------------------------------------------

alter table profiles       enable row level security;
alter table promos         enable row level security;
alter table modules        enable row level security;
alter table chapters       enable row level security;
alter table documents      enable row level security;
alter table question_banks enable row level security;
alter table questions      enable row level security;
alter table import_jobs    enable row level security;
alter table reports        enable row level security;
alter table audit_log      enable row level security;

-- A student reads their own row; staff read everyone's; only admins decide who
-- is let in.
drop policy if exists profiles_self on profiles;
create policy profiles_self on profiles for select
  using (id = auth.uid() or is_staff());

drop policy if exists profiles_insert on profiles;
create policy profiles_insert on profiles for insert
  with check (id = auth.uid());

drop policy if exists profiles_admin_write on profiles;
create policy profiles_admin_write on profiles for update using (is_admin());

-- The course material: any approved student reads what is published; staff
-- write. Written as one pair of policies per table because Postgres wants it
-- that way, not because they differ.
do $$
declare t text;
begin
  foreach t in array array['promos', 'modules', 'chapters', 'documents', 'question_banks'] loop
    execute format('drop policy if exists %1$s_read on %1$s', t);
    execute format(
      'create policy %1$s_read on %1$s for select using (is_approved() or is_staff())', t);
    execute format('drop policy if exists %1$s_write on %1$s', t);
    execute format('create policy %1$s_write on %1$s for all using (is_staff()) with check (is_staff())', t);
  end loop;
end $$;

-- A draft question is staff-only. A student sees a question when it has been
-- published, and never before.
drop policy if exists questions_read on questions;
create policy questions_read on questions for select
  using ((status = 'published' and is_approved()) or is_staff());

drop policy if exists questions_write on questions;
create policy questions_write on questions for all
  using (is_staff()) with check (is_staff());

drop policy if exists jobs_staff on import_jobs;
create policy jobs_staff on import_jobs for all
  using (is_staff()) with check (is_staff());

-- Anyone approved can report something; only admins read the queue.
drop policy if exists reports_insert on reports;
create policy reports_insert on reports for insert with check (is_approved());

drop policy if exists reports_admin on reports;
create policy reports_admin on reports for select using (is_admin());

drop policy if exists reports_admin_write on reports;
create policy reports_admin_write on reports for update using (is_admin());

drop policy if exists audit_read on audit_log;
create policy audit_read on audit_log for select using (is_admin());

-- ---------------------------------------------------------------------------
-- Seed
-- ---------------------------------------------------------------------------

insert into promos (id, name, label, badge, position, indexed) values
  ('pcem1', 'PCEM1', 'السنة الأولى',   '#8B5CF6', 1, false),
  ('pcem2', 'PCEM2', 'السنة الثانية',  '#6B21B5', 2, true),
  ('dcem1', 'DCEM1', 'السنة الثالثة',  '#F97316', 3, false),
  ('dcem2', 'DCEM2', 'السنة الرابعة',  '#C2410C', 4, false),
  ('dcem3', 'DCEM3', 'السنة الخامسة',  '#7C3AED', 5, false),
  ('dcem4', 'DCEM4', 'السنة السادسة',  '#9A3412', 6, false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- شاركنا رأيك — what students said before there was an app to say it in.
--
-- Paste this into Supabase's SQL editor. It is safe to paste twice.
--
-- The one table in this schema whose rows are written by people who have no
-- account at all: the pre-launch page is opened from a WhatsApp message by a
-- student who has never signed in, and asking them to make an account first
-- would be asking them to join the thing before saying whether they want it.
--
-- So nobody reaches this table from the browser. The page posts to a route on
-- our own server, which checks what was sent and writes it with the service
-- key; the policies below say out loud that there is no other way in:
-- staff read, staff delete, and no one inserts. A route holding the service
-- key bypasses row-level security by design, which is exactly why the rule
-- for everybody else can be "no".
-- ---------------------------------------------------------------------------

create table if not exists feedback (
  id         bigint generated always as identity primary key,
  -- The year they said they are in. Text, not a reference to `promos`: a
  -- student is answering about themselves, and a year the panel deletes next
  -- month must not take their answer with it.
  promo      text not null,
  -- What they said they need while revising, as they were offered it:
  -- QCM, Flashcards, Résumés, IA, Groupes d'étude, Autre.
  needs      text[] not null default '{}',
  -- The three written answers. Empty where they had nothing to say — the form
  -- asks and does not insist, because a question somebody has no answer to is
  -- how a form gets abandoned halfway.
  pain       text not null default '',
  wish       text not null default '',
  reach      boolean not null default false,   -- tell me when it launches
  name       text not null default '',
  phone      text not null default '',
  -- Where the link was opened from, when the browser says: which WhatsApp
  -- group or which post brought them. Never a person, never an address.
  source     text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists feedback_new_idx on feedback (created_at desc);
create index if not exists feedback_promo_idx on feedback (promo, created_at desc);

-- Two answers from the same phone, a minute apart, are one answer sent twice —
-- a double tap, a retry on a bad connection. Not a constraint: the same
-- student may genuinely write again tomorrow, and refusing that silently is
-- worse than a duplicate row. The route looks before it writes; this index is
-- what makes that look cheap.
create index if not exists feedback_dup_idx on feedback (promo, created_at desc);

alter table feedback enable row level security;

-- Staff read it. That is the whole point of collecting it.
drop policy if exists feedback_read on feedback;
create policy feedback_read on feedback for select using (is_staff());

-- And staff can throw a row away — spam, a test, somebody's second thoughts.
drop policy if exists feedback_clear on feedback;
create policy feedback_clear on feedback for delete using (is_staff());

-- Nobody inserts. Not a student, not an approved student, not staff from the
-- browser. The only writer is the server route, which holds the service key
-- and answers for what it writes.
drop policy if exists feedback_write on feedback;

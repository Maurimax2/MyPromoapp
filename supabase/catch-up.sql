-- The columns the app has grown since the last time the database was updated.
--
-- schema.sql is four hundred lines and the whole of it is safe to run again,
-- but four hundred lines is a lot to select on a phone. This is only the
-- parts added recently, in the same words, so pasting this or pasting the
-- whole file leave the database in the same state.
--
-- Supabase → SQL Editor → New query → paste all of this → Run.
-- Safe to run twice.
--
-- Until it has been run:
--   · sign-up refuses every matricule, because the column it writes to is not
--     there;
--   · written-answer questions cannot be stored;
--   · اختبر نفسك can only sort questions by the paper they came off, because
--     nothing can say which lecture a question revises.

-- ---------------------------------------------------------------------------
-- The number the faculty gave a student
-- ---------------------------------------------------------------------------

alter table profiles add column if not exists matricule text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_matricule_shape') then
    alter table profiles add constraint profiles_matricule_shape
      check (matricule is null or matricule ~ '^[A-Z]{1,2}[0-9]{3,8}$');
  end if;
end $$;

-- Partial, so the accounts that have no number yet do not collide with each
-- other.
create unique index if not exists profiles_matricule_key
  on profiles (matricule) where matricule is not null;

-- ---------------------------------------------------------------------------
-- A question you write the answer to
-- ---------------------------------------------------------------------------

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

-- ---------------------------------------------------------------------------
-- Which lecture a question revises
-- ---------------------------------------------------------------------------

alter table questions add column if not exists lecture bigint
  references documents(id) on delete set null;

create index if not exists questions_lecture_idx on questions (lecture)
  where lecture is not null;

-- ---------------------------------------------------------------------------
-- What it did
-- ---------------------------------------------------------------------------

-- Four rows, all saying yes. A column that is missing here is a column the
-- app will go quiet about rather than complain, so it is worth reading.
select 'profiles.matricule'   as column,
       to_regclass('profiles') is not null
         and exists (select 1 from information_schema.columns
                      where table_name = 'profiles' and column_name = 'matricule') as there
union all
select 'questions.kind',
       exists (select 1 from information_schema.columns
                where table_name = 'questions' and column_name = 'kind')
union all
select 'questions.model_answer',
       exists (select 1 from information_schema.columns
                where table_name = 'questions' and column_name = 'model_answer')
union all
select 'questions.lecture',
       exists (select 1 from information_schema.columns
                where table_name = 'questions' and column_name = 'lecture');

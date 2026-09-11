-- Does the schema actually keep people apart?
--
-- Every screen until now was checked against scripts/mock-supabase.mjs, which
-- has no row-level security at all — so the policies that decide who reads
-- what had never once been run. Each check below raises rather than prints:
-- the exit code is the answer.

grant usage on schema public, auth to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;

-- Four people: two approved in PCEM2, one still waiting, one in PCEM1.
insert into auth.users (id, email) values
  ('11111111-1111-1111-1111-111111111111', 'amy@unem.mr'),
  ('22222222-2222-2222-2222-222222222222', 'sidi@unem.mr'),
  ('33333333-3333-3333-3333-333333333333', 'new@unem.mr'),
  ('44444444-4444-4444-4444-444444444444', 'other@unem.mr')
on conflict do nothing;

insert into profiles (id, email, full_name, promo, role, status) values
  ('11111111-1111-1111-1111-111111111111', 'amy@unem.mr',   'Amy',   'pcem2', 'student', 'approved'),
  ('22222222-2222-2222-2222-222222222222', 'sidi@unem.mr',  'Sidi',  'pcem2', 'student', 'approved'),
  ('33333333-3333-3333-3333-333333333333', 'new@unem.mr',   'New',   'pcem2', 'student', 'pending'),
  ('44444444-4444-4444-4444-444444444444', 'other@unem.mr', 'Other', 'pcem1', 'student', 'approved')
on conflict (id) do nothing;

-- Three more, for the question the panel asks: who is waiting to be let in?
-- An admin, a student who never picked a year, and one waiting in another
-- year. The last two are the ones a promo-scoped policy would hide.
insert into auth.users (id, email) values
  ('55555555-5555-5555-5555-555555555555', 'boss@unem.mr'),
  ('66666666-6666-6666-6666-666666666666', 'noyear@unem.mr'),
  ('77777777-7777-7777-7777-777777777777', 'pcem1new@unem.mr')
on conflict do nothing;

insert into profiles (id, email, full_name, promo, role, status) values
  ('55555555-5555-5555-5555-555555555555', 'boss@unem.mr',     'Boss',   'pcem2', 'admin',   'approved'),
  ('66666666-6666-6666-6666-666666666666', 'noyear@unem.mr',   'NoYear',  null,   'student', 'pending'),
  ('77777777-7777-7777-7777-777777777777', 'pcem1new@unem.mr', 'P1New',  'pcem1', 'student', 'pending')
on conflict (id) do nothing;

insert into posts (id, author, promo, body, kind) overriding system value values
  (901, '11111111-1111-1111-1111-111111111111', 'pcem2', 'Post de PCEM2', 'post'),
  (902, '44444444-4444-4444-4444-444444444444', 'pcem1', 'Post de PCEM1', 'post')
on conflict do nothing;

insert into promos (id, name, label, badge) values ('pcem2x', 'X', 'x', '#000')
  on conflict do nothing;
insert into modules (id, promo, semester, name) values ('anat-x', 'pcem2', 'S1', 'ANATOMIE')
  on conflict do nothing;
insert into documents (module, title) values ('anat-x', 'Un cours')
  on conflict do nothing;

insert into chats (id, a, b) overriding system value values
  (801, '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222')
on conflict do nothing;
insert into chat_messages (chat, author, body) values
  (801, '11111111-1111-1111-1111-111111111111', 'entre nous')
on conflict do nothing;

create or replace function must(label text, got bigint, want bigint) returns void
  language plpgsql as $$
begin
  if got <> want then
    raise exception '%: expected %, got %', label, want, got;
  end if;
  raise notice 'ok  %  (%)', label, got;
end $$;

-- The faculty's number: one per student, and never two students to one.
--
-- The uniqueness is not a nicety, it is the whole reason the number can be
-- typed to find somebody. A partial index, so that the accounts which have
-- no number yet — every account that existed before this column — do not
-- collide with each other.
create or replace function rejects(label text, stmt text) returns void
  language plpgsql as $$
begin
  begin
    execute stmt;
  exception when others then
    raise notice 'ok  %  (refused)', label;
    return;
  end;
  raise exception '%: was accepted and should not have been', label;
end $$;

update profiles set matricule = 'D04458'
  where id = '11111111-1111-1111-1111-111111111111';

select rejects('a second student cannot take the same number',
  $$update profiles set matricule = 'D04458'
      where id = '22222222-2222-2222-2222-222222222222'$$);
select rejects('a lower-case number never reaches the column',
  $$update profiles set matricule = 'd04459'
      where id = '22222222-2222-2222-2222-222222222222'$$);
select rejects('nor does something that is not a number at all',
  $$update profiles set matricule = 'PAS UN MATRICULE'
      where id = '22222222-2222-2222-2222-222222222222'$$);

set role authenticated;

-- An approved student in PCEM2.
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
-- Four now, not three: the admin is in PCEM2 too, and staff are classmates
-- like anybody else as far as this policy is concerned.
select must('she reads her promo''s profiles, and no others',
            (select count(*) from profiles), 4);
select must('so her classmates have names on screen',
            (select count(*) from profiles where full_name is not null and id <> auth.uid()), 3);
select must('she reads her promo''s posts only',
            (select count(*) from posts), 1);
select must('she reads her own chat',
            (select count(*) from chat_messages), 1);
-- So that a zero below means "refused" rather than "there is nothing there".
select must('and the archive has something in it to read',
            (select count(*) from documents), 1);

-- An account nobody has approved yet.
set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select must('waiting: sees only itself', (select count(*) from profiles), 1);
select must('waiting: no posts',         (select count(*) from posts), 0);
select must('waiting: no documents',     (select count(*) from documents), 0);

-- Somebody who can sign in and has no profile row at all.
--
-- A real case, not a hypothetical: an account made in Supabase's own
-- dashboard, or a sign-up that fell over halfway. Every policy is written
-- against is_staff() and is_approved(), and both read the profiles table, so
-- a person the table has never heard of reads nothing — while the app, which
-- fell back to an invented profile in memory, showed them the panel. An
-- admin looking at zeroes where his colleague sees nine hundred files.
set request.jwt.claim.sub = '99999999-9999-9999-9999-999999999999';
select must('a session with no profile row reads no documents',
            (select count(*) from documents), 0);
select must('…and no posts',  (select count(*) from posts), 0);
select must('…and is not staff',    (select count(*) from profiles where is_staff()), 0);
select must('…and is not approved', (select count(*) from profiles where is_approved()), 0);

-- Somebody in another year.
set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444';
select must('another year sees its own posts',   (select count(*) from posts), 1);
select must('another year sees no PCEM2 people', (select count(*) from profiles where promo = 'pcem2'), 0);
select must('nobody reads somebody else''s chat', (select count(*) from chat_messages), 0);

-- The panel's own question: everybody waiting, whatever year they picked.
--
-- اللوحة ← الأعضاء reads `profiles` as the signed-in admin, so what it can
-- show is decided here and nowhere else. Three people are waiting: one in
-- his own year, one in another, and one who never picked a year at all. If
-- the policy scoped this to his promo, the last two would be invisible on
-- that screen — a student who signed up and is never approved, with nothing
-- on any screen to say why.
set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
select must('an admin sees everyone waiting, whatever their year',
            (select count(*) from profiles where status = 'pending'), 3);
select must('including the one who never picked a year',
            (select count(*) from profiles where status = 'pending' and promo is null), 1);

-- A student whose profile has no year.
--
-- The feed falls back to 'pcem2' when a profile carries no promo, so the
-- query asks for PCEM2's posts — but every policy compares against
-- my_promo(), which is NULL here, and `promo = NULL` is never true. The
-- screen asks for posts that exist and is handed nothing, with no error.
set request.jwt.claim.sub = '66666666-6666-6666-6666-666666666666';
select must('no year: reads no posts at all', (select count(*) from posts), 0);

-- A question that is not multiple choice.
--
-- `options` was declared `not null` back when every question had some. A
-- QROC has none, and the column only takes an empty array because a default
-- was added beside the `kind` column — which is exactly the sort of thing
-- that compiles, passes review, and then refuses the first row somebody
-- actually writes.
reset role;
reset request.jwt.claim.sub;

insert into promos (id, name, label, badge) values ('dcem3', 'DCEM3', 'الخامسة', '#0E7490')
  on conflict (id) do nothing;
insert into modules (id, promo, semester, name) values ('gyneco', 'dcem3', 'S1', 'GYNÉCOLOGIE')
  on conflict (id) do nothing;
insert into question_banks (module, title) values ('gyneco', 'Examen 2024')
  returning id \gset bank_

insert into questions (bank, n, kind, stem, model_answer, status)
  values (:bank_id, '1', 'qroc',
          'Citez trois signes cliniques de la pré-éclampsie sévère.',
          'HTA ≥ 160/110, protéinurie massive, signes neurosensoriels.',
          'published');

select must('a written question stores with no propositions at all',
            (select count(*) from questions where kind = 'qroc' and options = '{}'), 1);
select must('…and is published on the strength of its words',
            (select count(*) from questions
              where kind = 'qroc' and status = 'published' and model_answer is not null), 1);

select rejects('a kind nobody has built is refused',
  $$insert into questions (bank, n, kind, stem) values
      ((select id from question_banks where title = 'Examen 2024'), '2', 'cas', 'x')$$);

reset role;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

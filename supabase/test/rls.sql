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

insert into posts (id, author, promo, body, kind) overriding system value values
  (901, '11111111-1111-1111-1111-111111111111', 'pcem2', 'Post de PCEM2', 'post'),
  (902, '44444444-4444-4444-4444-444444444444', 'pcem1', 'Post de PCEM1', 'post')
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

set role authenticated;

-- An approved student in PCEM2.
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('she reads her promo''s profiles, and no others',
            (select count(*) from profiles), 3);
select must('so her classmates have names on screen',
            (select count(*) from profiles where full_name is not null and id <> auth.uid()), 2);
select must('she reads her promo''s posts only',
            (select count(*) from posts), 1);
select must('she reads her own chat',
            (select count(*) from chat_messages), 1);

-- An account nobody has approved yet.
set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select must('waiting: sees only itself', (select count(*) from profiles), 1);
select must('waiting: no posts',         (select count(*) from posts), 0);
select must('waiting: no documents',     (select count(*) from documents), 0);

-- Somebody in another year.
set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444';
select must('another year sees its own posts',   (select count(*) from posts), 1);
select must('another year sees no PCEM2 people', (select count(*) from profiles where promo = 'pcem2'), 0);
select must('nobody reads somebody else''s chat', (select count(*) from chat_messages), 0);

reset role;
drop function must(text, bigint, bigint);

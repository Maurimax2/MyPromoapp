-- accounts.sql, asked as different people: who reads a WhatsApp number,
-- whether a username can be taken twice, and the new years.
--
-- Runs after rls.sql, on the people it made: Amy and Sidi (approved, PCEM2),
-- and Boss (admin).

create or replace function must(label text, got bigint, want bigint) returns void
  language plpgsql as $$
begin
  if got <> want then
    raise exception '%: expected %, got %', label, want, got;
  end if;
  raise notice 'ok  %  (%)', label, got;
end $$;

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

reset role;
reset request.jwt.claim.sub;

insert into profile_private (id, phone)
select '11111111-1111-1111-1111-111111111111', '+222 36 12 34 56'
where not exists (select 1 from profile_private where id = '11111111-1111-1111-1111-111111111111');

-- ---- the new years ----
select must('pharmacy and dental first years exist',
  (select count(*) from promos where id in ('pcep1', 'pced1')), 2);
select must('dental reads medicine''s first year, both semesters',
  (select count(*) from promos where id = 'pced1' and reads_from = 'pcem1' and reads_semesters = array['S1', 'S2']), 1);
select must('pharmacy reads it for the first semester only',
  (select count(*) from promos where id = 'pcep1' and reads_from = 'pcem1' and reads_semesters = array['S1']), 1);
select must('the later pharmacy and dental years exist, on their own programme',
  (select count(*) from promos where id in ('pcep2', 'dcep1', 'dcep2', 'pced2', 'dced1') and reads_from is null), 5);
select must('pharmacy has four years, dental three',
  (select count(*) from promos where track = 'pharmacy') * 10 + (select count(*) from promos where track = 'dental'), 43);
select must('every medicine year knows its track',
  (select count(*) from promos
    where id in ('pcem1', 'pcem2', 'dcem1', 'dcem2', 'dcem3', 'dcem4') and track = 'medicine'), 6);

-- ---- usernames ----
update profiles set username = 'amy_b' where id = '11111111-1111-1111-1111-111111111111';
select rejects('a username already taken is refused',
  $$update profiles set username = 'amy_b' where id = '22222222-2222-2222-2222-222222222222'$$);
select rejects('a username with spaces or capitals is refused',
  $$update profiles set username = 'Amy B' where id = '22222222-2222-2222-2222-222222222222'$$);
select rejects('a two-letter username is refused',
  $$update profiles set username = 'ab' where id = '22222222-2222-2222-2222-222222222222'$$);
update profiles set username = 'sidi.m' where id = '22222222-2222-2222-2222-222222222222';
select must('two different usernames are fine',
  (select count(*) from profiles where username in ('amy_b', 'sidi.m')), 2);

-- ---- WhatsApp numbers ----
set role authenticated;

set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('a student reads her own number', (select count(*) from profile_private), 1);

set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select must('a classmate in the same year reads none of it', (select count(*) from profile_private), 0);
select must('…though he still reads her profile row', (select count(*) from profiles where id = '11111111-1111-1111-1111-111111111111'), 1);
select rejects('and cannot write a number onto her account',
  $$insert into profile_private (id, phone) values ('11111111-1111-1111-1111-111111111111', '+222 11 11 11 11')$$);
select rejects('a number that is not a phone number is refused',
  $$insert into profile_private (id, phone) values ('22222222-2222-2222-2222-222222222222', 'call me')$$);
insert into profile_private (id, phone) values ('22222222-2222-2222-2222-222222222222', '+222 22 22 22 22');
select must('he can write his own', (select count(*) from profile_private), 1);

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
select must('staff read every number, to check the WhatsApp groups', (select count(*) from profile_private), 2);

reset role;
reset request.jwt.claim.sub;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

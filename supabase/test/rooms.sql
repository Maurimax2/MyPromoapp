-- rooms-private.sql, asked as different people: a public room is what it was,
-- and a private one does not exist for anybody who was not given the link —
-- not its row, not its members, not its messages.

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

-- Amy (PCEM2) hosts one of each; Sidi (PCEM2) is only in the private one,
-- as somebody who was sent the link; Other (PCEM1) was sent nothing.
insert into rooms (id, promo, title, host, private, code) overriding system value
select 9001, 'pcem2', 'Salle publique', '11111111-1111-1111-1111-111111111111', false, null
where not exists (select 1 from rooms where id = 9001);
insert into rooms (id, promo, title, host, private, code) overriding system value
select 9002, 'pcem2', 'Salle privée', '11111111-1111-1111-1111-111111111111', true, 'secret-code-abc'
where not exists (select 1 from rooms where id = 9002);

insert into room_members (room, person)
select 9001, '11111111-1111-1111-1111-111111111111' where not exists (select 1 from room_members where room = 9001 and person = '11111111-1111-1111-1111-111111111111');
insert into room_members (room, person)
select 9002, '11111111-1111-1111-1111-111111111111' where not exists (select 1 from room_members where room = 9002 and person = '11111111-1111-1111-1111-111111111111');
insert into room_members (room, person)
select 9002, '22222222-2222-2222-2222-222222222222' where not exists (select 1 from room_members where room = 9002 and person = '22222222-2222-2222-2222-222222222222');
insert into room_messages (room, author, body)
select 9002, '11111111-1111-1111-1111-111111111111', 'bonjour'
where not exists (select 1 from room_messages where room = 9002);

select rejects('a private room has a unique code',
  $$insert into rooms (promo, title, host, private, code) values ('pcem2', 'Copie', '11111111-1111-1111-1111-111111111111', true, 'secret-code-abc')$$);

set role authenticated;

set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('the host reads both of her rooms', (select count(*) from rooms where id in (9001, 9002)), 2);
select must('…and who is in her private room', (select count(*) from room_members where room = 9002), 2);

-- The public room, as it always was.
set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select must('a classmate reads the public room', (select count(*) from rooms where id = 9001), 1);
select must('…but cannot list the private one, even from inside it', (select count(*) from rooms where id = 9002), 0);
select must('…nor read who is in the private room', (select count(*) from room_members where room = 9002 and person <> '22222222-2222-2222-2222-222222222222'), 0);
select must('…yet reads what is said in a room she is in', (select count(*) from room_messages where room = 9002), 1);

set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select must('an account waiting for approval reads no room', (select count(*) from rooms where id in (9001, 9002)), 0);

set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444';
select must('another year reads neither', (select count(*) from rooms where id in (9001, 9002)), 0);
select must('…nor any member', (select count(*) from room_members where room in (9001, 9002)), 0);
select must('…nor a word of the chat', (select count(*) from room_messages where room = 9002), 0);

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
select must('staff read both', (select count(*) from rooms where id in (9001, 9002)), 2);

reset role;
reset request.jwt.claim.sub;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

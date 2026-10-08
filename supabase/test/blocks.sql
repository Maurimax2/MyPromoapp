-- blocks.sql, asked as different people: once Amy blocks Sidi, neither of them
-- sees the other's posts, comments, chat, room messages, duels or
-- notifications — and Sidi cannot tell that it happened.

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
grant all on blocks to authenticated;

-- Amy and Sidi share a chat (801, from rls.sql) and a public room (9001, from
-- rooms.sql). Sidi writes in each place; the bell tells Amy about one of it.
insert into posts (id, author, promo, body, kind) overriding system value
select 903, '22222222-2222-2222-2222-222222222222', 'pcem2', 'Post de Sidi', 'post'
where not exists (select 1 from posts where id = 903);
insert into comments (id, post, author, body) overriding system value
select 9301, 901, '22222222-2222-2222-2222-222222222222', 'Sidi répond'
where not exists (select 1 from comments where id = 9301);
insert into chat_messages (id, chat, author, body) overriding system value
select 8011, 801, '22222222-2222-2222-2222-222222222222', 'réponse de Sidi'
where not exists (select 1 from chat_messages where id = 8011);
insert into room_members (room, person)
select 9001, '22222222-2222-2222-2222-222222222222'
where not exists (select 1 from room_members where room = 9001 and person = '22222222-2222-2222-2222-222222222222');
insert into room_messages (id, room, author, body) overriding system value
select 90011, 9001, '22222222-2222-2222-2222-222222222222', 'Sidi dans la salle'
where not exists (select 1 from room_messages where id = 90011);
insert into notifications (id, person, actor, kind) overriding system value
select 7701, '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'like'
where not exists (select 1 from notifications where id = 7701);
insert into duels (id, promo, module, title, questions, challenger, opponent) overriding system value
select 7001, 'pcem2', 'anat-x', 'Duel', '{}', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111'
where not exists (select 1 from duels where id = 7001);
delete from blocks;

set role authenticated;

set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('before: Amy reads Sidi''s post', (select count(*) from posts where id = 903), 1);
select must('…and his message', (select count(*) from chat_messages where id = 8011), 1);

insert into blocks (blocker, blocked) values
  ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222');

select must('Amy sees her own block', (select count(*) from blocks), 1);
select must('Amy no longer reads Sidi''s post', (select count(*) from posts where id = 903), 0);
select must('…nor his comment', (select count(*) from comments where id = 9301), 0);
select must('…nor their chat', (select count(*) from chats where id = 801), 0);
select must('…nor a message in it', (select count(*) from chat_messages where chat = 801), 0);
select must('…nor what he says in a room', (select count(*) from room_messages where id = 90011), 0);
select must('…nor the bell about him', (select count(*) from notifications where id = 7701), 0);
select must('…nor his duel', (select count(*) from duels where id = 7001), 0);
select must('…yet still his name, to take the block back', (select count(*) from profiles where id = '22222222-2222-2222-2222-222222222222'), 1);
select must('her own post is still hers', (select count(*) from posts where id = 901), 1);

select rejects('a block on yourself',
  $$insert into blocks (blocker, blocked) values ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111')$$);

set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select must('Sidi no longer reads Amy''s post either', (select count(*) from posts where id = 901), 0);
select must('…nor the chat', (select count(*) from chats where id = 801), 0);
select must('…and cannot see that he was blocked', (select count(*) from blocks), 0);
select rejects('…nor block in Amy''s name',
  $$insert into blocks (blocker, blocked) values ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444')$$);
delete from blocks where blocker = '11111111-1111-1111-1111-111111111111';

set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select rejects('an account waiting for approval cannot block',
  $$insert into blocks (blocker, blocked) values ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222')$$);

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
select must('a third person still reads both', (select count(*) from posts where id in (901, 903)), 2);

reset role;
reset request.jwt.claim.sub;
select must('Sidi''s attempt to lift it did nothing', (select count(*) from blocks), 1);

set role authenticated;
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
delete from blocks where blocked = '22222222-2222-2222-2222-222222222222';
select must('unblocked: Sidi''s post is back', (select count(*) from posts where id = 903), 1);
select must('…and the chat', (select count(*) from chat_messages where chat = 801), 2);

reset role;
reset request.jwt.claim.sub;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

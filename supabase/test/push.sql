-- push.sql, asked as different people: nobody reads anybody's device, a
-- friendship is one row whichever way it was asked, and an announcement
-- reaches the year it was for.

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

-- The server's writes.
insert into push_devices (person, platform, token)
select '11111111-1111-1111-1111-111111111111', 'android', 'tok-amy'
where not exists (select 1 from push_devices where token = 'tok-amy');
insert into push_devices (person, platform, token, keys)
select '22222222-2222-2222-2222-222222222222', 'web', 'https://push.example/sidi', '{"p256dh":"x","auth":"y"}'
where not exists (select 1 from push_devices where token = 'https://push.example/sidi');

select rejects('a token belongs to one device row',
  $$insert into push_devices (person, platform, token) values ('22222222-2222-2222-2222-222222222222', 'android', 'tok-amy')$$);
select rejects('a platform is one of three',
  $$insert into push_devices (person, platform, token) values ('22222222-2222-2222-2222-222222222222', 'fax', 'tok-fax')$$);

insert into friends (a, b)
select '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222'
where not exists (select 1 from friends where least(a, b) = '11111111-1111-1111-1111-111111111111'
                                          and greatest(a, b) = '22222222-2222-2222-2222-222222222222');
select rejects('one friendship per pair, whichever way round',
  $$insert into friends (a, b) values ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111')$$);
select rejects('nobody befriends themselves',
  $$insert into friends (a, b) values ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111')$$);

insert into push_prefs (person, off)
select '11111111-1111-1111-1111-111111111111', '{reminders}'
where not exists (select 1 from push_prefs where person = '11111111-1111-1111-1111-111111111111');

insert into announcements (author, promo, title)
select '55555555-5555-5555-5555-555555555555', null, 'Pour tous'
where not exists (select 1 from announcements where title = 'Pour tous');
insert into announcements (author, promo, title)
select '55555555-5555-5555-5555-555555555555', 'pcem1', 'Pour PCEM1'
where not exists (select 1 from announcements where title = 'Pour PCEM1');
select rejects('an announcement has a title',
  $$insert into announcements (title) values ('')$$);

insert into notifications (person, kind, body, link, announcement)
select '11111111-1111-1111-1111-111111111111', 'news', 'Pour tous', '/feed',
       (select id from announcements where title = 'Pour tous')
where not exists (select 1 from notifications where person = '11111111-1111-1111-1111-111111111111' and kind = 'news');

insert into push_log (person, kind, day)
select '11111111-1111-1111-1111-111111111111', 'remind', current_date
where not exists (select 1 from push_log where person = '11111111-1111-1111-1111-111111111111' and day = current_date);
select rejects('one reminder of a kind per person per day',
  $$insert into push_log (person, kind, day) values ('11111111-1111-1111-1111-111111111111', 'remind', current_date)$$);

set role authenticated;

set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('nobody reads a device, not even their own', (select count(*) from push_devices), 0);
select must('a student reads her own settings', (select count(*) from push_prefs), 1);
select must('…and the friendship she is in', (select count(*) from friends), 1);
select must('…and the announcement for everybody, not the one for PCEM1', (select count(*) from announcements), 1);
select must('…and the bell row it left', (select count(*) from notifications where kind = 'news'), 1);
select must('nor the reminders log', (select count(*) from push_log), 0);
select rejects('but cannot register a device from the browser',
  $$insert into push_devices (person, platform, token) values ('11111111-1111-1111-1111-111111111111', 'web', 'tok-x')$$);
select rejects('nor make herself a friend',
  $$insert into friends (a, b) values ('11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444')$$);
select rejects('nor announce anything',
  $$insert into announcements (title) values ('Moi')$$);

set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select must('the friend sees the same row', (select count(*) from friends), 1);
select must('…but not her settings', (select count(*) from push_prefs), 0);

set request.jwt.claim.sub = '44444444-4444-4444-4444-444444444444';
select must('PCEM1 reads both announcements', (select count(*) from announcements), 2);
select must('…and nobody else''s friendships', (select count(*) from friends), 0);

set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
select must('an account waiting for approval reads no announcement', (select count(*) from announcements), 0);

reset role;
reset request.jwt.claim.sub;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

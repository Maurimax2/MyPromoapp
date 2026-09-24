-- habits.sql, asked as different people: nobody writes their own streak from
-- a browser, and nobody reads anybody else's days.

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

-- The server's writes (it holds the service key, above these policies).
insert into study_days (person, day, n, promo)
select '11111111-1111-1111-1111-111111111111', current_date, 3, 'pcem2'
where not exists (select 1 from study_days where person = '11111111-1111-1111-1111-111111111111' and day = current_date);
insert into study_days (person, day, n, promo)
select '22222222-2222-2222-2222-222222222222', current_date, 1, 'pcem2'
where not exists (select 1 from study_days where person = '22222222-2222-2222-2222-222222222222' and day = current_date);
insert into daily_answers (person, day, promo, correct)
select '11111111-1111-1111-1111-111111111111', current_date, 'pcem2', true
where not exists (select 1 from daily_answers where person = '11111111-1111-1111-1111-111111111111' and day = current_date);

select must('the year counts who studied today',
  (select count(*) from study_days where promo = 'pcem2' and day = current_date), 2);
select rejects('one study row per person per day',
  $$insert into study_days (person, day) values ('11111111-1111-1111-1111-111111111111', current_date)$$);
select rejects('one answer to the question of the day',
  $$insert into daily_answers (person, day, promo, correct) values ('11111111-1111-1111-1111-111111111111', current_date, 'pcem2', false)$$);

set role authenticated;

set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select must('a student reads her own days', (select count(*) from study_days), 1);
select must('…and her own answer', (select count(*) from daily_answers), 1);
select rejects('but cannot write herself a day from the browser',
  $$insert into study_days (person, day) values ('11111111-1111-1111-1111-111111111111', current_date - 1)$$);
select rejects('nor an answer',
  $$insert into daily_answers (person, day, promo, correct) values ('11111111-1111-1111-1111-111111111111', current_date - 1, 'pcem2', true)$$);

set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select must('a classmate reads only his own days', (select count(*) from study_days), 1);
select must('…and none of her answers', (select count(*) from daily_answers), 0);

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
select must('staff read every day', (select count(*) from study_days), 2);

reset role;
reset request.jwt.claim.sub;
drop function must(text, bigint, bigint);
drop function rejects(text, text);

-- MyPromo — the social half.
--
-- Run this once, in Supabase → SQL Editor → New query → paste → Run.
-- Safe to run twice: everything is `if not exists`.
--
-- It assumes schema.sql has already been run (profiles, promos, is_staff(),
-- is_approved() all come from there).

-- ---------------------------------------------------------------------------
-- Posts
-- ---------------------------------------------------------------------------

-- One row per thing somebody shares with their promo. `promo` is copied onto
-- the row rather than read through the author, because a student who changes
-- year should not drag their old posts with them.
create table if not exists posts (
  id         bigint generated always as identity primary key,
  author     uuid   not null references profiles on delete cascade,
  promo      text   not null references promos on delete cascade,
  body       text   not null default '',
  kind       text   not null default 'post',      -- post | question | note
  module     text   references modules on delete set null,
  created_at timestamptz not null default now(),
  edited_at  timestamptz,
  removed    boolean not null default false,      -- moderation hides, never deletes
  likes      int    not null default 0,           -- kept in step by trigger
  comments   int    not null default 0
);

create index if not exists posts_promo_idx on posts (promo, created_at desc);
create index if not exists posts_author_idx on posts (author);
create index if not exists posts_module_idx on posts (module);

-- Questions waiting for an answer are the ones worth showing first.
create index if not exists posts_question_idx
  on posts (promo, answered, created_at desc) where kind = 'question';

-- What is attached to a post: a photograph, or a PDF. Files live in storage;
-- this is what the app needs to show them without fetching the object.
create table if not exists post_media (
  id       bigint generated always as identity primary key,
  post     bigint not null references posts on delete cascade,
  kind     text   not null,                       -- image | file
  path     text   not null,                       -- key inside the bucket
  name     text,                                  -- what to show for a file
  bytes    bigint,
  width    int,
  height   int,
  position int    not null default 0
);

create index if not exists post_media_post_idx on post_media (post);

-- A comment is also an answer: under a question, one of them can be marked
-- by the asker as the one that settled it.
create table if not exists comments (
  id         bigint generated always as identity primary key,
  post       bigint not null references posts on delete cascade,
  author     uuid   not null references profiles on delete cascade,
  body       text   not null,
  created_at timestamptz not null default now(),
  removed    boolean not null default false,
  accepted   boolean not null default false
);

-- For a database created before answers could be accepted.
alter table comments add column if not exists accepted boolean not null default false;
alter table posts    add column if not exists answered boolean not null default false;

create index if not exists comments_accepted_idx on comments (post) where accepted;

create index if not exists comments_post_idx on comments (post, created_at);

-- A like is the pair, so liking twice is impossible rather than merely
-- discouraged.
create table if not exists likes (
  post    bigint not null references posts on delete cascade,
  person  uuid   not null references profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post, person)
);

-- Saving a file or a post for later.
create table if not exists saves (
  person     uuid   not null references profiles on delete cascade,
  post       bigint references posts on delete cascade,
  document   bigint references documents on delete cascade,
  created_at timestamptz not null default now(),
  check (post is not null or document is not null)
);

create unique index if not exists saves_post_idx
  on saves (person, post) where post is not null;
create unique index if not exists saves_doc_idx
  on saves (person, document) where document is not null;

-- ---------------------------------------------------------------------------
-- The counters
-- ---------------------------------------------------------------------------

-- Counting likes with a subquery on every feed row is what makes a feed slow.
-- The number lives on the post and a trigger keeps it true.
create or replace function bump_counts() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  if tg_table_name = 'likes' then
    update posts set likes = greatest(0, likes + (case when tg_op = 'INSERT' then 1 else -1 end))
      where id = coalesce(new.post, old.post);
  else
    update posts set comments = greatest(0, comments + (case when tg_op = 'INSERT' then 1 else -1 end))
      where id = coalesce(new.post, old.post);
  end if;
  return null;
end $$;

drop trigger if exists likes_count on likes;
create trigger likes_count after insert or delete on likes
  for each row execute function bump_counts();

drop trigger if exists comments_count on comments;
create trigger comments_count after insert or delete on comments
  for each row execute function bump_counts();

-- ---------------------------------------------------------------------------
-- Study rooms
-- ---------------------------------------------------------------------------

-- A room is a place a few people agree to be in at the same time. It belongs
-- to a promo, optionally to a subject, and it ends — a room nobody closes is
-- a dead channel a week later.
create table if not exists rooms (
  id         bigint generated always as identity primary key,
  promo      text   not null references promos on delete cascade,
  module     text   references modules on delete set null,
  title      text   not null,
  topic      text,
  host       uuid   not null references profiles on delete cascade,
  created_at timestamptz not null default now(),
  starts_at  timestamptz,
  ends_at    timestamptz,
  closed     boolean not null default false,
  capacity   int    not null default 12
);

create index if not exists rooms_promo_idx on rooms (promo, closed, created_at desc);

create table if not exists room_members (
  room     bigint not null references rooms on delete cascade,
  person   uuid   not null references profiles on delete cascade,
  joined_at timestamptz not null default now(),
  seen_at   timestamptz not null default now(),
  primary key (room, person)
);

create table if not exists room_messages (
  id         bigint generated always as identity primary key,
  room       bigint not null references rooms on delete cascade,
  author     uuid   not null references profiles on delete cascade,
  body       text   not null,
  created_at timestamptz not null default now()
);

create index if not exists room_messages_idx on room_messages (room, created_at);

-- ---------------------------------------------------------------------------
-- What you got wrong comes back
-- ---------------------------------------------------------------------------

-- A Leitner schedule, per student per question. It lived in localStorage,
-- which meant a student lost every wrong answer they had earned the day they
-- changed phone — and the whole point of the thing is that it remembers
-- longer than they do.
create table if not exists reviews (
  person   uuid   not null references profiles on delete cascade,
  question bigint not null references questions on delete cascade,
  box      int    not null default 0,           -- 0..4, how long until it returns
  wrong    int    not null default 0,
  due_at   timestamptz not null default now(),
  seen_at  timestamptz not null default now(),
  primary key (person, question)
);

create index if not exists reviews_due_idx on reviews (person, due_at);

alter table reviews enable row level security;

drop policy if exists reviews_own on reviews;
create policy reviews_own on reviews for all
  using (person = auth.uid()) with check (person = auth.uid());

-- For a database created before moderation recorded when it acted.
alter table reports add column if not exists handled_at timestamptz;

-- ---------------------------------------------------------------------------
-- Chat
-- ---------------------------------------------------------------------------

-- A conversation between exactly two people. The pair is stored sorted, and
-- unique, so opening a chat twice reaches the same one rather than making a
-- second — which is how a chat list fills with duplicates nobody can explain.
create table if not exists chats (
  id         bigint generated always as identity primary key,
  a          uuid not null references profiles on delete cascade,
  b          uuid not null references profiles on delete cascade,
  created_at timestamptz not null default now(),
  last_at    timestamptz not null default now(),
  check (a < b)
);

create unique index if not exists chats_pair_idx on chats (a, b);
create index if not exists chats_a_idx on chats (a, last_at desc);
create index if not exists chats_b_idx on chats (b, last_at desc);

create table if not exists chat_messages (
  id         bigint generated always as identity primary key,
  chat       bigint not null references chats on delete cascade,
  author     uuid   not null references profiles on delete cascade,
  body       text   not null,
  created_at timestamptz not null default now(),
  seen       boolean not null default false
);

create index if not exists chat_messages_idx on chat_messages (chat, created_at);

-- ---------------------------------------------------------------------------
-- Who can see and touch what
-- ---------------------------------------------------------------------------

alter table posts         enable row level security;
alter table post_media    enable row level security;
alter table comments      enable row level security;
alter table likes         enable row level security;
alter table saves         enable row level security;
alter table rooms         enable row level security;
alter table room_members  enable row level security;
alter table room_messages enable row level security;
alter table chats         enable row level security;
alter table chat_messages enable row level security;

-- The promo you are in, as the database sees it.
create or replace function my_promo() returns text
  language sql stable security definer set search_path = public as $$
    select promo from profiles where id = auth.uid();
  $$;

-- A student reads their own promo's posts; staff read everything. Nobody
-- reads what moderation has removed except the staff who removed it.
drop policy if exists posts_read on posts;
create policy posts_read on posts for select
  using ((not removed and is_approved() and promo = my_promo()) or is_staff());

drop policy if exists posts_write on posts;
create policy posts_write on posts for insert
  with check (is_approved() and author = auth.uid() and promo = my_promo());

-- You may edit and delete your own; staff may remove anyone's.
drop policy if exists posts_own on posts;
create policy posts_own on posts for update
  using (author = auth.uid() or is_staff());

drop policy if exists posts_drop on posts;
create policy posts_drop on posts for delete using (author = auth.uid() or is_staff());

drop policy if exists media_read on post_media;
create policy media_read on post_media for select
  using (exists (select 1 from posts p where p.id = post
                 and ((not p.removed and is_approved() and p.promo = my_promo()) or is_staff())));

drop policy if exists media_write on post_media;
create policy media_write on post_media for all
  using (exists (select 1 from posts p where p.id = post and (p.author = auth.uid() or is_staff())))
  with check (exists (select 1 from posts p where p.id = post and (p.author = auth.uid() or is_staff())));

drop policy if exists comments_read on comments;
create policy comments_read on comments for select
  using ((not removed and exists (select 1 from posts p where p.id = post
          and not p.removed and is_approved() and p.promo = my_promo())) or is_staff());

drop policy if exists comments_write on comments;
create policy comments_write on comments for insert
  with check (is_approved() and author = auth.uid()
              and exists (select 1 from posts p where p.id = post and p.promo = my_promo()));

drop policy if exists comments_own on comments;
create policy comments_own on comments for update using (author = auth.uid() or is_staff());
drop policy if exists comments_drop on comments;
create policy comments_drop on comments for delete using (author = auth.uid() or is_staff());

drop policy if exists likes_read on likes;
create policy likes_read on likes for select using (is_approved());
drop policy if exists likes_own on likes;
create policy likes_own on likes for all
  using (person = auth.uid()) with check (person = auth.uid() and is_approved());

drop policy if exists saves_own on saves;
create policy saves_own on saves for all
  using (person = auth.uid()) with check (person = auth.uid() and is_approved());

drop policy if exists rooms_read on rooms;
create policy rooms_read on rooms for select
  using ((is_approved() and promo = my_promo()) or is_staff());
drop policy if exists rooms_write on rooms;
create policy rooms_write on rooms for insert
  with check (is_approved() and host = auth.uid() and promo = my_promo());
drop policy if exists rooms_own on rooms;
create policy rooms_own on rooms for update using (host = auth.uid() or is_staff());

drop policy if exists members_read on room_members;
create policy members_read on room_members for select
  using (exists (select 1 from rooms r where r.id = room
                 and ((is_approved() and r.promo = my_promo()) or is_staff())));
drop policy if exists members_own on room_members;
create policy members_own on room_members for all
  using (person = auth.uid()) with check (person = auth.uid() and is_approved());

-- Only people who joined a room read what is said in it.
drop policy if exists messages_read on room_messages;
create policy messages_read on room_messages for select
  using (exists (select 1 from room_members m where m.room = room and m.person = auth.uid())
         or is_staff());
drop policy if exists messages_write on room_messages;
create policy messages_write on room_messages for insert
  with check (author = auth.uid()
              and exists (select 1 from room_members m where m.room = room and m.person = auth.uid()));

-- A chat is readable by exactly the two people in it. Nobody else, staff
-- included: moderation reads reports, not private messages.
drop policy if exists chats_mine on chats;
create policy chats_mine on chats for select using (a = auth.uid() or b = auth.uid());

drop policy if exists chats_open on chats;
create policy chats_open on chats for insert
  with check (is_approved() and (a = auth.uid() or b = auth.uid()));

drop policy if exists chats_touch on chats;
create policy chats_touch on chats for update using (a = auth.uid() or b = auth.uid());

drop policy if exists chat_read on chat_messages;
create policy chat_read on chat_messages for select
  using (exists (select 1 from chats c where c.id = chat
                 and (c.a = auth.uid() or c.b = auth.uid())));

drop policy if exists chat_write on chat_messages;
create policy chat_write on chat_messages for insert
  with check (author = auth.uid()
              and exists (select 1 from chats c where c.id = chat
                          and (c.a = auth.uid() or c.b = auth.uid())));

drop policy if exists chat_seen on chat_messages;
create policy chat_seen on chat_messages for update
  using (exists (select 1 from chats c where c.id = chat
                 and (c.a = auth.uid() or c.b = auth.uid())));

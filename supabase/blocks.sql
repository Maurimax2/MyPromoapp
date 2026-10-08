-- Blocking a classmate, and reports that carry what was said.
--
-- Paste this once into Supabase → SQL editor, after the others. It is safe to
-- run twice.
--
-- Both app stores refuse an app where students write to each other without a
-- way to block somebody (Apple 1.2, Google's user-generated content policy).
-- Beyond the rule: a promo of eighty is small enough that leaving is not an
-- option, so not having to see one person has to be.
--
--   blocks    who blocked whom. Read only by the person who did it — the
--             other is never told, and cannot find out by asking.
--
-- What a block does, both ways — neither sees the other:
--   posts, comments, chat messages, room messages, chats, duels, the bell.
-- Profiles stay readable: the profile is where a block is taken back, and a
-- leaderboard with a hole in it would only say that something happened.
--
-- It is done with RESTRICTIVE policies, which are ANDed with whatever the
-- permissive ones say, so this file never has to restate — or fall out of
-- step with — the policies in social.sql and rooms-private.sql. Pasting
-- either of those again leaves these in place.

create table if not exists blocks (
  blocker    uuid not null references profiles on delete cascade,
  blocked    uuid not null references profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker, blocked),
  check (blocker <> blocked)
);

create index if not exists blocks_blocked_idx on blocks (blocked);

alter table blocks enable row level security;

drop policy if exists blocks_own on blocks;
create policy blocks_own on blocks for select using (blocker = auth.uid());

drop policy if exists blocks_add on blocks;
create policy blocks_add on blocks for insert
  with check (blocker = auth.uid() and is_approved());

drop policy if exists blocks_undo on blocks;
create policy blocks_undo on blocks for delete using (blocker = auth.uid());

-- Is there a block between me and this person, whichever of us made it?
-- security definer, because the policy above hides the other direction —
-- which is exactly the direction that matters when they blocked me.
create or replace function blocked_with(person uuid) returns boolean
  language sql stable security definer set search_path = public as $$
    select person is not null and person <> auth.uid() and exists (
      select 1 from blocks
      where (blocker = auth.uid() and blocked = person)
         or (blocker = person and blocked = auth.uid())
    );
  $$;

drop policy if exists posts_unblocked on posts;
create policy posts_unblocked on posts as restrictive for select
  using (not blocked_with(author));

drop policy if exists comments_unblocked on comments;
create policy comments_unblocked on comments as restrictive for select
  using (not blocked_with(author));

drop policy if exists chats_unblocked on chats;
create policy chats_unblocked on chats as restrictive for select
  using (not blocked_with(case when a = auth.uid() then b else a end));

drop policy if exists chat_unblocked on chat_messages;
create policy chat_unblocked on chat_messages as restrictive for select
  using (not blocked_with(author));

drop policy if exists room_messages_unblocked on room_messages;
create policy room_messages_unblocked on room_messages as restrictive for select
  using (not blocked_with(author));

drop policy if exists duels_unblocked on duels;
create policy duels_unblocked on duels as restrictive for select
  using (not blocked_with(case when challenger = auth.uid() then opponent else challenger end));

drop policy if exists notif_unblocked on notifications;
create policy notif_unblocked on notifications as restrictive for select
  using (not blocked_with(actor));

-- A private chat is read by nobody but the two people in it, moderators
-- included. So when one of them reports it, what the other wrote is copied
-- into the report — by the person who received it, at the moment they ask for
-- help — and a moderator judges that copy, never the conversation.
alter table reports add column if not exists excerpt text;

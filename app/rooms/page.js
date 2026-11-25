import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { subjectsInProgram } from '@/lib/catalogue';
import { isHere } from '@/lib/rooms';
import { blockedAmong } from '@/lib/blocks';
import { yearBadge } from '@/lib/data-core';
import RoomList from './RoomList';

export const dynamic = 'force-dynamic';

// غرف الدراسة — who is studying right now, and what, in every year.
//
// A public room is open to every year (owner, 2026-11-25): medicine's,
// dentistry's and pharmacy's first years sit the same subjects. Your own
// year's rooms come first; another year's wear its badge. Read with the
// server's key, because your own reads only your year's rooms, and a room
// whose host has a block with you either way is not offered.
export default async function Rooms() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const promo = profile.promo || 'pcem2';
  const db = supabaseAdmin();

  const [{ data: rows }, { data: mine }] = await Promise.all([
    // `*` and a filter: see the same note on الرئيسية.
    db.from('rooms')
      .select('*, host:profiles!rooms_host_fkey(id, full_name, email)')
      .eq('closed', false)
      .order('created_at', { ascending: false }).limit(80),
    db.from('room_members').select('room').eq('person', profile.id),
  ]);

  const blocked = await blockedAmong(profile.id, (rows || []).map((r) => r.host?.id));
  const open = (rows || []).filter((r) => !r.private && !blocked.has(r.host?.id));
  const list = [...open.filter((r) => r.promo === promo), ...open.filter((r) => r.promo !== promo)].slice(0, 40);

  // The private rooms you are in, so leaving one and coming back is possible.
  // Read with the server's key: a private room is not readable with yours.
  const mineIds = (mine || []).map((m) => m.room);
  const { data: hidden } = mineIds.length
    ? await db.from('rooms').select('id, title, topic, capacity, closed, private').in('id', mineIds).eq('closed', false)
    : { data: [] };
  const secret = (hidden || []).filter((r) => r.private);
  const joined = new Set((mine || []).map((m) => m.room));

  // How many are in each room: one query for all of them, tallied here.
  const { data: members } = list.length
    ? await db.from('room_members').select('room, seen_at').in('room', list.map((r) => r.id))
    : { data: [] };

  const count = {};
  // Who is sitting there now, not who ever joined (lib/rooms.js).
  const now = Date.now();
  for (const m of members || []) if (isHere(m, now)) count[m.room] = (count[m.room] || 0) + 1;

  const subjects = (await subjectsInProgram(promo)).map((m) => ({ id: m.id, name: m.name }));

  return (
    <RoomList
      // A room with nobody in it is not offered: opening a new one is what
      // somebody who wants company actually needs.
      rooms={list.filter((r) => count[r.id]).map((r) => ({
        ...r, members: count[r.id], joined: joined.has(r.id),
        year: r.promo && r.promo !== promo ? yearBadge(r.promo) : null,
      }))}
      secret={secret}
      subjects={subjects}
      me={{ id: profile.id }}
    />
  );
}

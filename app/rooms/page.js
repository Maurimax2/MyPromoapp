import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { subjectsOf } from '@/lib/catalogue';
import { isHere } from '@/lib/rooms';
import RoomList from './RoomList';

export const dynamic = 'force-dynamic';

// غرف الدراسة — who is studying right now, and what.
export default async function Rooms() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();

  const [{ data: rows }, { data: mine }] = await Promise.all([
    sb.from('rooms')
      .select('id, title, topic, module, capacity, closed, created_at, host:profiles!rooms_host_fkey(id, full_name, email)')
      .eq('promo', promo).eq('closed', false)
      .order('created_at', { ascending: false }).limit(40),
    sb.from('room_members').select('room').eq('person', profile.id),
  ]);

  const list = rows || [];
  const joined = new Set((mine || []).map((m) => m.room));

  // How many are in each room: one query for all of them, tallied here.
  const { data: members } = list.length
    ? await sb.from('room_members').select('room, seen_at').in('room', list.map((r) => r.id))
    : { data: [] };

  const count = {};
  // Who is sitting there now, not who ever joined (lib/rooms.js).
  const now = Date.now();
  for (const m of members || []) if (isHere(m, now)) count[m.room] = (count[m.room] || 0) + 1;

  const subjects = (await subjectsOf(promo)).map((m) => ({ id: m.id, name: m.name }));

  return (
    <RoomList
      // A room with nobody in it is not offered: opening a new one is what
      // somebody who wants company actually needs.
      rooms={list.filter((r) => count[r.id]).map((r) => ({ ...r, members: count[r.id], joined: joined.has(r.id) }))}
      subjects={subjects}
      me={{ id: profile.id }}
    />
  );
}

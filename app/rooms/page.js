import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { MODULES } from '@/lib/data';
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
      .select('id, title, topic, module, capacity, closed, created_at, host:profiles(id, full_name, email)')
      .eq('promo', promo).eq('closed', false)
      .order('created_at', { ascending: false }).limit(40),
    sb.from('room_members').select('room').eq('person', profile.id),
  ]);

  const list = rows || [];
  const joined = new Set((mine || []).map((m) => m.room));

  // How many are in each room: one query for all of them, tallied here.
  const { data: members } = list.length
    ? await sb.from('room_members').select('room').in('room', list.map((r) => r.id))
    : { data: [] };

  const count = {};
  for (const m of members || []) count[m.room] = (count[m.room] || 0) + 1;

  const subjects = MODULES
    .filter((m) => m.promo === promo)
    .map((m) => ({ id: m.id, name: m.name }));

  return (
    <RoomList
      rooms={list.map((r) => ({ ...r, members: count[r.id] || 0, joined: joined.has(r.id) }))}
      subjects={subjects}
      me={{ id: profile.id }}
    />
  );
}

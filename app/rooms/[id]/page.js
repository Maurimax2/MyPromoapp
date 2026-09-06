import { redirect, notFound } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import Room from './Room';

export const dynamic = 'force-dynamic';

export default async function RoomPage({ params }) {
  const { id } = await params;
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const sb = await supabaseServer();
  const [{ data: room }, { data: members }, { data: messages }] = await Promise.all([
    sb.from('rooms')
      .select('id, title, topic, module, capacity, closed, host:profiles(id, full_name, email)')
      .eq('id', id).maybeSingle(),
    sb.from('room_members').select('person:profiles(id, full_name, email)').eq('room', id),
    sb.from('room_messages')
      .select('id, body, created_at, author:profiles(id, full_name, email)')
      .eq('room', id).order('created_at').limit(200),
  ]);

  if (!room) notFound();

  const people = (members || []).map((m) => m.person).filter(Boolean);

  return (
    <Room
      room={room}
      people={people}
      first={messages || []}
      me={{ id: profile.id, host: room.host?.id === profile.id,
            inside: people.some((p) => p.id === profile.id) }}
    />
  );
}

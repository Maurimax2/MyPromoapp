import { redirect, notFound } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { artOf } from '@/lib/subjectArt';
import Room from './Room';

export const dynamic = 'force-dynamic';

export default async function RoomPage({ params }) {
  const { id } = await params;
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const sb = await supabaseServer();
  const [{ data: room }, { data: members }, { data: messages }] = await Promise.all([
    sb.from('rooms')
      .select('id, title, topic, module, capacity, closed, created_at, host:profiles!rooms_host_fkey(id, full_name, email)')
      .eq('id', id).maybeSingle(),
    sb.from('room_members').select('person:profiles!room_members_person_fkey(id, full_name, email)').eq('room', id),
    sb.from('room_messages')
      .select('id, body, created_at, author:profiles!room_messages_author_fkey(id, full_name, email)')
      .eq('room', id).order('created_at').limit(200),
  ]);

  if (!room) notFound();

  // The subject the room is about, by name and with its model, when it has one.
  let subject = null;
  if (room.module) {
    const { data: m } = await sb.from('modules').select('id, name').eq('id', room.module).maybeSingle();
    if (m) {
      const art = artOf(m.name);
      subject = { id: m.id, name: m.name, img: art.img, bg: art.bg };
    }
  }

  const people = (members || []).map((m) => m.person).filter(Boolean);

  return (
    <Room
      // Held in state so new messages can be appended. Without a key,
      // walking from one room to another kept the first room's messages.
      key={id}
      room={room}
      subject={subject}
      people={people}
      first={messages || []}
      me={{ id: profile.id, host: room.host?.id === profile.id,
            inside: people.some((p) => p.id === profile.id) }}
    />
  );
}

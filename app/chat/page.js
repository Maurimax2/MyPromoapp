import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { friendIds } from '@/lib/friends';
import { peopleById } from '@/lib/people';
import ChatList from './ChatList';

export const dynamic = 'force-dynamic';

// المحادثات — the people you are talking to, and the promo you could be.
export default async function Chats() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();
  const [{ data: rows }, { data: mates }] = await Promise.all([
    sb.from('chats').select('id, a, b, last_at')
      .or(`a.eq.${me.id},b.eq.${me.id}`).order('last_at', { ascending: false }).limit(60),
    sb.from('profiles').select('id, full_name, email')
      .eq('promo', me.promo || 'pcem2').eq('status', 'approved').neq('id', me.id).limit(200),
  ]);

  // Friends from other years can be written to as well (owner, 2026-11-25),
  // and a conversation may already be open with one. Your own key reads only
  // your year's profiles, so they are named with the server's (lib/people.js).
  const others = new Set((mates || []).map((p) => p.id));
  const partners = (rows || []).map((c) => (c.a === me.id ? c.b : c.a));
  const friends = await friendIds(me.id);
  const away = [...new Set([...friends, ...partners])].filter((id) => !others.has(id));
  const named = await peopleById(away);
  const friendsAway = friends.map((id) => named.get(id)).filter(Boolean)
    .map((p) => ({ id: p.id, full_name: p.full_name, email: p.email }));
  const by = Object.fromEntries([...(mates || []), ...named.values()].map((p) => [p.id, p]));

  // The last line of each conversation, for the list.
  const ids = (rows || []).map((c) => c.id);
  const { data: tail } = ids.length
    ? await sb.from('chat_messages').select('chat, body, created_at')
        .in('chat', ids).order('created_at', { ascending: false }).limit(300)
    : { data: [] };

  const lastOf = {};
  for (const m of tail || []) if (!lastOf[m.chat]) lastOf[m.chat] = m.body;

  const chats = (rows || []).map((c) => {
    const other = c.a === me.id ? c.b : c.a;
    return { id: c.id, person: by[other] || { id: other }, last: lastOf[c.id] || null };
  });

  return <ChatList chats={chats} mates={[...friendsAway, ...(mates || [])]} />;
}

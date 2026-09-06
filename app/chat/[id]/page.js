import { redirect, notFound } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import Talk from './Talk';

export const dynamic = 'force-dynamic';

export default async function ChatPage({ params }) {
  const { id } = await params;
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();
  const { data: chat } = await sb.from('chats').select('id, a, b').eq('id', id).maybeSingle();
  if (!chat) notFound();

  const otherId = chat.a === me.id ? chat.b : chat.a;
  const [{ data: person }, { data: messages }] = await Promise.all([
    sb.from('profiles').select('id, full_name, email').eq('id', otherId).maybeSingle(),
    sb.from('chat_messages').select('id, body, author, created_at')
      .eq('chat', id).order('created_at').limit(300),
  ]);

  return <Talk chat={chat.id} person={person} first={messages || []} me={me.id} />;
}

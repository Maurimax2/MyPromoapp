import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { friendsOf } from '@/lib/friends';
import { streaksOf } from '@/lib/days';
import Friends from './Friends';

export const dynamic = 'force-dynamic';

// الأصدقاء — who asked you, your friends and their streaks, and a way to add
// one by username or university number.
export default async function FriendsPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { friends, asked, sent, off } = await friendsOf(me.id);
  const streaks = friends.length ? await streaksOf(friends.map((f) => f.id)) : new Map();
  const slim = (p) => ({
    id: p.id, name: p.full_name || p.email?.split('@')[0] || 'زميل',
    handle: p.username || p.matricule || p.id, username: p.username || null,
    streak: streaks.get(p.id)?.current || 0, today: !!streaks.get(p.id)?.today,
  });

  return (
    <Friends
      friends={friends.map(slim).sort((a, b) => b.streak - a.streak)}
      asked={asked.map(slim)}
      sent={sent.map(slim)}
      off={!!off}
    />
  );
}

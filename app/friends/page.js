import { redirect } from 'next/navigation';
import { currentProfile } from '@/lib/supabase/server';
import { friendsOf } from '@/lib/friends';
import { yearBadge } from '@/lib/data-core';
import { streaksOf } from '@/lib/days';
import Friends from './Friends';
import { getT } from '@/lib/lang';

export const dynamic = 'force-dynamic';

// الأصدقاء — who asked you, your friends and their streaks, and a way to add
// one by username or university number.
export default async function FriendsPage() {
  const t = await getT();
  const me = await currentProfile();
  if (!me) redirect('/login');

  const { friends, asked, sent, off } = await friendsOf(me.id);
  const streaks = friends.length ? await streaksOf(friends.map((f) => f.id)) : new Map();
  const slim = (p) => ({
    id: p.id, name: p.full_name || p.email?.split('@')[0] || t('زميل'),
    handle: p.username || p.matricule || p.id, username: p.username || null,
    streak: streaks.get(p.id)?.current || 0, today: !!streaks.get(p.id)?.today,
    // Friends can be from any year; one from another year wears it.
    year: p.promo && p.promo !== me.promo ? yearBadge(p.promo) : null,
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

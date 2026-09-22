import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { zero, scoreOf, breakdown, badgesOf, MASTERED_BOX } from '@/lib/points';
import Points from './Points';

export const dynamic = 'force-dynamic';

// النقاط — the promo, counted.
//
// Read with the service key rather than the student's own session, on
// purpose: the tally needs everybody's rows, and row-level security is right
// to refuse that. Nothing computed here leaves this file except a name, a
// number and a rank — no email, no post, nothing a student could not already
// see on the feed.
export default async function PointsPage() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const promo = me.promo || 'pcem2';
  const db = supabaseAdmin();

  const { data: people } = await db.from('profiles')
    .select('id, full_name, email, status').eq('promo', promo).limit(500);

  const members = (people || []).filter((p) => p.status === 'approved' || p.id === me.id);
  const ids = members.map((p) => p.id);

  const tally = Object.fromEntries(ids.map((id) => [id, zero()]));
  const of = (id) => tally[id];

  const { data: posts } = await db.from('posts')
    .select('id, author, kind, likes').eq('promo', promo).eq('removed', false).limit(4000);

  for (const p of posts || []) {
    const t = of(p.author);
    if (!t) continue;
    if (p.kind === 'note') t.note += 1;
    else if (p.kind === 'question') t.question += 1;
    else t.post += 1;
    t.like += p.likes || 0;
  }

  // Comments carry no promo of their own, so they are found through the posts
  // they hang under — which is also what keeps another year out of the count.
  const postIds = (posts || []).map((p) => p.id);
  const { data: answers } = postIds.length
    ? await db.from('comments')
        .select('author, accepted').in('post', postIds).eq('removed', false).limit(8000)
    : { data: [] };

  for (const c of answers || []) {
    const t = of(c.author);
    if (!t) continue;
    t.answer += 1;
    if (c.accepted) t.accepted += 1;
  }

  const { data: reviews } = ids.length
    ? await db.from('reviews').select('person, box').in('person', ids).limit(20000)
    : { data: [] };

  for (const r of reviews || []) {
    const t = of(r.person);
    if (t && (r.box || 0) >= MASTERED_BOX) t.mastered += 1;
  }

  const board = members
    .map((p) => ({
      id: p.id,
      name: p.full_name || p.email?.split('@')[0] || 'طالب',
      points: scoreOf(tally[p.id]),
    }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));

  const mine = tally[me.id] || zero();
  const rank = board.findIndex((p) => p.id === me.id) + 1;

  // Your own row, said in full, so the board can be shown first without
  // making you hunt for yourself in it. The gap is in words rather than a
  // number on its own: "34 points off sixth" is a thing to go and do.
  const shown = board.filter((p) => p.points > 0).slice(0, 30);
  const score = scoreOf(mine);
  const above = board.filter((p) => p.points > score).pop() || null;
  const standing = {
    at: score ? rank : '—',
    name: me.full_name || me.email.split('@')[0],
    points: score,
    gap: !score
      ? 'انشر ملخّصًا أو أجب زميلًا لتدخل القائمة'
      : above
        ? `تحتاج ${above.points - score + 1} نقطة للمركز الذي فوقك`
        : 'أنت في الصدارة',
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الترتيب</div>
            <div className="head-s">
              {scoreOf(mine)
                ? `المركز ${rank} من ${board.length}`
                : 'لم تجمع نقاطًا بعد'}
            </div>
          </div>
        </div>
      </header>

      <Points
        total={scoreOf(mine)}
        rank={rank}
        rows={breakdown(mine)}
        badges={badgesOf(mine)}
        board={shown}
        meId={me.id}
        mine={standing}
      />
    </>
  );
}

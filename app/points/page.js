import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { currentProfile } from '@/lib/supabase/server';
import { zero, scoreOf, breakdown, badgesOf } from '@/lib/points';
import { standings } from '@/lib/standings';
import Points from './Points';

export const dynamic = 'force-dynamic';

// النقاط — the promo, counted.
//
// Read with the service key rather than the student's own session, on
// purpose: the tally needs everybody's rows, and row-level security is right
// to refuse that. Nothing computed here leaves this file except a name, a
// number and a rank — no email, no post, nothing a student could not already
// see on the feed.
export default async function PointsPage({ searchParams }) {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const promo = me.promo || 'pcem2';
  // This week, since Saturday, or all time. The week gives somebody who
  // joined last month a board they can actually climb.
  const week = (await searchParams)?.w === '1';
  const { board, tally } = await standings(promo, me, { week });

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
    pct: !score ? 0 : above ? Math.max(4, Math.min(100, Math.round((score / above.points) * 100))) : 100,
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الترتيب</div>
            <div className="head-s">
              {scoreOf(mine)
                ? `المركز ${rank} من ${board.length}${week ? ' هذا الأسبوع' : ''}`
                : week ? 'لا نقاط لك هذا الأسبوع بعد' : 'لم تجمع نقاطًا بعد'}
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
        week={week}
      />
    </>
  );
}

// Everybody in a promo, counted.
//
// الترتيب draws the whole board and أنا draws one row of it — your rank and
// your badges — and both have to agree to the point. So the counting lives
// here, once, and both screens ask for it.
//
// Read with the service key rather than the student's own session, on
// purpose: the tally needs everybody's rows, and row-level security is right
// to refuse that. Nothing computed here leaves this file except a name, a
// matricule, a number and a rank — no email, no post, nothing a student could
// not already see on the feed.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { zero, scoreOf, MASTERED_BOX } from '@/lib/points';

/**
 * @returns {{ board: {id,name,points,matricule}[], tally: Record<string, object> }}
 *   the board sorted best first, and each member's raw counts.
 */
export async function standings(promo, me) {
  const db = supabaseAdmin();

  const { data: people } = await db.from('profiles')
    .select('id, full_name, email, status, matricule').eq('promo', promo).limit(500);

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
      // How a challenge is addressed. Only the matricule leaves this file —
      // never the email — and only so «تحدَّه» can fill in the form.
      matricule: p.matricule || null,
    }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name));


  return { board, tally };
}

// Everybody in a promo, counted.
//
// الترتيب draws the whole board and أنا draws one row of it — your rank and
// your badges — and both have to agree to the point. So the counting lives
// here, once, and both screens ask for it.
//
// Read with the service key rather than the student's own session, on
// purpose: the tally needs everybody's rows, and row-level security is right
// to refuse that. Nothing computed here leaves this file except a name, a
// matricule or username, a number, a streak and a rank — no email, no post,
// nothing a student could not already see on the feed.
//
// Two windows: all time, and this week (since Saturday). The week counts
// what has a date — posts, answers, the question of the day — and leaves
// out what does not: a like has no moment of its own here, and a question
// mastered in the review is mastered over weeks, not in one.

import { supabaseAdmin } from '@/lib/supabase/admin';
import { zero, scoreOf, MASTERED_BOX } from '@/lib/points';
import { streaksOf } from '@/lib/days';
import { weekStart, dayOf } from '@/lib/habit';

/**
 * @param {{ week?: boolean }} [options]
 * @returns {{ board: {id,name,points,matricule,handle,streak}[], tally: Record<string, object> }}
 *   the board sorted best first, and each member's raw counts (with their
 *   `current` and `longest` streak alongside).
 */
export async function standings(promo, me, { week = false } = {}) {
  const db = supabaseAdmin();
  const since = week ? weekStart() : null;
  const sinceTime = since ? `${since}T00:00:00Z` : null;

  // Two waves, not four: the people and their posts do not depend on each
  // other, and the answers, the reviews and the days only on those two.
  let posts = db.from('posts')
    .select('id, author, kind, likes, created_at').eq('promo', promo).eq('removed', false).limit(4000);
  let daily = db.from('daily_answers').select('person, correct, day').eq('promo', promo).eq('correct', true).limit(20000);
  if (sinceTime) { posts = posts.gte('created_at', sinceTime); daily = daily.gte('day', since); }

  const [{ data: people }, { data: postRows }, { data: rights, error: dailyMissing }] = await Promise.all([
    db.from('profiles').select('*').eq('promo', promo).limit(500),
    posts,
    daily,
  ]);

  const members = (people || []).filter((p) => p.status === 'approved' || p.id === me.id);
  const ids = members.map((p) => p.id);

  const tally = Object.fromEntries(ids.map((id) => [id, zero()]));
  const of = (id) => tally[id];

  for (const p of postRows || []) {
    const t = of(p.author);
    if (!t) continue;
    if (p.kind === 'note') t.note += 1;
    else if (p.kind === 'question') t.question += 1;
    else t.post += 1;
    if (!week) t.like += p.likes || 0;
  }

  for (const d of dailyMissing ? [] : rights || []) {
    const t = of(d.person);
    if (t) t.daily += 1;
  }

  // Comments carry no promo of their own, so they are found through the posts
  // they hang under — which is also what keeps another year out of the count.
  // For the week, answers under older posts count too: the answer is new.
  const { data: allPosts } = week
    ? await db.from('posts').select('id').eq('promo', promo).eq('removed', false).limit(4000)
    : { data: postRows };
  const postIds = (allPosts || []).map((p) => p.id);
  let comments = postIds.length
    ? db.from('comments').select('author, accepted, created_at').in('post', postIds).eq('removed', false).limit(8000)
    : null;
  if (comments && sinceTime) comments = comments.gte('created_at', sinceTime);

  const [{ data: answers }, { data: reviews }, streaks] = await Promise.all([
    comments || { data: [] },
    !week && ids.length
      ? db.from('reviews').select('person, box').in('person', ids).limit(20000)
      : { data: [] },
    streaksOf(ids, dayOf()),
  ]);

  for (const c of answers || []) {
    const t = of(c.author);
    if (!t) continue;
    t.answer += 1;
    if (c.accepted) t.accepted += 1;
  }

  for (const r of reviews || []) {
    const t = of(r.person);
    if (t && (r.box || 0) >= MASTERED_BOX) t.mastered += 1;
  }

  // The streak rides beside the counts, not among them: it is not points,
  // it is what the badges at 7, 30 and 100 days are read from.
  for (const id of ids) {
    const s = streaks.get(id);
    tally[id].current = s?.current || 0;
    tally[id].longest = s?.longest || 0;
  }

  const board = members
    .map((p) => ({
      id: p.id,
      name: p.full_name || p.email?.split('@')[0] || 'طالب',
      points: scoreOf(tally[p.id]),
      // How a challenge is addressed. Only the matricule or username leaves
      // this file — never the email — and only so «تحدَّه» can fill in the form.
      matricule: p.matricule || null,
      handle: p.matricule || p.username || null,
      streak: tally[p.id].current,
    }))
    .sort((a, b) => b.points - a.points || b.streak - a.streak || a.name.localeCompare(b.name));

  return { board, tally };
}

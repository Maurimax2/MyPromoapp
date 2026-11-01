import { redirect } from 'next/navigation';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { blockedAmong } from '@/lib/blocks';
import { subjectsInProgram, subjectsOf, promosOf } from '@/lib/catalogue';
import { badgeOf } from '@/lib/data';
import Ask from './Ask';

export const dynamic = 'force-dynamic';

// سؤال وجواب — the questions asked, unanswered ones first when asked for,
// because an answered question is an archive and an unanswered one is a
// person waiting.
//
// Every year's, unless «دفعتي» is chosen (owner, 2026-11-01). It listed only
// your own year, so a DCEM4 question moved here from the feed never appeared
// to anybody looking from PCEM2 — «they don't even go to سؤال وجواب». Read
// with the server's key like «كل الدفعات» on الرئيسية, blocks applied here.
export default async function QA({ searchParams }) {
  const params = await searchParams;
  const only = params?.only === 'open';
  const mine = params?.mine === '1';

  const profile = await currentProfile();
  if (!profile) redirect('/login');
  if (profile.status !== 'approved' && !isStaff(profile)) redirect('/waiting');

  const promo = profile.promo || 'pcem2';
  const db = supabaseAdmin();

  const scoped = (q) => (mine ? q.eq('promo', promo) : q);
  let q = scoped(db.from('posts')
    .select('id, body, module, promo, answered, comments, created_at, author:profiles!posts_author_fkey(id, full_name, email)')
    .eq('kind', 'question').eq('removed', false));
  if (only) q = q.eq('answered', false);

  const [{ data: rows }, { count: open }, years] = await Promise.all([
    q.order('created_at', { ascending: false }).limit(60),
    scoped(db.from('posts').select('*', { count: 'exact', head: true })
      .eq('kind', 'question').eq('removed', false).eq('answered', false)),
    promosOf(),
  ]);

  const hidden = await blockedAmong(profile.id, (rows || []).map((r) => r.author?.id));
  const shown = (rows || []).filter((r) => !hidden.has(r.author?.id));

  // Subject names for every year a question comes from.
  const named = {};
  for (const list of await Promise.all([...new Set(shown.map((r) => r.promo).filter(Boolean))].map((p) => subjectsOf(p)))) {
    for (const m of list) named[m.id] = m.name;
  }
  const yearOf = (id) => years.promos.find((y) => y.id === id);

  const subjects = (await subjectsInProgram(promo)).map((m) => ({ id: m.id, name: m.name }));

  return (
    <Ask
      questions={shown.map((r) => ({
        ...r,
        subject: named[r.module] || null,
        year: r.promo ? { name: yearOf(r.promo)?.name || r.promo.toUpperCase(), badge: badgeOf(yearOf(r.promo)) } : null,
      }))}
      subjects={subjects}
      open={open || 0}
      only={only}
      mine={mine}
      me={{ id: profile.id }}
    />
  );
}

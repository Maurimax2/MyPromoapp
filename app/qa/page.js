import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { modulesOf } from '@/lib/catalogue';
import Ask from './Ask';

export const dynamic = 'force-dynamic';

// سؤال وجواب — the questions your promo has asked, unanswered ones first,
// because an answered question is an archive and an unanswered one is a
// person waiting.
export default async function QA({ searchParams }) {
  const params = await searchParams;
  const only = params?.only === 'open';

  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();

  let q = sb.from('posts')
    .select('id, body, module, answered, comments, created_at, author:profiles!posts_author_fkey(id, full_name, email)')
    .eq('promo', promo).eq('kind', 'question').eq('removed', false);
  if (only) q = q.eq('answered', false);

  const { data: rows } = await q.order('created_at', { ascending: false }).limit(40);

  const { count: open } = await sb.from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('promo', promo).eq('kind', 'question').eq('removed', false).eq('answered', false);

  const subjects = (await modulesOf(promo)).map((m) => ({ id: m.id, name: m.name }));

  return (
    <Ask
      questions={rows || []}
      subjects={subjects}
      open={open || 0}
      only={only}
      me={{ id: profile.id }}
    />
  );
}

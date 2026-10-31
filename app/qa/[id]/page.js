import { redirect, notFound } from 'next/navigation';
import { currentProfile, isStaff } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { blockedAmong } from '@/lib/blocks';
import { subjectsOf } from '@/lib/catalogue';
import Question from './Question';

export const dynamic = 'force-dynamic';

// One question and its answers.
//
// Read with the server's key, like «كل الدفعات» (app/feed/page.js): a question
// is reached from any year's feed, and a student's own key reads only their
// own promo — a DCEM4 question opened from PCEM2 was «not found». What the
// policies would have kept out is kept out here: a removed post, an account
// not let in, a block either way.
export default async function QuestionPage({ params }) {
  const { id } = await params;
  const profile = await currentProfile();
  if (!profile) redirect('/login');
  if (profile.status !== 'approved' && !isStaff(profile)) redirect('/waiting');

  const db = supabaseAdmin();
  const [{ data: post }, { data: answers }] = await Promise.all([
    db.from('posts')
      .select('id, body, module, answered, created_at, author:profiles!posts_author_fkey(id, full_name, email, promo)')
      .eq('id', id).eq('kind', 'question').eq('removed', false).maybeSingle(),
    db.from('comments')
      .select('id, body, accepted, created_at, author:profiles!comments_author_fkey(id, full_name, email)')
      .eq('post', id).eq('removed', false).order('created_at').limit(100),
  ]);

  if (!post) notFound();

  const hidden = await blockedAmong(profile.id, [post.author?.id, ...(answers || []).map((a) => a.author?.id)]);
  if (hidden.has(post.author?.id)) notFound();

  const subject = post.module
    ? (await subjectsOf(post.author?.promo || 'pcem2')).find((m) => m.id === post.module)?.name || null
    : null;

  // The one that settled it goes first; everything else in the order it came.
  const sorted = (answers || []).filter((a) => !hidden.has(a.author?.id))
    .sort((a, b) => (b.accepted ? 1 : 0) - (a.accepted ? 1 : 0));

  return (
    <Question
      // The answers live in state so a new one can be appended. Keyed so that
      // opening a second question does not show the first one's answers.
      key={post.id}
      post={post}
      subject={subject}
      answers={sorted}
      me={{ id: profile.id, asked: post.author?.id === profile.id }}
    />
  );
}

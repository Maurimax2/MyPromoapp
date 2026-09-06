import { redirect, notFound } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { MODULES } from '@/lib/data';
import Question from './Question';

export const dynamic = 'force-dynamic';

export default async function QuestionPage({ params }) {
  const { id } = await params;
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const sb = await supabaseServer();
  const [{ data: post }, { data: answers }] = await Promise.all([
    sb.from('posts')
      .select('id, body, module, answered, created_at, author:profiles!posts_author_fkey(id, full_name, email)')
      .eq('id', id).eq('kind', 'question').maybeSingle(),
    sb.from('comments')
      .select('id, body, accepted, created_at, author:profiles!comments_author_fkey(id, full_name, email)')
      .eq('post', id).eq('removed', false).order('created_at').limit(100),
  ]);

  if (!post) notFound();

  const subject = MODULES.find((m) => m.id === post.module)?.name || null;

  // The one that settled it goes first; everything else in the order it came.
  const sorted = [...(answers || [])].sort((a, b) => (b.accepted ? 1 : 0) - (a.accepted ? 1 : 0));

  return (
    <Question
      post={post}
      subject={subject}
      answers={sorted}
      me={{ id: profile.id, asked: post.author?.id === profile.id }}
    />
  );
}

import { supabaseServer } from '@/lib/supabase/server';
import ReviewScreen from './ReviewScreen';

export const dynamic = 'force-dynamic';

export default async function QuestionsPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'needs_answer';
  const moduleId = params?.module || null;

  const sb = await supabaseServer();

  let query = sb
    .from('questions')
    .select('id, n, stem, options, answer, why, status, source, question_banks!inner(title, module)')
    .eq('status', status)
    .order('id')
    .limit(60);

  if (moduleId) query = query.eq('question_banks.module', moduleId);

  // One round trip for the lot, rather than five in a row.
  const states = ['needs_answer', 'draft', 'published'];
  const [{ data: modules }, { data: questions }, ...tallies] = await Promise.all([
    sb.from('modules').select('id, name').order('position'),
    query,
    ...states.map((s) =>
      sb.from('questions').select('*', { count: 'exact', head: true }).eq('status', s)),
  ]);

  const counts = {};
  states.forEach((s, i) => { counts[s] = tallies[i]?.count || 0; });

  return (
    <ReviewScreen
      questions={questions || []}
      modules={modules || []}
      status={status}
      moduleId={moduleId}
      counts={counts}
    />
  );
}

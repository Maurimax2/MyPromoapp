import { supabaseServer } from '@/lib/supabase/server';
import ReviewScreen from './ReviewScreen';

export const dynamic = 'force-dynamic';

export default async function QuestionsPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'needs_answer';
  const moduleId = params?.module || null;

  const sb = await supabaseServer();

  const { data: modules } = await sb
    .from('modules').select('id, name').order('position');

  let query = sb
    .from('questions')
    .select('id, n, stem, options, answer, why, status, source, question_banks!inner(title, module)')
    .eq('status', status)
    .order('id')
    .limit(60);

  if (moduleId) query = query.eq('question_banks.module', moduleId);

  const { data: questions } = await query;

  const counts = {};
  for (const s of ['needs_answer', 'draft', 'published']) {
    const { count } = await sb.from('questions')
      .select('*', { count: 'exact', head: true }).eq('status', s);
    counts[s] = count || 0;
  }

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

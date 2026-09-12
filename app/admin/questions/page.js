import { supabaseServer } from '@/lib/supabase/server';
import { readingQuestions } from '@/lib/qcm/read';
import ReviewScreen from './ReviewScreen';

export const dynamic = 'force-dynamic';

export default async function QuestionsPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || 'needs_answer';
  const moduleId = params?.module || null;

  const sb = await supabaseServer();

  // The same two-goes-at-it as the student screens: a database still without
  // `kind` refuses the whole select, and the queue would read as empty with a
  // hundred questions waiting in it. See lib/qcm/read.js.
  const build = (columns) => {
    let q = sb.from('questions').select(columns).eq('status', status).order('id').limit(60);
    if (moduleId) q = q.eq('question_banks.module', moduleId);
    return q;
  };
  const WITH = 'id, n, kind, stem, options, answer, model_answer, why, status, source, question_banks!inner(title, module)';
  const WITHOUT = 'id, n, stem, options, answer, why, status, source, question_banks!inner(title, module)';
  const query = readingQuestions(() => build(WITH), () => build(WITHOUT));

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
      // Same reason as the content screen: the queue is held in state, so
      // changing the filter has to make it a different component or the old
      // questions stay on screen.
      key={`${status}:${moduleId || 'all'}`}
      questions={questions || []}
      modules={modules || []}
      status={status}
      moduleId={moduleId}
      counts={counts}
    />
  );
}

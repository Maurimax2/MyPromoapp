import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import ReportQueue from './ReportQueue';

export const dynamic = 'force-dynamic';

// What students objected to, and what was done about it.
export default async function Reports({ searchParams }) {
  const params = await searchParams;
  const state = params?.state || 'open';

  const sb = await supabaseServer();
  const states = ['open', 'actioned', 'dismissed'];

  const [me, { data: rows }, ...tallies] = await Promise.all([
    currentProfile(),
    sb.from('reports')
      .select('id, target_type, target_id, reason, state, created_at, reporter:profiles(full_name, email)')
      .eq('state', state).order('created_at', { ascending: false }).limit(60),
    ...states.map((s) =>
      sb.from('reports').select('*', { count: 'exact', head: true }).eq('state', s)),
  ]);

  const counts = {};
  states.forEach((s, i) => { counts[s] = tallies[i]?.count || 0; });

  // What was actually reported, so a moderator judges the thing rather than
  // its id.
  const postIds = (rows || []).filter((r) => r.target_type === 'post').map((r) => r.target_id);
  const commentIds = (rows || []).filter((r) => r.target_type === 'comment').map((r) => r.target_id);

  const [{ data: posts }, { data: comments }] = await Promise.all([
    postIds.length
      ? sb.from('posts').select('id, body, removed, author:profiles(full_name, email)').in('id', postIds)
      : Promise.resolve({ data: [] }),
    commentIds.length
      ? sb.from('comments').select('id, body, removed, author:profiles(full_name, email)').in('id', commentIds)
      : Promise.resolve({ data: [] }),
  ]);

  const byId = {};
  for (const p of posts || []) byId[`post:${p.id}`] = p;
  for (const c of comments || []) byId[`comment:${c.id}`] = c;

  return (
    <ReportQueue
      reports={(rows || []).map((r) => ({ ...r, target: byId[`${r.target_type}:${r.target_id}`] || null }))}
      state={state}
      counts={counts}
      canAct={isAdmin(me)}
    />
  );
}

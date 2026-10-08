import { supabaseServer, currentProfile, isAdmin } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import ReportQueue from './ReportQueue';

export const dynamic = 'force-dynamic';

// What students objected to, and what was done about it.
export default async function Reports({ searchParams }) {
  const params = await searchParams;
  const state = params?.state || 'open';

  const sb = await supabaseServer();
  // A reported student may be in any year, and staff read only their own
  // promo's profiles through the policies.
  const admin = supabaseAdmin();
  const states = ['open', 'actioned', 'dismissed'];

  const [me, { data: rows }, ...tallies] = await Promise.all([
    currentProfile(),
    sb.from('reports')
      .select('*, reporter:profiles!reports_reporter_fkey(full_name, email)')
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
      ? sb.from('posts').select('id, body, removed, author:profiles!posts_author_fkey(full_name, email)').in('id', postIds)
      : Promise.resolve({ data: [] }),
    commentIds.length
      ? sb.from('comments').select('id, body, removed, author:profiles!comments_author_fkey(full_name, email)').in('id', commentIds)
      : Promise.resolve({ data: [] }),
  ]);

  const byId = {};
  for (const p of posts || []) byId[`post:${p.id}`] = p;
  for (const c of comments || []) byId[`comment:${c.id}`] = c;
  // A note is a post.
  for (const r of rows || []) if (r.target_type === 'note') byId[`note:${r.target_id}`] = byId[`post:${r.target_id}`];

  // A person, a chat or a room: what is judged is the account, and — for a
  // chat or a room — the copy of what was said that the report carries.
  const roomIds = (rows || []).filter((r) => r.target_type === 'room').map((r) => r.target_id);
  const { data: rooms } = roomIds.length
    ? await sb.from('rooms').select('id, title, host').in('id', roomIds)
    : { data: [] };
  const personOf = (r) => (r.target_type === 'room'
    ? (rooms || []).find((x) => String(x.id) === String(r.target_id))?.host
    : r.target_id);
  const personIds = (rows || []).filter((r) => ['profile', 'message', 'room'].includes(r.target_type))
    .map(personOf).filter(Boolean);
  const { data: people } = personIds.length
    ? await admin.from('profiles').select('id, full_name, email, status, role').in('id', personIds)
    : { data: [] };
  for (const r of rows || []) {
    if (!['profile', 'message', 'room'].includes(r.target_type)) continue;
    const room = (rooms || []).find((x) => String(x.id) === String(r.target_id));
    byId[`${r.target_type}:${r.target_id}`] = {
      person: true,
      author: (people || []).find((p) => p.id === personOf(r)) || null,
      title: room?.title || null,
      body: r.excerpt || null,
    };
  }

  return (
    <ReportQueue
      key={state}
      reports={(rows || []).map((r) => ({ ...r, target: byId[`${r.target_type}:${r.target_id}`] || null }))}
      state={state}
      counts={counts}
      canAct={isAdmin(me)}
    />
  );
}

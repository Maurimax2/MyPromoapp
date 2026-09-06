import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { MODULES, sectionsFor } from '@/lib/data';
import { urlFor } from '@/lib/storage';
import NoteList from './NoteList';

export const dynamic = 'force-dynamic';

// الملخصات — what students wrote, filed under the subject it covers.
//
// Two sources, deliberately shown together: the résumés that came out of the
// Drive with the course material, and what a student uploads from their
// phone. A student looking for a summary of Ostéologie does not care which
// of the two it came from.
export default async function Notes() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();

  const [{ data: rows }, { data: saved }] = await Promise.all([
    sb.from('posts')
      .select(`id, body, module, created_at,
               author:profiles!posts_author_fkey(id, full_name, email),
               post_media(kind, path, name, bytes, position)`)
      .eq('promo', promo).eq('kind', 'note').eq('removed', false)
      .order('created_at', { ascending: false }).limit(120),
    sb.from('saves').select('post').eq('person', profile.id),
  ]);

  const keeps = new Set((saved || []).map((s) => s.post));

  const uploaded = (rows || []).map((n) => {
    const file = (n.post_media || []).sort((a, b) => a.position - b.position)[0];
    return {
      id: `p${n.id}`, post: n.id, title: n.body || file?.name || 'ملخص',
      module: n.module, author: n.author, at: n.created_at,
      url: file ? urlFor(file.path) : null,
      ext: file?.name?.split('.').pop()?.toUpperCase() || null,
      bytes: file?.bytes ?? null,
      saved: keeps.has(n.id),
    };
  });

  // The résumés that shipped with the course, per subject.
  const fromDrive = MODULES
    .filter((m) => m.promo === promo)
    .flatMap((m) => sectionsFor(m, 'notes').flatMap((s) => s.items.map((it) => ({
      id: `d${it.fid}`, title: it.title, module: m.id, author: null,
      href: `/file/${it.fid}`, ext: it.ext || 'PDF',
      bytes: it.mb ? Math.round(it.mb * 1048576) : null,
    }))));

  const named = Object.fromEntries(MODULES.map((m) => [m.id, m.name]));

  // Group by subject, the uploads first because they are the new thing.
  const groups = [];
  for (const n of [...uploaded, ...fromDrive]) {
    const key = n.module || 'autre';
    let g = groups.find((x) => x.id === key);
    if (!g) groups.push((g = { id: key, name: named[key] || 'Autres', items: [] }));
    g.items.push(n);
  }

  return (
    <NoteList
      groups={groups}
      subjects={MODULES.filter((m) => m.promo === promo).map((m) => ({ id: m.id, name: m.name }))}
      me={{ id: profile.id }}
    />
  );
}

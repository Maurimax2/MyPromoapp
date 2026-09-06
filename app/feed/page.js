import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { bannerFor } from '@/lib/data';
import { subjectsOf } from '@/lib/catalogue';
import { urlFor } from '@/lib/storage';
import Home from './Home';

export const dynamic = 'force-dynamic';

// الرئيسية — what your promo is saying, and everything the app can do.
export default async function Feed() {
  const profile = await currentProfile();
  if (!profile) redirect('/login');

  const promo = profile.promo || 'pcem2';
  const sb = await supabaseServer();

  // The posts, their authors, their attachments, and which ones I have
  // already liked — four things, one round trip each, all at once.
  const [{ data: rows, error: readError }, { data: mine }] = await Promise.all([
    sb.from('posts')
      .select(`id, body, kind, module, created_at, likes, comments,
               author:profiles!posts_author_fkey(id, full_name, email, promo),
               post_media(kind, path, name, bytes, position)`)
      .eq('promo', promo).eq('removed', false)
      .order('created_at', { ascending: false }).limit(30),
    sb.from('likes').select('post').eq('person', profile.id),
  ]);

  const liked = new Set((mine || []).map((l) => l.post));

  // An empty feed has two very different causes and used to look identical
  // either way: nobody has posted, or the database has posts and will not
  // hand them to you. Row-level security does not raise an error when it
  // refuses — it simply returns nothing — so the only way to tell is to ask
  // again with the key that ignores policies and compare the two numbers.
  let refused = 0;
  if (!readError && !(rows || []).length) {
    const { count } = await supabaseAdmin()
      .from('posts').select('id', { count: 'exact', head: true })
      .eq('promo', promo).eq('removed', false);
    refused = count || 0;
  }

  // Read with the service key: a student's own notifications are their own
  // rows, but the count is wanted on every load and this is one head request.
  const { count: unseen } = await supabaseAdmin()
    .from('notifications').select('id', { count: 'exact', head: true })
    .eq('person', profile.id).eq('seen', false);

  const subjectRows = await subjectsOf(promo);
  const named = Object.fromEntries(subjectRows.map((m) => [m.id, m.name]));

  const posts = (rows || []).map((p) => ({
    ...p,
    liked: liked.has(p.id),
    subject: named[p.module] || null,
    media: (p.post_media || [])
      .sort((a, b) => a.position - b.position)
      .map((m) => ({ ...m, url: urlFor(m.path) })),
  }));

  // Every subject the promo has, including one a colleague added this
  // morning that has no files in it yet.
  const subjects = subjectRows
    .map((m) => ({ id: m.id, name: m.name, tint: m.tint, banner: bannerFor(m.id) }));

  return (
    <Home
      unseen={unseen || 0}
      readError={readError ? (readError.message || 'تعذّرت قراءة المنشورات') : null}
      refused={refused}
      me={{ id: profile.id, name: profile.full_name || profile.email.split('@')[0],
            promo: profile.promo,
            approved: profile.status === 'approved'
              || ['owner', 'admin', 'editor'].includes(profile.role) }}
      posts={posts}
      subjects={subjects}
    />
  );
}

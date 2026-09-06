import { redirect } from 'next/navigation';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { MODULES, bannerFor, fileCount } from '@/lib/data';
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
  const [{ data: rows }, { data: mine }] = await Promise.all([
    sb.from('posts')
      .select(`id, body, kind, created_at, likes, comments,
               author:profiles(id, full_name, email, promo),
               post_media(kind, path, name, bytes, position)`)
      .eq('promo', promo).eq('removed', false)
      .order('created_at', { ascending: false }).limit(30),
    sb.from('likes').select('post').eq('person', profile.id),
  ]);

  const liked = new Set((mine || []).map((l) => l.post));

  const posts = (rows || []).map((p) => ({
    ...p,
    liked: liked.has(p.id),
    media: (p.post_media || [])
      .sort((a, b) => a.position - b.position)
      .map((m) => ({ ...m, url: urlFor(m.path) })),
  }));

  const subjects = MODULES
    .filter((m) => m.promo === promo && fileCount(m) > 0)
    .map((m) => ({ id: m.id, name: m.name, tint: m.tint, banner: bannerFor(m.id) }));

  return (
    <Home
      me={{ id: profile.id, name: profile.full_name || profile.email.split('@')[0],
            approved: profile.status === 'approved'
              || ['owner', 'admin', 'editor'].includes(profile.role) }}
      posts={posts}
      subjects={subjects}
    />
  );
}

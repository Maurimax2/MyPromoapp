import Link from 'next/link';
import { redirect } from 'next/navigation';
import Icon from '@/components/Icon';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { urlFor } from '@/lib/storage';
import { modulesOf } from '@/lib/catalogue';

export const dynamic = 'force-dynamic';

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

// What you kept for later.
export default async function Saved() {
  const me = await currentProfile();
  if (!me) redirect('/login');

  const sb = await supabaseServer();
  const { data: rows } = await sb.from('saves')
    .select('post, document, created_at').eq('person', me.id)
    .order('created_at', { ascending: false }).limit(200);

  const postIds = (rows || []).map((r) => r.post).filter(Boolean);
  const { data: posts } = postIds.length
    ? await sb.from('posts')
        .select('id, body, kind, module, author:profiles!posts_author_fkey(full_name, email), post_media(path, name, bytes, position)')
        .in('id', postIds)
    : { data: [] };

  const named = Object.fromEntries(
    (await modulesOf(me.promo || 'pcem2')).map((m) => [m.id, m.name]));

  const items = (posts || []).map((p) => {
    const file = (p.post_media || []).sort((a, b) => a.position - b.position)[0];
    return {
      id: p.id,
      title: p.body || file?.name || 'منشور',
      subject: named[p.module] || null,
      who: p.author?.full_name || p.author?.email?.split('@')[0] || 'طالب',
      url: file ? urlFor(file.path) : null,
      bytes: file?.bytes ?? null,
      kind: p.kind,
    };
  });

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/profile" className="icobtn" aria-label="رجوع"><Icon name="chev" size={19} /></Link>
          <div className="grow">
            <div className="head-t">المحفوظات</div>
            <div className="head-s">{items.length ? `${items.length} عنصرًا` : 'لا شيء محفوظ'}</div>
          </div>
        </div>
      </header>

      <div className="scroll">
        {items.map((it) => {
          const inner = (
            <div className="card-row">
              <div className="tile tint-orange">
                <Icon name={it.kind === 'question' ? 'msg' : 'file'} size={20} />
              </div>
              <div className="grow">
                <div className="nm" dir="ltr">{it.title}</div>
                <div className="mt">
                  {it.who}{it.subject ? ` · ${it.subject}` : ''}
                  {it.bytes ? ` · ${mb(it.bytes)}` : ''}
                </div>
              </div>
              <span className="chev"><Icon name="chev" size={18} /></span>
            </div>
          );
          return it.url
            ? <a key={it.id} href={it.url} target="_blank" rel="noreferrer" className="card">{inner}</a>
            : <Link key={it.id} href={it.kind === 'question' ? `/qa/${it.id}` : '/feed'} className="card">{inner}</Link>;
        })}

        {!items.length && (
          <div className="empty">
            <div className="tile tint-purple"><Icon name="bookmark" size={24} /></div>
            <div className="empty-t">لا شيء محفوظ</div>
            <div className="empty-b">اضغط الإشارة على أي ملخص أو منشور لتجده هنا.</div>
          </div>
        )}
      </div>
    </>
  );
}

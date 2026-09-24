import { notFound } from 'next/navigation';
import { sectionsFor, subjectName } from '@/lib/data';
import { moduleOf, semestersOf } from '@/lib/catalogue';
import { regionsFor } from '@/lib/anatomy/curriculum';
import { banksOf } from '@/lib/quiz-bank';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { urlFor } from '@/lib/storage';
import { artOf, regionArt, chapterArt } from '@/lib/subjectArt';
import Subject from './Subject';

// Not prerendered any more: what a subject holds is a question for the
// database, and the answer depends on who is asking.
export const dynamic = 'force-dynamic';

// The two models rendered large enough to stand as a hero; the rest are drawn
// at their card size, which a 2× screen still shows sharp at this height.
const BIG = new Set(['crane', 'coeur']);

const doc = (d) => ({
  n: d.n ?? null, title: d.title, fid: d.fid, ext: d.ext || 'PDF', mb: d.mb,
  prof: d.prof || null, year: d.year || null, pages: d.pages || null,
});

// One subject: its model, and everything it has — lectures, papers, what
// classmates wrote, the regions of the body it covers — one tab each.
export default async function Module({ params }) {
  const { id } = await params;
  const m = await moduleOf(id);
  if (!m) notFound();

  const sb = await supabaseServer();
  const [semesters, banks, { data: rows }] = await Promise.all([
    // A subject taught in both semesters is two modules; the hero switches.
    // Only the semesters the viewer's year studies (lib/catalogue.js).
    currentProfile().then((me) => semestersOf(m, me?.promo || null)),
    banksOf(id),
    // What classmates uploaded for this subject. The Drive's own résumés
    // join them below, as الملخصات does.
    sb.from('posts')
      .select(`id, body, likes, created_at,
               author:profiles!posts_author_fkey(id, full_name, email),
               post_media(kind, path, name, bytes, position)`)
      .eq('module', id).eq('kind', 'note').eq('removed', false)
      .order('likes', { ascending: false }).limit(40),
  ]);

  const art = artOf(m.name);
  const img = BIG.has(art.art) ? `/art/${art.art}-big.webp` : art.img;

  const chapters = m.chapters.map((ch) => ({
    title: ch.title,
    subtitle: ch.subtitle || null,
    img: chapterArt(ch.title, art.img),
    lectures: ch.lectures.map((l) => ({ ...doc(l), versions: (l.versions || []).map(doc) })),
  }));

  // Travaux dirigés, past papers and the rest of what is read rather than
  // answered: after the chapters, in the same shape.
  const extra = sectionsFor(m, 'archive').map((s) => ({
    id: s.id, title: s.title, icon: s.icon,
    items: s.items.map((it) => ({ ...doc(it), correction: it.correction || null })),
  }));

  const uploaded = (rows || []).map((n) => {
    const file = (n.post_media || []).sort((a, b) => a.position - b.position)[0];
    return {
      id: `p${n.id}`,
      title: n.body || file?.name || 'ملخص',
      who: n.author?.full_name || n.author?.email?.split('@')[0] || null,
      whoId: n.author?.id || '',
      likes: n.likes || 0,
      href: file ? urlFor(file.path) : null,
      external: true,
      ext: file?.name?.split('.').pop()?.toUpperCase() || 'PDF',
      mb: file?.bytes ? (file.bytes / 1048576).toFixed(1) : null,
    };
  }).filter((n) => n.href);

  const fromDrive = sectionsFor(m, 'notes').flatMap((s) => s.items).map((it) => ({
    id: `d${it.fid}`, title: it.title, who: null, whoId: '', likes: null,
    href: `/file/${it.fid}`, external: false, ext: it.ext || 'PDF', mb: it.mb,
  }));

  const regions = regionsFor(m.promo, m.semester).map((r) => ({
    href: `/anatomie/${r.promo.toLowerCase()}/${r.semesterId}/${r.id}`,
    title: r.title, subtitle: r.subtitle, img: regionArt(r),
  }));

  return (
    <Subject
      id={id}
      name={subjectName(m.name)}
      promo={String(m.promo || '').toUpperCase()}
      semester={m.semester}
      semesters={semesters.map((s) => ({ id: s.id, semester: s.semester }))}
      img={img}
      bg={art.bg}
      professors={m.professors || []}
      chapters={chapters}
      extra={extra}
      banks={banks.map((b) => ({ fid: b.fid, title: b.title, section: b.section || null, count: b.questions.length }))}
      notes={[...uploaded, ...fromDrive]}
      regions={regions}
      empty={!!m.empty}
    />
  );
}

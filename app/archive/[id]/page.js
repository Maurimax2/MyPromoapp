import { notFound } from 'next/navigation';
import { sectionsFor, subjectName } from '@/lib/data';
import { moduleOf, semestersOf } from '@/lib/catalogue';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { atlasOf } from '@/lib/anatomy/lessons';
import { banksOf } from '@/lib/quiz-bank';
import { supabaseServer, currentProfile } from '@/lib/supabase/server';
import { urlFor } from '@/lib/storage';
import { artOf, regionArt, chapterArt } from '@/lib/subjectArt';
import Subject from './Subject';
import { getT } from '@/lib/lang';

// Not prerendered any more: what a subject holds is a question for the
// database, and the answer depends on who is asking.
export const dynamic = 'force-dynamic';

// The pictures of the lessons, rendered from the lessons themselves
// (scripts/lesson-thumbs.mjs). A lesson without one wears its region's art.
let thumbs = null;
const thumbOf = (l) => {
  if (!thumbs) {
    try { thumbs = new Set(readdirSync(join(process.cwd(), 'public/anatomy/thumbs'))); } catch { thumbs = new Set(); }
  }
  return thumbs.has(`${l.id}.webp`) ? `/anatomy/thumbs/${l.id}.webp` : regionArt({ id: l.region || l.id, title: l.title });
};

// The two models rendered large enough to stand as a hero; the rest are drawn
// at their card size, which a 2× screen still shows sharp at this height.
const BIG = new Set(['crane', 'coeur']);

const doc = (d) => ({
  n: d.n ?? null, title: d.title, fid: d.fid, ext: d.ext || 'PDF', mb: d.mb,
  prof: d.prof || null, year: d.year || null, pages: d.pages || null,
});

// One subject: its model, and everything it has — lectures, papers, what
// classmates wrote, the regions of the body it covers — one tab each.
export default async function Module({ params, searchParams }) {
  const t = await getT();
  const { id } = await params;
  const q = (await searchParams) || {};
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

  // Anatomy is studied with the body in front of you: the subject's «Atlas»
  // tab is every lecture's 3D scene and drawings, chapter by chapter, and a
  // lecture that has one carries a «3D» chip to it. Only ANATOMIE: ANATOMIE
  // PATHOLOGIQUE is a different subject and does not match, and Biochimie
  // once listed the skull.
  const isAnatomy = /(^|-)anatomie(-s\d)?$/i.test(id);
  const atlas = isAnatomy
    ? atlasOf(m.promo, m.semester, m.chapters.flatMap((ch) => ch.lectures.map((l) => ({ n: l.n, fid: l.fid, title: l.title }))))
      .map((c) => ({ title: c.title, lessons: c.lessons.map((l) => ({ ...l, img: thumbOf(l) })) }))
    : [];
  const lessonsOf = new Map();
  for (const l of atlas.flatMap((c) => c.lessons)) {
    for (const fid of l.fids) lessonsOf.set(fid, [...(lessonsOf.get(fid) || []), { href: l.href, title: l.title }]);
  }

  const chapters = m.chapters.map((ch) => ({
    title: ch.title,
    subtitle: ch.subtitle || null,
    img: chapterArt(ch.title, art.img),
    lectures: ch.lectures.map((l) => ({
      ...doc(l), versions: (l.versions || []).map(doc), lessons: lessonsOf.get(l.fid) || [],
    })),
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
      title: n.body || file?.name || t('ملخص'),
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
      atlas={isAnatomy ? atlas : null}
      tab={typeof q.tab === 'string' ? q.tab : null}
      empty={!!m.empty}
    />
  );
}

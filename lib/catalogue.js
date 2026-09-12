// The catalogue, read from the database.
//
// It used to live in lib/data.js: nine subjects, PCEM2's, written out by hand
// in JavaScript. That is why a subject somebody adds in the panel — DCEM1, a
// new year, a module a colleague catalogued — never appeared in the app. The
// panel wrote to Postgres and every student screen read the file.
//
// This reads Postgres and hands back exactly the shape those screens already
// expect, so the switch is one import per screen rather than a rewrite.
//
// The file is still the fallback, per subject: PCEM2's content is only in the
// database once the migration has run, and a half-finished migration must not
// blank the archive. So a module the database knows but has no files for
// falls back to the file's copy when there is one — which is precisely the
// state the panel is in mid-migration.

import { supabaseServer } from '@/lib/supabase/server';
import { MODULES, PROMOS as FILE_PROMOS, subjectKey, subjectName } from '@/lib/data';
import { sectionMeta } from '@/lib/sections';

const mbOf = (bytes) => (bytes ? (bytes / 1048576).toFixed(1) : null);

/** One document row, as a lecture or a section item. */
const asItem = (d) => ({
  // The row's own id, not just the Drive one. A question says which lecture
  // it revises by pointing at this, and اختبر نفسك has to be able to put the
  // two back together.
  id: d.id,
  n: d.n ?? null,
  title: d.title,
  ext: d.ext || 'PDF',
  mb: mbOf(d.bytes),
  fid: d.drive_id || null,
  prof: d.prof || null,
  year: d.year || null,
  pages: d.pages || null,
  versions: [],
});

/** The database's rows for a promo, assembled into the file's shape. */
function assemble(modules, chapters, documents) {
  const byModule = new Map(modules.map((m) => [m.id, {
    id: m.id, promo: m.promo, semester: m.semester, name: m.name,
    icon: m.icon || 'book', tint: m.tint || 'purple',
    professors: m.professors || [],
    chapters: [], sections: [],
  }]));

  const chapterOf = new Map();
  for (const ch of chapters) {
    const m = byModule.get(ch.module);
    if (!m) continue;
    const made = { id: ch.id, title: ch.title, subtitle: ch.subtitle || null, lectures: [] };
    m.chapters.push(made);
    chapterOf.set(ch.id, made);
  }

  // A version — another teacher's copy of the same lecture — hangs off its
  // parent rather than sitting beside it as more material.
  const byId = new Map(documents.map((d) => [d.id, d]));
  const made = new Map();

  for (const d of documents) {
    if (d.parent) continue;
    made.set(d.id, asItem(d));
  }
  for (const d of documents) {
    if (!d.parent) continue;
    made.get(d.parent)?.versions.push(asItem(d));
  }

  for (const d of documents) {
    if (d.parent) continue;
    const m = byModule.get(d.module);
    if (!m) continue;
    const item = made.get(d.id);

    if (d.where_shown === 'archive' && d.section === 'lecture') {
      const ch = chapterOf.get(d.chapter);
      if (ch) { ch.lectures.push(item); continue; }

      // Files imported from a Drive folder arrive with no chapter, and this
      // used to make a chapter for each one — thirty lectures drawn as thirty
      // headings of one line. They share a single list under the subject's
      // own name until somebody files them.
      let loose = m.chapters.find((c) => c.id === null);
      if (!loose) m.chapters.push((loose = {
        id: null, title: m.name, subtitle: null, lectures: [],
      }));
      loose.lectures.push(item);
      continue;
    }

    let section = m.sections.find((s) => s.id === d.section && s.where === d.where_shown);
    if (!section) {
      const meta = sectionMeta(d.section, d.where_shown);
      m.sections.push((section = {
        id: d.section, where: d.where_shown, title: meta.title, icon: meta.icon, items: [],
      }));
    }
    section.items.push(item);
  }

  // Empty chapters are noise on a screen that lists chapters.
  for (const m of byModule.values()) {
    m.chapters = m.chapters.filter((c) => c.lectures.length);
  }

  void byId;
  return [...byModule.values()];
}

const fileModules = (promo) => MODULES.filter((m) => m.promo === promo);
const hasFiles = (m) =>
  (m.chapters || []).some((c) => c.lectures.length) || (m.sections || []).some((s) => s.items.length);

/**
 * Every subject in a promo, from the database, falling back to the file.
 *
 * Read as the signed-in person, so an account waiting for approval sees
 * nothing here either — the policies decide, not this function.
 */
export async function modulesOf(promo) {
  const sb = await supabaseServer();

  const { data: modules } = await sb.from('modules')
    .select('id, promo, semester, name, icon, tint, professors, position')
    .eq('promo', promo).order('position');

  if (!modules?.length) return fileModules(promo);

  const ids = modules.map((m) => m.id);
  const [{ data: chapters }, { data: documents }] = await Promise.all([
    sb.from('chapters').select('id, module, title, subtitle, position')
      .in('module', ids).order('position'),
    sb.from('documents')
      .select('id, module, chapter, where_shown, section, n, title, prof, year, ext, bytes, drive_id, pages, parent, position')
      .in('module', ids).eq('published', true).order('position'),
  ]);

  const built = assemble(modules, chapters || [], documents || []);

  // Mid-migration a subject exists with nothing in it. The file still has the
  // real thing, so use that until the files arrive.
  const fromFile = new Map(fileModules(promo).map((m) => [m.id, m]));
  return built.map((m) => (hasFiles(m) ? m : fromFile.get(m.id) || m));
}

/**
 * Every subject in every year, named but not filled.
 *
 * The archive's year and semester switcher needs the whole list and none of
 * the files, so this is the light read: one row per subject.
 */
export async function allModules() {
  const sb = await supabaseServer();
  const { data, error } = await sb.from('modules')
    .select('id, promo, semester, name, icon, tint').order('position');

  // A failed read is not an empty catalogue. This used to discard the error
  // and hand back lib/data.js, which draws a normal-looking archive of last
  // year's subjects — the app looks like it works and the panel looks like it
  // never saved anything. Whatever went wrong is said out loud now.
  if (error) return { modules: fromFile(), source: 'file', error: error.message };

  if (!data?.length) return { modules: fromFile(), source: 'file', error: null };

  // A year the database does not carry yet still comes from the file.
  const known = new Set(data.map((m) => m.promo));
  const extra = fromFile().filter((m) => !known.has(m.promo));
  return { modules: [...data, ...extra], source: 'db', error: null };
}

const fromFile = () => MODULES.map((m) => ({
  id: m.id, promo: m.promo, semester: m.semester,
  name: m.name, icon: m.icon, tint: m.tint,
}));

/**
 * The subjects of a promo, named and nothing more.
 *
 * The feed draws a strip of subjects, سؤال وجواب and الغرف fill a picker with
 * them, المحفوظات prints a name under a saved file. None of them wants the
 * catalogue: PCEM2 is 906 documents, and sending those to a phone to render
 * nine names is how an app gets a reputation for being slow.
 */
export async function subjectsOf(promo) {
  const sb = await supabaseServer();
  const { data, error } = await sb.from('modules')
    .select('id, name, semester, icon, tint').eq('promo', promo).order('position');

  // The file is the fallback for a year the database has nothing for — not
  // for a read that failed. Falling back on a refusal is how a student ends
  // up looking at subjects the server just declined to show them.
  if (error) return [];

  return data?.length
    ? data
    : fileModules(promo).map((m) => ({
        id: m.id, name: m.name, semester: m.semester, icon: m.icon, tint: m.tint,
      }));
}

/**
 * The subjects of a promo, one entry per subject rather than one per semester.
 *
 * A student says "anatomy", not "anatomy S1 and anatomy S2": ANATOMIE and
 * ANATOMIE S2 are two rows of one subject, and الرئيسية drew them as two
 * banners with the same drawing on both. Here they are one, carrying the
 * semesters they are made of; the subject screen is where S1 and S2 part.
 */
export async function subjectRail(promo) {
  const rows = await subjectsOf(promo);
  const by = new Map();

  for (const m of rows) {
    const key = subjectKey(m.name);
    const group = by.get(key) || {
      key, name: subjectName(m.name), icon: m.icon, tint: m.tint, parts: [],
    };
    group.parts.push({ id: m.id, semester: m.semester });
    by.set(key, group);
  }

  for (const g of by.values()) {
    g.parts.sort((a, b) => String(a.semester).localeCompare(String(b.semester)));
    g.id = g.parts[0].id;          // where the banner leads: the earlier semester
  }
  return [...by.values()];
}

/**
 * The same subject's other semesters, for the switch on its screen.
 *
 * Returns every row of the subject including the one asked about, so a
 * subject taught in one semester only has a list of one and draws no switch.
 */
export async function semestersOf(m) {
  if (!m?.promo) return [{ id: m.id, semester: m.semester }];
  const sb = await supabaseServer();
  const { data } = await sb.from('modules')
    .select('id, name, semester').eq('promo', m.promo);

  const key = subjectKey(m.name);
  const mine = (data || []).filter((x) => subjectKey(x.name) === key);
  if (!mine.length) return [{ id: m.id, semester: m.semester }];
  return mine
    .map((x) => ({ id: x.id, semester: x.semester }))
    .sort((a, b) => String(a.semester).localeCompare(String(b.semester)));
}

/**
 * What students wrote, per subject — الملخصات and nothing else.
 *
 * Also a narrow read on purpose: the résumés are a tenth of the archive.
 */
export async function notesOf(promo) {
  const sb = await supabaseServer();
  const subjects = await subjectsOf(promo);
  if (!subjects.length) return { subjects, sections: new Map() };

  const { data } = await sb.from('documents')
    .select('id, module, section, title, ext, bytes, drive_id, prof, year')
    .in('module', subjects.map((m) => m.id))
    .eq('where_shown', 'notes').eq('published', true).order('position');

  const sections = new Map();
  for (const d of data || []) {
    const list = sections.get(d.module) || [];
    list.push(asItem(d));
    sections.set(d.module, list);
  }
  return { subjects, sections };
}

/**
 * How much each subject holds — lectures, and everything openable.
 *
 * The archive prints both under every subject, and neither is worth loading a
 * whole catalogue for: one column, one round trip, counted here.
 */
export async function moduleCounts() {
  const sb = await supabaseServer();

  // Read a page at a time. Supabase answers at most `db-max-rows` — a
  // thousand by default — and says nothing about having stopped: a normal 200
  // with a short body. `.limit(20000)` does not raise that ceiling, so once
  // the catalogue passed a thousand files this quietly counted a prefix of
  // it. Subjects the app does not ship a copy of — a year catalogued in the
  // panel — fell off the end and counted zero, and الأرشيف will not open a
  // subject it believes is empty. The files were always there.
  // Asking for a thousand and being handed three hundred does not mean there
  // were three hundred: it can equally be the server's ceiling. So this walks
  // forward by however many rows actually came back, and stops on a page with
  // none — the only answer that means the end, whatever the ceiling is.
  const PAGE = 1000;
  const rows = [];
  let error = null;
  for (let from = 0, turn = 0; turn < 500; turn += 1) {
    const page = await sb.from('documents')
      .select('module, section, parent')
      .eq('published', true)
      .order('id')
      .range(from, from + PAGE - 1);
    if (page.error) { error = page.error; break; }

    const got = page.data || [];
    if (!got.length) break;
    rows.push(...got);
    from += got.length;
  }

  const data = rows;
  const counts = new Map();
  for (const d of data || []) {
    const at = counts.get(d.module) || { lectures: 0, files: 0 };
    at.files += 1;
    if (d.section === 'lecture' && !d.parent) at.lectures += 1;
    counts.set(d.module, at);
  }

  // A subject the database has no files for counts from the file instead —
  // per subject, not only when the whole table is empty. A year catalogued
  // after the first migration sits in exactly that state until somebody opens
  // the panel, and "لا ملفات بعد" under a subject that has thirty of them is
  // a lie the archive should not tell.
  for (const m of MODULES) {
    if (counts.get(m.id)?.files) continue;
    counts.set(m.id, {
      lectures: (m.chapters || []).reduce((n, c) => n + c.lectures.length, 0),
      files: (m.chapters || []).reduce(
        (n, c) => n + c.lectures.reduce((k, l) => k + 1 + (l.versions?.length || 0), 0), 0)
        + (m.sections || []).reduce((n, s) => n + s.items.length, 0),
    });
  }
  return { counts, error: error ? error.message : null };
}

/** One subject, whole. */
export async function moduleOf(id) {
  const sb = await supabaseServer();
  const { data: m } = await sb.from('modules')
    .select('id, promo, semester, name, icon, tint, professors, position')
    .eq('id', id).maybeSingle();

  if (!m) return MODULES.find((x) => x.id === id) || null;

  const [{ data: chapters }, { data: documents }] = await Promise.all([
    sb.from('chapters').select('id, module, title, subtitle, position')
      .eq('module', id).order('position'),
    sb.from('documents')
      .select('id, module, chapter, where_shown, section, n, title, prof, year, ext, bytes, drive_id, pages, parent, position')
      .eq('module', id).eq('published', true).order('position'),
  ]);

  const [built] = assemble([m], chapters || [], documents || []);
  if (hasFiles(built)) return built;
  return MODULES.find((x) => x.id === id) || built;
}

/** The years, from the database, falling back to the six we started with. */
export async function promosOf() {
  const sb = await supabaseServer();
  const { data, error } = await sb.from('promos')
    .select('id, name, label, badge, indexed, position').order('position');
  if (error) return { promos: FILE_PROMOS, source: 'file', error: error.message };
  return data?.length
    ? { promos: data, source: 'db', error: null }
    : { promos: FILE_PROMOS, source: 'file', error: null };
}

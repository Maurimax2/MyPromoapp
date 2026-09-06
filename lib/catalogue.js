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
import { MODULES, PROMOS as FILE_PROMOS } from '@/lib/data';
import { sectionMeta } from '@/lib/sections';

const mbOf = (bytes) => (bytes ? (bytes / 1048576).toFixed(1) : null);

/** One document row, as a lecture or a section item. */
const asItem = (d) => ({
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
      if (ch) ch.lectures.push(item);
      else m.chapters.push({ id: null, title: m.name, subtitle: null, lectures: [item] });
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
  const { data } = await sb.from('modules')
    .select('id, promo, semester, name, icon, tint').order('position');

  if (!data?.length) {
    return MODULES.map((m) => ({
      id: m.id, promo: m.promo, semester: m.semester,
      name: m.name, icon: m.icon, tint: m.tint,
    }));
  }

  // A year the database does not carry yet still comes from the file.
  const known = new Set(data.map((m) => m.promo));
  const extra = MODULES.filter((m) => !known.has(m.promo)).map((m) => ({
    id: m.id, promo: m.promo, semester: m.semester,
    name: m.name, icon: m.icon, tint: m.tint,
  }));
  return [...data, ...extra];
}

/**
 * How much each subject holds — lectures, and everything openable.
 *
 * The archive prints both under every subject, and neither is worth loading a
 * whole catalogue for: one column, one round trip, counted here.
 */
export async function moduleCounts() {
  const sb = await supabaseServer();
  const { data } = await sb.from('documents')
    .select('module, section, parent').eq('published', true).limit(20000);

  const counts = new Map();
  for (const d of data || []) {
    const at = counts.get(d.module) || { lectures: 0, files: 0 };
    at.files += 1;
    if (d.section === 'lecture' && !d.parent) at.lectures += 1;
    counts.set(d.module, at);
  }

  // Before the migration the numbers come from the file, so the archive does
  // not read as empty while the content is still on its way in.
  if (!counts.size) {
    for (const m of MODULES) {
      counts.set(m.id, {
        lectures: (m.chapters || []).reduce((n, c) => n + c.lectures.length, 0),
        files: (m.chapters || []).reduce(
          (n, c) => n + c.lectures.reduce((k, l) => k + 1 + (l.versions?.length || 0), 0), 0)
          + (m.sections || []).reduce((n, s) => n + s.items.length, 0),
      });
    }
  }
  return counts;
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
  const { data } = await sb.from('promos')
    .select('id, name, label, badge, indexed, position').order('position');
  return data?.length ? data : FILE_PROMOS;
}

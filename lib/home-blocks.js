// What الرئيسية is made of.
//
// The screen was a fixed run of sections in JSX: composer, tools, subjects,
// feed, in that order, for ever. Which meant every question about the layout —
// four tools or six, the row at the top or the bottom, banners before the feed
// or after — was a question for whoever could deploy, answered one at a time,
// days apart.
//
// So the order is data. This file says which blocks exist and what each one
// can be adjusted by; the database says which are on and in what order; the
// panel writes that row. Nobody waits for a deploy to move a section.

/**
 * Every block الرئيسية can be built from.
 *
 * `name` and `about` are what the panel shows — written for somebody arranging
 * a screen, not for somebody reading the code.
 */
export const BLOCKS = [
  {
    id: 'due',
    name: 'المراجعة المستحقّة',
    about: 'شريط بعدد الأسئلة التي حان وقت مراجعتها. يختفي وحده حين لا شيء مستحقّ.',
  },
  {
    id: 'tools',
    name: 'صفّ الأدوات',
    about: 'الأدوات الحيّة في صفّ واحد، وآخرها «الكل».',
    options: [
      { id: 'count', name: 'كم أداة في الصف', values: [3, 4, 5, 6], fallback: 4 },
      { id: 'style', name: 'الشكل', values: ['هادئ', 'ملوّن'], fallback: 'هادئ' },
    ],
  },
  {
    id: 'composer',
    name: 'المحرِّر',
    about: 'المربّع الذي يكتب فيه الطالب منشورًا.',
  },
  {
    id: 'subjects',
    name: 'موادك',
    about: 'بانرات المواد، واحدًا واحدًا والتالي يطلّ.',
  },
  {
    id: 'feed',
    name: 'منشورات دفعتك',
    about: 'ما نشره زملاؤك.',
  },
];

const byId = new Map(BLOCKS.map((b) => [b.id, b]));

/**
 * How الرئيسية looks before anybody has arranged it.
 *
 * This is «أ» — subjects first, one quiet row of tools, the feed underneath —
 * because that is what was chosen. It is only a starting point: the whole
 * purpose of this file is that it can be rearranged without touching it.
 */
export const DEFAULT_HOME = [
  { id: 'due',       on: true },
  { id: 'tools',     on: true, count: 4, style: 'هادئ' },
  { id: 'subjects',  on: true },
  { id: 'composer',  on: true },
  { id: 'feed',      on: true },
];

/**
 * A stored arrangement, made safe to render.
 *
 * A row written months ago can name a block that no longer exists, and a block
 * added since will be missing from it. Neither should empty the screen: the
 * unknown ones are dropped, the new ones are added at the end, switched off,
 * so they show up in the panel waiting to be placed rather than appearing on
 * everybody's home screen unannounced.
 */
export function readLayout(stored) {
  const rows = Array.isArray(stored) && stored.length ? stored : DEFAULT_HOME;

  const known = rows
    .filter((r) => r && byId.has(r.id))
    .map((r) => ({ ...defaultsFor(r.id), ...r, on: r.on !== false }));

  const seen = new Set(known.map((r) => r.id));
  const fresh = BLOCKS
    .filter((b) => !seen.has(b.id))
    .map((b) => ({ ...defaultsFor(b.id), on: false }));

  return [...known, ...fresh];
}

function defaultsFor(id) {
  const block = byId.get(id);
  const out = { id, on: true };
  for (const opt of block?.options || []) out[opt.id] = opt.fallback;
  return out;
}

/** Only what a block understands, so a stray key cannot reach the screen. */
export function cleanLayout(rows) {
  if (!Array.isArray(rows)) return null;
  const out = [];
  const seen = new Set();
  for (const row of rows) {
    const block = byId.get(row?.id);
    if (!block || seen.has(row.id)) continue;
    seen.add(row.id);
    const kept = { id: row.id, on: row.on !== false };
    for (const opt of block.options || []) {
      kept[opt.id] = opt.values.includes(row[opt.id]) ? row[opt.id] : opt.fallback;
    }
    out.push(kept);
  }
  return out.length ? out : null;
}

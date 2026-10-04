// The faculty's semester plannings (one PDF per year) → lib/timetable-data.json.
//
//   node scripts/build-timetable.mjs "C:/Users/me/Desktop/Planning"
//
// The PDFs are tables whose cells run over several lines and are centred, so
// reading them as a column of text puts a title on the row above or below
// its own. The row borders are found on the rendered page instead, and each
// piece of text is put in the row it sits in. Dates, days and times are told
// from the text by what they look like, because two of the files lay their
// columns out slightly differently from the rest.
//
// One group per file name — «PCEM1-PCED1-PCEP1» is one file for three promos —
// and lib/timetable.js says which promo reads which. Output is compact on
// purpose: ~200 sessions a group, read on the server, never sent whole.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = process.argv[2];
if (!dir) { console.error('usage: node scripts/build-timetable.mjs <folder of planning PDFs>'); process.exit(1); }

const lib = (p) => import(pathToFileURL(path.join(root, 'node_modules', p)).href);
const { createCanvas } = await lib('@napi-rs/canvas/index.js');
const pdfjs = await lib('pdfjs-dist/legacy/build/pdf.mjs');

const SC = 3;
const DAYS = /^(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche)$/i;
const DATE = /^(\d\d)\/(\d\d)\/(\d{4})$/;
const HOUR = /^\d{1,2}h(\d{2})?$/;

const clock = (s) => {
  const m = /^(\d{1,2})h(\d{2})?$/i.exec(s || '');
  return m ? `${m[1].padStart(2, '0')}:${m[2] || '00'}` : '';
};

// Words the PDF writer split in two text runs, joined where the gap is no
// wider than the letters' own spacing.
function line(items) {
  const rows = [];
  for (const i of [...items].sort((a, b) => b.y - a.y || a.x - b.x)) {
    const last = rows.at(-1);
    if (last && Math.abs(last.y - i.y) < 3) last.items.push(i);
    else rows.push({ y: i.y, items: [i] });
  }
  return rows.map((r) => r.items.sort((a, b) => a.x - b.x).reduce((out, i, k, all) => {
    if (!k) return i.s;
    const p = all[k - 1];
    const gap = i.x - (p.x + p.w);
    return out + (gap < 0.9 && !/\s$/.test(out) && !/^\s/.test(i.s) ? '' : ' ') + i.s;
  }, '')).join(' ').replace(/\s+/g, ' ').trim();
}

const tidy = (s) => s
  .replace(/^(.{6,}?)\s+\1$/, '$1')
  .replace(/\bSystems Nerveux\b/g, 'Système nerveux')
  .replace(/([a-zà-ÿ]) - ([a-zà-ÿ])/g, '$1-$2')
  .replace(/\s+([,;:.])/g, '$1')
  .replace(/\bPharmlacie\b/g, 'Pharmacie')
  .replace(/\bgalenique\b/gi, 'galénique')
  .replace(/\bmembers\b/g, 'membres')
  .replace(/\bFête Independence\b/i, 'Fête de l’indépendance')
  .replace(/\s+/g, ' ').trim();

const out = {};
for (const f of fs.readdirSync(dir).filter((x) => /\.pdf$/i.test(x)).sort()) {
  const key = f.replace(/^Programme Cours /i, '').replace(/ 2026-2027-S1\.pdf$/i, '').toLowerCase();
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(path.join(dir, f))), useSystemFonts: true, isEvalSupported: false,
  }).promise;

  const rows = [];
  let X = null;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const tc = await page.getTextContent();
    const its = tc.items.filter((i) => i.str.trim())
      .map((i) => ({ s: i.str, x: i.transform[4], y: i.transform[5], w: i.width }));
    const hdr = its.find((i) => i.s.trim() === 'Jour');
    if (hdr) {
      const at = (re) => its.find((i) => re.test(i.s.trim()) && Math.abs(i.y - hdr.y) < 8)?.x;
      X = { mod: at(/^Module$/), tit: at(/^Intitul/), ens: at(/^ENSG$/) };
    }
    if (!X) continue;

    // The horizontal borders, found on the rendered page.
    const vp = page.getViewport({ scale: SC });
    const cv = createCanvas(vp.width, vp.height);
    const g = cv.getContext('2d');
    await page.render({ canvasContext: g, viewport: vp, canvas: cv }).promise;
    const { width: W, height: H } = cv;
    const px = g.getImageData(0, 0, W, H).data;
    const ruled = [];
    for (let y = 0; y < H; y++) {
      let dark = 0; let n = 0;
      for (let x = Math.floor(W * 0.1); x < W * 0.9; x += 2) {
        n++;
        const k = (y * W + x) * 4;
        if (px[k] < 150 && px[k + 1] < 150 && px[k + 2] < 150) dark++;
      }
      if (dark / n > 0.55) ruled.push(y);
    }
    const borders = [];
    for (const y of ruled) if (!borders.length || y - borders.at(-1) > 4) borders.push(y);
    const ys = borders.map((py) => vp.height / SC - py / SC);       // top → bottom

    const top = hdr ? hdr.y : Infinity;
    const body = its.filter((i) => i.y < top - 2 || (!hdr && true));
    for (let k = 0; k + 1 < ys.length; k++) {
      if (hdr && ys[k + 1] > top - 2) continue;                      // the header row and above
      const cell = body.filter((i) => i.y < ys[k] && i.y > ys[k + 1]);
      if (!cell.length) continue;
      // A lecture of two slots has one title cell across both rows, so no
      // border between them: one band, two dates. Each slot is its own
      // session sharing what the merged cell says.
      const dates = cell.filter((i) => DATE.test(i.s.trim()) && i.x < X.mod - 20).sort((a, b) => b.y - a.y);
      const cuts = dates.map((d, n) => (n + 1 < dates.length ? (d.y + dates[n + 1].y) / 2 : -Infinity));
      const parts = dates.length > 1
        ? dates.map((d, n) => ({ from: n ? cuts[n - 1] : Infinity, to: cuts[n] }))
        : [{ from: Infinity, to: -Infinity }];
      const make = (items) => {
        const r = { date: '', times: [], mod: [], tit: [], ens: [] };
        for (const i of items) {
          const s = i.s.trim();
          if (DAYS.test(s) && i.x < X.mod - 20) continue;
          else if (DATE.test(s) && i.x < X.mod - 20) r.date = s;
          else if (HOUR.test(s) && i.x < X.mod - 4) r.times.push(i);
          else if (i.x < X.tit - 4) r.mod.push(i);
          else if (i.x < X.ens - 4) r.tit.push(i);
          else r.ens.push(i);
        }
        return r;
      };
      const whole = make(cell);
      for (const part of parts) {
        const r = make(cell.filter((i) => i.y < part.from && i.y >= part.to));
        if (!r.date) continue;
        // What a merged cell says it says for every slot it spans.
        if (dates.length > 1) for (const f of ['mod', 'tit', 'ens']) r[f] = whole[f];
        r.times.sort((a, b) => a.x - b.x);
        rows.push({
          date: r.date,
          start: clock(r.times[0]?.s.trim()), end: clock(r.times[1]?.s.trim()),
          module: tidy(line(r.mod)), title: tidy(line(r.tit)), teacher: tidy(line(r.ens)),
        });
      }
    }
  }

  const sessions = [];
  for (const r of rows) {
    const [, d, m, y] = DATE.exec(r.date);
    let { start, end, module, title } = r;
    // «08h30-14h TP» — a whole-morning practical whose hours sit in the Module
    // column because the row has no HD / HF.
    if (!start) {
      const t = /(\d{1,2})h(\d{2})?\s*-\s*(\d{1,2})h(\d{2})?\s*(.*)/i.exec(module);
      if (!t) { if (process.env.DEBUG) console.log('  skipped', key, r.date, JSON.stringify(r)); continue; }
      start = clock(`${t[1]}h${t[2] || ''}`); end = clock(`${t[3]}h${t[4] || ''}`);
      module = /exam/i.test(t[5]) ? 'Examen' : (t[5] || 'TP').trim();
    }
    if (!module && !title) { if (process.env.DEBUG) console.log('  skipped', key, r.date, start, end); continue; }
    let kind = 'course';
    if (/^r[eé]vision$/i.test(module)) kind = 'revision';
    else if (/^vacances$/i.test(module) || /^fête/i.test(module)) kind = 'break';
    else if (/^examen/i.test(module)) kind = 'exam';
    else if (/(^|[\s-])TP\d?\b/.test(`${module} ${title}`) || /^TP\b/.test(module)) kind = 'tp';
    else if (/\bTD\d?\b/.test(`${module} ${title}`)) kind = 'td';
    sessions.push([`${y}-${m}-${d}`, start, end, kind, module, title, r.teacher]);
  }
  // A teacher's name that ran on into the next row: the second slot of a
  // lecture with only «Idriss» in it. It continues the row above.
  for (let n = 1; n < sessions.length; n++) {
    const [prev, cur] = [sessions[n - 1], sessions[n]];
    if (cur[0] !== prev[0] || cur[4] !== prev[4] || cur[5] || !prev[5]) continue;
    cur[5] = prev[5];
    if (cur[6] && !/^(Pr|Dr|Inge)\b/.test(cur[6])) prev[6] = `${prev[6]} ${cur[6]}`.trim();
    cur[6] = prev[6];
  }
  for (const s of sessions) s[6] = s[6].replace(/(\S)\s+(Pr\.?|Dr\.?|Inge\.?)\s/g, '$1 · $2 ');

  const once = new Set();
  for (let n = sessions.length - 1; n >= 0; n--) {
    const id = sessions[n].join('|');
    if (once.has(id)) sessions.splice(n, 1); else once.add(id);
  }
  sessions.sort((a, b) => (a[0] + a[1]).localeCompare(b[0] + b[1]));
  out[key] = sessions;
  console.log(key.padEnd(20), sessions.length, 'sessions', sessions[0]?.[0], '→', sessions.at(-1)?.[0]);
}

const file = path.join(root, 'lib', 'timetable-data.json');
fs.writeFileSync(file, JSON.stringify({ semester: 'S1 2026-2027', groups: out }));
console.log('wrote', file, `${(fs.statSync(file).size / 1024).toFixed(0)} KB`);

// The pictures on the Atlas tab: every lesson rendered by the app itself.
//
//   npm run mock &                     (a signed-in session to look through)
//   next build && next start -p 3000   (against the mock — see CLAUDE.md)
//   node scripts/lesson-thumbs.mjs [--only id,id] [--base http://127.0.0.1:3000]
//
// Opens each lesson in a headless browser with the page made transparent and
// the controls hidden, waits for the systems to arrive, takes the canvas, trims
// the empty space round the model and writes public/anatomy/thumbs/<id>.webp.
// A lesson's card then shows that lesson — the vessels of the neck, not one
// skull standing in for twenty screens.
//
// Needs playwright-core and an installed Edge or Chrome (EDGE= to point at one).

import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { chromium } from 'playwright-core';
import { LESSONS } from '../lib/anatomy/lessons.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../public/anatomy/thumbs');
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const BASE = arg('base', 'http://127.0.0.1:3000');
const ONLY = arg('only', '') ? new Set(arg('only', '').split(',')) : null;
const BROWSER = process.env.EDGE || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const shots = [{ id: 'corps', path: '/anatomie/corps' }];
for (const p of LESSONS) {
  for (const s of p.semesters) {
    for (const c of s.chapters) {
      for (const l of c.lessons) {
        if (!l.id) continue;
        shots.push({ id: l.id, path: `/anatomie/${p.promo.toLowerCase()}/${s.id}/${l.id}` });
      }
    }
  }
}

const HIDE = `
  html, body, body * { background: transparent !important; }
  .m3d-top, .bd-dock, .bd-credit, .bd-tip, .bd-busy, .bd-regions, .m3d-acts, .m3d-name, .m3d-credit,
  .m3d::before, .bottom-nav, nav { display: none !important; }
`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: BROWSER, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 420, height: 520 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => { try { localStorage.setItem('mypromo.welcome', '1'); } catch { /* none */ } });
const page = await ctx.newPage();

// Signed in, as the mock's owner.
await page.goto(`${BASE}/login`, { waitUntil: 'domcontentloaded' });
await page.locator('input[type=password]').waitFor({ timeout: 60000 });
await page.locator('input[type=email]').fill('owner@unem.mr');
await page.locator('input[type=password]').fill('x');
await Promise.all([
  page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 60000 }).catch(() => {}),
  page.locator('form button.btn.p').click(),
]);

for (const s of shots) {
  if (ONLY && !ONLY.has(s.id)) continue;
  await page.goto(`${BASE}${s.path}`, { waitUntil: 'domcontentloaded' });
  await page.addStyleTag({ content: HIDE });
  // Every system the lesson opens with has arrived when nothing says «loading».
  await page.waitForTimeout(2500);
  await page.waitForFunction(() => !document.querySelector('.bd-busy, .m3d-msg'), null, { timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2500);
  const stage = page.locator('.bd-canvas, .m3d-stage').first();
  const png = await stage.screenshot({ omitBackground: true });
  const trimmed = await sharp(png).trim({ threshold: 1 }).toBuffer().catch(() => png);
  await sharp(trimmed)
    .resize(440, 330, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 78, alphaQuality: 85 })
    .toFile(resolve(OUT, `${s.id}.webp`));
  console.log(`  ${s.id}`);
}

await browser.close();

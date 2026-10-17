// Every screen as an iPhone with a notch draws it, edge to edge.
//
// The iPhone app used to be inset by iOS itself (ios.contentInset "always"),
// which left the page framed by strips above and below — the thing that made
// it read as a website. Edge to edge, the page is under the clock and the home
// bar, and a title that forgot `env(safe-area-inset-top)` sits behind the
// clock. This draws each screen with the insets of an iPhone 17 Pro (the
// browser is told them through the DevTools protocol) and lists whatever
// visible text or button is under either bar.
//
//   npm run mock   &   next build && next start   (Supabase vars → the mock)
//   node scripts/safe-area-audit.mjs            the list
//   SHOTS=1 node scripts/safe-area-audit.mjs    and a picture of each screen

import { chromium } from 'playwright-core';
import fs from 'node:fs';
import os from 'node:os';

const B = 'http://127.0.0.1:3000';
const W = 402, H = 874, TOP = 62, BOTTOM = 34;
const OUT = `${os.tmpdir()}/mypromo-safe-area`;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
if (process.argv.includes('fr')) await ctx.addCookies([{ name: 'mp-lang', value: 'fr', url: B }]);
await ctx.addInitScript(() => { try { localStorage.setItem('mypromo.welcome', '1'); } catch {} });
// Pretend to be the app, so components/StatusBar.js draws its strip and says
// which clock it would ask for (data-clock on <html>). Nothing native answers.
if (process.env.NATIVE) {
  await ctx.addInitScript(() => {
    window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'ios', Plugins: {}, PluginHeaders: [] };
  });
}
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: { top: TOP, bottom: BOTTOM, left: 0, right: 0 } });

await p.goto(`${B}/login`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(2500);
const pw = p.locator('input[type=password]'); await pw.waitFor({ timeout: 60000 });
await p.locator('input[type=email]').fill('owner@unem.mr'); await pw.fill('x');
await Promise.all([p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 60000 }).catch(() => {}), p.locator('form button.btn.p').click()]);
await p.waitForTimeout(2000);

const STATIC = (process.env.PAGES || '/feed,/study,/archive,/notes,/chat,/notifications,/notifications/settings,/points,/quiz,/review,/rooms,/timetable,/saved,/friends,/duel,/duel/new,/qa,/lectures,/inventory,/profile,/anatomie/corps,/anatomie/planches,/anatomie/pcem2/s1,/blocked,/support,/terms,/privacy,/feedback,/delete-account')
  .split(',');
// One of each screen that needs an id, taken from the links the lists print.
const DYNAMIC = [
  [/^\/chat\/[^/]+$/, '/chat'], [/^\/qa\/[^/]+$/, '/qa'], [/^\/archive\/[^/]+$/, '/archive'],
  [/^\/file\/[^/]+$/, '/archive/anatomie'], [/^\/quiz\/[^/]+\/[^/]+$/, '/quiz/anatomie'], [/^\/quiz\/[^/]+$/, '/quiz'],
  [/^\/u\/[^/]+$/, '/feed'], [/^\/duel\/[^/]+$/, '/duel'], [/^\/anatomie\/pcem2\/s1\/[^/]+$/, '/anatomie/pcem2/s1'],
];

const scan = ({ top, bottom, h }) => {
  const out = [];
  const seen = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const tag = el.tagName;
    if (!own && !['BUTTON', 'A', 'IMG', 'svg', 'INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || Number(s.opacity) === 0) continue;
    let hiddenUp = false;
    for (let a = el; a; a = a.parentElement) { const st = getComputedStyle(a); if (st.display === 'none' || Number(st.opacity) === 0) { hiddenUp = true; break; } }
    if (hiddenUp) continue;
    // At the bottom only what stays put matters: a list running on below the
    // fold is not under the home bar, it is just further down.
    let pinned = false;
    for (let a = el; a && !pinned; a = a.parentElement) pinned = ['fixed', 'sticky'].includes(getComputedStyle(a).position);
    const where = r.top < top && r.bottom > 0 ? 'top' : pinned && r.bottom > h - bottom && r.top < h ? 'bottom' : null;
    if (!where) continue;
    // What is really drawn there, not something behind a sheet.
    const x = Math.min(Math.max(r.left + r.width / 2, 1), innerWidth - 1);
    const y = where === 'top' ? Math.max(1, Math.min(r.top + r.height / 2, top - 1)) : Math.min(h - 1, Math.max(r.top + r.height / 2, h - bottom + 1));
    const hit = document.elementFromPoint(x, y);
    if (hit && hit !== el && !el.contains(hit) && !hit.contains(el)) continue;
    const name = `${where} ${tag.toLowerCase()}.${String(el.className?.baseVal ?? el.className).split(' ')[0]} «${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 24)}» y=${Math.round(r.top)}–${Math.round(r.bottom)}`;
    if (!seen.has(name)) { seen.add(name); out.push(name); }
  }
  return out;
};

const visit = async (path) => {
  await p.goto(`${B}${path}`, { waitUntil: 'domcontentloaded', timeout: 180000 }).catch(() => {});
  await p.waitForTimeout(path.startsWith('/anatomie/pcem2/s1/') || path === '/anatomie/corps' ? 9000 : 2500);
  const bad = await p.evaluate(scan, { top: TOP, bottom: BOTTOM, h: H }).catch((e) => [`(scan failed: ${e.message})`]);
  const clock = await p.evaluate(() => document.documentElement.dataset.clock || '').catch(() => '');
  console.log(`${bad.length ? '✗' : '✓'} ${path}${p.url().endsWith(path) ? '' : `  → ${new URL(p.url()).pathname}`}${clock ? `  clock ${clock}` : ''}`);
  for (const b of bad.slice(0, 8)) console.log(`     ${b}`);
  if (process.env.SHOTS) {
    const name = path.replace(/\//g, '_') || '_';
    await p.screenshot({ path: `${OUT}/${name}.png` });
    // And scrolled, for the strip under the clock.
    if (await p.evaluate(() => document.documentElement.scrollHeight > innerHeight + 200)) {
      await p.mouse.wheel(0, 400); await p.waitForTimeout(900);
      await p.screenshot({ path: `${OUT}/${name}-scrolled.png`, clip: { x: 0, y: 0, width: W, height: 200 } });
    }
  }
};

for (const path of STATIC) await visit(path);
for (const [re, from] of DYNAMIC) {
  await p.goto(`${B}${from}`, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await p.waitForTimeout(2000);
  const hrefs = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')));
  const href = hrefs.find((h) => re.test(h.split('?')[0]));
  if (href) await visit(href); else console.log(`? no link like ${re} on ${from}`);
}
console.log(`\npictures: ${OUT}`);
await browser.close();

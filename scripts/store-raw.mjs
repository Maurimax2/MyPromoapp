// The app's screens for the store pictures, at the iPhone 6.9" size
// (440×956 @3 = 1320×2868). Step one of two; scripts/store-frame.mjs is the
// second. See store/README.md.
//
//   npm run mock   &   next build && next start   (Supabase vars → the mock)
//   node scripts/store-raw.mjs        Arabic
//   node scripts/store-raw.mjs fr     French
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import os from 'node:os';

const B = 'http://127.0.0.1:3000';
const FR = process.argv.includes('fr');
const OUT = `${os.tmpdir()}/mypromo-store/raw-${FR ? 'fr' : 'ar'}`;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 440, height: 956 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
if (FR) await ctx.addCookies([{ name: 'mp-lang', value: 'fr', url: B }]);
await ctx.addInitScript(() => {
  try {
    localStorage.setItem('mypromo.welcome', '1');
    // Five weeks of study days, so أنا and the streak look lived in.
    const days = {};
    const pad = (n) => String(n).padStart(2, '0');
    for (let i = 0; i < 34; i += 1) {
      if (i > 6 && (i * 7) % 5 === 0) continue;
      const d = new Date(Date.now() - i * 86400000);
      days[`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`] = 1 + ((i * 13) % 11);
    }
    localStorage.setItem('mypromo.days', JSON.stringify(days));
  } catch {}
  // The dev server's «N» badge is not part of the app.
  document.addEventListener('DOMContentLoaded', () => {
    const s = document.createElement('style');
    s.textContent = 'nextjs-portal{display:none!important}';
    document.head.appendChild(s);
  });
});
const p = await ctx.newPage();
await p.goto(`${B}/login`, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(3000);
const pw = p.locator('input[type=password]'); await pw.waitFor({ timeout: 60000 });
await p.locator('input[type=email]').fill('owner@unem.mr'); await pw.fill('x');
await Promise.all([p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 60000 }).catch(() => {}), p.locator('form button.btn.p').click()]);
await p.waitForTimeout(2500);

const PAGES = (process.env.SHOTS || '/feed:feed,/study:study,/model/crane:model,/duel:duel,/points:points,/notes:notes,/profile:me')
  .split(',').map((x) => x.split(':'));
for (const [path, name, wait] of PAGES) {
  await p.goto(`${B}${path}`, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await p.waitForTimeout(Number(wait) || 4500);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log('  ', name);
}
// A question being answered, not the list of papers.
if (!process.env.SHOTS || process.env.QUIZ) {
  await p.goto(`${B}/quiz/anatomie`, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await p.waitForTimeout(4000);
  await p.locator('button.btn.p, a.btn.p').first().click();
  await p.waitForTimeout(3500);
  // Ticked, not confirmed: a student mid-question, with no key on show.
  for (const re of [/os pair/, /calvaria/, /suture coronale/, /sillon bulbo/, /méat acoustique/, /stylo-mastoïdien/, /artère subclavière/, /foramens transversaires/, /pénètre dans le crâne par le foramen magnum/, /artère basilaire/]) {
    await p.getByRole('button', { name: re }).first().click().catch(() => {});
    await p.waitForTimeout(300);
  }
  await p.waitForTimeout(800);
  await p.screenshot({ path: `${OUT}/quiz-q.png` });
  console.log('   quiz-q');
}
await browser.close();

// الرئيسية and the rest, in زيتون — shot from the running app.
//
//   node scripts/mock-supabase.mjs   &   npm run dev   &   node scripts/shoot-olive-app.mjs
//
// Signing in the way check-duel-flow.mjs does, for the same reason: a
// server-rendered button swallows the first tap while React is still catching
// up, so the door is knocked on twice.
//
// With --resume it also plants a «تابع من حيث توقّفت» record before the first
// load. That record is normally written by the reader as it draws a lecture,
// and the mock's documents carry made-up Drive ids, so no real PDF ever
// arrives to draw. The planted one is for the picture only — it proves the
// card renders, not that the reader fills it.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const B = 'http://127.0.0.1:3000';
const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad';
const OUT = `${SP}/olive-app`;
const PLANT = process.argv.includes('--resume');

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

if (PLANT) {
  const thumb = fs.readFileSync(`${SP}/crane.b64`, 'utf8').trim();
  await ctx.addInitScript((t) => {
    try {
      localStorage.setItem('mypromo.resume', JSON.stringify({
        fid: '1MockDriveIdAAAAAAAAAAAAAAAAAAAAA',
        title: 'Base du crâne',
        subject: 'ANATOMIE',
        page: 14, pages: 38, thumb: t, at: Date.now(),
      }));
    } catch {}
  }, thumb);
}

const p = await ctx.newPage();
await p.goto(`${B}/login`, { waitUntil: 'domcontentloaded', timeout: 120000 });
const door = p.getByRole('button', { name: 'ادخل بكلمة السر' });
await door.waitFor({ timeout: 120000 });
const pw = p.locator('input[type=password]');
await door.click();
try { await pw.waitFor({ timeout: 5000 }); }
catch { await door.click(); await pw.waitFor({ timeout: 20000 }); }
await p.locator('input[type=email]').fill('owner@unem.mr');
await pw.fill('x');
await Promise.all([
  p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 }).catch(() => {}),
  p.locator('form button.btn.p').click(),
]);

const PAGES = process.env.SHOTS
  ? process.env.SHOTS.split(',').map((x) => { const [a, b] = x.split(':'); return [a, b]; })
  : [['/feed', 'home'], ['/duel', 'duel'], ['/profile', 'me']];
for (const [path, name] of PAGES) {
  await p.goto(`${B}${path}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await p.waitForTimeout(2600);
  await p.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`  ${name}`);
}

// The sheet the row of faces opens — the feature it exists for.
await p.goto(`${B}/feed`, { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(2000);
const row = p.locator('.here');
if (await row.count()) {
  await row.click();
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${OUT}/rooms.png` });
  console.log('  rooms');
}

await browser.close();

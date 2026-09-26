// Three palettes, on the app's own screens.
//
// A colour is not a swatch — it is a header, a chip, a button on a card at
// half past one in the morning. So each of these is injected over the running
// app and photographed on the screens students actually look at.
//
//   node scripts/try-palettes.mjs
//
// It changes nothing in the repository. The overrides live here and die with
// the browser.

import { chromium } from 'playwright-core';

const B = 'http://127.0.0.1:3000';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

// The mark is two figures; in every palette one takes the brand colour and
// the other the accent, so the logo moves with the identity.
// الرئيسية's head is a gradient written out in full rather than in tokens, so
// a palette that only redefines the tokens leaves the one coloured surface in
// the app untouched. Worth knowing: whichever palette wins, that rule has to
// be changed by hand.
const head = (a, b, c) => `
  .hero { background: linear-gradient(150deg, ${a} 0%, ${b} 62%, ${c} 100%) !important; }
  .pl-purple { background: linear-gradient(165deg, ${b}, ${a} 55%, ${a}) !important; }
`;

const logo = (one, two) => `
  .head svg path:nth-of-type(1), .pl-mark svg path:nth-of-type(1) { stroke: ${one} !important; }
  .head svg path:nth-of-type(2), .pl-mark svg path:nth-of-type(2) { stroke: ${two} !important; }
  .head svg circle:nth-of-type(1) { fill: ${one} !important; }
  .head svg circle:nth-of-type(2) { fill: ${two} !important; }
`;

const PALETTES = {
  // Warm sand and a deep pine green, with clay for attention. The most
  // editorial of the three: no cold grey anywhere.
  sand: {
    title: 'رمل وحبر — Sand & Ink',
    css: `:root{
      --purple:#1F4034; --purple-light:#356B57; --purple-pale:#E4EAE2;
      --orange:#B4552C; --orange-light:#D98B60; --orange-pale:#F6EAE0;
      --bg:#F4F0E8; --surface:#FFFDF9;
      --ink:#17140F; --ink-2:#4B443A; --ink-3:#877E70;
      --line:#E5DED1; --line-soft:#F0EBE0;
      --shadow:0 1px 2px rgba(23,20,15,.04), 0 4px 16px rgba(23,20,15,.07);
    } ${logo('#1F4034', '#B4552C')} ${head('#1F4034', '#2A5647', '#356B57')}`,
  },
  // Bone, near-black surfaces and a single gold. The closest to a podcast
  // studio's poster: almost monochrome, one warm metal.
  ink: {
    title: 'حبر وذهب — Ink & Gold',
    css: `:root{
      --purple:#211E24; --purple-light:#413B48; --purple-pale:#EAE7E1;
      --orange:#B4893C; --orange-light:#D9B77B; --orange-pale:#F6EFE1;
      --bg:#F2F0EA; --surface:#FFFFFF;
      --ink:#141318; --ink-2:#474450; --ink-3:#83808C;
      --line:#E3E0D8; --line-soft:#EFEDE7;
      --shadow:0 1px 2px rgba(20,19,24,.05), 0 4px 16px rgba(20,19,24,.07);
    } ${logo('#211E24', '#B4893C')} ${head('#1A181D', '#2B2731', '#413B48')}`,
  },
  // Sand again, but the brand colour is the clay and the accent a deep
  // green — warmer, and further from anything that looks like software.
  clay: {
    title: 'طين وزيتون — Clay & Olive',
    css: `:root{
      --purple:#8C3F24; --purple-light:#B4643F; --purple-pale:#F3E7DF;
      --orange:#4F5D3A; --orange-light:#8A9668; --orange-pale:#EAEDE1;
      --bg:#F5F1E9; --surface:#FFFCF7;
      --ink:#1B140F; --ink-2:#4F4338; --ink-3:#8A7E70;
      --line:#E7DFD2; --line-soft:#F1EBE1;
      --shadow:0 1px 2px rgba(27,20,15,.05), 0 4px 16px rgba(27,20,15,.07);
    } ${logo('#8C3F24', '#4F5D3A')} ${head('#7A3520', '#8C3F24', '#B4643F')}`,
  },
};

const browser = await chromium.launch({ executablePath: EDGE });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
});
const p = await ctx.newPage();

await p.goto(`${B}/login`, { waitUntil: 'domcontentloaded', timeout: 90000 });
const door = p.getByRole('button', { name: 'ادخل بكلمة السر' });
await door.waitFor({ timeout: 90000 });
await p.waitForTimeout(1200);
await door.click();
await p.locator('input[type=password]').waitFor({ timeout: 20000 });
await p.locator('input[type=email]').fill('owner@unem.mr');
await p.locator('input[type=password]').fill('x');
await Promise.all([
  p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 }).catch(() => {}),
  p.locator('form button.btn.p').click(),
]);

const SCREENS = [['/feed', 'feed'], ['/archive', 'archive'], ['/duel', 'duel']];

// The palette as it ships today, for honest comparison.
for (const [where, name] of [...SCREENS]) {
  await p.goto(B + where, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2600);
  await p.addStyleTag({ content: 'nextjs-portal{display:none!important}' });
  await p.screenshot({ path: `palettes/now-${name}.png` });
}
console.log('  photographed: as it is today');

for (const [key, { title, css }] of Object.entries(PALETTES)) {
  for (const [where, name] of SCREENS) {
    await p.goto(B + where, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(2200);
    await p.addStyleTag({ content: `nextjs-portal{display:none!important} ${css}` });
    await p.waitForTimeout(500);
    await p.screenshot({ path: `palettes/${key}-${name}.png` });
  }
  console.log(`  photographed: ${title}`);
}

await browser.close();

// The زيتون logo set, rendered from the vector at the sizes a store and a
// print shop ask for.
//
// The SVG is inlined rather than linked: a page built with setContent has no
// origin, so a file:// image on it is refused and you get a silent blank.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad/olive';
const svg = (f) => fs.readFileSync(`${SP}/logo/${f}`, 'utf8')
  .replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });

async function shoot(file, px, out, bg) {
  const ctx = await b.newContext({ viewport: { width: px, height: px }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.setContent(`<body style="margin:0;background:${bg || 'transparent'}">
    <div style="width:${px}px;height:${px}px">${svg(file)}</div></body>`, { waitUntil: 'load' });
  await p.waitForTimeout(250);
  await p.screenshot({ path: `${SP}/logo/${out}`, omitBackground: !bg });
  await ctx.close();
}

for (const [f, name] of [
  ['mypromo-mark.svg', 'mypromo-mark'],
  ['mypromo-mark-white.svg', 'mypromo-mark-white'],
  ['mypromo-mark-ink.svg', 'mypromo-mark-ink'],
  ['mypromo-mark-warm.svg', 'mypromo-mark-warm'],
]) {
  for (const px of [512, 1024]) await shoot(f, px, `${name}-${px}.png`);
  console.log('  ', name);
}
for (const px of [192, 512, 1024]) await shoot('mypromo-icon.svg', px, `mypromo-icon-${px}.png`, '#F3F1E9');
console.log('   icon');

for (const [a, c, out] of [
  ['#17201A', '#2A5B3E', 'mypromo-lockup.png'],
  ['#FFFDF8', '#FFFDF8', 'mypromo-lockup-white.png'],
]) {
  const ctx = await b.newContext({ viewport: { width: 740, height: 186 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.setContent(`<head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@800&display=swap"></head>
    <body style="margin:0;background:transparent">
    <div style="display:inline-flex;align-items:center;gap:24px;padding:26px 30px">
      <svg width="128" height="128" viewBox="0 0 48 48" fill="none">
        <circle cx="12.5" cy="10.5" r="5.2" fill="${a}"/><circle cx="35.5" cy="10.5" r="5.2" fill="${c}"/>
        <path d="M12.5 40V24l11.5 12" stroke="${a}" stroke-width="8.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M35.5 40V24L24 36" stroke="${c}" stroke-width="8.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span style="font-family:Tajawal,sans-serif;font-weight:800;font-size:92px;
                   letter-spacing:-2px;color:${a};line-height:1;white-space:nowrap">MyPromo</span>
    </div></body>`, { waitUntil: 'load' });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `${SP}/logo/${out}`, omitBackground: true });
  await ctx.close();
  console.log('  ', out);
}
await b.close();

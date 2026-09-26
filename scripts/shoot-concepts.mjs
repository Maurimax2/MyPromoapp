import { chromium } from 'playwright-core';
const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad';
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const err = [];
const ctx = await b.newContext({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 2 });
const p = await ctx.newPage();
p.on('pageerror', (e) => err.push(String(e).slice(0, 160)));
// the skeleton the artifact runtime wraps a page in
const body = (await import('node:fs')).readFileSync(`${SP}/social.html`, 'utf8');
await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{color-scheme:light}body{margin:0;font:14px system-ui;background:#fafafa}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(3500);
console.log('lanes:', await p.locator('.lane').count(), '| errors:', err.length ? err : 'none');
console.log('overflow:', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await p.screenshot({ path: `${SP}/social-all.png` });
// one phone at a time, close up
for (const [i, k] of ["promo","hall","ask","anat"].entries()) {
  await p.locator('.lane').nth(i).screenshot({ path: `${SP}/social-${k}.png` });
}
await b.close();

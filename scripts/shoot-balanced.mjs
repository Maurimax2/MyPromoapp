import { chromium } from 'playwright-core';
import fs from 'node:fs';
const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad';
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const err = [];
const p = await (await b.newContext({ viewport: { width: 1200, height: 1120 }, deviceScaleFactor: 2 })).newPage();
p.on('pageerror', (e) => err.push(String(e).slice(0, 160)));
const body = fs.readFileSync(`${SP}/balanced.html`, 'utf8');
await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0}</style></head><body>${body}</body></html>`, { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(3000);
console.log('lanes:', await p.locator('.lane').count(), '| errors:', err.length ? err : 'none',
            '| overflow:', await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth));
await p.screenshot({ path: `${SP}/balanced-all.png` });
// and the sheet the row opens, on the first one
await p.locator('.here').first().click();
await p.waitForTimeout(700);
await p.locator('.lane').first().screenshot({ path: `${SP}/balanced-rooms.png` });
await b.close();

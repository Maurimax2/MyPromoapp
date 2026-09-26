import { chromium } from 'playwright-core';
const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad/redesign';
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true })).newPage();
await p.goto(`file:///${SP}/feed.html`);
await p.waitForTimeout(1500);
await p.screenshot({ path: `${SP}/new.png` });
await b.close();
console.log('shot');

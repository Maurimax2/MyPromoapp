import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
await p.goto('file:///C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad/redesign/feed.html');
await p.waitForTimeout(1200);
console.log(await p.evaluate(() => {
  const wide = [...document.querySelectorAll('*')]
    .filter((e) => e.getBoundingClientRect().width > 392 || e.scrollWidth > 392)
    .map((e) => `${e.tagName}.${e.className} rect=${Math.round(e.getBoundingClientRect().width)} scroll=${e.scrollWidth}`);
  return { doc: document.documentElement.scrollWidth, body: document.body.scrollWidth, wide };
}));
await b.close();

// The iPad store pictures, captured and framed in one go: App Store 13"
// (2064×2752), Arabic and French. The app's screens are taken from the mock at
// the 13" iPad's own size (1032×1376 @2), then set in an iPad on the green
// ground under a headline — the iPhone pictures' layout (store-frame.mjs) in
// the v2 look.
//
//   npm run mock   (or the mypromo-mock preview)  on :3000
//   node scripts/store-ipad.mjs
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const B = 'http://localhost:3000';
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = `${REPO}/store/screenshots`;

const SHOTS = [
  ['/study', 'study', { ar: ['كل ما تحتاجه لسنتك', 'محاضرات، QCM وملخصات، مادة مادة'], fr: ['Toute ton année au même endroit', 'Cours, QCM et résumés, matière par matière'] }],
  ['/archive/anatomie', 'subject', { ar: ['كل مادة بمحاضراتها', 'مرتبة فصلًا فصلًا، مع التشريح ثلاثي الأبعاد'], fr: ['Chaque matière, cours par cours', "Rangée par chapitre, avec l'anatomie en 3D"] }],
  ['/feed', 'feed', { ar: ['دفعتك كلها معك', 'ملخصات وأسئلة من دفعتك ومن كل الدفعات'], fr: ['Toute ta promo avec toi', 'Résumés et questions de ta promo et des autres'] }],
  ['/points', 'points', { ar: ['تحدَّ زملاءك وتصدّر الترتيب', 'ترتيب لدفعتك يبدأ من جديد كل أسبوع'], fr: ['Défie ta promo, grimpe au classement', 'Un classement qui repart chaque semaine'] }],
  ['/profile', 'me', { ar: ['لا تكسر السلسلة', 'أيام الدراسة، المستويات والشارات'], fr: ['Ne casse pas ta série', "Jours d'étude, niveaux et badges"] }],
];

const W = 2064;
const H = 2752;
const SCREEN = { w: 1032, h: 1376 };          // the 13" iPad, in points
const FRAME = { w: 1640, top: 640, bezel: 28, radius: 64 };

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });

async function capture(lang) {
  const ctx = await browser.newContext({ viewport: { width: SCREEN.w, height: SCREEN.h }, deviceScaleFactor: 2, hasTouch: true });
  if (lang === 'fr') await ctx.addCookies([{ name: 'mp-lang', value: 'fr', url: B }]);
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('mypromo.welcome', '1');
      const days = {};
      const pad = (n) => String(n).padStart(2, '0');
      for (let i = 0; i < 34; i += 1) {
        if (i > 6 && (i * 7) % 5 === 0) continue;
        const d = new Date(Date.now() - i * 86400000);
        days[`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`] = 1 + ((i * 13) % 11);
      }
      localStorage.setItem('mypromo.days', JSON.stringify(days));
    } catch {}
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = 'nextjs-portal{display:none!important}';
      document.head.appendChild(s);
    });
  });
  const p = await ctx.newPage();
  p.setDefaultTimeout(150000);
  p.setDefaultNavigationTimeout(150000);
  await p.goto(`${B}/login`, { waitUntil: 'networkidle' });
  await p.fill('input[type=email]', 'owner@unem.mr');
  await p.fill('input[type=password]', 'store-shots');
  await p.press('input[type=password]', 'Enter');
  await p.waitForURL('**/feed');
  const out = {};
  for (const [path, name] of SHOTS) {
    await p.goto(B + path, { waitUntil: 'networkidle' });
    await p.waitForTimeout(3500);   // arrivals and counters settle
    out[name] = (await p.screenshot({ type: 'png' })).toString('base64');
  }
  await ctx.close();
  return out;
}

function page(img, [head, sub], lang) {
  const rtl = lang === 'ar';
  const inner = FRAME.w - FRAME.bezel * 2;
  const screenH = Math.round(inner * (SCREEN.h / SCREEN.w));
  return `<!doctype html><html><head><meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@500;700&display=block" rel="stylesheet"><style>
  *{box-sizing:border-box;margin:0}
  body{width:${W}px;height:${H}px;overflow:hidden;font-family:'Alexandria',sans-serif;color:#fff;position:relative;
    background:radial-gradient(110% 70% at 85% 0%,#1C7457 0%,#0F4A3B 45%,#0A2A24 100%)}
  header{position:absolute;top:220px;left:0;right:0;text-align:center;padding:0 160px}
  h1{font-size:128px;font-weight:700;line-height:1.2}
  p{margin-top:40px;font-size:60px;font-weight:500;line-height:1.4;color:rgba(255,255,255,.78)}
  .pad{position:absolute;left:50%;top:${FRAME.top}px;width:${FRAME.w}px;transform:translateX(-50%);
    border-radius:${FRAME.radius}px;background:#0B1512;padding:${FRAME.bezel}px;
    box-shadow:0 60px 120px rgba(0,0,0,.45),0 0 0 3px rgba(255,255,255,.08) inset}
  .pad img{display:block;width:100%;height:${screenH}px;object-fit:cover;object-position:top;border-radius:${FRAME.radius - FRAME.bezel}px}
  </style></head><body>
  <header dir="${rtl ? 'rtl' : 'ltr'}"><h1>${head}</h1><p>${sub}</p></header>
  <div class="pad"><img src="data:image/png;base64,${img}"></div></body></html>`;
}

for (const lang of ['ar', 'fr']) {
  const raw = await capture(lang);
  const dir = `${OUT}/ipad-${lang}`;
  fs.mkdirSync(dir, { recursive: true });
  const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  let n = 0;
  for (const [, name, text] of SHOTS) {
    n += 1;
    await p.setContent(page(raw[name], text[lang], lang), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: `${dir}/${n}-${name}.png`, type: 'png' });
    console.log(`${dir}/${n}-${name}.png`);
  }
  await p.close();
}
await browser.close();

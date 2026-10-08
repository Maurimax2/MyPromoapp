// Store screenshots: the real app screen in a phone, on the olive ground, with
// a headline. App Store 6.9" (1320×2868) and Google Play (1080×1920), Arabic
// and French. Plus Play's feature graphic (1024×500).
//
//   node scripts/store-frame.mjs      after scripts/store-raw.mjs, both languages
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import os from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SP = `${os.tmpdir()}/mypromo-store`;
const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = `${REPO}/store/screenshots`;
const MARK = fs.readFileSync(`${REPO}/design/brand-olive/logo/mypromo-mark-white.svg`, 'utf8');

const SHOTS = [
  ['study', { ar: ['كل ما تحتاجه لسنتك', 'محاضرات، QCM، ملخصات وتشريح ثلاثي الأبعاد'], fr: ['Toute ton année au même endroit', 'Cours, QCM, résumés et anatomie 3D'] }],
  ['quiz-q', { ar: ['QCM من الامتحانات السابقة', 'مرتّبة حسب المادة والمحاضرة'], fr: ['Les QCM des examens précédents', 'Classés par matière et par cours'] }],
  ['model', { ar: ['التشريح ثلاثي الأبعاد', 'أدِر النموذج، والمس لتعرف الاسم'], fr: ["L'anatomie en 3D", 'Fais tourner, touche pour connaître le nom'] }],
  ['feed', { ar: ['دفعتك كلها معك', 'المحاضرة القادمة، التحديات وما يشاركه زملاؤك'], fr: ['Toute ta promo avec toi', 'Prochain cours, défis et partages de ta promo'] }],
  ['points', { ar: ['تحدَّ زملاءك وتصدّر الترتيب', 'ترتيب لدفعتك يبدأ من جديد كل أسبوع'], fr: ['Défie ta promo, grimpe au classement', 'Un classement qui repart chaque semaine'] }],
  ['me', { ar: ['لا تكسر السلسلة', 'أيام الدراسة، المستويات والشارات'], fr: ['Ne casse pas ta série', "Jours d'étude, niveaux et badges"] }],
  ['notes', { ar: ['ملخصات دفعتك', 'ارفع ملخصك مرة، وتستفيد منه دفعتك كلها'], fr: ['Les résumés de ta promo', 'Partage une fois, toute ta promo en profite'] }],
];

const SIZES = {
  ios: { w: 1320, h: 2868, top: 190, head: 104, sub: 50, gap: 34, phone: 1030, phoneTop: 700, radius: 74, bezel: 16 },
  play: { w: 1080, h: 1920, top: 120, head: 74, sub: 38, gap: 22, phone: 740, phoneTop: 470, radius: 54, bezel: 12 },
};

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@500;700&family=Poppins:wght@800&display=block" rel="stylesheet">';

function page(img, [head, sub], lang, s) {
  const rtl = lang === 'ar';
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{box-sizing:border-box;margin:0}
  html{overflow:hidden}
  body{width:${s.w}px;height:${s.h}px;overflow:hidden;font-family:'IBM Plex Sans Arabic',sans-serif;
    background:radial-gradient(120% 70% at 50% 0%,#3F7A57 0%,#2A5B3E 45%,#1E4430 100%);color:#fff;position:relative}
  .glow{position:absolute;left:0;right:0;bottom:0;height:55%;background:radial-gradient(closest-side,rgba(227,237,229,.18),transparent);}
  header{position:absolute;top:${s.top}px;left:0;right:0;text-align:center;padding:0 ${Math.round(s.w * 0.07)}px}
  h1{font-size:${s.head}px;font-weight:700;line-height:1.22;letter-spacing:${rtl ? 0 : '-0.01em'}}
  p{margin-top:${s.gap}px;font-size:${s.sub}px;font-weight:500;line-height:1.4;color:#CFE3D5}
  .phone{position:absolute;left:50%;top:${s.phoneTop}px;width:${s.phone}px;transform:translateX(-50%);
    border-radius:${s.radius}px;background:#0E1A13;padding:${s.bezel}px;
    box-shadow:0 40px 90px rgba(0,0,0,.38),0 0 0 2px rgba(255,255,255,.08) inset}
  .phone img{display:block;width:100%;border-radius:${s.radius - s.bezel}px}
  </style></head><body><div class="glow"></div>
  <header dir="${rtl ? 'rtl' : 'ltr'}"><h1>${head}</h1><p>${sub}</p></header>
  <div class="phone"><img src="data:image/png;base64,${img}"></div></body></html>`;
}

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const [store, s] of Object.entries(SIZES)) {
  for (const lang of ['ar', 'fr']) {
    const dir = `${OUT}/${store}-${lang}`;
    fs.mkdirSync(dir, { recursive: true });
    const p = await browser.newPage({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
    let n = 0;
    for (const [name, words] of SHOTS) {
      n += 1;
      const img = fs.readFileSync(`${SP}/raw-${lang}/${name}.png`).toString('base64');
      await p.setContent(page(img, words[lang], lang, s), { waitUntil: 'networkidle' });
      await p.evaluate(() => document.fonts.ready);
      await p.screenshot({ path: `${dir}/${n}-${name.replace('-q', '')}.png` });
    }
    await p.close();
    console.log('  ', store, lang, n);
  }
}

// Play's feature graphic: the mark, the name, the line — and the 3D skull,
// which is the one picture that says «medicine» without a word.
const skull = fs.readFileSync(`${SP}/raw-ar/study.png`).toString('base64');
const p = await browser.newPage({ viewport: { width: 1024, height: 500 } });
await p.setContent(`<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
  *{box-sizing:border-box;margin:0}
  body{width:1024px;height:500px;overflow:hidden;font-family:'IBM Plex Sans Arabic',sans-serif;color:#fff;
    background:radial-gradient(90% 120% at 15% 50%,#3F7A57 0%,#2A5B3E 50%,#1E4430 100%);position:relative}
  .left{position:absolute;left:72px;top:50%;transform:translateY(-50%);width:520px}
  .mark{width:92px;height:92px} .mark svg{width:100%;height:100%}
  .name{font-family:Poppins,sans-serif;font-weight:800;font-size:84px;line-height:1;margin-top:22px;letter-spacing:-0.02em}
  .ar{font-size:34px;font-weight:700;margin-top:22px;direction:rtl;text-align:left}
  .fr{font-size:26px;font-weight:500;color:#CFE3D5;margin-top:6px}
  .phone{position:absolute;right:70px;top:46px;width:300px;border-radius:34px;background:#0E1A13;padding:8px;
    box-shadow:0 30px 60px rgba(0,0,0,.4);transform:rotate(4deg)}
  .phone img{display:block;width:100%;border-radius:27px}
</style></head><body>
  <div class="left"><div class="mark">${MARK}</div><div class="name">MyPromo</div>
  <div class="ar">راجع الطب مع دفعتك</div><div class="fr">Révise avec ta promo · FMPOS</div></div>
  <div class="phone"><img src="data:image/png;base64,${skull}"></div>
</body></html>`, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: `${OUT}/play-feature-graphic.png` });
console.log('   feature graphic');
await browser.close();

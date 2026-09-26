// The زيتون brand sheet, and the Arabic type question, rendered as pages.
//
//   node scripts/shoot-olive-sheets.mjs
//
// The mark is inlined from its own SVG rather than linked: a page built with
// setContent has no origin, so a file:// image on it is refused silently.
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const SP = 'C:/Users/hcn/AppData/Local/Temp/claude/c--Users-hcn-Documents-projects/2ab31450-896b-4619-8218-f22d6ae7181c/scratchpad/olive';
const mark = (f, px = 96) => fs.readFileSync(`${SP}/logo/${f}`, 'utf8')
  .replace(/width="\d+" height="\d+"/, `width="${px}" height="${px}"`);

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });

// ----------------------------------------------------------- the brand sheet
{
  const ctx = await browser.newContext({ viewport: { width: 1500, height: 1340 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const sw = (hex, nm, note) => `<div class="sw"><div class="fill" style="background:${hex}"></div>
    <div class="lab"><b>${hex}</b><span>${nm}</span><i>${note}</i></div></div>`;

  const html = `<head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap">
  <style>
    *{box-sizing:border-box;margin:0}
    body{width:1500px;background:#F3F1E9;color:#17201A;font-family:Tajawal,sans-serif;
         padding:64px 72px 56px}
    .top{display:flex;align-items:center;gap:24px;padding-bottom:28px;border-bottom:1px solid #DDDCD4}
    .nm{font-size:42px;font-weight:800;letter-spacing:-1px}
    .tag{font-size:17px;color:#6B6F69;margin-top:2px}
    h2{font-size:13px;font-weight:700;letter-spacing:1.6px;color:#979992;margin:40px 0 16px}
    .row{display:flex;gap:14px}
    .sw{flex:1;border-radius:14px;overflow:hidden;border:1px solid #DDDCD4;background:#FFFDF8}
    .fill{height:106px}
    .lab{padding:12px 14px 14px}
    .lab b{display:block;font-size:14px}
    .lab span{display:block;font-size:12.5px;color:#6B6F69;margin-top:3px}
    .lab i{display:block;font-style:normal;font-size:11px;color:#979992;margin-top:3px;line-height:1.5}
    .marks{display:flex;gap:18px}
    .card{flex:1;border:1px solid #DDDCD4;border-radius:18px;padding:26px;display:flex;
          flex-direction:column;align-items:center;gap:14px;background:#FFFDF8}
    .card em{font-style:normal;font-size:12px;color:#979992}
    .card.dark{background:#17201A;border-color:#17201A}
    .card.dark em{color:rgba(255,255,255,.6)}
    .card.olive{background:#2A5B3E;border-color:#2A5B3E}
    .card.olive em{color:rgba(255,255,255,.72)}
    .card.ivory{background:#F3F1E9}
    .type{display:flex;gap:48px;align-items:flex-end;border:1px solid #DDDCD4;
          border-radius:18px;padding:30px 32px;background:#FFFDF8}
    .rule{margin-top:34px;font-size:14px;color:#6B6F69;line-height:2;direction:rtl}
    .rule b{color:#17201A}
  </style></head><body>
  <div class="top">${mark('mypromo-mark.svg')}
    <div><div class="nm">MyPromo</div>
    <div class="tag" dir="rtl">زيتون · صنعه طلبة الطب… لطلبة الطب · FMPOS</div></div></div>

  <h2>THE MARK</h2>
  <div class="marks">
    <div class="card">${mark('mypromo-mark.svg', 84)}<em dir="rtl">على الورق</em></div>
    <div class="card ivory">${mark('mypromo-mark.svg', 84)}<em dir="rtl">على الأرضية</em></div>
    <div class="card olive">${mark('mypromo-mark-white.svg', 84)}<em dir="rtl">على الزيتوني</em></div>
    <div class="card dark">${mark('mypromo-mark-white.svg', 84)}<em dir="rtl">على الحبر</em></div>
    <div class="card">${mark('mypromo-mark-warm.svg', 84)}<em dir="rtl">الدافئ — للملصقات</em></div>
  </div>

  <h2>BRAND</h2>
  <div class="row">
    ${sw('#2A5B3E', 'Olive', 'العلامة والزرّ الوحيد')}
    ${sw('#3F7A57', 'Olive light', 'حالة الضغط')}
    ${sw('#E3EDE5', 'Olive pale', 'الرقائق والخلفيات')}
    ${sw('#A8502A', 'Clay', 'ما يحتاجك — لا زينة')}
    ${sw('#F2E3DA', 'Clay pale', 'أرضية التنبيه')}
  </div>

  <h2>GROUND &middot; INK &middot; LINES</h2>
  <div class="row">
    ${sw('#F3F1E9', 'Background', 'الأرضية')}
    ${sw('#FFFDF8', 'Surface', 'كل بطاقة')}
    ${sw('#17201A', 'Ink', 'العناوين والنص')}
    ${sw('#6B6F69', 'Ink 2', 'نص ثانوي')}
    ${sw('#979992', 'Ink 3', 'تلميحات')}
    ${sw('#DDDCD4', 'Line', 'الحدود')}
  </div>

  <h2>TYPEFACE</h2>
  <div class="type">
    <div><div style="font-size:46px;font-weight:800" dir="rtl">منّا ولنا.</div>
      <div style="font-size:26px;font-weight:700;color:#6B6F69;margin-top:6px">Tajawal</div></div>
    <div style="font-size:16px;color:#979992;line-height:1.85" dir="rtl">400 · 500 · 700 · 800<br>
      عربي ولاتيني في عائلة واحدة<br>
      <span style="color:#A8502A">قيد المراجعة — انظر ورقة الخطوط</span></div>
  </div>

  <div class="rule">
    <b>الزيتوني هو العلامة والفعل معًا</b> — لذلك زرّ زيتوني واحد على الشاشة، لا أكثر.<br>
    <b>الطيني يعني «هذا يحتاجك»</b> — تنبيه، أو تحدٍّ ينتظر، أو سؤال بلا جواب.<br>
    <b>فاتح فقط.</b> بطاقات بيضاء دافئة على عاج، نصف قطر واحد، وخطّ شعرة واحد.
  </div></body>`;

  await p.setContent(html, { waitUntil: 'load' });
  await p.waitForTimeout(2400);
  await p.screenshot({ path: `${SP}/mypromo-brand-sheet.png` });
  await ctx.close();
  console.log('  brand sheet');
}

// ------------------------------------------------------ the Arabic type sheet
{
  const ctx = await browser.newContext({ viewport: { width: 1400, height: 1060 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  const FACES = [
    ['Tajawal', 800, 'الحالي — هندسي وعريض وحديث'],
    ['Almarai', 800, 'أنظف وأهدأ، وأقرب إلى تطبيقات الخليج'],
    ['Readex Pro', 600, 'إنساني ودافئ، حروفه أوسع وأسهل قراءة على الهاتف'],
    ['Noto Kufi Arabic', 700, 'كوفي معاصر — شخصية أقوى، وليونة أقل'],
  ];

  const html = `<head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Almarai:wght@400;700;800&family=Readex+Pro:wght@300;400;600&family=Noto+Kufi+Arabic:wght@400;500;700&display=swap">
  <style>
    *{box-sizing:border-box;margin:0}
    body{width:1400px;background:#F3F1E9;color:#17201A;font-family:Tajawal,sans-serif;
         padding:52px 60px;direction:rtl}
    h1{font-size:30px;font-weight:800;letter-spacing:-.6px}
    .note{font-size:15px;color:#6B6F69;margin-top:8px;line-height:1.8}
    .f{background:#FFFDF8;border:1px solid #DDDCD4;border-radius:18px;padding:24px 28px;margin-top:18px}
    .nm{font-size:12px;letter-spacing:1.4px;color:#979992;font-family:Tajawal;direction:ltr;
        text-align:left;font-weight:700}
    .why{font-size:13px;color:#6B6F69;font-family:Tajawal;margin-top:3px}
    .big{font-size:36px;margin-top:12px;letter-spacing:-.6px}
    .mid{font-size:19px;margin-top:10px;font-weight:700}
    .sm{font-size:14px;margin-top:8px;color:#6B6F69;line-height:1.8}
    .lat{color:#2A5B3E}
  </style></head><body>
  <h1>الخط العربي — أربعة وجوه في اللوحة نفسها</h1>
  <p class="note">النصّ نفسه، بأحجام التطبيق الحقيقية. Tajawal هو الحالي.</p>
  ${FACES.map(([f, w, why]) => `
    <div class="f" style="font-family:'${f}'">
      <div class="nm">${f}</div><div class="why">${why}</div>
      <div class="big" style="font-weight:${w}">أربعة من دفعتك يدرسون الآن</div>
      <div class="mid">تابع من حيث توقّفت — <span class="lat">Base du crâne</span></div>
      <div class="sm">ملخّص العظام قبل امتحان الأربعاء — راجعوه معي.
        <span class="lat">Résumé ostéologie.pdf</span></div>
    </div>`).join('')}
  </body>`;

  await p.setContent(html, { waitUntil: 'load' });
  await p.waitForTimeout(2800);
  await p.screenshot({ path: `${SP}/mypromo-arabic-faces.png` });
  await ctx.close();
  console.log('  arabic faces');
}

await browser.close();

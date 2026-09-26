// الرئيسية, quiet.
//
// Injected over the running app, so this is the real screen — the real feed,
// the real composer, the real bottom bar — with one idea applied: the app
// stops using saturated colour as a surface and starts using space and type.
//
//   node scripts/try-quiet.mjs
//
// Nothing in the repository changes.

import { chromium } from 'playwright-core';

const B = 'http://127.0.0.1:3000';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

// Ink & gold, but the point here is not the palette — it is what the chrome
// stops doing. The violet slab becomes paper. The five tools stop being
// filled tiles and become marks on that paper. The cards lose their shadows
// and keep a hairline. Type carries the hierarchy that colour was carrying.
const QUIET = `
  :root{
    --purple:#1B1A1F; --purple-light:#3C3944; --purple-pale:#F0EDE6;
    --orange:#A8792F; --orange-light:#D9B77B; --orange-pale:#F6EFE1;
    --bg:#F4F2EC; --surface:#FFFFFF;
    --ink:#131217; --ink-2:#4A4753; --ink-3:#8B8794;
    --line:#E4E0D7; --line-soft:#EFEDE6;
    --shadow:0 1px 2px rgba(19,18,23,.04);
  }

  /* 1. The slab goes. The head is paper like everything else, and the app's
        name sits on it quietly rather than being announced in white on
        violet. This alone gives back a third of the first screen. */
  .hero{ background:#FFFFFF !important; color:var(--ink) !important;
         padding:14px 20px 20px !important; border-bottom:1px solid var(--line); }
  .hero-ic{ color:var(--ink-2) !important; }
  .hero-mark{ font-size:16px !important; letter-spacing:-.01em; }

  /* 2. The greeting becomes the largest thing on the screen, because it is
        the only thing on it addressed to a person. */
  .hero-hi{ margin:22px 2px 20px !important; }
  .hero-hi b{ font-size:30px !important; letter-spacing:-.6px; line-height:1.25; }
  .hero-hi s{ color:var(--ink-3) !important; font-size:13px !important; margin-top:6px !important; }

  /* 3. The five tools stop being filled tiles. A hairline square and a label
        reads as a row of things you may do; five coloured blocks read as
        decoration competing with the subjects below. */
  .tools{ gap:10px !important; }
  .tool i{ background:transparent !important; color:var(--ink) !important;
           border:1px solid var(--line); height:52px !important; border-radius:14px !important; }
  /* the label is a <b>, not a span — white on violet by default, which is
     invisible once the violet is gone */
  .tool b{ color:var(--ink-3) !important; font-size:10.5px !important; }

  /* 4. Cards keep a hairline instead of a shadow, so the page reads as one
        sheet with divisions rather than a pile of floating objects. */
  .card{ box-shadow:none !important; border:1px solid var(--line); }
  .today{ border-color:var(--line) !important; }

  /* 5. The eyebrow — موادك — becomes a small capital label, which is what
        carries structure once the colour is gone. */
  .eyebrow{ color:var(--ink-3) !important; font-size:11px !important;
            letter-spacing:1.4px !important; text-transform:uppercase; }

  /* 6. One filled button on the screen, and it is the one you press. The
        composer's send stops being a pale lozenge that looks disabled. */
  .composer-send{ background:var(--ink) !important; color:#fff !important; }

  /* 7. The bottom bar: the gold is a dot under the page you are on, not a
        block. The + keeps its fill, because it is the one action. */
  .nav{ box-shadow:none !important; border-top:1px solid var(--line); }
  .nav a[data-on='true']{ color:var(--ink) !important; }
  .nav .fab{ background:var(--ink) !important; box-shadow:none !important; }
  /* the bell's count was a violet ring */
  .tally{ background:var(--ink) !important; color:#fff !important; box-shadow:0 0 0 2px #fff !important; }

  /* 8. The tile behind an icon — اليوم — loses its tint. */
  .tile.tint-purple{ background:var(--purple-pale) !important; color:var(--ink) !important; }
`;

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

for (const [where, name] of [['/feed', 'feed'], ['/archive', 'archive']]) {
  await p.goto(B + where, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(2600);
  await p.addStyleTag({ content: `nextjs-portal{display:none!important} ${QUIET}` });
  await p.waitForTimeout(600);
  await p.screenshot({ path: `palettes/quiet-${name}.png` });
  console.log(`  photographed: ${name}, quiet`);
}

await browser.close();

// Press everything, and see whether anything happens.
//
//   npm run build
//   MYPROMO_PORT=3100 node scripts/check-buttons.mjs
//
// The other half of scripts/find-dead-buttons.mjs. That one reads the source
// and finds a control with no handler attached. This one clicks every visible
// button and link on every screen and watches for a sign of life — the URL
// moving, the page redrawing, or a request going out. A handler that runs and
// does nothing looks exactly like a working one in the source; it does not
// look like one here.
//
// Run it against a production server, not `next dev`. The first visit to a
// route in dev compiles it, which takes seconds, and a fixed wait after the
// click reported every single navigation as dead — the first version of this
// script "found" ten broken links on الرئيسية, all of which were fine. It
// polls for a change now rather than sleeping a fixed amount, and a
// navigation that tears down the page counts as a sign of life rather than
// crashing the run.
//
// It reports rather than asserts: some controls legitimately do nothing on
// the press you can see — a filter already applied, a tab already open — so
// the list is for reading.

import { chromium } from 'playwright-core';

const PORT = process.env.MYPROMO_PORT || '3000';
const B = `http://127.0.0.1:${PORT}`;
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

// How long a control gets to show a sign of life before it is called dead.
const PATIENCE = 2500;

const SCREENS = [
  '/feed', '/study', '/points', '/profile',
  '/quiz', '/duel', '/rooms', '/qa', '/notes', '/review', '/saved',
  '/notifications', '/chat',
];

const browser = await chromium.launch({ executablePath: EDGE });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
});
const page = await ctx.newPage();

// ------------------------------------------------------------------ sign in
await page.goto(`${B}/login`, { waitUntil: 'domcontentloaded', timeout: 120000 });
const door = page.getByRole('button', { name: 'ادخل بكلمة السر' });
await door.waitFor({ timeout: 120000 });
const pw = page.locator('input[type=password]');
await door.click();
try { await pw.waitFor({ timeout: 5000 }); }
catch { await door.click(); await pw.waitFor({ timeout: 20000 }); }
await page.locator('input[type=email]').fill('owner@unem.mr');
await pw.fill('x');
await Promise.all([
  page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 30000 }).catch(() => {}),
  page.locator('form button.btn.p').click(),
]);
console.log('  signed in\n');

/** Sign in again, because something on the walk ended the session. */
async function signInAgain() {
  await page.goto(`${B}/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const again = page.getByRole('button', { name: 'ادخل بكلمة السر' });
  await again.waitFor({ timeout: 30000 });
  const box = page.locator('input[type=password]');
  await again.click();
  try { await box.waitFor({ timeout: 4000 }); }
  catch { await again.click(); await box.waitFor({ timeout: 15000 }); }
  await page.locator('input[type=email]').fill('owner@unem.mr');
  await box.fill('x');
  await Promise.all([
    page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 20000 }).catch(() => {}),
    page.locator('form button.btn.p').click(),
  ]);
}

// Requests are the quietest sign of life: a like that posts and re-renders to
// the same pixels is working.
let calls = 0;
page.on('request', (r) => { if (/\/api\//.test(r.url())) calls += 1; });

const dead = [];
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 140)));

/**
 * What the screen looks like right now.
 *
 * Returns null while the page is being replaced — which is itself the answer
 * we were looking for, so the caller reads null as "something happened".
 */
const shot = async () => {
  try {
    return await page.evaluate(() => ({
      url: location.pathname + location.search,
      html: document.body.innerHTML.length,
      text: document.body.innerText.slice(0, 4000),
    }));
  } catch {
    return null;
  }
};

const same = (a, b) => a && b
  && a.url === b.url
  && Math.abs(a.html - b.html) <= 60
  && a.text === b.text;

for (const screen of SCREENS) {
  // Pressing the year chips on الدراسة really does change the year, for the
  // whole app and for good — that is what they are for. Left alone, this
  // walk ends up reading DCEM3, every screen after it is empty, and the run
  // quietly stops testing anything. Put back before each screen.
  await page.request.post(`${B}/api/promo`, { data: { promo: 'pcem2' } }).catch(() => {});

  const landed = await page.goto(`${B}${screen}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (landed && landed.status() >= 400) { console.log(`${screen} — ${landed.status()}, skipped`); continue; }
  await page.waitForTimeout(900);

  // Somewhere back there was a خروج, and it worked. Every screen after it was
  // the login page, drawing two controls and testing nothing — a run that
  // reported eight clean screens because it was not signed in for any of
  // them. Silence is not success.
  if (page.url().includes('/login')) {
    console.log('  (signed out on the way here — signing back in)');
    await signInAgain();
    await page.goto(`${B}${screen}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(900);
  }

  // Mark each control with an attribute of its own, so it can be found again
  // after the page has been re-rendered. Indexing into the list was the first
  // version of this, and it reported four working links as dead: going back
  // to a known state between presses re-renders the screen, and الرئيسية does
  // not draw the same controls every time — the duel line appears only while
  // a duel is waiting. The index pointed at a different button by the time it
  // was clicked.
  const mark = () => page.evaluate(() => {
    const out = [];
    document.querySelectorAll('button, a[href]').forEach((el, i) => {
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return;              // not on screen
      if (el.disabled) return;                            // off on purpose
      const label = (el.getAttribute('aria-label') || el.innerText || '')
        .replace(/\s+/g, ' ').trim().slice(0, 34);
      const href = el.getAttribute('href') || null;
      // Two things that are meant to leave the page as it is: a link that
      // opens a tab of its own (an attachment), and a toggle already in the
      // state it is offering (S1 while S1 is showing).
      const elsewhere = el.getAttribute('target') === '_blank';
      const already = el.getAttribute('data-on') === 'true'
        || el.getAttribute('aria-pressed') === 'true'
        || el.className.split(' ').includes('on');
      // Named for what it is, not for where it sits. An id counted off the
      // page moves the moment anything above it renders differently, and the
      // press then lands on a neighbour — which is how four working links
      // were reported dead twice running.
      const id = `${el.tagName}|${label}|${href || ''}|${i}`;
      el.setAttribute('data-press', id);
      out.push({ id, label: label || '(no label)', href, elsewhere, already });
    });
    return out;
  });

  const controls = await mark();

  console.log(`${screen} — ${controls.length} controls`);

  for (const c of controls) {
    // Signing out works, and proving it costs the rest of the run.
    if (/خروج|تسجيل الخروج/.test(c.label)) continue;

    // Three things are meant to leave the screen as it is.
    if (c.href === screen) continue;        // a link to where you already are
    if (c.elsewhere) continue;              // opens a tab of its own
    if (c.already) continue;                // a toggle already in that state

    // Reset and reload before EVERY press, not once per screen.
    //
    // The year chips on الدراسة each really do change the year, and the
    // choice lives in the component as well as on the server — so by the
    // time the walk reached S1/S2 it was looking at a year with no subjects
    // in either semester, and reported a working semester switch as dead,
    // because switching between two empty lists changes nothing. Putting the
    // server back is not enough; the screen has to be drawn again from it.
    //
    // This makes the run slower and it is worth it: a checker that cries
    // wolf gets ignored, and then it is worth nothing at all.
    await page.request.post(`${B}/api/promo`, { data: { promo: 'pcem2' } }).catch(() => {});
    if (page.url().includes('/login')) await signInAgain();
    await page.goto(`${B}${screen}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(650);
    // The marks belong to the render that has just been thrown away.
    await mark();

    const before = await shot();
    const was = calls;

    const target = page.locator(`[data-press="${c.id}"]`);
    if (!(await target.count())) continue;   // this render does not have it
    try {
      await target.first().click({ timeout: 4000, noWaitAfter: true });
    } catch {
      continue;   // covered, moved or detached — not the same as doing nothing
    }

    // Poll rather than sleep: a route that has to be fetched is still alive,
    // it is just slower than any number picked in advance.
    let alive = false;
    for (let waited = 0; waited < PATIENCE; waited += 150) {
      await page.waitForTimeout(150);
      if (calls > was) { alive = true; break; }
      const now = await shot();
      if (now === null) { alive = true; break; }   // the page is being replaced
      if (!same(before, now)) { alive = true; break; }
    }

    if (!alive) {
      dead.push(`${screen}  «${c.label}»${c.href ? `  → ${c.href}` : ''}`);
      console.log(`    · nothing happened: «${c.label}»`);
    }
  }
}

console.log('\n─────────────────────────────');
if (dead.length) {
  console.log(`${dead.length} control(s) did nothing:\n`);
  dead.forEach((d) => console.log(`  ${d}`));
} else {
  console.log('every control did something');
}
if (errors.length) {
  console.log(`\n${errors.length} page error(s):`);
  [...new Set(errors)].forEach((e) => console.log(`  ${e}`));
}

await browser.close();
process.exitCode = dead.length ? 1 : 0;

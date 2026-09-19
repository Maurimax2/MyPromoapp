// Two students, two phones, one duel — driven end to end.
//
// Run with the app up on :3000 and the mock on :54321:
//   node scripts/check-duel-flow.mjs
//
// It signs in as two different people in two separate browser contexts (which
// is what two phones are, as far as a session is concerned), sends a
// challenge from one, accepts it on the other, answers both halves, and
// checks that the two scores appear — and that neither side sees the other's
// number before both are in.

import { chromium } from 'playwright-core';

const B = 'http://127.0.0.1:3000';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const step = (s) => console.log(`  ${s}`);
const fail = (s) => { console.log(`\n  ✗ ${s}`); process.exitCode = 1; };

const browser = await chromium.launch({ executablePath: EDGE });

async function signIn(email) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
  });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => fail(`page error (${email}): ${String(e).slice(0, 120)}`));
  // `domcontentloaded`, never `networkidle`: the dev server holds a live
  // reload socket open, so the network is never idle and the wait never ends.
  await p.goto(`${B}/login`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  const door = p.getByRole('button', { name: 'ادخل بكلمة السر' });
  await door.waitFor({ timeout: 90000 });   // the first compile is slow
  // A button drawn but not yet hydrated swallows the first tap in silence,
  // which is worth knowing about the real app too.
  const pw = p.locator('input[type=password]');
  await door.click();
  try {
    await pw.waitFor({ timeout: 5000 });
  } catch {
    await door.click();
    await pw.waitFor({ timeout: 20000 });
  }
  await p.locator('input[type=email]').fill(email);
  await pw.fill('x');
  await Promise.all([
    p.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 20000 }).catch(() => {}),
    p.locator('form button.btn.p').click(),
  ]);
  return p;
}

// Two accounts that the mock already holds, both approved and both in PCEM2.
const a = await signIn('owner@unem.mr');     // محمد
const b = await signIn('sidi@gmail.com');    // Sidi Ahmed

step('both signed in');

/**
 * Tap, and make sure it took.
 *
 * A server-rendered button that has been drawn but not yet hydrated swallows
 * the first tap without a sound. On a phone that window is a couple of
 * hundred milliseconds; against a dev server compiling the page for the first
 * time it is seconds, and a test that does not allow for it fails in a way
 * that looks like a bug in the app.
 */
async function tap(page, target, proof, tries = 4) {
  for (let n = 0; n < tries; n++) {
    await target.click({ timeout: 15000 }).catch(() => {});
    try {
      await page.locator(proof).waitFor({ timeout: 6000 });
      return;
    } catch { await page.waitForTimeout(700); }
  }
  fail(`tapping did not take: ${proof}`);
}

// --- A sends the invitation ------------------------------------------------
await a.goto(`${B}/duel/new`, { waitUntil: 'domcontentloaded' });
const who = a.locator('input[aria-label="الرقم الجامعي"]');
await who.waitFor({ timeout: 60000 });
// The subject first: the lecture list appearing is proof the page is alive.
// Typing into a controlled input before then is typing into nothing — React
// re-renders it from its own empty state and the text vanishes.
await tap(a, a.getByRole('button', { name: 'ANATOMIE', exact: true }).first(), '.chapter');
await who.fill('D04102');
if ((await who.inputValue()) !== 'D04102') fail('the matricule did not stay in the field');
await a.getByRole('button', { name: '5', exact: true }).click();   // five questions
// Untimed for the walk-through: a clock that moves the question on by itself
// — which is exactly what it is supposed to do — cannot be clicked through
// reliably. The clock gets its own check at the end.
await a.getByRole('button', { name: 'بلا وقت' }).click();
const send = a.getByRole('button', { name: /أرسل الدعوة/ });
step(`button says: ${(await send.textContent()).trim()}`);
await send.click();
await a.waitForURL(/\/duel\/\d+/, { timeout: 45000 }).catch(async () => {
  // Whatever the screen says is more useful than "timed out".
  const said = await a.locator('.admin-err').textContent().catch(() => null);
  fail(said ? `sending refused: ${said.trim()}` : 'sending went nowhere and said nothing');
  process.exit(1);
});
const url = a.url();
step(`invitation sent — ${url}`);

const sent = await a.locator('.duel-verdict').first().textContent().catch(() => '');
if (!sent.includes('أُرسلت')) fail(`A should see «أُرسلت الدعوة», saw «${sent}»`);

// --- B is told, and accepts -------------------------------------------------
await b.goto(`${B}/notifications`, { waitUntil: 'domcontentloaded' });
await b.waitForTimeout(600);
const told = await b.locator('.nm').first().textContent().catch(() => '');
step(`B's bell says: ${told.trim()}`);
if (!told.includes('تحدّاك')) fail('B was not notified of the challenge');

await b.goto(url, { waitUntil: 'domcontentloaded' });
const invite = await b.locator('.duel-invite-n').textContent().catch(() => '');
step(`B's invitation reads: ${invite.trim()}`);
await tap(b, b.getByRole('button', { name: 'أقبل التحدّي' }), '.quiz-q', 5);
if (!(await b.locator('.quiz-q').count())) {
  const said = await b.locator('.admin-err').textContent().catch(() => null);
  fail(said ? `accepting refused: ${said.trim()}` : 'the questions did not appear after accepting');
}
if (await b.locator('.quiz-clock').count()) fail('an untimed duel is showing a clock');
step('B is playing, untimed — no clock, as asked');

// --- A's screen should move on by itself ------------------------------------
step("waiting for A's screen to notice, without touching it…");
await a.waitForSelector('.quiz-q', { timeout: 20000 })
  .then(() => step('A moved to the questions on its own'))
  .catch(() => fail('A never noticed that B accepted — Watch is not refreshing'));

// --- both answer ------------------------------------------------------------
// Every element is found again on each pass and every click is allowed to
// miss. The screen legitimately rebuilds underneath this — a question is
// confirmed, the button becomes the next one, a refresh lands — and a script
// holding a handle to something that was there a moment ago is a script that
// fails on its own timing rather than on the app's behaviour.
async function play(page, who) {
  await page.waitForTimeout(1500);           // let any refresh settle first
  for (let n = 0; n < 20; n++) {
    if (!(await page.locator('.quiz-q').count())) break;
    const opt = page.locator('.quiz-opt').first();
    if (await opt.count()) await opt.click({ timeout: 8000 }).catch(() => {});
    const confirm = page.getByRole('button', { name: 'تأكيد' });
    if (await confirm.count()) await confirm.click({ timeout: 8000 }).catch(() => {});
    const on = page.getByRole('button', { name: /السؤال التالي|أرسِل/ });
    if (await on.count()) await on.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(2000);
  step(`${who} finished`);
}
await play(b, 'B');

// B is done, A is not: neither may see a pair of numbers yet.
await b.waitForTimeout(500);
const half = await b.locator('.duel-pair').textContent().catch(() => '');
step(`B now sees: ${half.replace(/\s+/g, ' ').trim()}`);
if (!half.includes('؟')) fail('B saw a complete result before A had answered');

await play(a, 'A');

// --- the reveal --------------------------------------------------------------
await a.waitForTimeout(800);
const reveal = await a.locator('.duel-reveal').count();
const verdict = await a.locator('.duel-verdict').textContent().catch(() => '');
const pair = await a.locator('.duel-pair').textContent().catch(() => '');
step(`A sees: «${verdict.trim()}» ${pair.replace(/\s+/g, ' ').trim()}`);
if (!reveal) fail('no reveal card — the animation never runs');

await a.screenshot({ path: 'duel-a.png' });
await b.reload({ waitUntil: 'domcontentloaded' });
await b.waitForTimeout(600);
await b.screenshot({ path: 'duel-b.png' });

console.log(process.exitCode ? '\n  some checks failed' : '\n  ✓ the whole duel works');

// --- and the clock, which the walk-through above deliberately turned off ----
//
// Checked on its own because the thing being tested is that the question
// moves on WITHOUT being touched — which is exactly what makes it impossible
// to click through reliably.
step('');
step('now a timed one…');
await a.goto(`${B}/duel/new`, { waitUntil: 'domcontentloaded' });
const who2 = a.locator('input[aria-label="الرقم الجامعي"]');
await who2.waitFor({ timeout: 60000 });
await tap(a, a.getByRole('button', { name: 'ANATOMIE', exact: true }).first(), '.chapter');
await who2.fill('D04102');
await a.getByRole('button', { name: '15 ثانية' }).click();
await a.getByRole('button', { name: /أرسل الدعوة/ }).click();
await a.waitForURL(/\/duel\/\d+/, { timeout: 45000 });
const timed = a.url();

await b.goto(timed, { waitUntil: 'domcontentloaded' });
await tap(b, b.getByRole('button', { name: 'أقبل التحدّي' }), '.quiz-clock', 5);

const first = Number(await b.locator('.quiz-clock').textContent());
const onQ = async () => (await b.locator('.quiz-step span').first().textContent()).trim();
const q1 = await onQ();
step(`clock starts at ${first} — ${q1}`);
await b.waitForTimeout(3200);
const later = Number(await b.locator('.quiz-clock').textContent());
step(`three seconds on: ${later}`);
if (!(later < first)) fail('the clock is not counting down');

// Left alone, it should take the question away by itself.
step('leaving it alone until it runs out…');
await b.waitForTimeout(13000);
const q2 = await onQ();
step(`now: ${q2}`);
if (q2 === q1) fail('the question did not move on when the time ran out');

await b.screenshot({ path: 'duel-timed.png' });
console.log(process.exitCode ? '\n  some checks failed' : '\n  ✓ and the clock works too');
await browser.close();

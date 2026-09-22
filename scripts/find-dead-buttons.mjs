// Every control in the app, and whether anything is behind it.
//
//   node scripts/find-dead-buttons.mjs
//
// A <button> with no onClick, no form around it and no submit does nothing at
// all, silently — the biggest, brightest thing on the screen meaning nothing.
// That has shipped here three times: the + in the bottom bar was a <div> for
// weeks, the bell in الرئيسية's head was a <button> with no handler, and the
// bookmark on الأرشيف never did anything at all. None of them threw, none
// logged, and all three looked finished.
//
// This reads the source rather than the running app, so it also covers the
// screens nobody thought to open. scripts/check-buttons.mjs is the other
// half: it clicks them in a real browser, which is what catches a handler
// that runs and does nothing.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2] || '.';
const SKIP = new Set(['node_modules', '.next', '.git', 'public', 'out', 'android', 'ios']);

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (/\.(js|jsx)$/.test(e.name)) files.push(full);
  }
})(ROOT);

const found = [];

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const lines = src.split('\n');

  // Every <button …> opening tag, however many lines it spans.
  const re = /<button\b([\s\S]*?)>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const attrs = m[1];
    const at = src.slice(0, m.index).split('\n').length;
    const has = (x) => new RegExp(x).test(attrs);

    const wired = has('onClick') || has('onPointerDown') || has('onMouseDown')
      || has('type=[\'"]submit[\'"]') || has('\\{\\.\\.\\.');

    if (wired) {
      // Wired to nothing is the same as not wired.
      if (/onClick=\{\s*\(\s*\)\s*=>\s*\{\s*\}\s*\}/.test(attrs)) {
        found.push({ file, at, why: 'onClick does nothing', src: attrs.trim().slice(0, 70) });
      }
      continue;
    }

    // A submit button inside a form is wired by the form, whether the form
    // posts to the server (<form action=…>) or handles it in the browser
    // (<form onSubmit=…>). Found by walking back to the nearest <form and
    // checking it was not closed in between — the fixed-size window this used
    // to read reported every long form's own submit button.
    const before = src.slice(0, m.index);
    const opened = before.lastIndexOf('<form');
    if (opened !== -1) {
      const since = before.slice(opened);
      const tag = since.slice(0, since.indexOf('>') + 1);
      if (!since.includes('</form>') && /onSubmit|action=/.test(tag)) continue;
    }

    found.push({ file, at, why: 'no handler', src: attrs.trim().replace(/\s+/g, ' ').slice(0, 70) });
  }

  lines.forEach((line, i) => {
    // A div or span carrying a click is a control the keyboard cannot reach.
    // An overlay's backdrop is the exception: it is a convenience on top of a
    // real way out, and Escape closes the sheet.
    if (/<(div|span|li|td)\b[^>]*onClick/.test(line)
        && !/sheet-back|veil|backdrop|scrim/.test(line)) {
      found.push({ file, at: i + 1, why: 'click on a non-button (Tab skips it)', src: line.trim().slice(0, 70) });
    }
    if (/href=["']#["']/.test(line)) {
      found.push({ file, at: i + 1, why: 'href="#" — goes nowhere', src: line.trim().slice(0, 70) });
    }
  });
}

const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');
found.sort((a, b) => rel(a.file).localeCompare(rel(b.file)) || a.at - b.at);

if (!found.length) {
  console.log('every control has something behind it');
} else {
  let last = '';
  for (const f of found) {
    const r = rel(f.file);
    if (r !== last) { console.log(`\n${r}`); last = r; }
    console.log(`  ${String(f.at).padStart(4)}  ${f.why}`);
    console.log(`        ${f.src}`);
  }
  console.log(`\n${found.length} to look at`);
}
process.exitCode = found.length ? 1 : 0;

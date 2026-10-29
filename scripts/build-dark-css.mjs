// Writes app/dark.css: the dark version of every colour app/globals.css wrote
// by hand instead of through a token.
//
// The tokens turn dark on their own ([data-theme='dark'] in globals.css). What
// they cannot reach is the hundred-odd pale tints and dark inks typed straight
// into a rule — a chip's #E6F2EC, a title's #17201A. Each of those gets an
// override here, the same hue moved to the other end of the lightness scale,
// so a rule added tomorrow is dark the next time this runs (predev, prebuild).
//
//   node scripts/build-dark-css.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const postcss = require('postcss');

const SRC = new URL('../app/globals.css', import.meta.url);
const OUT = new URL('../app/dark.css', import.meta.url);

// Things that are light on purpose in both themes, or already dark: a page of
// a PDF and an anatomy plate are paper; the landing page and the banners have
// their own colours; a switch's knob is white on any track.
const KEEP = /(^|[\s,>+~])\.(lp-|pdf-page|pl-thumb|pl-view|sban|hh|ps-sw|dl-|bd-plates|ar-flash|sj-sem|rk-|me2-|pv-file|pv-paper|pv-love|stile|head)|canvas|::?selection/;

const hex = /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi;
const toRgb = (h) => {
  const s = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
};
const toHsl = ([r, g, b]) => {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
};
const toHex = ([h, s, l]) => {
  const f = (n) => {
    const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l);
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// A surface: pale becomes deep, keeping its hue so a green chip stays green.
const surface = (h) => {
  const [hu, s, l] = toHsl(toRgb(h));
  return l < 0.8 ? null : toHex([hu, Math.min(s, 0.6) * 0.55, 0.11 + (1 - l) * 1.1]);
};
// An ink: near-black becomes near-white.
const ink = (h) => {
  const [hu, s, l] = toHsl(toRgb(h));
  return l > 0.3 ? null : toHex([hu, s * 0.4, 0.92 - l * 0.4]);
};
// A line: pale becomes a faint light line on dark.
const line = (h) => {
  const [hu, s, l] = toHsl(toRgb(h));
  return l < 0.8 ? null : toHex([hu, s * 0.3, 0.2 + (1 - l) * 0.5]);
};
const ROLE = {
  background: surface, 'background-color': surface, fill: surface,
  color: ink,
  border: line, 'border-color': line, 'border-top': line, 'border-bottom': line,
  'border-left': line, 'border-right': line, outline: line, 'outline-color': line,
};

const turn = (prop, value) => {
  const role = ROLE[prop];
  if (!role || value.includes('var(')) return null;
  let changed = false;
  let out = value.replace(hex, (m, h) => {
    const next = role(h);
    if (!next) return m;
    changed = true;
    return next;
  });
  if ((prop === 'background' || prop === 'background-color') && /^\s*(white|#fff)\s*(!important)?\s*$/i.test(value)) {
    out = value.replace(/white|#fff/i, '#161E1A');
    changed = true;
  }
  return changed ? out : null;
};

// The theme sits on <html>, with dir and the reader's class, so a selector that
// starts there is joined to it rather than nested under it.
const scope = (sel) => {
  const s = sel.trim();
  if (/^(html|:root)\b/.test(s)) return s.replace(/^(html|:root)/, "$1[data-theme='dark']");
  if (/^(\[dir=|\.only-pages)/.test(s)) return `[data-theme='dark']${s}`;
  if (/^body\b/.test(s)) return `[data-theme='dark'] ${s}`;
  return `[data-theme='dark'] ${s}`;
};

const css = postcss.parse(readFileSync(SRC, 'utf8'));
const out = postcss.root();
let count = 0;

css.walkRules((rule) => {
  if (rule.parent?.type === 'atrule' && /keyframes/i.test(rule.parent.name)) return;
  // A rule already written for the dark theme is the dark theme; leave it.
  const sels = rule.selectors.filter((s) => !KEEP.test(s) && !s.includes('data-theme'));
  if (!sels.length) return;
  const decls = [];
  rule.walkDecls((d) => {
    const v = turn(d.prop, d.value);
    if (v) decls.push(postcss.decl({ prop: d.prop, value: v, important: d.important }));
  });
  if (!decls.length) return;
  const r = postcss.rule({ selectors: sels.map(scope) });
  decls.forEach((d) => r.append(d));
  if (rule.parent?.type === 'atrule') {
    const at = postcss.atRule({ name: rule.parent.name, params: rule.parent.params });
    at.append(r);
    out.append(at);
  } else {
    out.append(r);
  }
  count += decls.length;
});

writeFileSync(OUT, `/* Written by scripts/build-dark-css.mjs from globals.css. Do not edit. */\n${out.toString()}\n`);
console.log(`dark.css: ${count} colours turned`);

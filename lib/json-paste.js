// Reading the JSON a model answered with, out of a phone.
//
// A model fences its JSON, or explains it first. That much was already
// allowed. What was not is what a phone does to the quotes: iOS, Android and
// every chat box with smart quotes on turn `"` into `“` and `”` as it goes, so
// what arrives is
//
//   [{“id”:2849,“lecture”:“13”}]
//
// which is not JSON and never will be. JSON.parse refuses it, the screen says
// it did not understand, and somebody who has just pasted nine hundred rows is
// told to ask the model again — for something the model already got right.

/** Every quote a keyboard substitutes for a plain one, double or single. */
const CURLY = new Set([
  '\u201C', '\u201D', '\u201E', '\u201F', '\u2033', '\u2036',
  '\u2018', '\u2019', '\u201A', '\u201B', '\u2032', '\u2035',
]);

/**
 * Curly quotes back to straight, where they are acting as delimiters.
 *
 * Walked rather than replaced wholesale, and the hard case is the apostrophe:
 * in « l'artère » a phone writes the same character it uses to close a string,
 * so a blind replace ends the string in the middle of a French word and the
 * parse fails on the very text this exists to rescue.
 *
 * What tells them apart is what comes next. A quote that closes a JSON string
 * is followed — past any whitespace — by `,` `:` `}` `]` or the end. A quote
 * inside a word is followed by the rest of the word.
 */
export function straighten(src) {
  const chars = [...src];
  const closes = (at) => {
    for (let i = at + 1; i < chars.length; i++) {
      const c = chars[i];
      if (c === ' ' || c === '\n' || c === '\r' || c === '\t') continue;
      return c === ',' || c === ':' || c === '}' || c === ']';
    }
    return true;                    // nothing after it but the end
  };

  let out = '';
  let inString = false;
  let curlyOpened = false;
  let escaped = false;

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (escaped) { out += ch; escaped = false; continue; }
    if (ch === '\\') { out += ch; escaped = true; continue; }

    if (inString) {
      if (curlyOpened && CURLY.has(ch) && closes(i)) {
        out += '"'; inString = false; curlyOpened = false; continue;
      }
      if (!curlyOpened && ch === '"') { out += ch; inString = false; continue; }
      // A straight quote inside a curly-delimited string is somebody's own
      // quotation mark, not the end of the string. Escaped, or it would be.
      if (curlyOpened && ch === '"') { out += '\\"'; continue; }
      out += ch;
      continue;
    }

    // Outside a string a curly quote can only be a delimiter a keyboard has
    // replaced: JSON has no other use for one.
    if (CURLY.has(ch)) { out += '"'; inString = true; curlyOpened = true; continue; }
    if (ch === '"') { out += ch; inString = true; curlyOpened = false; continue; }
    out += ch;
  }
  return out;
}

/**
 * The JSON inside whatever was pasted, or null.
 *
 * Tried as it came first. Straightening is a rescue, not a rewrite: text that
 * already parses is never touched.
 */
export function parsePasted(text) {
  if (!text || !String(text).trim()) return null;

  // A model fences its JSON, or explains it first.
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(text)?.[1] ?? text;
  const from = fenced.search(/[[{]/);
  const last = Math.max(fenced.lastIndexOf(']'), fenced.lastIndexOf('}'));
  if (from < 0 || last < from) return null;
  const body = fenced.slice(from, last + 1);

  for (const attempt of [body, straighten(body)]) {
    try {
      return JSON.parse(attempt);
    } catch {
      // …and try the next one.
    }
  }
  return null;
}

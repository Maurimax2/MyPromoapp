// Putting OCR output back into the shape the parser expects.
//
// A photographed paper reads well but arrives dented. The parser is strict on
// purpose — it has to be, or "3 cm au-dessus du bord" opens question 3 — so
// rather than loosening it for everyone, OCR text is straightened first:
//
//   ce 1; Une proéminence …   →   1. Une proéminence …
//   À. Fléchit la hanche      →   A. Fléchit la hanche
//   . B. Tibia                →   B. Tibia
//   A Veine axillaire         →   A. Veine axillaire
//   … est appelée : ... --:-::2-  →  … est appelée
//
// Every rule here rewrites punctuation and letter case. None of them invents a
// word, and none of them decides an answer.

// The scanner prints its own name on every page, and rarely twice the same
// way — `Scanned with`, `(3 CamScanner':`, `: SJ CamScanner”:`.
const WATERMARK = /scanned\s*with|cam\s?scanner/i;

// `À` for `A` is the commonest OCR slip on a French page: the accent belongs to
// the language model, not to the paper.
const DEACCENT = { 'À': 'A', 'Á': 'A', 'Â': 'A', 'Ä': 'A', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E' };

// Junk the camera left behind: a run of marks carrying no letter at all.
const NOISE_TOKEN = /^[^A-Za-zÀ-ÿ0-9]+$|^[^A-Za-zÀ-ÿ]*\d{1,2}[^A-Za-zÀ-ÿ]*$/;

/** Drop the marks trailing off the end of a line — shadow, staple, page curl. */
function trimTail(line) {
  const parts = line.split(/\s+/);
  while (parts.length > 1) {
    const last = parts[parts.length - 1];
    // A tail is only junk while enough of the line survives without it.
    if (!NOISE_TOKEN.test(last)) break;
    if (parts.slice(0, -1).join(' ').replace(/[^A-Za-zÀ-ÿ]/g, '').length < 3) break;
    parts.pop();
  }
  return parts.join(' ');
}

/** `ce 1;` and `. B.` and `A ` — the same openings, dented. */
function straightenOpening(line) {
  // A proposition: one letter of A–E, however it came out. The margin's
  // shadow reads as a digit often enough — `7 A. Adduction` — that leading
  // numbers are swept away with the rest of the marks.
  const opt = line.match(/^[\s.,;:*|"'`~^_>«»()\[\]0-9-]*([A-EÀÁÂÄÇÈÉÊ])\s*[.):;–—-]\s*(.*)$/);
  if (opt) return `${DEACCENT[opt[1]] || opt[1]}. ${opt[2]}`;

  // A proposition whose full stop the camera lost. Only before a capitalised
  // word, so that "A une masse" stays part of a sentence.
  const bare = line.match(/^([A-E])\s+([A-ZÀ-Ý][a-zà-ÿ].*)$/);
  if (bare) return `${bare[1]}. ${bare[2]}`;

  // A question number, with up to a couple of stray letters read in front of
  // it — the shadow of the margin.
  const num = line.match(/^[\s.,;:*|"'`~^_>«»()\[\]-]*(?:[a-zA-Z]{1,3}\s+)?(\d{1,3})\s*[.):;–—-]\s*(.*)$/);
  if (num && /^[A-ZÀ-Ý]/.test(num[2])) return `${num[1]}. ${num[2]}`;

  // The full stop after the number goes the same way the one after a letter
  // does — `pe 1 Une proéminence`. Same guard: a capitalised word has to
  // follow, so `20 questions` and `1 TA` stay as they are.
  const loose = line.match(/^[\s.,;:*|"'`~^_>«»()\[\]-]*(?:[a-zA-Z]{1,3}\s+)?(\d{1,3})\s+([A-ZÀ-Ý][a-zà-ÿ].*)$/);
  if (loose) return `${loose[1]}. ${loose[2]}`;

  return line;
}

// A page of figures is not a page of questions. Its OCR is noise, and noise
// numbered like a question — `2 isa TT` — opens one and throws the count out
// for every question after it. A page earns its place by carrying propositions.
const PROPOSITION = /^[A-E][.)]\s+\S/m;

/** Whether a page's OCR is part of the QCM at all. */
export function pageHasQuestions(text) {
  const straight = normaliseOcr(text);
  return (straight.match(new RegExp(PROPOSITION.source, 'gm')) || []).length >= 2;
}

/** OCR text, straightened. Never called on a paper that had real text. */
export function normaliseOcr(text) {
  return text
    .split('\n')
    .map((raw) => raw.replace(/ /g, ' ').trim())
    .filter((l) => l && !WATERMARK.test(l))
    // A line with no letter at all, or barely one, is the camera not the paper.
    .filter((l) => /[A-Za-zÀ-ÿ]/.test(l) && l.length > 2)
    .map((l) => trimTail(straightenOpening(l)))
    .join('\n');
}

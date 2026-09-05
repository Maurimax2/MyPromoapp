// Turning an exam paper back into questions.
//
// UNEM papers follow one shape, whoever wrote them:
//
//   7. À propos de l'os temporal quelle(s) est (sont) la (les) proposition(s)
//      exacte(s) ?  Réponse : ABC
//   A. C'est un os pair qui participe à la formation de la base du crâne
//   B. Il est constitué de trois parties …
//
// The number opens a question, `Réponse` carries the key — anywhere in the
// stem, since it often wraps onto the next line — and A through E are the
// propositions. Everything else is a continuation of the line above it.
//
// Nothing here guesses an answer. A question with no key is returned marked
// `unanswered` so a human can supply it; it is never shown to a student as if
// it were known.

// Papers open a question three ways: `7.`, `QCM 7`, `Question 7`. All three
// carry the number, which is what keeps the parser honest about where one
// question ends and the next begins.
const Q_START = /^\s*(QCM|QCR|QROC|Question|Q)?\s*(?:n\s*°|N\s*°|n|N)?\s*(\d{1,3})\s*[.):\u2013-]?\s*(.*)$/i;
// `A.`, `A)`, `A :` and `A-` all mean the same thing; different teachers, same
// paper. The hyphen form often runs straight into the word — `C-A une masse` —
// so no space is required after the separator.
const OPT_START = /^\s*([A-Ea-e])\s*[.):\u2013-]\s*(.*)$/;
const KEY = /R[ée]ponses?\s*:?\s*([A-E][A-E\s,;/et]*)/i;

const clean = (s) => s.replace(/\s+/g, ' ').trim();

// Some papers print each question twice — once spaced out, once as a compact
// block — and the second copy lands inside the last proposition. Cut it there:
// a proposition does not contain the opening of another question.
const ECHO = /\s\d{1,3}\s*[-–—]\s+\S/;
const cutEcho = (text) => {
  const m = text.slice(20).match(ECHO);
  return m ? text.slice(0, 20 + m.index).trim() : text;
};

/** The letters in a `Réponse : A,D` fragment, as indexes into the options. */
function keyToIndexes(raw) {
  const letters = (raw.match(/[A-E]/g) || []);
  return [...new Set(letters.map((l) => l.charCodeAt(0) - 65))].sort((a, b) => a - b);
}

export function parseQcm(text) {
  const lines = text.split('\n');
  const questions = [];
  let q = null;      // the question being built
  let opt = null;    // the proposition being built

  const closeOption = () => {
    if (q && opt) { q.options.push(clean(opt.text)); opt = null; }
  };
  const closeQuestion = () => {
    closeOption();
    if (q && q.options.length >= 2) questions.push(q);
    q = null;
  };

  let expected = null; // the number the next question must carry

  for (const raw of lines) {
    const line = raw.replace(/\u00a0/g, ' ');
    if (!line.trim()) continue;

    // A new question interrupts whatever was open. `QCM 7` says so plainly and
    // always opens one; a bare `7.` has to earn it by carrying the number that
    // comes next, or a page number — or a proposition wrapping onto "3 cm
    // au-dessus du bord" — would look like question 3.
    const qM = line.match(Q_START);
    if (qM && (qM[1] || expected === null || Number(qM[2]) === expected)) {
      closeQuestion();
      q = { n: Number(qM[2]), stem: qM[3], options: [], answer: [] };
      expected = q.n + 1;
      continue;
    }

    // A lone `A.` only opens a proposition inside a question, and only in
    // order — otherwise "A. Ghorbel" in a header would open one.
    const optM = line.match(OPT_START);
    if (q && optM && optM[1].toUpperCase().charCodeAt(0) - 65 === q.options.length + (opt ? 1 : 0)) {
      closeOption();
      opt = { text: optM[2] };
      continue;
    }

    if (opt) { opt.text += ' ' + line; continue; }
    if (q) { q.stem += ' ' + line; continue; }
  }
  closeQuestion();

  // Pull the answer key out of whichever part of the question it landed in.
  return questions.map((item) => {
    let stem = item.stem;
    let answer = [];

    const inStem = stem.match(KEY);
    if (inStem) {
      answer = keyToIndexes(inStem[1]);
      stem = stem.slice(0, inStem.index) + stem.slice(inStem.index + inStem[0].length);
    }

    const options = item.options.map((o) => {
      const m = o.match(KEY);
      return cutEcho(m ? clean(o.slice(0, m.index) + o.slice(m.index + m[0].length)) : o);
    });

    return {
      n: item.n,
      q: clean(stem),
      options,
      answer: answer.filter((i) => i < options.length),
      unanswered: answer.length === 0,
    };
  });
}

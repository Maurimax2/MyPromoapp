// Reading what an admin pasted in.
//
// The server-side extraction needs an API key, a Drive round trip and a
// function that lives long enough to finish. None of that is needed to put
// questions into the app: a person can hand the paper to whichever model they
// like — the one in their browser, free, with no key at all — and paste the
// answer here.
//
// So this accepts two things, because a person pasting is not going to be
// careful about which:
//
//   1. JSON, which is what the prompt we give them asks for.
//   2. The paper as text, which is what they will paste when the model
//      ignored the format, or when they simply copied the exam itself.
//
// The second is the reading the app already does on a typed paper, so a paste
// that is nothing but the exam still works.

// Its neighbours, by the path on disk rather than through the `@/` alias.
// The alias is the bundler's; `npm run check:paste` is plain Node, and this
// reader is the one piece of the panel worth checking without a browser.
import { parseQcm } from './parse.js';
import { parseAnswerKey, splitAtCorrection } from './key.js';

/** A letter, a digit, or a word — whatever the model called the answer. */
function optionIndex(value, options) {
  if (value === null || value === undefined) return null;

  if (typeof value === 'number' && Number.isInteger(value)) {
    // Some models count from 1 and some from 0. A 0 can only be an index; a
    // value that would fall off the end can only be a number in a 1-based list.
    if (value >= 0 && value < options.length) return value;
    if (value >= 1 && value <= options.length) return value - 1;
    return null;
  }

  const text = String(value).trim();
  if (!text) return null;

  // "A", "b)", "C." — the letter the paper prints beside the proposition.
  const letter = /^([A-Ha-h])[).\]:-]?$/.exec(text);
  if (letter) {
    const at = letter[1].toUpperCase().charCodeAt(0) - 65;
    return at < options.length ? at : null;
  }

  if (/^\d+$/.test(text)) return optionIndex(Number(text), options);

  // The proposition written out. Compared loosely: a model will re-punctuate.
  const flat = (x) => String(x).toLowerCase().replace(/[^a-z0-9؀-ۿ]+/gi, '');
  const want = flat(text);
  if (!want) return null;
  const at = options.findIndex((o) => flat(o) === want);
  return at >= 0 ? at : null;
}

/** JSON, however it was wrapped. Models fence it, or explain it first. */
function asJson(text) {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/i.exec(text);
  const candidates = [fenced?.[1], text];

  for (const raw of candidates) {
    if (!raw) continue;
    const trimmed = raw.trim();
    // A model that says "Voici les questions :" before the JSON.
    const from = trimmed.search(/[[{]/);
    if (from < 0) continue;
    const last = Math.max(trimmed.lastIndexOf(']'), trimmed.lastIndexOf('}'));
    if (last <= from) continue;
    try {
      return JSON.parse(trimmed.slice(from, last + 1));
    } catch { /* try the next shape */ }
  }
  return null;
}

/**
 * A question with no propositions — write the answer.
 *
 * The clinical years are examined this way, and only the most recent year of
 * their papers carries any QCM at all. Nothing here scores what a student
 * typed: matching French medical prose by keyword is wrong often enough to be
 * worse than saying nothing, and telling somebody they are wrong when they
 * were right teaches them to stop believing the app. The answer is shown and
 * the student marks themselves.
 *
 * `by: 'ai'` is how a model says it composed the answer rather than copying
 * it off a correction sheet. That difference reaches the student: the quiz
 * already prints it for a QCM Claude answered, and a written answer with no
 * key behind it needs it more, not less.
 */
function asWritten(raw, i, stem) {
  const model = raw.model_answer ?? raw.answer_text ?? raw.correction
    ?? raw.reponse_attendue ?? raw['réponse_attendue'] ?? raw.expected
    ?? (typeof raw.answer === 'string' ? raw.answer : null)
    ?? (typeof raw['réponse'] === 'string' ? raw['réponse'] : null)
    ?? (typeof raw.reponse === 'string' ? raw.reponse : null);

  const text = model === null || model === undefined ? '' : String(model).trim();

  return {
    n: String(raw.n ?? raw.number ?? raw.numero ?? raw['numéro'] ?? i + 1),
    q: String(stem).trim(),
    kind: 'qroc',
    options: [],
    answer: [],
    model: text || null,
    // Anything but a plain "this came off the correction sheet" is treated as
    // the model's own words. A guess that slips through unmarked is the one
    // failure that matters here.
    guessed: text
      ? /^(ai|claude|gpt|gemini|model|mod[eè]le|ia)$/i.test(String(raw.by ?? raw.source ?? '').trim())
      : false,
    proposed: [],
  };
}

/** One question out of whatever the model called its fields. */
function asQuestion(raw, i) {
  if (!raw || typeof raw !== 'object') return null;

  const stem = raw.stem ?? raw.question ?? raw.q ?? raw.enonce ?? raw['énoncé'] ?? raw.text;
  if (!stem) return null;

  const list = raw.options ?? raw.propositions ?? raw.choices ?? raw.answers_list ?? raw.items;
  const kind = String(raw.kind ?? raw.type ?? '').trim().toLowerCase();

  // No propositions to choose between — or the paper said outright which kind
  // it is — so it is a written answer. Asked before the length check below,
  // which used to throw the whole question away.
  if (kind === 'qroc' || !Array.isArray(list) || list.length < 2) {
    return asWritten(raw, i, stem);
  }

  const options = list.map((o) => (typeof o === 'string' ? o : o?.text ?? o?.label ?? String(o)))
    .map((o) => String(o).trim())
    // "A. Le temporal…" — the letter belongs to the list, not to the words.
    .map((o) => o.replace(/^[A-Ha-h][).\]:-]\s*/, ''))
    .filter(Boolean);
  if (options.length < 2) return null;

  const given = raw.answer ?? raw.answers ?? raw.correct ?? raw.correction ?? raw.reponse
    ?? raw['réponse'] ?? raw.bonne_reponse;
  const answer = [...new Set((Array.isArray(given) ? given : [given])
    .map((v) => optionIndex(v, options))
    .filter((v) => v !== null))].sort((a, b) => a - b);

  return {
    n: String(raw.n ?? raw.number ?? raw.numero ?? raw['numéro'] ?? i + 1),
    q: String(stem).trim(),
    kind: 'qcm',
    options,
    answer,
    model: null,
    guessed: false,
    proposed: [],
  };
}

/**
 * What was pasted, as sections ready to store.
 *
 * Returns `{ sections, how }` — `how` says which reading worked, because a
 * paste that came out wrong is easier to argue with when the screen says
 * whether it was read as JSON or as an exam paper.
 */
export function readPasted(text) {
  const body = String(text || '').trim();
  if (!body) return { sections: [], how: null };

  // ---- JSON, the format the prompt asks for --------------------------------
  const json = asJson(body);
  if (json) {
    const groups = Array.isArray(json) ? [{ questions: json }]
      : Array.isArray(json.sections) ? json.sections
      : Array.isArray(json.questions) ? [{ title: json.title, questions: json.questions }]
      : null;

    if (groups) {
      const sections = groups.map((g) => ({
        title: g?.title ? String(g.title).trim() : null,
        questions: (Array.isArray(g?.questions) ? g.questions : [])
          .map(asQuestion).filter(Boolean),
      })).filter((s) => s.questions.length);

      if (sections.length) return { sections, how: 'json' };
    }
  }

  // ---- the exam itself ----------------------------------------------------
  // The same reading the app does on a typed paper: questions here, and the
  // answer key wherever the sheet put it.
  const [questionText, keyText] = splitAtCorrection(body);
  const key = parseAnswerKey(keyText || body);
  const questions = parseQcm(questionText, { gaps: 2 }).map((q) => ({
    n: String(q.n),
    q: q.q,
    kind: 'qcm',
    options: q.options,
    answer: q.answer?.length ? q.answer : (key.get(String(q.n)) || key.get(Number(q.n)) || []),
    model: null,
    guessed: false,
    proposed: [],
  }));

  if (!questions.length) return { sections: [], how: null };
  return { sections: [{ title: null, questions }], how: 'text' };
}

/**
 * The prompt an admin gives their own model, so what comes back can be pasted
 * straight in. Kept here beside the reader that has to understand the answer.
 */
export const PROMPT = `Lis l'épreuve jointe et rends-la en JSON, rien d'autre.

Si aucun document n'est joint, ou si tu ne peux pas l'ouvrir, dis-le en une
phrase — ne rends pas un JSON vide.

Deux types de questions, dans les mêmes "questions" :

QCM — la feuille propose des propositions à cocher :
  {"n":"1","stem":"…","options":["…","…","…"],"answer":[0,2]}

QROC — la feuille demande d'écrire la réponse (pas de propositions) :
  {"n":"1","kind":"qroc","stem":"…","model_answer":"…"}

Format exact :
{"sections":[{"title":"Estomac","questions":[ … ]}]}

Règles :
- Transcris, ne compose pas. N'invente aucune question ni proposition.
- "answer" contient les index des propositions correctes, en partant de 0.
- Si l'épreuve ne donne pas la réponse, laisse "answer": [] — ou, pour une
  QROC, omets "model_answer".
- Pour une QROC, "model_answer" est la réponse attendue, telle que la
  correction la donne. Recopie-la, ne la reformule pas.
- Si la correction ne donne pas la réponse d'une QROC et que tu la rédiges
  toi-même, ajoute "by":"ai" à cette question. C'est important : l'app le dit
  à l'étudiant, pour qu'il sache qu'aucun enseignant n'a validé cette réponse.
- Garde la numérotation imprimée sur la feuille dans "n".
- Si l'épreuve est faite de plusieurs parties, une section par partie, chacune
  avec son titre et sa propre numérotation.
- Garde le texte en français, exactement comme sur la feuille.`;

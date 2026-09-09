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

import { parseQcm } from '@/lib/qcm/parse';
import { parseAnswerKey, splitAtCorrection } from '@/lib/qcm/key';

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

/** One question out of whatever the model called its fields. */
function asQuestion(raw, i) {
  if (!raw || typeof raw !== 'object') return null;

  const stem = raw.stem ?? raw.question ?? raw.q ?? raw.enonce ?? raw['énoncé'] ?? raw.text;
  const list = raw.options ?? raw.propositions ?? raw.choices ?? raw.answers_list ?? raw.items;
  if (!stem || !Array.isArray(list) || list.length < 2) return null;

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
    options,
    answer,
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
    options: q.options,
    answer: q.answer?.length ? q.answer : (key.get(String(q.n)) || key.get(Number(q.n)) || []),
    proposed: [],
  }));

  if (!questions.length) return { sections: [], how: null };
  return { sections: [{ title: null, questions }], how: 'text' };
}

/**
 * The prompt an admin gives their own model, so what comes back can be pasted
 * straight in. Kept here beside the reader that has to understand the answer.
 */
export const PROMPT = `Lis cette épreuve de QCM et rends-la en JSON, rien d'autre.

Format exact :
{"sections":[{"title":"Estomac","questions":[
  {"n":"1","stem":"…","options":["…","…","…"],"answer":[0,2]}
]}]}

Règles :
- Transcris, ne compose pas. N'invente aucune question ni proposition.
- "answer" contient les index des propositions correctes, en partant de 0.
- Si l'épreuve ne donne pas la réponse, laisse "answer": [].
- Garde la numérotation imprimée sur la feuille dans "n".
- Si l'épreuve est faite de plusieurs parties, une section par partie, chacune
  avec son titre et sa propre numérotation.
- Garde le texte en français, exactement comme sur la feuille.`;

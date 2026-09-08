// Reading an exam paper with Gemini.
//
// The papers here come two ways: typed, with real text in them, and
// photographed — one JPEG per page from a phone in a lecture hall. The second
// kind used to need an OCR pipeline of its own, and every piece of that
// pipeline broke once deployed. Gemini reads both, because it looks at the
// page rather than at the text layer.
//
// What it is asked to do is transcribe, not to sit the exam. An answer is only
// carried across when the paper itself states one — a `Réponse :` line, a
// correction at the end, a separate correction sheet. When it works an answer
// out on its own it must say so, and that is recorded as its opinion rather
// than the faculty's, and reviewed before a student ever sees it. A confident
// wrong answer is worse for somebody revising than no answer at all.

const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';

// The model is named in the environment because model names change faster than
// deploys do, and being able to move to the next one without a code change is
// worth more than picking the perfect one today.
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// A stand-in, so the whole path can be driven without a key or a bill.
// Never set in production.
const FAKE = process.env.GEMINI_API_BASE;

// Sent whole, base64, in the request. Comfortably inside what the API accepts
// for a PDF; anything larger is a scanned atlas rather than an exam paper.
const LIMIT = 30 * 1024 * 1024;

const INSTRUCTION = `Tu reçois une ou plusieurs épreuves d'examen de médecine (UNEM, Nouakchott).
Elles sont en français. Certaines sont dactylographiées, d'autres sont des
photographies de feuilles papier.

Transcris les QCM. Tu ne composes rien : chaque énoncé et chaque proposition
doit être le texte de la copie, corrigé seulement des fautes évidentes de
lecture (accents, lettres confondues). N'invente aucune question.

Une épreuve est souvent découpée en régions ou en parties, chacune renumérotée
à partir de 1 — « Paroi abdominale », « Le foie ». Rends une section par
région, dans l'ordre de la copie, en gardant la numérotation imprimée. Si la
copie n'est pas découpée, rends une seule section sans titre.

Les réponses : answerInPaper vaut true UNIQUEMENT si la copie donne elle-même
la réponse (mention « Réponse : », corrigé en fin d'épreuve, feuille de
correction jointe). Dans ce cas answer contient les indices (0 = A, 1 = B …)
que la copie indique.

Si la copie ne donne pas la réponse, answerInPaper vaut false. Tu peux alors
proposer ta propre réponse dans answer — elle sera présentée comme une
proposition à vérifier, jamais comme la correction officielle. Si tu n'es pas
sûr, laisse answer vide.

Une lettre entre parenthèses dans un corrigé — « 8.AC(D) » — est une
proposition contestée : ne la compte pas.

Ignore les pages qui ne contiennent pas de QCM (schémas à légender, pages de
garde).`;

const SCHEMA = {
  type: 'object',
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          questions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                number: { type: 'string' },
                stem: { type: 'string' },
                options: { type: 'array', items: { type: 'string' } },
                answer: { type: 'array', items: { type: 'integer' } },
                answerInPaper: { type: 'boolean' },
              },
              required: ['number', 'stem', 'options', 'answerInPaper'],
            },
          },
        },
        required: ['questions'],
      },
    },
  },
  required: ['sections'],
};

const base64 = (bytes) => Buffer.from(bytes).toString('base64');

/**
 * Read one paper, and its separate correction sheet when there is one.
 *
 * Throws with whatever Google said, verbatim — a wrong model name or an API
 * that has not been enabled is a thing to read and act on, not a 500.
 */
export async function readPaper({ paper, correction, title }, key) {
  if (!paper?.length) throw new Error('لا ملف');
  if (paper.length > LIMIT) {
    throw new Error(`الملف كبير جدًا (${Math.round(paper.length / 1048576)} Mo)`);
  }

  const parts = [{ inline_data: { mime_type: 'application/pdf', data: base64(paper) } }];
  if (correction?.length && correction.length <= LIMIT) {
    parts.push({ text: 'Ce second fichier est la correction de l\'épreuve ci-dessus.' });
    parts.push({ inline_data: { mime_type: 'application/pdf', data: base64(correction) } });
  }
  parts.push({ text: `${INSTRUCTION}\n\nTitre du document : ${title || '(sans titre)'}` });

  const url = FAKE
    ? `${FAKE}/${MODEL}:generateContent`
    : `${ENDPOINT}/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: SCHEMA,
        // Transcription, not composition.
        temperature: 0,
      },
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    // Google's own words. A model that does not exist, an API that is not
    // switched on and a key that is not authorised all say so plainly, and
    // none of them is worth guessing at from a status code.
    let said = body.slice(0, 300);
    try { said = JSON.parse(body)?.error?.message || said; } catch { /* keep the text */ }
    throw new Error(`Gemini ${res.status} — ${said}`);
  }

  let answer;
  try {
    const json = JSON.parse(body);
    const text = json?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
    answer = JSON.parse(text);
  } catch {
    throw new Error('لم نفهم رد Gemini');
  }

  return normalise(answer);
}

/**
 * Into the shape the storing half already speaks: one entry per region, each
 * holding its questions and the answers the paper itself gave.
 *
 * The guard lives here rather than in the instruction, because an instruction
 * is a request and this is a rule: an answer the paper did not state is that
 * model's opinion whatever it called it, and is filed as such.
 */
function normalise(answer) {
  const sections = Array.isArray(answer?.sections) ? answer.sections : [];

  return sections.map((section) => {
    const questions = (Array.isArray(section.questions) ? section.questions : [])
      .filter((q) => q && typeof q.stem === 'string' && Array.isArray(q.options) && q.options.length >= 2)
      .map((q) => {
        const stated = q.answerInPaper === true;
        const picked = (Array.isArray(q.answer) ? q.answer : [])
          .filter((i) => Number.isInteger(i) && i >= 0 && i < q.options.length);

        return {
          n: String(q.number ?? '').trim() || null,
          q: String(q.stem).trim(),
          options: q.options.map((o) => String(o).trim()),
          // What the paper said, and separately what the model thought.
          answer: stated ? picked : [],
          proposed: stated ? [] : picked,
          source: stated ? 'paper' : 'claude',
        };
      })
      .filter((q) => q.n && q.q);

    return { title: (section.title || '').trim() || null, questions };
  }).filter((s) => s.questions.length);
}

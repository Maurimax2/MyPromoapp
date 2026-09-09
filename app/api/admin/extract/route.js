// Turning an exam paper into questions a student can answer.
//
// The parser has existed since the beginning and only ever ran from a script
// on somebody's laptop. This is the same parser, reachable from the panel: a
// member of staff opens a paper filed under اختبر نفسك, presses a button, and
// the questions land in the review queue.
//
// Nothing is invented. A question whose answer the paper does not give is
// stored `needs_answer` and never shown to a student as if it were known —
// that is what the review screen is for.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { pdfText } from '@/lib/pdf-text';
import { parseQcm } from '@/lib/qcm/parse';
import { parseAnswerKey, splitAtCorrection } from '@/lib/qcm/key';
import { alignSections, runsOfKey } from '@/lib/qcm/sections';
import { normaliseOcr, pageHasQuestions } from '@/lib/qcm/ocr';
import { readPaper } from '@/lib/gemini';
import { storeQuestions } from '@/lib/qcm/store';

export const runtime = 'nodejs';

// Reading a photographed exam takes Gemini minutes, not seconds, and this
// used to be capped at the platform's default sixty — so the function was
// killed mid-answer, returned no JSON at all, and the panel could only show
// its own fallback: «تعذّر الاستخراج», after a minute of watching nothing.
//
// 300 is what Vercel allows a function on this plan with fluid compute. If a
// deployment ever refuses this number, the plan caps lower and the number
// comes down with it — the previous deployment keeps serving meanwhile.
export const maxDuration = 300;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** What storing came back with, as an HTTP answer. */
const answer = (out) => NextResponse.json(out);

// A stand-in for Drive, so the extraction can be driven end to end without
// Google in the way. Never set in production.
const FAKE = process.env.DRIVE_API_BASE;

// A download that never finishes is the same failure as an answer that never
// comes: the function is killed and the panel is left with nothing to say.
const DRIVE_DEADLINE = Number(process.env.DRIVE_DEADLINE_MS || 45_000);

/** The bytes of a Drive file. Drive answers a burst with 403, not 429. */
async function fetchDrive(fid, key) {
  const url = FAKE
    ? `${FAKE}/${fid}`
    : `https://www.googleapis.com/drive/v3/files/${fid}?alt=media&key=${key}`;
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await fetch(url, { signal: AbortSignal.timeout(DRIVE_DEADLINE) });
    } catch (err) {
      if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
        throw new Error('تعذّر تنزيل الملف من Drive في الوقت المتاح — ربّما كان كبيرًا جدًا');
      }
      throw err;
    }
    if (res.ok) return new Uint8Array(await res.arrayBuffer());
    if ((res.status === 403 || res.status === 429) && attempt < 4) {
      await wait(1500 * 2 ** attempt);
      continue;
    }
    throw new Error(`Drive ${res.status}`);
  }
}

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const key = process.env.GOOGLE_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_API_KEY غير مضبوط على الخادم' }, { status: 500 });
  }

  // `pages` arrives when the browser has just read a photographed paper: one
  // string per page, so a page of figures can be told from a page of
  // questions before any of it is parsed.
  const { document, pages } = await request.json();
  if (!document) return NextResponse.json({ error: 'لا ملف' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: doc, error: lookup } = await db.from('documents')
    .select('id, module, title, section, drive_id, correction, ocr_text')
    .eq('id', document).maybeSingle();

  // A refused query hands back no row, which is indistinguishable from a file
  // that is not there — and printing «لم نجد هذا الملف» over a file plainly on
  // the screen sends everybody looking in the wrong place. It cost an evening
  // once already: the query asks for `ocr_text`, and against a database that
  // has not had the migration run the whole select is rejected.
  if (lookup) {
    const missing = /column .* does not exist|ocr_text/i.test(lookup.message || '');
    return NextResponse.json({
      error: missing
        ? 'قاعدة البيانات ناقصة عمودًا — شغّل آخر SQL في Supabase ثم أعد المحاولة'
        : `تعذّرت قراءة الملف من قاعدة البيانات — ${lookup.message}`,
    }, { status: 500 });
  }

  if (!doc) return NextResponse.json({ error: 'لم نجد هذا الملف' }, { status: 404 });
  if (!doc.drive_id) {
    return NextResponse.json({ error: 'هذا الملف ليس في Drive' }, { status: 400 });
  }

  // --- the reading ------------------------------------------------------
  //
  // With a Gemini key the paper is read whole, photographs and all, and comes
  // back already divided into its regions. Without one we fall back to the
  // text layer and the parser, which works on typed papers and finds nothing
  // in a photograph.
  const gemini = process.env.GEMINI_API_KEY;
  if (gemini) {
    let sections;
    try {
      const paper = await fetchDrive(doc.drive_id, key);

      // Some papers keep their key in a separate sheet the catalogue already
      // points at; hand Gemini both and it can pair them itself.
      let correctionBytes = null;
      if (doc.correction) {
        const { data: corr } = await db.from('documents')
          .select('drive_id').eq('id', doc.correction).maybeSingle();
        if (corr?.drive_id) {
          correctionBytes = await fetchDrive(corr.drive_id, key).catch(() => null);
        }
      }

      sections = await readPaper({ paper, correction: correctionBytes, title: doc.title }, gemini);
    } catch (err) {
      // Google's own words reach the screen. A model that has been renamed and
      // an API that was never switched on both say so plainly, and neither is
      // worth guessing at.
      return NextResponse.json({ error: `${err.message}` }, { status: 502 });
    }

    if (!sections.length) {
      return NextResponse.json({ error: 'لم نجد أسئلة في هذا الملف' }, { status: 422 });
    }
    return answer(await storeQuestions(db, doc, sections, gate.profile.id));
  }

  // A page the camera read is dented in ways a typed page never is, so the
  // numbering is allowed to step over a hole the OCR left. On a paper with
  // real text a number out of turn is a number inside a sentence, and no such
  // allowance is made.
  let gaps = 0;
  let text;

  if (Array.isArray(pages) && pages.length) {
    // A paper of figures and a paper of questions are bound together; only the
    // pages carrying propositions are part of the QCM.
    text = normaliseOcr(pages.filter((p) => typeof p === 'string' && pageHasQuestions(p)).join('\n'));
    gaps = 3;

    // Kept so the reading is done once, ever — by whoever asked first. If it
    // cannot be kept, say so: silently losing it means the next person reads
    // the same paper again and never learns why.
    const { error: keep } = await db.from('documents')
      .update({ ocr_text: pages.join('\n\f\n'), ocr_at: new Date().toISOString() })
      .eq('id', doc.id);
    if (keep) {
      return NextResponse.json({
        error: `قرأنا الصور لكن تعذّر حفظ النص — ${keep.message}`,
      }, { status: 500 });
    }

    if (!text.trim()) {
      return NextResponse.json({ error: 'لم نقرأ شيئًا في هذه الصور' }, { status: 422 });
    }
  } else {
    let scanned = false;
    try {
      const read = await pdfText(await fetchDrive(doc.drive_id, key));
      text = read.text;
      scanned = read.scanned;
    } catch (err) {
      return NextResponse.json({ error: `تعذّرت قراءة الملف — ${err.message}` }, { status: 502 });
    }

    // A photographed paper carries no text at all. If somebody has already had
    // it read, use that; otherwise say what it is, and let the panel offer to
    // read it here.
    if (scanned) {
      if (doc.ocr_text) {
        text = normaliseOcr(doc.ocr_text.split('\f').filter(pageHasQuestions).join('\n'));
        gaps = 3;
      } else {
        return NextResponse.json({
          error: 'هذا الملف صور ممسوحة، لا نص فيه — اقرأه أولًا',
          scanned: true,
        }, { status: 422 });
      }
    }
  }

  // A paper often carries its own key at the end; some have it in a separate
  // correction file, which the catalogue already points at.
  const [asked, correction] = splitAtCorrection(text);
  let keyRuns = correction ? runsOfKey(correction) : [];
  let flat = correction ? parseAnswerKey(correction) : new Map();

  // `correction` names another row in the catalogue, not a Drive id — go and
  // fetch that row's file.
  if (!keyRuns.length && !flat.size && doc.correction) {
    try {
      const { data: corr } = await db.from('documents')
        .select('drive_id').eq('id', doc.correction).maybeSingle();
      if (corr?.drive_id) {
        const other = await pdfText(await fetchDrive(corr.drive_id, key));
        if (!other.scanned) {
          keyRuns = runsOfKey(other.text);
          flat = parseAnswerKey(other.text);
        }
      }
    } catch {
      // A correction we cannot read leaves the questions unanswered, which is
      // exactly what the review queue is for.
    }
  }

  const parsed = parseQcm(asked || text, { gaps }).filter((q) => q.options.length >= 2);
  if (!parsed.length) {
    return NextResponse.json({ error: 'لم نجد أسئلة في هذا الملف' }, { status: 422 });
  }

  // A paper bound out of several regions becomes one bank per region, each
  // keeping the numbering printed on the sheet.
  const aligned = alignSections(parsed, keyRuns);

  // The parser hands back its answers in a Map beside the questions; put them
  // on the questions themselves so that both readings arrive here the same
  // shape.
  const sections = aligned.map((section) => ({
    title: section.title,
    questions: section.questions.map((q) => {
      // A key read region by region answers only its own region. The flat
      // reading is for a paper with one run of numbers — reaching for it
      // inside a sectioned paper hands question 4 of Le foie the answer to
      // question 4 of Estomac.
      const fromKey = section.title ? section.answers.get(q.n) : flat.get(q.n);
      return {
        n: q.n, q: q.q, options: q.options,
        answer: q.answer?.length ? q.answer : (fromKey || []),
        proposed: [],
        source: 'paper',
      };
    }),
  }));

  return answer(await storeQuestions(db, doc, sections, gate.profile.id));
}

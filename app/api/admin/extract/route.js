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

export const runtime = 'nodejs';
export const maxDuration = 60;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// A stand-in for Drive, so the extraction can be driven end to end without
// Google in the way. Never set in production.
const FAKE = process.env.DRIVE_API_BASE;

/** The bytes of a Drive file. Drive answers a burst with 403, not 429. */
async function fetchDrive(fid, key) {
  const url = FAKE
    ? `${FAKE}/${fid}`
    : `https://www.googleapis.com/drive/v3/files/${fid}?alt=media&key=${key}`;
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url);
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

  const { document } = await request.json();
  if (!document) return NextResponse.json({ error: 'لا ملف' }, { status: 400 });

  const db = supabaseAdmin();
  const { data: doc } = await db.from('documents')
    .select('id, module, title, section, drive_id, correction')
    .eq('id', document).maybeSingle();

  if (!doc) return NextResponse.json({ error: 'لم نجد هذا الملف' }, { status: 404 });
  if (!doc.drive_id) {
    return NextResponse.json({ error: 'هذا الملف ليس في Drive' }, { status: 400 });
  }

  let text;
  let scanned = false;
  try {
    const read = await pdfText(await fetchDrive(doc.drive_id, key));
    text = read.text;
    scanned = read.scanned;
  } catch (err) {
    return NextResponse.json({ error: `تعذّرت قراءة الملف — ${err.message}` }, { status: 502 });
  }

  // A photographed paper carries no text at all. Say so plainly rather than
  // reporting nought questions as if the paper were empty.
  if (scanned) {
    return NextResponse.json({
      error: 'هذا الملف صور ممسوحة، لا نص فيه — لا يمكن استخراج الأسئلة منه بعد',
      scanned: true,
    }, { status: 422 });
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

  const parsed = parseQcm(asked || text).filter((q) => q.options.length >= 2);
  if (!parsed.length) {
    return NextResponse.json({ error: 'لم نجد أسئلة في هذا الملف' }, { status: 422 });
  }

  // A paper bound out of several regions becomes one bank per region, each
  // keeping the numbering printed on the sheet.
  const sections = alignSections(parsed, keyRuns);

  // ---- store it ----------------------------------------------------------
  // Look first, then insert. Never ON CONFLICT against this schema.
  let added = 0;
  let answered = 0;

  for (const [i, section] of sections.entries()) {
    const title = section.title ? `${doc.title} — ${section.title}` : doc.title;

    const { data: bank } = await db.from('question_banks')
      .select('id').eq('module', doc.module).eq('title', title).maybeSingle();

    let bankId = bank?.id;
    if (!bankId) {
      const { data: made, error } = await db.from('question_banks')
        .insert({ module: doc.module, title, section: doc.section, document: doc.id, position: i })
        .select('id').single();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      bankId = made.id;
    }

    const { data: already } = await db.from('questions').select('n').eq('bank', bankId);
    const stored = new Set((already || []).map((r) => String(r.n)));

    const rows = section.questions
      .filter((q) => !stored.has(String(q.n)))
      .map((q) => {
        // A key read region by region answers only its own region. The flat
        // reading is for a paper that has one run of numbers — reaching for
        // it inside a sectioned paper hands question 4 of Le foie the answer
        // to question 4 of Estomac.
        const fromKey = section.title ? section.answers.get(q.n) : flat.get(q.n);
        const answer = q.answer?.length ? q.answer : (fromKey || []);
        return {
          bank: bankId,
          n: String(q.n),
          stem: q.q,
          options: q.options,
          answer,
          source: 'paper',
          status: answer.length ? 'published' : 'needs_answer',
          created_by: gate.profile.id,
        };
      });

    if (rows.length) {
      const { error } = await db.from('questions').insert(rows);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    added += rows.length;
    answered += rows.filter((r) => r.answer.length).length;
  }

  return NextResponse.json({
    found: parsed.length,
    banks: sections.length,
    added,
    answered,
    skipped: parsed.length - added,
  });
}

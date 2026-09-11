// Questions an admin read somewhere else and pasted in.
//
// The server-side extraction needs a key, a Drive round trip, and a function
// that lives long enough to finish reading a photographed exam. This needs
// none of it: a person hands the paper to whichever model they like — the one
// in their browser, free — and pastes what comes back.
//
// Asking twice on purpose: without `confirm` it reads the paste and says what
// it found, and writes nothing. Nobody should add ninety questions to a
// subject without seeing them first.

import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/staff';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { readPasted } from '@/lib/qcm/paste';
import { storeQuestions } from '@/lib/qcm/store';

export const runtime = 'nodejs';

export async function POST(request) {
  const gate = await requireStaff();
  if (gate.error) return NextResponse.json({ error: gate.error }, { status: gate.status });

  const { module, title, text, confirm } = await request.json();
  if (!module) return NextResponse.json({ error: 'أيّ مادة؟' }, { status: 400 });
  if (!String(text || '').trim()) {
    return NextResponse.json({ error: 'الصق ما ردّه الذكاء الاصطناعي' }, { status: 400 });
  }

  const name = String(title || '').trim();
  if (!name) return NextResponse.json({ error: 'اكتب اسم الورقة' }, { status: 400 });

  const { sections, how } = readPasted(text);
  if (!sections.length) {
    // An empty list is a different failure from an unreadable paste, and the
    // difference is the whole answer: a model that was handed a link instead
    // of a file sees no document and dutifully returns the empty shape.
    const empty = /"sections"\s*:\s*\[\s*\]|"questions"\s*:\s*\[\s*\]/.test(text);
    return NextResponse.json({
      error: empty
        ? 'ردّ الذكاء الاصطناعي بقائمة فارغة — غالبًا لم يرَ الورقة. نزّل الملف من الأعلى وارفعه إليه كملف؛ رابط Drive لا يفتحه.'
        : 'لم نفهم ما لُصق — اطلب منه أن يردّ بصيغة JSON كما في النموذج، أو الصق الامتحان نفسه بنصّه',
    }, { status: 422 });
  }

  const db = supabaseAdmin();

  const { data: known } = await db.from('modules').select('id').eq('id', module).maybeSingle();
  if (!known) return NextResponse.json({ error: 'لا مادة بهذا الاسم' }, { status: 404 });

  // A written answer counts as answered when there are words in it, not when
  // there is an index in an array it will never have.
  const isAnswered = (q) => (q.kind === 'qroc' ? Boolean(q.model) : q.answer.length > 0);

  const counted = sections.reduce((n, s) => n + s.questions.length, 0);
  const withAnswer = sections.reduce(
    (n, s) => n + s.questions.filter(isAnswered).length, 0);
  const written = sections.reduce(
    (n, s) => n + s.questions.filter((q) => q.kind === 'qroc').length, 0);
  const guessed = sections.reduce(
    (n, s) => n + s.questions.filter((q) => q.guessed).length, 0);

  // What it read, before anything is written.
  if (!confirm) {
    return NextResponse.json({
      preview: true,
      how,
      banks: sections.length,
      found: counted,
      answered: withAnswer,
      waiting: counted - withAnswer,
      written,
      guessed,
      sections: sections.map((s) => ({
        title: s.title,
        questions: s.questions.map((q) => ({
          n: q.n, stem: q.q, kind: q.kind, options: q.options, answer: q.answer,
          model: q.model, guessed: q.guessed,
        })),
      })),
    });
  }

  // `staff`, not `paper`: a person chose the model, read what it said and put
  // it in. That is a judgement somebody made, and the app names who made it.
  try {
    const out = await storeQuestions(
      db, { id: null, module, title: name, section: null },
      sections, gate.profile.id, { as: 'staff' },
    );

    await db.from('audit_log').insert({
      actor: gate.profile.id, action: 'pasted_questions',
      target_type: 'module', target_id: module,
      detail: { title: name, how, ...out },
    }).then(() => {}, () => {});

    return NextResponse.json({ ...out, how });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

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
    return NextResponse.json({
      error: 'لم نفهم ما لُصق — اطلب من الذكاء الاصطناعي أن يردّ بصيغة JSON كما في النموذج، أو الصق الامتحان نفسه بنصّه',
    }, { status: 422 });
  }

  const db = supabaseAdmin();

  const { data: known } = await db.from('modules').select('id').eq('id', module).maybeSingle();
  if (!known) return NextResponse.json({ error: 'لا مادة بهذا الاسم' }, { status: 404 });

  const counted = sections.reduce((n, s) => n + s.questions.length, 0);
  const withAnswer = sections.reduce(
    (n, s) => n + s.questions.filter((q) => q.answer.length).length, 0);

  // What it read, before anything is written.
  if (!confirm) {
    return NextResponse.json({
      preview: true,
      how,
      banks: sections.length,
      found: counted,
      answered: withAnswer,
      waiting: counted - withAnswer,
      sections: sections.map((s) => ({
        title: s.title,
        questions: s.questions.map((q) => ({
          n: q.n, stem: q.q, options: q.options, answer: q.answer,
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

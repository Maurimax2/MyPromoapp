// Putting extracted questions away.
//
// Shared by the two ways a question reaches the app: a paper read on the
// server, and a paper an admin read somewhere else and pasted in. Both arrive
// as the same shape — sections, each holding questions — so both are stored
// by the same code, and the rule about what may be published lives in one
// place rather than two.

/**
 * Look first, then insert — never ON CONFLICT against this schema. A question
 * already stored under its number is left alone, so pressing the button twice
 * adds nothing.
 *
 * `doc` is the paper: `{ id, module, title, section }`. A pasted batch has no
 * document behind it, so `id` may be null — `question_banks.document` is
 * nullable and the bank is found by its title either way.
 *
 * `as` names who is answering when an answer is given: `paper` when the sheet
 * itself stated it, `staff` when a person put it in and stands behind it.
 * Anything a model worked out on its own is `claude` regardless, and waits.
 *
 * Returns a plain object. The routes decide what an HTTP answer looks like.
 */
export async function storeQuestions(db, doc, sections, actor, { as = 'paper' } = {}) {
  let found = 0;
  let added = 0;
  let answered = 0;
  let proposed = 0;

  for (const [i, section] of sections.entries()) {
    const title = section.title ? `${doc.title} — ${section.title}` : doc.title;

    const { data: bank } = await db.from('question_banks')
      .select('id').eq('module', doc.module).eq('title', title).maybeSingle();

    let bankId = bank?.id;
    if (!bankId) {
      const { data: made, error } = await db.from('question_banks')
        .insert({
          module: doc.module, title, section: doc.section ?? null,
          document: doc.id ?? null, position: i,
        })
        .select('id').single();
      if (error) throw new Error(error.message);
      bankId = made.id;
    }

    const { data: already } = await db.from('questions').select('n').eq('bank', bankId);
    const stored = new Set((already || []).map((r) => String(r.n)));

    found += section.questions.length;

    const rows = section.questions
      .filter((q) => !stored.has(String(q.n)))
      .map((q) => {
        // What the paper stated, or what a person vouched for, can be
        // published. What a model worked out on its own is its opinion: it is
        // kept, and marked, and nobody sees it until somebody has agreed.
        const stated = q.answer?.length ? q.answer : [];
        const guess = !stated.length && q.proposed?.length ? q.proposed : [];

        // A written answer is the same question asked of a different column:
        // is there an answer at all, and did anybody with a correction sheet
        // in front of them say so. `guessed` is the model admitting it wrote
        // the answer itself, and it travels all the way to the student.
        const written = q.kind === 'qroc';
        const model = written ? (q.model || null) : null;

        return {
          bank: bankId,
          n: String(q.n),
          kind: written ? 'qroc' : 'qcm',
          stem: q.q,
          options: written ? [] : q.options,
          answer: written ? [] : (stated.length ? stated : guess),
          model_answer: model,
          // `claude` means a model had an opinion. A question nobody has
          // answered is not that — it is the paper's question, still waiting,
          // and marking it otherwise claims a judgement no one made.
          source: (written ? q.guessed : guess.length) ? 'claude' : as,
          status: written
            ? (model ? 'published' : 'needs_answer')
            : (stated.length ? 'published' : 'needs_answer'),
          created_by: actor,
        };
      });

    if (rows.length) {
      const { error } = await db.from('questions').insert(rows);
      if (error) throw new Error(error.message);
    }

    added += rows.length;
    answered += rows.filter((r) => r.status === 'published').length;
    proposed += rows.filter((r) => r.source === 'claude').length;
  }

  return { found, banks: sections.length, added, answered, proposed, skipped: found - added };
}

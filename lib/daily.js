// سؤال اليوم — one question, the same for a whole year, every day.
//
// Chosen on the server, from the questions the year studies (its own
// subjects and, for the pharmacy and dental first years, the medicine first
// year's), by a hash of the year and the date — so everybody in PCEM2 gets
// the same question today, a different one tomorrow, and nobody's phone
// decides which. The answer never leaves the server before the question is
// answered: the page gets the stem and the propositions, /api/daily checks.
//
// Cached for an hour per year and day; the pick cannot change within a day.

import { unstable_cache } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { banksFor } from '@/lib/questions';
import { PROMOS as FILE_PROMOS, MODULES } from '@/lib/data';
import { dayOf } from '@/lib/habit';

// FNV-1a: small, stable, and the same on every server.
function hash(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

const usable = (q) => Array.isArray(q?.options) && q.options.length >= 2
  && Array.isArray(q?.answer) && q.answer.length >= 1;

// Which years' subjects a year studies — lib/catalogue.js's rule, read with
// the service key because this runs cached, outside any one person's request.
async function sources(db, promo) {
  const own = [{ promo, semesters: null }];
  const { data, error } = await db.from('promos')
    .select('reads_from, reads_semesters').eq('id', promo).maybeSingle();
  const row = !error && data ? data : FILE_PROMOS.find((p) => p.id === promo);
  if (!row?.reads_from) return own;
  return [...own, { promo: row.reads_from, semesters: row.reads_semesters?.length ? row.reads_semesters : null }];
}

const pick = unstable_cache(async (promo, day) => {
  const db = supabaseAdmin();
  const from = await sources(db, promo);

  const { data: mods } = await db.from('modules')
    .select('id, name, promo, semester').in('promo', from.map((s) => s.promo));
  const modules = (mods || []).filter((m) =>
    from.some((s) => s.promo === m.promo && (!s.semesters || s.semesters.includes(m.semester))));
  const seed = hash(`${promo}:${day}`);

  if (modules.length) {
    const { data: banks } = await db.from('question_banks').select('id, module').in('module', modules.map((m) => m.id));
    const bankIds = (banks || []).map((b) => b.id);
    if (bankIds.length) {
      const count = async () => (await db.from('questions')
        .select('id', { count: 'exact', head: true })
        .in('bank', bankIds).eq('status', 'published')).count || 0;
      const n = await count();
      // A few steps on from the hashed place if that one cannot be asked as
      // a QCM — a written question, or one with no answer recorded.
      for (let step = 0; n && step < 12; step += 1) {
        const at = (seed + step) % n;
        const { data: rows } = await db.from('questions')
          .select('id, bank, stem, options, answer, why')
          .in('bank', bankIds).eq('status', 'published')
          .order('id').range(at, at);
        const q = rows?.[0];
        if (usable(q)) {
          const bank = banks.find((b) => b.id === q.bank);
          const mod = modules.find((m) => m.id === bank?.module);
          return { key: `db:${q.id}`, dbId: q.id, stem: q.stem, options: q.options, answer: q.answer, why: q.why || null, subject: mod?.name || null };
        }
      }
    }
  }

  // Nothing in the database for this year yet: the questions bundled with
  // the app, for the same subjects.
  const fileMods = MODULES.filter((m) =>
    from.some((s) => s.promo === m.promo && (!s.semesters || s.semesters.includes(m.semester))));
  const named = [...modules, ...fileMods];
  const ids = [...new Set(named.map((m) => m.id))];
  const pool = ids.flatMap((id) => banksFor(id).flatMap((b) => b.questions.map((q) => ({ ...q, module: id }))))
    .filter(usable)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  if (!pool.length) return null;
  const q = pool[seed % pool.length];
  const mod = named.find((m) => m.id === q.module);
  return { key: `file:${q.id}`, dbId: null, stem: q.q, options: q.options, answer: q.answer, why: q.why || null, subject: mod?.name || null };
}, ['daily-question'], { revalidate: 3600 });

/** Today's question for a year, answer included — for the server only. */
export async function dailyQuestion(promo, day = dayOf()) {
  if (!promo) return null;
  return pick(promo, day);
}

/** The same, safe to hand to a phone: no answer, no explanation. */
export const shown = (q) => (q ? { key: q.key, stem: q.stem, options: q.options, subject: q.subject, several: q.answer.length > 1 } : null);

/** How the year did today: answered, and answered right. */
export async function dailyTally(promo, day = dayOf()) {
  const db = supabaseAdmin();
  const [all, right] = await Promise.all([
    db.from('daily_answers').select('person', { count: 'exact', head: true }).eq('promo', promo).eq('day', day),
    db.from('daily_answers').select('person', { count: 'exact', head: true }).eq('promo', promo).eq('day', day).eq('correct', true),
  ]);
  if (all.error) return null;
  return { answered: all.count || 0, right: right.count || 0 };
}

/** This person's answer today, if any. */
export async function myDaily(person, day = dayOf()) {
  const { data, error } = await supabaseAdmin().from('daily_answers')
    .select('correct').eq('person', person).eq('day', day).maybeSingle();
  if (error) return { off: true };
  return data ? { answered: true, correct: data.correct } : { answered: false };
}

'use client';

// Saying which lecture each question revises.
//
// The same shape as أسئلة ملصوقة, because it is the same job done from the
// other end: the screen writes out what a model needs to know, somebody pastes
// the answer back, and nothing is stored until it has been read on screen.
//
// Two hundred questions are not tagged one at a time by hand, so the hand
// version is not offered as the main road — but the paste is checked against
// the subject before it is applied, because a model asked for two hundred
// numbers will get some of them wrong.

import { useCallback, useMemo, useState } from 'react';
import Icon from '@/components/Icon';

const SEMESTERS = ['S1', 'S2'];

/**
 * The lectures a question can actually be sent to.
 *
 * A number two lectures share is left out of everything the screen offers —
 * the prompt and the dropdown both — because the route refuses it. Offering
 * it would mean a model answering with a number nothing can act on, or an
 * admin picking one from a list and being told no.
 */
function usable(lectures) {
  const twice = new Set();
  const once = new Set();
  for (const l of lectures) {
    if (!l.n) continue;
    if (once.has(l.n)) twice.add(l.n); else once.add(l.n);
  }
  return lectures.filter((l) => l.n && !twice.has(l.n));
}

/** What to hand the model: the lectures, then the questions still unplaced. */
function promptFor(name, lectures, questions) {
  const list = usable(lectures)
    .map((l) => `${l.n}. ${l.title}${l.chapter ? ` [${l.chapter}]` : ''}`)
    .join('\n');

  const asked = questions
    .map((q) => `#${q.id} ${String(q.stem).replace(/\s+/g, ' ').trim()}`)
    .join('\n');

  return `Voici les cours du module ${name}, numérotés :

${list}

Et voici des questions d'examen de ce module. Pour chacune, dis à quel cours
elle se rapporte.

${asked}

Réponds uniquement en JSON, rien d'autre :
[{"id":123,"lecture":"5"}]

Règles :
- "id" est le numéro qui suit le # devant la question. Recopie-le exactement.
- "lecture" est le numéro du cours dans la liste ci-dessus.
- Une question par entrée, et seulement les questions ci-dessus.
- Si une question ne se rapporte clairement à aucun de ces cours, ne la mets
  pas dans la liste. Mieux vaut la laisser non classée que mal classée.`;
}

export default function LectureScreen({ promos, modules }) {
  const [promo, setPromo] = useState(promos[0]?.id);
  const [sem, setSem] = useState('S1');
  const [module, setModule] = useState('');
  const [state, setState] = useState(null);     // what the subject holds
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);
  const [copied, setCopied] = useState(false);

  const here = useMemo(
    () => modules.filter((m) => m.promo === promo && m.semester === sem),
    [modules, promo, sem],
  );
  const chosen = modules.find((m) => m.id === module);

  // `keep` is for the refresh that follows a classify: reloading the subject
  // must not wipe the line saying what was just done, which is the only thing
  // on screen that answers "did that work".
  const load = useCallback(async (id, keep = false) => {
    setModule(id); setState(null); setError(''); setText('');
    if (!keep) setDone(null);
    if (!id) return;
    setBusy(true);
    const res = await fetch(`/api/admin/questions/lectures?module=${encodeURIComponent(id)}`);
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر (${res.status})`); return; }
    setState(data);
  }, []);

  const prompt = state && chosen
    ? promptFor(chosen.name, state.lectures, state.questions) : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setError('انسخ النصّ يدويًا من الأسفل'); }
  };

  // A whole paper onto one lecture. Nothing is sent but the paper and the
  // number; the route decides which of its questions are still unplaced.
  const [openPaper, setOpenPaper] = useState(null);
  const assignPaper = async (id, n) => {
    setBusy(true); setError('');
    const res = await fetch('/api/admin/questions/lectures', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ module, paper: id, lecture: n }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر (${res.status})`); return; }
    setOpenPaper(null);
    setDone({ ...data, shared: [] });
    load(module, true);
  };

  const apply = async () => {
    setBusy(true); setError('');
    let map;
    try {
      // A model fences its JSON, or explains it first. The same latitude the
      // question paste gives, for the same reason.
      const raw = /```(?:json)?\s*([\s\S]*?)```/i.exec(text)?.[1] ?? text;
      const from = raw.search(/[[{]/);
      const last = Math.max(raw.lastIndexOf(']'), raw.lastIndexOf('}'));
      map = JSON.parse(raw.slice(from, last + 1));
      if (!Array.isArray(map)) map = map.map || map.questions || [];
    } catch {
      setBusy(false);
      setError('لم نفهم ما لُصق — اطلب منه أن يردّ بصيغة JSON كما في النموذج');
      return;
    }

    const res = await fetch('/api/admin/questions/lectures', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ module, map }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || `تعذّر (${res.status})`); return; }
    setDone(data);
    setText('');
    load(module, true);
  };

  return (
    <div className="admin-body">
      <div className="admin-bar"><span>١ · المادة</span></div>
      <div className="imp-kinds">
        {promos.map((p) => (
          <button key={p.id} className={`imp-kind${promo === p.id ? ' on' : ''}`}
            onClick={() => { setPromo(p.id); load(''); }}>
            {p.name}
          </button>
        ))}
      </div>
      <div className="imp-kinds">
        {SEMESTERS.map((s) => (
          <button key={s} className={`imp-kind${sem === s ? ' on' : ''}`}
            onClick={() => { setSem(s); load(''); }} dir="ltr">
            {s}
          </button>
        ))}
      </div>
      <div className="imp-kinds">
        {here.map((m) => (
          <button key={m.id} className={`imp-kind${module === m.id ? ' on' : ''}`}
            onClick={() => load(m.id)} dir="ltr">
            {m.name}
          </button>
        ))}
        {here.length === 0 && <span className="admin-card-b">لا مواد في هذا السداسي.</span>}
      </div>

      {error && (
        <section className="admin-card admin-seed"><div className="admin-err">{error}</div></section>
      )}

      {done && (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">صُنِّف {done.set} سؤالًا</div>
          <p className="admin-card-b">
            على {done.lectures} محاضرة
            {done.unknown.length > 0
              && ` · أرقام لا محاضرة لها: ${done.unknown.join('، ')}`}
            {done.foreign > 0 && ` · ${done.foreign} خارج هذه المادة، تُركت`}
            {done.shared?.length > 0 && ` · أرقام مكرّرة تُركت: ${done.shared.join('، ')}`}
          </p>
        </section>
      )}

      {state && state.ready === false && (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">قاعدة البيانات لا تعرف المحاضرات بعد</div>
          <p className="admin-card-b" style={{ color: 'var(--orange)' }}>
            الصق <b dir="ltr">supabase/schema.sql</b> في Supabase → SQL Editor،
            ثمّ عُد. لا شيء هنا يمكن حفظه قبل ذلك.
          </p>
        </section>
      )}

      {state && state.ready !== false && (
        <>
          <div className="admin-bar">
            <span>٢ · ما تبقّى</span>
            <span>{state.left} من {state.total}</span>
          </div>
          <section className="admin-card admin-seed">
            {state.lectures.filter((l) => l.n).length === 0 ? (
              <p className="admin-card-b">
                لا محاضرات مرقّمة في {chosen?.name} — صنّف الأرشيف أوّلًا، فالسؤال
                يشير إلى محاضرة موجودة.
              </p>
            ) : (
              <p className="admin-card-b">
                {state.total} سؤالًا في {chosen?.name} · {state.done} مصنّف ·{' '}
                {state.left} بانتظار التصنيف · {state.lectures.filter((l) => l.n).length} محاضرة.
              </p>
            )}
            {/* A bar rather than a sentence: this is a job done over several
                sittings and the only thing anybody wants to know on arriving
                is how much of it is left. */}
            {state.total > 0 && (
              <div className="admin-fill">
                <span style={{ width: `${Math.round((state.done / state.total) * 100)}%` }} />
              </div>
            )}
          </section>

          {/* Two lectures under one number. No question can be sent to either
              of them until the archive says which is which, so it is said
              here rather than left to be noticed as a lecture that never
              fills up. */}
          {state.shared?.length > 0 && (
            <section className="admin-card admin-seed">
              <div className="admin-card-t">أرقام مكرّرة في الأرشيف</div>
              <p className="admin-card-b" style={{ color: 'var(--orange)' }}>
                لا يمكن إسناد سؤال إلى هذه الأرقام حتى تُصحَّح:
              </p>
              {state.shared.map((x) => (
                <p key={x.n} className="admin-card-b" dir="auto">
                  <b dir="ltr">{x.n}</b> — {x.titles.join(' · ')}
                </p>
              ))}
            </section>
          )}

          {/* The quick half of the job. A paper whose title names one lecture
              is one lecture, and tapping it is faster and more certain than
              anything a model will say about its questions one by one. */}
          {state.left > 0 && state.lectures.some((l) => l.n) && (
            <>
              <div className="admin-bar">
                <span>٣ · ورقة كاملة على محاضرة واحدة</span>
              </div>
              <section className="admin-card admin-seed">
                <p className="admin-card-b">
                  بعض الأوراق كلّها عن محاضرة واحدة — «QCM — la moelle épinière»
                  مثلًا. أسندها مرّة واحدة بدل سؤالًا سؤالًا.
                </p>
                {state.papers.filter((b) => b.left > 0).map((b) => (
                  <div key={b.id} className="paper-row">
                    <button
                      className="paper-name"
                      onClick={() => setOpenPaper(openPaper === b.id ? null : b.id)}
                    >
                      <span className="grow" dir="auto">{b.title}</span>
                      <span className="num">{b.left}</span>
                    </button>
                    {openPaper === b.id && (
                      <select
                        className="admin-input"
                        defaultValue=""
                        disabled={busy}
                        onChange={(e) => e.target.value && assignPaper(b.id, e.target.value)}
                      >
                        <option value="">اختر المحاضرة…</option>
                        {usable(state.lectures).map((l) => (
                          <option key={l.id} value={l.n}>{l.n} — {l.title}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </section>

              <div className="admin-bar"><span>٤ · الباقي: اطلب من الذكاء الاصطناعي</span></div>
              <section className="admin-card admin-seed">
                <p className="admin-card-b">
                  انسخ هذا وأعطه لـ ChatGPT أو Claude أو Gemini، ثمّ الصق ردّه هنا.
                  لا حاجة لرفع أيّ ملف — الأسئلة كلّها في النصّ.
                </p>
                <button className="btn p" onClick={copy}>
                  <Icon name={copied ? 'check' : 'file'} size={17} />
                  {copied ? 'نُسخ' : 'انسخ الطلب'}
                </button>
                <pre className="paste-prompt">{prompt}</pre>
              </section>

              <div className="admin-bar"><span>٥ · الصق ردّه</span></div>
              <section className="admin-card admin-seed">
                <textarea
                  className="admin-input paste-box"
                  placeholder='[{"id":123,"lecture":"5"}]'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  dir="ltr"
                  rows={6}
                />
                <button className="btn p" disabled={busy || !text.trim()} onClick={apply}>
                  {busy ? '…' : 'صنّف'}
                </button>
              </section>
            </>
          )}

          {state.left === 0 && state.total > 0 && (
            <section className="admin-card admin-seed">
              <div className="admin-card-t">كل الأسئلة مصنّفة</div>
              <p className="admin-card-b">
                يستطيع الطالب الآن أن يختار محاضرة بدل ورقة في اختبر نفسك.
              </p>
            </section>
          )}
        </>
      )}

      {!state && !busy && module === '' && (
        <section className="admin-card admin-seed">
          <p className="admin-card-b">اختر مادة لتبدأ.</p>
        </section>
      )}
    </div>
  );
}

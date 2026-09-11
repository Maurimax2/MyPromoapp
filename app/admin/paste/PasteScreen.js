'use client';

// Questions from whichever model the admin likes.
//
// Reading a photographed exam on the server needs a key, a Drive round trip
// and a function that lives long enough to finish — and when any of that runs
// out, nothing arrives. This route around it costs nothing and has no limits:
// hand the paper to the model in your browser, paste what it says.
//
// It asks twice on purpose. Nobody should add ninety questions to a subject
// without seeing them first.

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const SEMESTERS = ['S1', 'S2'];

export default function PasteScreen({ promos, modules, papers, prompt }) {
  const router = useRouter();
  const [promo, setPromo] = useState(promos[0]?.id);
  const [sem, setSem] = useState('S1');
  const [module, setModule] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [seen, setSeen] = useState(null);      // what the preview found
  const [done, setDone] = useState(null);      // what was stored
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const here = useMemo(
    () => modules.filter((m) => m.promo === promo && m.semester === sem),
    [modules, promo, sem],
  );
  const chosen = modules.find((m) => m.id === module);
  const mine = useMemo(
    () => (module ? papers.filter((d) => d.module === module) : []),
    [papers, module],
  );

  const ask = async (confirm) => {
    setBusy(true); setError('');
    const res = await fetch('/api/admin/questions/paste', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ module, title, text, confirm }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (!res.ok) { setError(data.error || `تعذّر (${res.status})`); return; }
    if (data.preview) { setSeen(data); return; }
    setSeen(null); setDone(data); setText(''); setTitle('');
    router.refresh();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setError('انسخ النصّ يدويًا من الأسفل'); }
  };

  // ---- after a save --------------------------------------------------------
  if (done) {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">أُضيف {done.added} سؤالًا</div>
          <p className="admin-card-b">
            {done.answered} بإجابة تُعرض للطلاب
            {done.skipped > 0 && ` · ${done.skipped} كان موجودًا من قبل`}
            {done.proposed > 0 && ` · ${done.proposed} بانتظار مراجعة الإجابة`}
          </p>
          <button className="btn p" onClick={() => setDone(null)}>الصق ورقة أخرى</button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      {/* ---------------- where it goes ---------------- */}
      <div className="admin-bar"><span>١ · المادة</span></div>
      <div className="imp-kinds">
        {promos.map((p) => (
          <button key={p.id} className={`imp-kind${promo === p.id ? ' on' : ''}`}
            onClick={() => { setPromo(p.id); setModule(''); }}>
            {p.name}
          </button>
        ))}
      </div>
      <div className="imp-kinds">
        {SEMESTERS.map((s) => (
          <button key={s} className={`imp-kind${sem === s ? ' on' : ''}`}
            onClick={() => { setSem(s); setModule(''); }} dir="ltr">
            {s}
          </button>
        ))}
      </div>
      <div className="imp-kinds">
        {here.map((m) => (
          <button key={m.id} className={`imp-kind${module === m.id ? ' on' : ''}`}
            onClick={() => setModule(m.id)} dir="ltr">
            {m.name}
          </button>
        ))}
        {here.length === 0 && (
          <span className="admin-card-b">لا مواد في هذا السداسي.</span>
        )}
      </div>

      {/* ---------------- the paper itself ---------------- */}
      {/* A Drive link is no use to either of them: Gemini asks to be connected
          to a Workspace, and ChatGPT sees no document and answers with an
          empty list. The file has to be downloaded and attached, so it is
          offered here rather than left as an instruction. */}
      <div className="admin-bar"><span>٢ · نزّل الورقة</span></div>
      <section className="admin-card admin-seed">
        {!module && <p className="admin-card-b">اختر المادة أوّلًا.</p>}

        {module && mine.length === 0 && (
          <p className="admin-card-b">
            لا أوراق امتحان مفهرسة في هذه المادة — نزّل الملف من الأرشيف أو من
            جهازك، ثمّ ارفعه إلى الذكاء الاصطناعي.
          </p>
        )}

        {mine.map((d) => (
          <a
            key={d.id}
            className="paste-file"
            href={`/api/file/${d.drive_id}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => { if (!title.trim()) setTitle(d.title); }}
          >
            <Icon name="download" size={18} />
            <span className="grow" dir="auto">{d.title}</span>
            <span className="paste-ext" dir="ltr">{d.ext || 'PDF'}</span>
          </a>
        ))}
      </section>

      {/* ---------------- the prompt ---------------- */}
      <div className="admin-bar"><span>٣ · اطلب من الذكاء الاصطناعي</span></div>
      <section className="admin-card admin-seed">
        <p className="admin-card-b">
          افتح ChatGPT أو Claude أو Gemini، و<b>ارفع الملف الذي نزّلته</b> — لا
          تعطِه رابط Drive، فلا أحد منهما يفتحه. ثمّ الصق هذا الطلب معه، وانسخ
          ردّه كاملًا.
        </p>
        <button className="btn p" onClick={copy}>
          <Icon name={copied ? 'check' : 'file'} size={17} />
          {copied ? 'نُسخ' : 'انسخ الطلب'}
        </button>
        <pre className="paste-prompt">{prompt}</pre>
      </section>

      {/* ---------------- the paste ---------------- */}
      <div className="admin-bar"><span>٤ · الصق</span></div>
      <section className="admin-card admin-seed">
        <input
          className="admin-input"
          placeholder="اسم الورقة — Examen ANATOMIE 2024"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          dir="auto"
        />
        <textarea
          className="admin-input paste-box"
          placeholder="الصق هنا ما ردّه الذكاء الاصطناعي — أو الصق الامتحان نفسه بنصّه"
          value={text}
          onChange={(e) => { setText(e.target.value); setSeen(null); }}
          dir="auto"
          rows={8}
        />
        {error && <div className="admin-err">{error}</div>}
        <button
          className="btn p"
          disabled={busy || !module || !title.trim() || !text.trim()}
          onClick={() => ask(false)}
        >
          {busy ? '…' : 'اقرأ ما لُصق'}
        </button>
      </section>

      {/* ---------------- what it read, before anything is written ---------- */}
      {seen && (
        <>
          <div className="admin-bar">
            <span>٥ · راجِع</span>
            <span>{seen.found} سؤالًا</span>
          </div>
          <section className="admin-card admin-seed">
            <p className="admin-card-b">
              {seen.how === 'json' ? 'قُرئ كـ JSON' : 'قُرئ كنصّ امتحان'}
              {' · '}{seen.answered} بإجابة
              {seen.waiting > 0 && ` · ${seen.waiting} بلا إجابة، لن تُعرض للطلاب`}
              {seen.written > 0 && ` · ${seen.written} سؤالًا مكتوبًا`}
              {seen.banks > 1 && ` · ${seen.banks} أقسام`}
            </p>
            {seen.guessed > 0 && (
              <p className="admin-card-b" style={{ color: 'var(--orange)' }}>
                {seen.guessed} إجابة كتبها الذكاء الاصطناعي، لا ورقة التصحيح —
                اقرأها قبل أن تضيفها. ستظهر للطالب موسومة بذلك.
              </p>
            )}
          </section>

          {seen.sections.map((s, i) => (
            <section key={s.title || i} className="admin-card admin-seed">
              {s.title && <div className="admin-card-t" dir="auto">{s.title}</div>}
              {s.questions.slice(0, 40).map((q) => (
                <div key={q.n} className="paste-q">
                  <div className="paste-q-t" dir="auto"><b>{q.n}.</b> {q.stem}</div>
                  {q.kind === 'qroc' ? (
                    <>
                      {q.model
                        ? <div className="paste-model" dir="auto">{q.model}</div>
                        : <div className="paste-none">بلا إجابة</div>}
                      {q.guessed && <div className="paste-ai">كتبها الذكاء الاصطناعي</div>}
                    </>
                  ) : (
                    <>
                      <ol className="paste-opts">
                        {q.options.map((o, k) => (
                          <li key={o} className={q.answer.includes(k) ? 'right' : undefined} dir="auto">
                            {o}
                          </li>
                        ))}
                      </ol>
                      {!q.answer.length && <div className="paste-none">بلا إجابة</div>}
                    </>
                  )}
                </div>
              ))}
              {s.questions.length > 40 && (
                <p className="admin-card-b">…و{s.questions.length - 40} سؤالًا آخر</p>
              )}
            </section>
          ))}

          <section className="admin-card admin-seed">
            <button className="btn p" disabled={busy} onClick={() => ask(true)}>
              {busy ? '…' : `أضِف ${seen.found} سؤالًا إلى ${chosen?.name || 'المادة'}`}
            </button>
          </section>
        </>
      )}
    </div>
  );
}

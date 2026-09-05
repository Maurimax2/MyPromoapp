'use client';

// Paste a Drive link, correct what it found, save.
//
// The names Drive holds are not names a student should read, so every row
// arrives with a cleaned-up guess and a guess at what kind of document it is.
// The person importing corrects those guesses; nothing is saved until they do.

import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';

const KINDS = [
  { id: 'lecture', where: 'archive', label: 'محاضرة' },
  { id: 'poly',    where: 'archive', label: 'بوليكوبيه' },
  { id: 'schema',  where: 'archive', label: 'مخططات' },
  { id: 'livre',   where: 'archive', label: 'كتاب' },
  { id: 'resume',  where: 'notes',   label: 'ملخص' },
  { id: 'note',    where: 'notes',   label: 'مذكرة طالب' },
  { id: 'exam',    where: 'quiz',    label: 'امتحان' },
  { id: 'isole',   where: 'quiz',    label: 'إيزوليه' },
  { id: 'qcm',     where: 'quiz',    label: 'QCM / TD' },
];

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} MB` : '');

export default function ImportScreen({ modules, preset }) {
  const [url, setUrl] = useState('');
  // Arriving from a subject means the subject is already decided; picking it
  // again from a list of nine is a step nobody needs.
  const [module, setModule] = useState(
    (preset && modules.some((m) => m.id === preset) ? preset : modules[0]?.id) || '',
  );
  const [state, setState] = useState('idle');      // idle|reading|ready|saving|saved
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [truncated, setTruncated] = useState(false);

  const chosen = useMemo(() => rows.filter((r) => r.keep), [rows]);

  const read = async (e) => {
    e.preventDefault();
    setState('reading'); setError(''); setRows([]);

    const res = await fetch('/api/admin/crawl', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || 'تعذّرت القراءة'); setState('idle'); return; }
    setRows(data.files.map((f) => ({ ...f, keep: true })));
    setTruncated(!!data.truncated);
    setState('ready');
  };

  const patch = (i, change) =>
    setRows((list) => list.map((r, k) => (k === i ? { ...r, ...change } : r)));

  const save = async () => {
    setState('saving');
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ module, items: chosen }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error || 'تعذّر الحفظ'); setState('ready'); return; }
    setState('saved');
  };

  if (state === 'saved') {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">حُفظ {chosen.length} ملف</div>
          <p className="admin-card-b">
            الملفات الآن في قاعدة البيانات. الخطوة التالية: استخراج الأسئلة من أوراق الامتحانات.
          </p>
          <button className="btn p" onClick={() => { setRows([]); setUrl(''); setState('idle'); }}>
            استيراد مجلد آخر
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <form className="admin-card admin-seed" onSubmit={read}>
        <div className="admin-card-t">استيراد من Drive</div>
        <input
          className="admin-input" dir="ltr" value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/…"
          aria-label="رابط المجلد"
        />
        <select className="admin-input" value={module} onChange={(e) => setModule(e.target.value)}>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>{m.name} · {m.semester}</option>
          ))}
        </select>
        <button className="btn p" disabled={!url.trim() || state === 'reading'}>
          {state === 'reading' ? 'جارٍ القراءة…' : 'اقرأ المجلد'}
        </button>
        {error && <div className="admin-err">{error}</div>}
      </form>

      {state === 'ready' && (
        <>
          <div className="admin-bar">
            <span>{chosen.length} من {rows.length} ملف</span>
            <button
              className="pill grey"
              onClick={() => {
                const all = chosen.length !== rows.length;
                setRows((list) => list.map((r) => ({ ...r, keep: all })));
              }}
            >
              {chosen.length === rows.length ? 'إلغاء الكل' : 'اختر الكل'}
            </button>
          </div>

          {truncated && (
            <div className="quiz-note">المجلد كبير — عُرضت أول 600 ملف فقط.</div>
          )}

          <div className="admin-rows">
            {rows.map((r, i) => (
              <div key={r.drive_id} className={`imp${r.keep ? '' : ' off'}`}>
                <button
                  className={`pick-box${r.keep ? ' on' : ''}`}
                  onClick={() => patch(i, { keep: !r.keep })}
                  aria-label="ضمّن هذا الملف"
                >
                  {r.keep && <Icon name="check" size={13} />}
                </button>

                <div className="grow">
                  <input
                    className="imp-title" value={r.title}
                    onChange={(e) => patch(i, { title: e.target.value })}
                  />
                  <div className="imp-meta" dir="ltr">
                    {r.ext} · {mb(r.bytes)} · {r.folder || '/'}
                  </div>
                  <div className="imp-kinds">
                    {KINDS.map((k) => (
                      <button
                        key={k.id}
                        className={`imp-kind${r.section === k.id ? ' on' : ''}`}
                        onClick={() => patch(i, { section: k.id, where: k.where })}
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="btn p" disabled={!chosen.length || state === 'saving'} onClick={save}>
            {state === 'saving' ? 'جارٍ الحفظ…' : `احفظ ${chosen.length} ملف`}
          </button>
        </>
      )}
    </div>
  );
}

'use client';

// Importing, in the order the question is actually asked.
//
// It used to open on a Drive link and a flat list of nine subjects, which
// only works while there are nine. The question is: which year, which
// subject, which semester — and both a year and a subject can be made right
// here, because most of the six promos have nothing in them yet and the
// subjects for those years do not exist to be picked from.

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
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

const SEMESTERS = ['S1', 'S2'];
const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function ImportScreen({ promos, modules, preset }) {
  const router = useRouter();

  const start = preset ? modules.find((m) => m.id === preset) : null;
  const [promo, setPromo] = useState(start?.promo || null);
  const [module, setModule] = useState(start?.id || null);

  const [newPromo, setNewPromo] = useState(null);   // null | {name, label}
  const [newModule, setNewModule] = useState(null); // null | {name, semester}
  const [saving, setSaving] = useState(false);

  const [url, setUrl] = useState('');
  const [state, setState] = useState('idle');       // idle|reading|ready|saving|saved
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [truncated, setTruncated] = useState(false);

  const subjects = useMemo(
    () => modules.filter((m) => m.promo === promo), [modules, promo]);
  const chosen = useMemo(() => rows.filter((r) => r.keep), [rows]);
  const here = modules.find((m) => m.id === module);

  // ---- making a year, and a subject inside it ---------------------------
  const addPromo = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    const res = await fetch('/api/admin/promos', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPromo),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) { setError(data.error || `تعذّرت الإضافة (${res.status})`); return; }
    setNewPromo(null); setPromo(data.id); setModule(null);
    router.refresh();
  };

  const addModule = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    const res = await fetch('/api/admin/modules', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo, ...newModule }),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) { setError(data.error || `تعذّرت الإضافة (${res.status})`); return; }
    setNewModule(null); setModule(data.id);
    router.refresh();
  };

  // ---- reading the folder ----------------------------------------------
  const read = async (e) => {
    e.preventDefault();
    setState('reading'); setError(''); setRows([]);

    const res = await fetch('/api/admin/crawl', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) { setError(data.error || `تعذّرت القراءة (${res.status})`); setState('idle'); return; }
    setRows((data.files || []).map((f) => ({ ...f, keep: true })));
    setTruncated(!!data.truncated);
    setState('ready');
  };

  const patch = (i, change) =>
    setRows((list) => list.map((r, k) => (k === i ? { ...r, ...change } : r)));

  const save = async () => {
    setState('saving'); setError('');
    const res = await fetch('/api/admin/documents', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ module, items: chosen }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { setError(data.error || `تعذّر الحفظ (${res.status})`); setState('ready'); return; }
    setState('saved');
  };

  if (state === 'saved') {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">حُفظ {chosen.length} ملفًا</div>
          <p className="admin-card-b">
            في <span dir="ltr">{here?.name}</span> — {promos.find((p) => p.id === promo)?.name}
          </p>
          <button
            className="btn p"
            onClick={() => { setRows([]); setUrl(''); setState('idle'); router.refresh(); }}
          >
            استورد مجلدًا آخر
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      {/* ---------------- the year ---------------- */}
      <div className="admin-bar"><span>١ · السنة</span></div>
      <div className="imp-kinds">
        {promos.map((p) => (
          <button
            key={p.id}
            className={`imp-kind${promo === p.id ? ' on' : ''}`}
            style={promo === p.id ? { background: p.badge } : undefined}
            onClick={() => { setPromo(p.id); setModule(null); setNewModule(null); }}
          >
            {p.name}
          </button>
        ))}
        <button className="imp-kind add" onClick={() => setNewPromo({ name: '', label: '' })}>
          <Icon name="plus" size={14} /> سنة
        </button>
      </div>

      {newPromo && (
        <form className="admin-card admin-seed" onSubmit={addPromo}>
          <div className="admin-card-t">سنة جديدة</div>
          <input
            className="admin-input" dir="ltr" autoFocus placeholder="PCEM1"
            value={newPromo.name}
            onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
            aria-label="اسم السنة" />
          <input
            className="admin-input" placeholder="السنة الأولى"
            value={newPromo.label}
            onChange={(e) => setNewPromo({ ...newPromo, label: e.target.value })}
            aria-label="الاسم بالعربية" />
          <div className="usr-acts">
            <button className="btn p sm" disabled={saving || !newPromo.name.trim()}>أضف</button>
            <button type="button" className="btn g sm" onClick={() => setNewPromo(null)}>ألغِ</button>
          </div>
        </form>
      )}

      {/* ---------------- the subject ---------------- */}
      {promo && (
        <>
          <div className="admin-bar"><span>٢ · المادة</span><span>{subjects.length}</span></div>

          {SEMESTERS.map((s) => {
            const list = subjects.filter((m) => m.semester === s);
            if (!list.length) return null;
            return (
              <div key={s} className="imp-sem">
                <span className="imp-sem-n" dir="ltr">{s}</span>
                <div className="imp-kinds">
                  {list.map((m) => (
                    <button
                      key={m.id}
                      className={`imp-kind${module === m.id ? ' on' : ''}`}
                      onClick={() => setModule(m.id)}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {!subjects.length && !newModule && (
            <div className="ct-none">لا مواد في هذه السنة بعد</div>
          )}

          <div className="imp-kinds">
            <button className="imp-kind add" onClick={() => setNewModule({ name: '', semester: 'S1' })}>
              <Icon name="plus" size={14} /> مادة
            </button>
          </div>

          {newModule && (
            <form className="admin-card admin-seed" onSubmit={addModule}>
              <div className="admin-card-t">
                مادة جديدة في {promos.find((p) => p.id === promo)?.name}
              </div>
              <input
                className="admin-input" dir="ltr" autoFocus placeholder="ANATOMIE"
                value={newModule.name}
                onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                aria-label="اسم المادة بالفرنسية" />
              <div className="imp-kinds">
                {SEMESTERS.map((s) => (
                  <button
                    type="button" key={s}
                    className={`imp-kind${newModule.semester === s ? ' on' : ''}`}
                    onClick={() => setNewModule({ ...newModule, semester: s })}
                  >
                    <span dir="ltr">{s}</span>
                  </button>
                ))}
              </div>
              <p className="admin-card-b">الاسم بالفرنسية، كما يكتبه الأساتذة.</p>
              <div className="usr-acts">
                <button className="btn p sm" disabled={saving || !newModule.name.trim()}>أضف</button>
                <button type="button" className="btn g sm" onClick={() => setNewModule(null)}>ألغِ</button>
              </div>
            </form>
          )}
        </>
      )}

      {/* ---------------- the folder ---------------- */}
      {module && state !== 'ready' && (
        <form className="admin-card admin-seed" onSubmit={read}>
          <div className="admin-card-t">٣ · رابط Drive</div>
          <p className="admin-card-b">
            إلى <span dir="ltr">{here?.name}</span> · <span dir="ltr">{here?.semester}</span>
          </p>
          <input
            className="admin-input" dir="ltr" type="url"
            placeholder="https://drive.google.com/drive/folders/…"
            value={url} onChange={(e) => setUrl(e.target.value)}
            aria-label="رابط المجلد" />
          <button className="btn p" disabled={!url.trim() || state === 'reading'}>
            {state === 'reading' ? 'نقرأ…' : 'اقرأ المجلد'}
          </button>
        </form>
      )}

      {error && <div className="admin-err">{error}</div>}

      {/* ---------------- what was found ---------------- */}
      {state === 'ready' && (
        <>
          <div className="admin-bar">
            <span>وُجد {rows.length} ملفًا</span>
            <span>{chosen.length} محدّد</span>
          </div>
          {truncated && (
            <div className="notice">
              <Icon name="alert" size={19} />
              <div><div className="notice-t">المجلد كبير</div>
                <div className="notice-b">قرأنا أول دفعة فقط. استورد بقية المجلدات على دفعات.</div></div>
            </div>
          )}

          <div className="admin-rows">
            {rows.map((r, i) => (
              <div key={r.drive_id} className={`imp${r.keep ? '' : ' off'}`}>
                <button
                  className={`imp-kind${r.keep ? ' on' : ''}`}
                  onClick={() => patch(i, { keep: !r.keep })}
                  aria-label={r.keep ? 'استبعد' : 'أدرج'}
                >
                  <Icon name={r.keep ? 'check' : 'plus'} size={14} />
                </button>
                <div className="grow">
                  <input
                    className="imp-title" dir="ltr" value={r.title}
                    onChange={(e) => patch(i, { title: e.target.value })} />
                  <div className="imp-meta">{r.folder} · {r.ext} · {mb(r.bytes)}</div>
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

          <div className="usr-acts">
            <button className="btn p" disabled={!chosen.length || state === 'saving'} onClick={save}>
              {state === 'saving' ? 'نحفظ…' : `احفظ ${chosen.length} ملفًا`}
            </button>
            <button className="btn g" onClick={() => { setRows([]); setState('idle'); }}>ألغِ</button>
          </div>
        </>
      )}
    </div>
  );
}

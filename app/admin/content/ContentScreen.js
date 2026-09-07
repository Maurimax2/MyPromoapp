'use client';

// The catalogue, editable.
//
// This is where a wrong name gets fixed. A row opens when you tap it; the
// title is a plain field, the screen and the kind are chips, and nothing is
// saved until you leave the field — so typing does not fire a request a
// letter at a time.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const WHERE = [
  { id: 'archive', label: 'الأرشيف' },
  { id: 'notes',   label: 'الملخصات' },
  { id: 'quiz',    label: 'اختبر نفسك' },
];

// The kinds a file can be, per screen. French words for the material itself,
// Arabic for the screens — the same split as everywhere else.
const SECTIONS = {
  archive: [
    { id: 'lecture', label: 'Cours' },
    { id: 'poly',    label: 'Polycopié' },
    { id: 'schema',  label: 'Schémas' },
    { id: 'livre',   label: 'Livre' },
  ],
  notes: [
    { id: 'resume', label: 'Résumé' },
    { id: 'note',   label: 'Notes' },
  ],
  quiz: [
    { id: 'exam',  label: 'Examen' },
    { id: 'isole', label: 'Isolés' },
    { id: 'qcm',   label: 'QCM' },
  ],
};

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function ContentScreen({ module, documents, where, counts, canDelete }) {
  const router = useRouter();
  const [rows, setRows] = useState(documents);
  const [open, setOpen] = useState(null);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');
  const [pulled, setPulled] = useState({});

  // Turning an exam paper into questions. It reads the file from Drive and
  // parses it, which takes a few seconds — so the row says so, and says what
  // came back rather than going quiet.
  const extract = async (id, pages) => {
    setBusy(id); setError('');
    setPulled((p) => ({ ...p, [id]: { working: true } }));

    let res, data;
    try {
      res = await fetch('/api/admin/extract', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ document: id, pages }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(null);
      setPulled((p) => ({ ...p, [id]: { error: 'لا اتصال بالخادم' } }));
      return;
    }
    setBusy(null);

    if (!res.ok) {
      setPulled((p) => ({
        ...p,
        [id]: { error: data.error || `تعذّر الاستخراج (${res.status})`, scanned: data.scanned },
      }));
      return;
    }
    setPulled((p) => ({ ...p, [id]: { ...data } }));
  };

  // A photographed paper is read here, in this browser — a page takes seconds
  // and five of them would run a serverless function past its limit. The text
  // goes up once and is kept, so nobody reads the same paper twice.
  const readScanned = async (d) => {
    setBusy(d.id); setError('');
    setPulled((p) => ({ ...p, [d.id]: { reading: true, done: 0, total: 0 } }));

    let pages;
    try {
      const file = await fetch(`/api/file/${d.drive_id}`);
      if (!file.ok) throw new Error(`الملف ${file.status}`);
      const bytes = await file.arrayBuffer();

      const { readScan } = await import('@/lib/ocr');
      const read = await readScan(bytes, {
        onPage: (done, total) =>
          setPulled((p) => ({ ...p, [d.id]: { reading: true, done, total } })),
      });
      pages = read.pages;
    } catch (err) {
      setBusy(null);
      setPulled((p) => ({ ...p, [d.id]: { error: `تعذّرت قراءة الصور — ${err?.message || err}` } }));
      return;
    }

    await extract(d.id, pages);
  };

  const patch = async (id, body) => {
    const before = rows.find((d) => d.id === id);
    setRows((rs) => rs.map((d) => (d.id === id ? { ...d, ...body } : d)));
    setBusy(id); setError('');

    let res, data;
    try {
      res = await fetch('/api/admin/documents', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, ...body }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(null); setRows((rs) => rs.map((d) => (d.id === id ? before : d)));
      setError('لا اتصال بالخادم'); return;
    }
    setBusy(null);

    // The row was changed on screen before the request went out, so a refusal
    // has to put it back — otherwise the panel shows something the database
    // does not have.
    if (!res.ok) {
      setRows((rs) => rs.map((d) => (d.id === id ? before : d)));
      setError(data.error || `تعذّر الحفظ (${res.status})`);
      return;
    }
    // Moving a file to another screen takes it out of this list.
    if (body.where_shown && body.where_shown !== where) {
      setRows((rs) => rs.filter((d) => d.id !== id));
      setOpen(null);
      router.refresh();
    }
  };

  const remove = async (id) => {
    setBusy(id); setError('');
    let res, data;
    try {
      res = await fetch('/api/admin/documents', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(null); setError('لا اتصال بالخادم'); return;
    }
    setBusy(null);
    if (!res.ok) { setError(data.error || `تعذّر الحذف (${res.status})`); return; }
    setRows((rs) => rs.filter((d) => d.id !== id));
    setOpen(null);
    router.refresh();
  };

  const go = (w) =>
    router.push(`/admin/content?promo=${module.promo}&module=${module.id}&where=${w}`);

  return (
    <div className="admin-body">
      <div className="admin-bar">
        <span dir="ltr">{module?.name}</span>
        <span dir="ltr">{module?.semester}</span>
      </div>

      <div className="rev-tabs">
        {WHERE.map((w) => (
          <button
            key={w.id}
            className={`rev-tab${where === w.id ? ' on' : ''}`}
            onClick={() => go(w.id)}
          >
            {w.label}<span>{counts[w.id]}</span>
          </button>
        ))}
      </div>

      {error && <div className="admin-err">{error}</div>}

      {!rows.length ? (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">لا ملفات هنا</div>
          {(() => {
            const other = WHERE.find((w) => w.id !== where && counts[w.id] > 0);
            return other ? (
              <>
                <p className="admin-card-b">
                  لا ملفات في «{WHERE.find((w) => w.id === where)?.label}» — لكن هناك
                  {' '}{counts[other.id]} في «{other.label}».
                </p>
                <button className="btn p" onClick={() => go(other.id)}>
                  اذهب إلى {other.label}
                </button>
              </>
            ) : (
              <p className="admin-card-b">
                لا ملفات في هذه المادة بعد. أضفها من «أضف ملفات» بالأسفل.
              </p>
            );
          })()}
        </section>
      ) : null}

      {!rows.length ? null : (
        <div className="admin-rows">
          {rows.map((d) => (
            <div key={d.id} className={`ctd${busy === d.id ? ' off' : ''}${!d.published ? ' hidden' : ''}`}>
              <button className="ctd-head" onClick={() => setOpen(open === d.id ? null : d.id)}>
                {d.n && <span className="ctd-n">{d.n}</span>}
                <div className="grow">
                  <div className="ctd-t" dir="ltr">{d.title}</div>
                  <div className="ctd-b">
                    {d.ext}{d.bytes ? ` · ${mb(d.bytes)}` : ''}
                    {d.year ? ` · ${d.year}` : ''}
                    {!d.published ? ' · مخفي' : ''}
                  </div>
                </div>
                <Icon name="chev" size={17} />
              </button>

              {open === d.id && (
                <div className="ctd-edit">
                  <input
                    className="admin-input"
                    dir="ltr"
                    defaultValue={d.title}
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v && v !== d.title) patch(d.id, { title: v });
                    }}
                    aria-label="اسم الملف"
                  />

                  <div className="imp-kinds">
                    {SECTIONS[where].map((s) => (
                      <button
                        key={s.id}
                        className={`imp-kind${d.section === s.id ? ' on' : ''}`}
                        onClick={() => patch(d.id, { section: s.id })}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <div className="ctd-move">
                    <span>انقل إلى</span>
                    {WHERE.filter((w) => w.id !== where).map((w) => (
                      <button key={w.id} className="imp-kind" onClick={() => patch(d.id, { where_shown: w.id })}>
                        {w.label}
                      </button>
                    ))}
                  </div>

                  <div className="usr-acts">
                    <button
                      className="btn g sm"
                      onClick={() => patch(d.id, { published: !d.published })}
                    >
                      {d.published ? 'أخفِ' : 'أظهِر'}
                    </button>
                    {d.drive_id && (
                      <Link className="btn g sm" href={`/file/${d.drive_id}`}>افتح</Link>
                    )}
                    {canDelete && (
                      <button className="btn g sm danger" onClick={() => remove(d.id)}>احذف</button>
                    )}
                  </div>

                  {where === 'quiz' && d.drive_id && (
                    <div className="ctd-qcm">
                      <button
                        className="btn p sm"
                        disabled={pulled[d.id]?.working || pulled[d.id]?.reading}
                        onClick={() => extract(d.id)}
                      >
                        {pulled[d.id]?.working ? 'نقرأ الملف…' : 'استخرج الأسئلة'}
                      </button>
                      {pulled[d.id]?.error && (
                        <p className="ctd-qcm-b bad">{pulled[d.id].error}</p>
                      )}
                      {pulled[d.id]?.reading && (
                        <p className="ctd-qcm-b">
                          {pulled[d.id].total
                            ? `نقرأ الصفحة ${pulled[d.id].done} من ${pulled[d.id].total}…`
                            : 'نحضّر القارئ…'}
                        </p>
                      )}
                      {pulled[d.id]?.scanned && !pulled[d.id]?.reading && (
                        <>
                          <button className="btn p sm" onClick={() => readScanned(d)}>
                            اقرأ الصور
                          </button>
                          <p className="ctd-qcm-b">
                            القراءة تجري في هذا الجهاز، بضع ثوانٍ لكل صفحة — ومرّة واحدة لهذا
                            الملف، لا يعيدها أحد بعدك.
                          </p>
                        </>
                      )}
                      {pulled[d.id]?.found !== undefined && (
                        <p className="ctd-qcm-b">
                          {pulled[d.id].added} سؤالًا جديدًا من {pulled[d.id].found}
                          {pulled[d.id].banks > 1 ? ` · ${pulled[d.id].banks} أقسام` : ''}
                          {' · '}
                          {pulled[d.id].answered} بإجابة
                          {pulled[d.id].added > pulled[d.id].answered
                            ? ` · ${pulled[d.id].added - pulled[d.id].answered} تحتاج مراجعة`
                            : ''}
                        </p>
                      )}
                      {pulled[d.id]?.added > 0 && (
                        <Link className="btn g sm" href="/admin/questions">راجع الأسئلة</Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Link href={`/admin/import?module=${module?.id || ''}`} className="admin-card admin-import">
        <div className="admin-import-ic"><Icon name="plus" size={22} /></div>
        <div className="grow">
          <div className="admin-card-t">أضف ملفات</div>
          <div className="admin-card-b">الصق رابط مجلد Drive أو ملفًا واحدًا</div>
        </div>
        <Icon name="chev" size={18} />
      </Link>
    </div>
  );
}

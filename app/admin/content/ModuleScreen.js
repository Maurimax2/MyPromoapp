'use client';

// One year's subjects, and the form that adds another.
//
// Subjects are grouped by semester because that is how a student thinks about
// them, and S1/S2 are written the way they say them — never translated.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const SEMESTERS = ['S1', 'S2'];

export default function ModuleScreen({ promo, modules, files, canDelete }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('S1');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doomed, setDoomed] = useState(null);   // the subject being confirmed

  // Folding several subjects into one. DCEM1 arrived with SEMIOLOGIE
  // catalogued as a dozen subjects, one per system; it is one subject and
  // those are its chapters. Deleting them would take their files, so they
  // are moved instead.
  const [merging, setMerging] = useState(false);
  const [picked, setPicked] = useState([]);     // in the order they were tapped
  const [keep, setKeep] = useState('');         // which of them stays
  const [rename, setRename] = useState('');
  const [plan, setPlan] = useState(null);       // what the merge would move

  const pick = (id) => {
    setPlan(null); setError('');
    setPicked((list) => {
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      // The one kept is the first one chosen until somebody says otherwise,
      // and never a subject that has just been unpicked.
      setKeep((k) => (next.includes(k) ? k : next[0] || ''));
      return next;
    });
  };

  const stopMerging = () => {
    setMerging(false); setPicked([]); setKeep(''); setRename(''); setPlan(null); setError('');
  };

  const merge = async (confirm) => {
    setBusy(true); setError('');
    let res, data;
    try {
      res = await fetch('/api/admin/modules/merge', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          into: keep,
          from: picked.filter((id) => id !== keep),
          rename: rename.trim() || undefined,
          confirm,
        }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(false); setError('لا اتصال بالخادم'); return;
    }
    setBusy(false);

    if (!res.ok) { setError(data.error || `تعذّر الدمج (${res.status})`); return; }
    if (data.preview) { setPlan(data); return; }
    stopMerging();
    router.refresh();
  };

  // Deleting a subject takes its chapters, its files and every question with
  // it — the schema cascades. So the first tap only counts, and the count is
  // shown before anybody is asked a second time.
  const remove = async (id, confirm) => {
    setBusy(true); setError('');
    let res, data;
    try {
      res = await fetch('/api/admin/modules', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, confirm }),
      });
      data = await res.json().catch(() => ({}));
    } catch {
      setBusy(false); setError('لا اتصال بالخادم'); return;
    }
    setBusy(false);

    if (!res.ok) { setError(data.error || `تعذّر الحذف (${res.status})`); setDoomed(null); return; }
    if (data.preview) { setDoomed({ id, ...data }); return; }
    setDoomed(null);
    router.refresh();
  };

  const add = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true); setError('');

    const res = await fetch('/api/admin/modules', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ promo: promo.id, semester, name: name.trim() }),
    });
    const data = await res.json();
    setBusy(false);

    if (!res.ok) { setError(data.error || 'تعذّرت الإضافة'); return; }
    setName(''); setAdding(false);
    router.refresh();
  };

  return (
    <div className="admin-body">
      <div className="admin-bar">
        <span>{promo.name}</span>
        <span>{modules.length} مادة</span>
      </div>

      {/* Kept at the top, in one place, because what is being folded is spread
          down the whole list: a control that sat beside a row would be a
          control you had to find. */}
      {canDelete && modules.length > 1 && (
        merging ? (
          <section className="admin-card admin-seed">
            <div className="admin-card-t">
              {picked.length < 2 ? 'اختر المواد التي تُدمج'
                : `${picked.length} مواد — تصير فصولًا في مادة واحدة`}
            </div>

            {picked.length < 2 ? (
              <p className="admin-card-b">
                اضغط المواد المتفرّقة في القائمة. ملفّاتها وأسئلتها تنتقل كلّها،
                وكلّ مادة تصير فصلًا باسمها.
              </p>
            ) : (
              <>
                <p className="admin-card-b">أيّها تبقى؟</p>
                <div className="imp-kinds">
                  {picked.map((id) => {
                    const m = modules.find((x) => x.id === id);
                    return (
                      <button
                        key={id}
                        className={`imp-kind${keep === id ? ' on' : ''}`}
                        onClick={() => { setKeep(id); setPlan(null); }}
                        dir="ltr"
                      >
                        {m?.name || id}
                      </button>
                    );
                  })}
                </div>
                <input
                  className="admin-input"
                  dir="ltr"
                  placeholder={modules.find((x) => x.id === keep)?.name || 'SEMIOLOGIE'}
                  value={rename}
                  onChange={(e) => { setRename(e.target.value); setPlan(null); }}
                  aria-label="اسم المادة بعد الدمج"
                />
                <p className="admin-card-b">اتركه فارغًا ليبقى الاسم كما هو.</p>
              </>
            )}

            {error && <div className="admin-err">{error}</div>}

            {plan && (
              <p className="admin-card-b">
                ينتقل {plan.documents ?? '؟'} ملفًا و{plan.banks ?? '؟'} مجموعة أسئلة
                إلى <span dir="ltr">{plan.into.name}</span>، في {plan.chapters} فصلًا:
                {' '}<span dir="ltr">{plan.chapterNames.join('، ')}</span>.
                لا يُحذف أيّ ملف.
              </p>
            )}

            <div className="usr-acts">
              {plan ? (
                <button className="btn p sm" disabled={busy} onClick={() => merge(true)}>
                  ادمج نهائيًا
                </button>
              ) : (
                <button className="btn p sm" disabled={busy || picked.length < 2 || !keep}
                        onClick={() => merge(false)}>
                  {busy ? '…' : 'راجِع الدمج'}
                </button>
              )}
              <button className="btn g sm" disabled={busy} onClick={stopMerging}>ألغِ</button>
            </div>
          </section>
        ) : (
          <button className="btn g sm ctm-merge" onClick={() => setMerging(true)}>
            <Icon name="archive" size={16} /> ادمج مواد في مادة واحدة
          </button>
        )
      )}

      {SEMESTERS.map((s) => {
        const list = modules.filter((m) => m.semester === s);
        return (
          <div key={s} className="ct-sem">
            <div className="admin-bar"><span dir="ltr">{s}</span><span>{list.length}</span></div>
            {!list.length ? (
              <div className="ct-none">لا مواد في {s}</div>
            ) : (
              <div className="admin-rows">
                {list.map((m) => (
                  <div key={m.id}>
                  <div className="ctm-row">
                    {merging ? (
                      // Tapping a row picks it rather than opening it: in this
                      // mode the screen is a list of things to fold together,
                      // and a row that navigated away would lose the choice.
                      <button
                        className={`ctm grow ctm-pick${picked.includes(m.id) ? ' on' : ''}`}
                        onClick={() => pick(m.id)}
                        aria-pressed={picked.includes(m.id)}
                      >
                        <span className="ctm-box">
                          {picked.includes(m.id) && <Icon name="check" size={14} />}
                        </span>
                        <div className="grow">
                          <div className="ctm-t" dir="ltr">{m.name}</div>
                          <div className="ctm-b ltr">{files[m.id] || 0} ملف</div>
                        </div>
                        {keep === m.id && <span className="ctm-keep">تبقى</span>}
                      </button>
                    ) : (
                      <Link href={`/admin/content?promo=${promo.id}&module=${m.id}`} className="ctm grow">
                        <div className="grow">
                          <div className="ctm-t" dir="ltr">{m.name}</div>
                          <div className="ctm-b ltr">{files[m.id] || 0} ملف</div>
                        </div>
                        <Icon name="chev" size={18} />
                      </Link>
                    )}
                    {canDelete && !merging && (
                      <button
                        className="ctm-del"
                        aria-label={`احذف ${m.name}`}
                        disabled={busy}
                        onClick={() => remove(m.id, false)}
                      >
                        <Icon name="trash" size={17} />
                      </button>
                    )}
                  </div>

                  {/* Asked here rather than at the foot of the screen: a
                      question about ANATOMIE that appears below PHYSIOLOGIE is
                      a question nobody sees. */}
                  {doomed?.id === m.id && (
                    <section className="admin-card admin-seed danger-card">
                      <div className="admin-card-t">
                        احذف <span dir="ltr">{doomed.name}</span>؟
                      </div>
                      <p className="admin-card-b">
                        سيُحذف معها {doomed.documents ?? '؟'} ملفًا و{doomed.chapters ?? '؟'} فصلًا
                        و{doomed.banks ?? '؟'} مجموعة أسئلة. لا رجعة في هذا.
                      </p>
                      <div className="usr-acts">
                        <button className="btn g sm danger" disabled={busy}
                                onClick={() => remove(m.id, true)}>
                          احذف نهائيًا
                        </button>
                        <button className="btn g sm" disabled={busy}
                                onClick={() => setDoomed(null)}>ألغِ</button>
                      </div>
                    </section>
                  )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {merging ? null : adding ? (
        <form className="admin-card admin-seed" onSubmit={add}>
          <div className="admin-card-t">مادة جديدة في {promo.name}</div>
          <input
            className="admin-input"
            dir="ltr"
            autoFocus
            placeholder="ANATOMIE"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="اسم المادة بالفرنسية"
          />
          <div className="imp-kinds">
            {SEMESTERS.map((s) => (
              <button
                type="button"
                key={s}
                className={`imp-kind${semester === s ? ' on' : ''}`}
                onClick={() => setSemester(s)}
              >
                <span dir="ltr">{s}</span>
              </button>
            ))}
          </div>
          <p className="admin-card-b">الاسم بالفرنسية، كما يكتبه الأساتذة.</p>
          {error && <div className="admin-err">{error}</div>}
          <div className="usr-acts">
            <button className="btn p sm" disabled={busy || !name.trim()}>أضف</button>
            <button type="button" className="btn g sm" onClick={() => setAdding(false)}>ألغِ</button>
          </div>
        </form>
      ) : (
        <button className="admin-card admin-import" onClick={() => setAdding(true)}>
          <div className="admin-import-ic"><Icon name="plus" size={22} /></div>
          <div className="grow ct-start">
            <div className="admin-card-t">أضف مادة</div>
            <div className="admin-card-b">مادة جديدة في {promo.name}</div>
          </div>
        </button>
      )}
    </div>
  );
}

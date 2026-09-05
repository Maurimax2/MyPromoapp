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

export default function ModuleScreen({ promo, modules, files }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [semester, setSemester] = useState('S1');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

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
      <Link href="/admin/content" className="admin-bar ct-back">
        <span><Icon name="chev" size={15} /> {promo.name}</span>
        <span>{modules.length} مادة</span>
      </Link>

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
                  <Link key={m.id} href={`/admin/content?module=${m.id}`} className="ctm">
                    <div className="grow">
                      <div className="ctm-t" dir="ltr">{m.name}</div>
                      <div className="ctm-b ltr">{files[m.id] || 0} ملف</div>
                    </div>
                    <Icon name="chev" size={18} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {adding ? (
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

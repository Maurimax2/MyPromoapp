'use client';

// The years.
//
// Six to begin with, because six is what UNEM has — a fact about today, not a
// rule. A year can be added, and a year can be taken away: deleting one takes
// its subjects, their files and every question with them, so the row asks
// once, counts what would go, and asks again.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

export default function PromoScreen({ promos, subjects, files, canDelete }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [doomed, setDoomed] = useState(null);

  const remove = async (id, confirm) => {
    setBusy(true); setError('');
    let res, data;
    try {
      res = await fetch('/api/admin/promos', {
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

  if (!promos.length) {
    return (
      <div className="admin-body">
        <section className="admin-card admin-seed">
          <div className="admin-card-t">قاعدة البيانات فارغة</div>
          <p className="admin-card-b">
            شغّل ملف <code>supabase/schema.sql</code> في Supabase أولًا — هو الذي
            ينشئ السنوات الست.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-bar"><span>السنوات</span><span>{promos.length}</span></div>

      {error && <div className="admin-err">{error}</div>}

      <div className="admin-rows">
        {promos.map((p) => (
          <div key={p.id}>
          <div className="ctm-row">
            <Link href={`/admin/content?promo=${p.id}`} className="ctm grow">
              <span className="ctm-badge" style={{ background: p.badge }}>{p.name}</span>
              <div className="grow">
                <div className="ctm-t">{p.label}</div>
                <div className="ctm-b">
                  {subjects[p.id]
                    ? `${subjects[p.id]} مادة · ${files[p.id]} ملف`
                    : 'لا مواد بعد'}
                </div>
              </div>
              <Icon name="chev" size={18} />
            </Link>
            {canDelete && (
              <button
                className="ctm-del"
                aria-label={`احذف ${p.name}`}
                disabled={busy}
                onClick={() => remove(p.id, false)}
              >
                <Icon name="trash" size={17} />
              </button>
            )}
          </div>

          {/* Beside the year it is about, not at the foot of the list. */}
          {doomed?.id === p.id && (
            <section className="admin-card admin-seed danger-card">
              <div className="admin-card-t">احذف <span dir="ltr">{doomed.name}</span>؟</div>
              <p className="admin-card-b">
                سيُحذف معها {doomed.subjects ?? '؟'} مادة و{doomed.documents ?? '؟'} ملفًا وكل
                أسئلتها.
                {doomed.people > 0 && ` و${doomed.people} طالبًا في هذه السنة سيبقون بلا محتوى.`}
                {' '}لا رجعة في هذا.
              </p>
              <div className="usr-acts">
                <button className="btn g sm danger" disabled={busy}
                        onClick={() => remove(p.id, true)}>
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
    </div>
  );
}

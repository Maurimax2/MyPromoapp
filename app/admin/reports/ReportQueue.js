'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';

const TABS = [
  { id: 'open',      label: 'مفتوح' },
  { id: 'actioned',  label: 'أُزيل' },
  { id: 'dismissed', label: 'رُفض البلاغ' },
];

const WHAT = { post: 'منشور', comment: 'ردّ', note: 'ملخص', profile: 'حساب', room: 'غرفة' };
const who = (p) => p?.full_name || p?.email?.split('@')[0] || 'طالب';

export default function ReportQueue({ reports, state, counts, canAct }) {
  const router = useRouter();
  const [rows, setRows] = useState(reports);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const act = async (id, action) => {
    setBusy(id); setError('');
    const res = await fetch('/api/report', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(null);
    if (!res.ok) { setError(data.error || `تعذّر التنفيذ (${res.status})`); return; }
    setRows((r) => r.filter((x) => x.id !== id));
    router.refresh();
  };

  return (
    <div className="admin-body">
      <div className="rev-tabs">
        {TABS.map((t) => (
          <button key={t.id} className={`rev-tab${state === t.id ? ' on' : ''}`}
            onClick={() => router.push(`/admin/reports?state=${t.id}`)}>
            {t.label}<span>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      {error && <div className="admin-err">{error}</div>}

      {!rows.length ? (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">لا بلاغات</div>
          <p className="admin-card-b">
            {state === 'open' ? 'لا شيء بانتظار المراجعة.' : 'القائمة فارغة.'}
          </p>
        </section>
      ) : (
        <div className="admin-rows">
          {rows.map((r) => (
            <div key={r.id} className={`rep${busy === r.id ? ' off' : ''}`}>
              <div className="rep-top">
                <span className="pill warn">{WHAT[r.target_type] || r.target_type}</span>
                <span className="grow rep-by">بلاغ من {who(r.reporter)}</span>
              </div>

              {r.target ? (
                <div className="rep-body">
                  <b>{who(r.target.author)}</b>
                  <p>{r.target.body || '—'}</p>
                  {r.target.removed && <span className="pill grey">مخفي بالفعل</span>}
                </div>
              ) : (
                <div className="rep-body"><p>المحتوى غير موجود — ربما حُذف.</p></div>
              )}

              {r.reason && <div className="rep-why">السبب: {r.reason}</div>}

              {canAct && state === 'open' && (
                <div className="usr-acts">
                  <button className="btn g sm danger" onClick={() => act(r.id, 'remove')}>
                    <Icon name="x" size={16} /> أخفِ المحتوى
                  </button>
                  <button className="btn g sm" onClick={() => act(r.id, 'dismiss')}>
                    لا مشكلة فيه
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

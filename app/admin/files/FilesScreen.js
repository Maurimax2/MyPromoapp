'use client';

import { useState } from 'react';

const label = (m) => `${String(m.promo || '').toUpperCase()} · ${m.name}${m.semester ? ` · ${m.semester}` : ''}`;

export default function FilesScreen({ modules }) {
  // id → { state: 'idle'|'running'|'done'|'error', checked, total, closed: [], unknown, error }
  const [scan, setScan] = useState({});
  const [open, setOpen] = useState(null);
  const [all, setAll] = useState(false);

  const put = (id, patch) => setScan((s) => ({ ...s, [id]: { ...(s[id] || {}), ...patch } }));

  const run = async (m) => {
    put(m.id, { state: 'running', checked: 0, total: 0, closed: [], unknown: 0, error: '' });
    let offset = 0, closed = [], unknown = 0, total = 0;
    for (;;) {
      let data;
      try {
        const res = await fetch(`/api/admin/files/check?module=${encodeURIComponent(m.id)}&offset=${offset}`);
        data = await res.json();
        if (!res.ok) throw new Error(data.error || `خطأ ${res.status}`);
      } catch (e) {
        put(m.id, { state: 'error', error: e.message });
        return;
      }
      total = data.total;
      closed = closed.concat(data.closed);
      unknown += data.unknown;
      offset += data.checked;
      put(m.id, { state: data.done ? 'done' : 'running', checked: offset, total, closed, unknown });
      if (data.done || !data.checked) return;
    }
  };

  const runAll = async () => {
    setAll(true);
    for (const m of modules) await run(m);
    setAll(false);
  };

  const busy = all || Object.values(scan).some((s) => s.state === 'running');
  const closedTotal = Object.values(scan).reduce((n, s) => n + (s.closed?.length || 0), 0);

  return (
    <div className="admin-body">
      <section className="admin-card admin-seed">
        <div className="admin-card-t">ملفات لا يفتحها الطلبة</div>
        <p className="admin-card-b">
          يسأل Google عن كل ملف كما يسأل عنه غريب بلا حساب. الملف «المغلق» غير مشارك مع «أي شخص لديه الرابط»،
          فيرى الطالب شاشة طلب إذن بدل المحاضرة.
        </p>
        <button className="btn p" onClick={runAll} disabled={busy}>
          {all ? 'جارٍ فحص كل المواد…' : 'افحص كل المواد'}
        </button>
        {closedTotal > 0 && !busy && (
          <p className="admin-card-b" style={{ color: 'var(--wrong)', fontWeight: 600 }}>
            المجموع المغلق: {closedTotal} ملفًا
          </p>
        )}
      </section>

      {modules.map((m) => {
        const s = scan[m.id];
        const n = s?.closed?.length || 0;
        return (
          <section key={m.id} className="admin-card" style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="grow" style={{ minWidth: 0 }}>
                <div className="admin-card-t" dir="auto" style={{ fontSize: 15 }}>{label(m)}</div>
                <div className="admin-card-b">
                  {!s || s.state === 'idle' ? 'لم يُفحص بعد'
                    : s.state === 'running' ? `جارٍ الفحص… ${s.checked} من ${s.total}`
                    : s.state === 'error' ? s.error
                    : s.total === 0 ? 'لا ملفات'
                    : n === 0 ? `كل الملفات مفتوحة (${s.total})${s.unknown ? ` · تعذّر التأكد من ${s.unknown}` : ''}`
                    : `${n} مغلق من ${s.total}${s.unknown ? ` · تعذّر التأكد من ${s.unknown}` : ''}`}
                </div>
              </div>
              <button className="btn g sm" style={{ width: 'auto', flex: 'none', padding: '0 20px' }}
                onClick={() => run(m)} disabled={busy}>افحص</button>
            </div>

            {n > 0 && (
              <>
                <button className="login-alt" style={{ justifySelf: 'start' }}
                  onClick={() => setOpen(open === m.id ? null : m.id)}>
                  {open === m.id ? 'أخفِ القائمة' : `اعرض الملفات المغلقة (${n})`}
                </button>
                {open === m.id && (
                  <ul dir="ltr" style={{ margin: 0, paddingInlineStart: 18, fontSize: 12.5, lineHeight: 1.9 }}>
                    {s.closed.map((f) => <li key={f.id}>{f.title}</li>)}
                  </ul>
                )}
              </>
            )}
          </section>
        );
      })}
    </div>
  );
}

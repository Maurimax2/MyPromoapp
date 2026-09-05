'use client';

// Who is let in.
//
// A row is a person: their email, the promo they will study in, and two
// buttons. The promo is chosen before approving, because approving without
// one lets a student into an app with nothing in it.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { PROMOS } from '@/lib/data';

const TABS = [
  { id: 'pending',  label: 'بانتظار' },
  { id: 'approved', label: 'أعضاء' },
  { id: 'refused',  label: 'مرفوض' },
];

const ROLES = [
  { id: 'student',   label: 'طالب' },
  { id: 'editor',    label: 'محرّر' },
  { id: 'marketing', label: 'تسويق' },
  { id: 'admin',     label: 'مشرف' },
];

export default function UsersScreen({ people, status, counts, canAct, meId }) {
  const router = useRouter();
  const [rows, setRows] = useState(people);
  const [busy, setBusy] = useState(null);

  const patch = async (id, body) => {
    setBusy(id);
    const r = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...body }),
    });
    setBusy(null);
    if (!r.ok) return;

    // A decided person leaves this list; a promo or role change stays in it.
    if (body.status) setRows((rs) => rs.filter((p) => p.id !== id));
    else setRows((rs) => rs.map((p) => (p.id === id ? { ...p, ...body } : p)));
    router.refresh();
  };

  return (
    <div className="admin-body">
      <div className="rev-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`rev-tab${status === t.id ? ' on' : ''}`}
            onClick={() => router.push(`/admin/users?status=${t.id}`)}
          >
            {t.label}<span>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      {!rows.length ? (
        <section className="admin-card admin-seed">
          <div className="admin-card-t">لا أحد هنا</div>
          <p className="admin-card-b">
            {status === 'pending'
              ? 'لا طلبات انضمام جديدة.'
              : 'القائمة فارغة.'}
          </p>
        </section>
      ) : (
        <div className="admin-rows">
          {rows.map((p) => (
            <div key={p.id} className={`usr${busy === p.id ? ' off' : ''}`}>
              <div className="usr-head">
                <div className="grow">
                  <div className="usr-name">{p.full_name || p.email.split('@')[0]}</div>
                  <div className="usr-mail" dir="ltr">{p.email}</div>
                </div>
                {p.role !== 'student' && <span className="pill">{
                  ROLES.find((r) => r.id === p.role)?.label || p.role
                }</span>}
              </div>

              {canAct && (
                <>
                  <div className="usr-promos">
                    {PROMOS.map((pr) => (
                      <button
                        key={pr.id}
                        className={`imp-kind${p.promo === pr.id ? ' on' : ''}`}
                        onClick={() => patch(p.id, { promo: pr.id })}
                      >
                        {pr.name}
                      </button>
                    ))}
                  </div>

                  {status === 'pending' ? (
                    <div className="usr-acts">
                      <button
                        className="btn p sm"
                        disabled={!p.promo || busy === p.id}
                        onClick={() => patch(p.id, { status: 'approved' })}
                      >
                        <Icon name="check" size={17} /> اقبل
                      </button>
                      <button
                        className="btn g sm"
                        disabled={busy === p.id}
                        onClick={() => patch(p.id, { status: 'refused' })}
                      >
                        ارفض
                      </button>
                    </div>
                  ) : (
                    <div className="usr-acts">
                      <select
                        className="admin-input sm"
                        value={p.role}
                        disabled={p.id === meId || p.role === 'owner'}
                        onChange={(e) => patch(p.id, { role: e.target.value })}
                      >
                        {ROLES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                      </select>
                      <button
                        className="btn g sm"
                        disabled={p.id === meId || busy === p.id}
                        onClick={() => patch(p.id, {
                          status: status === 'approved' ? 'refused' : 'approved',
                        })}
                      >
                        {status === 'approved' ? 'أوقف' : 'اقبل'}
                      </button>
                    </div>
                  )}
                </>
              )}

              {!canAct && <div className="usr-mail">للمشرفين فقط</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

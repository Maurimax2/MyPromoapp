'use client';

// Who is let in.
//
// A row is a person: their email, the promo they will study in, and two
// buttons. The promo is chosen before approving, because approving without
// one lets a student into an app with nothing in it.

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { PROMOS } from '@/lib/data-core';
import { whatsappLink } from '@/lib/identity';

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

export default function UsersScreen({ people, status, counts, canAct, meId, years = PROMOS, asks = [] }) {
  const router = useRouter();
  const [rows, setRows] = useState(people);
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const patch = async (id, body) => {
    setBusy(id); setError('');
    let r, data;
    try {
      r = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, ...body }),
      });
      data = await r.json().catch(() => ({}));
    } catch {
      setBusy(null); setError('لا اتصال بالخادم'); return;
    }
    setBusy(null);

    // Silence here was the bug: a refused call looked exactly like a button
    // that does nothing.
    if (!r.ok) { setError(data.error || `تعذّر الحفظ (${r.status})`); return; }

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

      {error && <div className="admin-err">{error}</div>}

      {/* Forgotten passwords, above every tab: somebody locked out is waiting
          on us, whichever list we came to look at. */}
      {asks.length > 0 && (
        <section className="admin-card usr-asks">
          <div className="admin-card-t">نسوا كلمة السر <span className="pill">{asks.length}</span></div>
          <div className="admin-rows">
            {asks.map((p) => (
              <div key={p.id} className="usr">
                <div className="usr-head">
                  <div className="grow">
                    <div className="usr-name">{p.full_name || p.email.split('@')[0]}</div>
                    <div className="usr-mail" dir="ltr">{p.email}</div>
                    {(p.username || p.matricule) && (
                      <div className="usr-mail" dir="ltr">
                        {[p.username && `@${p.username}`, p.matricule].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    <div className="usr-mail">
                      طلب {when(p.at)}{p.typed ? <> — كتب <span dir="auto">«{p.typed}»</span></> : null}
                    </div>
                  </div>
                  {p.promo && <span className="pill">{p.promo.toUpperCase()}</span>}
                </div>
                {p.phone && (
                  <a className="usr-wa" href={whatsappLink(p.phone)} target="_blank" rel="noreferrer">
                    <Icon name="msg" size={16} /> <span dir="ltr">{p.phone}</span> — افتح في واتساب
                  </a>
                )}
                {canAct && <NewPassword person={p} />}
              </div>
            ))}
          </div>
        </section>
      )}

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
                  {(p.username || p.matricule) && (
                    <div className="usr-mail" dir="ltr">
                      {[p.username && `@${p.username}`, p.matricule].filter(Boolean).join(' · ')}
                    </div>
                  )}
                </div>
                {p.role !== 'student' && <span className="pill">{
                  ROLES.find((r) => r.id === p.role)?.label || p.role
                }</span>}
              </div>

              {/* A first-year has no faculty number: the WhatsApp number is
                  what gets checked against the faculty's groups. */}
              {p.phone && (
                <a className="usr-wa" href={whatsappLink(p.phone)} target="_blank" rel="noreferrer">
                  <Icon name="msg" size={16} /> <span dir="ltr">{p.phone}</span> — افتح في واتساب
                </a>
              )}

              {canAct && (
                <>
                  <div className="usr-promos">
                    {years.map((pr) => (
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

                  {/* For the student who messages us instead of pressing the
                      button: the same answer from their row. */}
                  {status === 'approved' && p.id !== meId && <NewPassword person={p} />}
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

const when = (at) => new Date(at).toLocaleString('ar', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
});

// A temporary password, made on a tap and shown once. Nobody can read the old
// one — Supabase keeps only a hash — so the answer is always a new one, which
// the student is asked to replace when they sign in with it.
function NewPassword({ person }) {
  const router = useRouter();
  const [state, setState] = useState('idle');   // idle | ask | busy | done
  const [temp, setTemp] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const make = async () => {
    setState('busy'); setError('');
    try {
      const r = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: person.id, reset: true }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) { setError(data.error || `تعذّر (${r.status})`); setState('idle'); return; }
      setTemp(data.temp); setState('done');
    } catch {
      setError('لا اتصال بالخادم'); setState('idle');
    }
  };

  // What the student is sent: Arabic, like everything sent to somebody else.
  const message = `مرحبًا، هذه كلمة سر مؤقتة لحسابك في MyPromo:\n${temp}\nادخل بها ببريدك ${person.email}، وسيُطلب منك اختيار كلمة سر جديدة.`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(temp); setCopied(true); } catch { /* shown anyway */ }
  };

  if (state === 'done') {
    return (
      <div className="usr-temp">
        <div className="usr-mail">كلمة السر المؤقتة — تظهر مرة واحدة:</div>
        <div className="usr-temp-pw" dir="ltr">{temp}</div>
        <div className="usr-acts">
          <button className="btn g sm" onClick={copy}>{copied ? 'نُسخت' : 'انسخ'}</button>
          {person.phone && (
            <a className="btn p sm" target="_blank" rel="noreferrer"
              href={`${whatsappLink(person.phone)}?text=${encodeURIComponent(message)}`}>
              <Icon name="msg" size={16} /> أرسلها على واتساب
            </a>
          )}
        </div>
        <button className="btn g sm usr-temp-close" onClick={() => router.refresh()}>تمّ</button>
      </div>
    );
  }

  return (
    <>
      {state === 'ask' || state === 'busy' ? (
        <div className="usr-acts">
          <button className="btn p sm" disabled={state === 'busy'} onClick={make}>
            {state === 'busy' ? '…' : 'نعم، اصنع كلمة سر مؤقتة'}
          </button>
          <button className="btn g sm" disabled={state === 'busy'} onClick={() => setState('idle')}>إلغاء</button>
        </div>
      ) : (
        <button className="btn g sm usr-reset" onClick={() => setState('ask')}>
          <Icon name="lock" size={16} /> كلمة سر مؤقتة
        </button>
      )}
      {error && <div className="admin-err">{error}</div>}
    </>
  );
}

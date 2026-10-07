'use client';

// The rooms your promo has open.

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';

export default function RoomList({ rooms, secret = [], subjects, me }) {
  const t = useT();
  const router = useRouter();
  const [making, setMaking] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [module, setModule] = useState('');
  const [secretly, setSecretly] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const open = async (e) => {
    e.preventDefault();
    if (!title.trim() || busy) return;
    setBusy(true); setError('');
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title, topic, module: module || null, private: secretly }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || t('تعذّر الفتح ({status})', { status: res.status })); return; }
    router.push(`/rooms/${data.id}`);
  };

  const join = async (id) => {
    setBusy(true); setError('');
    const res = await fetch('/api/rooms', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, join: true }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || t('تعذّر الانضمام ({status})', { status: res.status })); return; }
    router.push(`/rooms/${id}`);
  };

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/feed" className="icobtn" aria-label={t('رجوع')}><Icon name="chevR" size={19} /></Link>
          <div className="grow">
            <div className="head-t">{t('غرف الدراسة')}</div>
            <div className="head-s">{rooms.length ? t('{length} مفتوحة الآن', { length: rooms.length }) : t('لا غرف مفتوحة')}</div>
          </div>
        </div>
      </header>

      <div className="scroll">
        {error && <div className="admin-err">{error}</div>}

        {making ? (
          <form className="admin-card admin-seed" onSubmit={open}>
            <div className="admin-card-t">{t('غرفة جديدة')}</div>
            <input className="admin-input" autoFocus placeholder={t('مراجعة قبل امتحان الثلاثاء')}
              value={title} onChange={(e) => setTitle(e.target.value)} aria-label={t('اسم الغرفة')} />
            <input className="admin-input" placeholder={t('ماذا ستراجعون؟ (اختياري)')}
              value={topic} onChange={(e) => setTopic(e.target.value)} aria-label={t('الموضوع')} />
            {/* Public: listed for your year. Private: nobody sees it, and it is
                entered with a link you send. */}
            <div className="rl-kind" role="radiogroup" aria-label={t('نوع الغرفة')}>
              <button type="button" role="radio" aria-checked={!secretly} data-on={!secretly} onClick={() => setSecretly(false)}>
                <Icon name="friends" size={17} />
                <b>{t('عامة')}</b>
                <s>{t('تظهر لدفعتك ويدخلها من يشاء')}</s>
              </button>
              <button type="button" role="radio" aria-checked={secretly} data-on={secretly} onClick={() => setSecretly(true)}>
                <Icon name="lock" size={17} />
                <b>{t('خاصة')}</b>
                <s>{t('لا تظهر لأحد — تدخلها برابط ترسله لأصدقائك')}</s>
              </button>
            </div>
            <select className="admin-input" value={module} onChange={(e) => setModule(e.target.value)}>
              <option value="">{t('بلا مادة')}</option>
              {subjects.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <div className="usr-acts">
              <button className="btn p sm" disabled={busy || !title.trim()}>{secretly ? t('افتح غرفة خاصة') : t('افتح')}</button>
              <button type="button" className="btn g sm" onClick={() => setMaking(false)}>{t('ألغِ')}</button>
            </div>
          </form>
        ) : (
          <button className="admin-card admin-import" onClick={() => setMaking(true)}>
            <div className="admin-import-ic"><Icon name="plus" size={22} /></div>
            <div className="grow ct-start">
              <div className="admin-card-t">{t('افتح غرفة')}</div>
              <div className="admin-card-b">{t('ادرسوا معًا في نفس الوقت')}</div>
            </div>
          </button>
        )}

        {secret.length > 0 && (
          <>
            <div className="admin-bar"><span>{t('غرفك الخاصة')}</span><span>{secret.length}</span></div>
            {secret.map((r) => (
              <Link key={r.id} href={`/rooms/${r.id}`} className="room rl-secret">
                <div className="room-top">
                  <span className="rl-lock"><Icon name="lock" size={16} /></span>
                  <div className="grow">
                    <div className="room-t">{r.title}</div>
                    {r.topic && <div className="room-b" dir="auto">{r.topic}</div>}
                  </div>
                  <Icon name="chev" size={16} />
                </div>
              </Link>
            ))}
            {rooms.length > 0 && <div className="admin-bar"><span>{t('غرف دفعتك')}</span><span>{rooms.length}</span></div>}
          </>
        )}

        {rooms.map((r) => (
          <div key={r.id} className="room">
            <div className="room-top">
              <div className="grow">
                <div className="room-t">{r.title}</div>
                {r.topic && <div className="room-b" dir="auto">{r.topic}</div>}
              </div>
              <span className="pill">{r.members}/{r.capacity}</span>
            </div>
            <div className="room-foot">
              <span className="room-host">
                {r.host?.full_name || r.host?.email?.split('@')[0] || t('طالب')}
                {r.host?.id === me.id ? t(' · أنت') : ''}
              </span>
              {r.joined
                ? <Link href={`/rooms/${r.id}`} className="btn p sm">{t('ادخل')}</Link>
                : <button className="btn g sm" disabled={busy} onClick={() => join(r.id)}>{t('انضم')}</button>}
            </div>
          </div>
        ))}

        {!rooms.length && !making && (
          <div className="empty">
            <div className="tile tint-olive"><Icon name="person" size={24} /></div>
            <div className="empty-t">{t('لا غرف مفتوحة')}</div>
            <div className="empty-b">{t('افتح واحدة وادعُ دفعتك للمراجعة معك.')}</div>
          </div>
        )}
      </div>
    </>
  );
}

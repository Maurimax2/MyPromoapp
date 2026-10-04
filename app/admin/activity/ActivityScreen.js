'use client';

// النشاط — a live look at the app: who is here, doing what, and how many have
// ever come in. Re-read every fifteen seconds while the tab is in front.

import { useEffect, useState } from 'react';
import { SCREENS, PLATFORMS } from '@/lib/activity';

const SHORT = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const dow = (day) => SHORT[new Date(`${day}T12:00:00Z`).getUTCDay()];

export default function ActivityScreen({ initial }) {
  const [s, setS] = useState(initial);
  const [late, setLate] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      if (document.visibilityState !== 'visible') return;
      try {
        const res = await fetch('/api/admin/activity', { cache: 'no-store' });
        if (res.ok && alive) { setS(await res.json()); setLate(false); } else if (alive) setLate(true);
      } catch { if (alive) setLate(true); }
    };
    const t = setInterval(load, 15000);
    document.addEventListener('visibilitychange', load);
    return () => { alive = false; clearInterval(t); document.removeEventListener('visibilitychange', load); };
  }, []);

  if (!s?.ready) {
    return (
      <div className="admin-body">
        <div className="admin-err">
          التتبّع غير مفعّل بعد — الصق الملف <bdi dir="ltr">supabase/activity.sql</bdi> في Supabase
          (SQL editor) ثم افتح هذه الصفحة من جديد.
        </div>
      </div>
    );
  }

  const peak = Math.max(1, ...s.days.map((d) => d.people));
  const most = Math.max(1, ...s.byScreen.map((r) => r.n));

  return (
    <div className="admin-body act">
      {late && <div className="admin-err">تعذّر التحديث — سنعيد المحاولة.</div>}

      <div className="act-tiles">
        <div className="act-tile live">
          <i className="act-dot" />
          <b>{s.online}</b>
          <span>متصل الآن</span>
        </div>
        <div className="act-tile">
          <b>{s.openedToday}</b>
          <span>فتحوا التطبيق اليوم</span>
          <small>{s.opensToday} مرة</small>
        </div>
        <div className="act-tile">
          <b>{s.openedWeek}</b>
          <span>خلال 7 أيام</span>
        </div>
        <div className="act-tile">
          <b>{s.everOpened}<em> / {s.accounts}</em></b>
          <span>دخلوا التطبيق من حسابات</span>
          <small>{s.never} لم يدخلوا بعد</small>
        </div>
      </div>

      <div className="admin-bar"><span>ماذا يفعلون الآن</span><span>{s.online}</span></div>
      <section className="admin-card admin-seed act-now">
        {s.byScreen.length === 0 && <p className="admin-card-b">لا أحد على التطبيق في هذه اللحظة.</p>}
        {s.byScreen.map((r) => (
          <div key={r.screen} className="act-row">
            <div className="act-row-top">
              <b>{SCREENS[r.screen] || SCREENS.other}</b>
              <span>{r.n}</span>
            </div>
            <span className="act-bar"><i style={{ width: `${Math.max(6, (r.n / most) * 100)}%` }} /></span>
            <small dir="auto">
              {r.people.map((p) => p.name).join('، ')}{r.n > r.people.length ? ` و${r.n - r.people.length} آخرون` : ''}
            </small>
          </div>
        ))}
      </section>

      <div className="admin-bar"><span>حسب السنة</span><span>{s.years.length}</span></div>
      <section className="admin-card admin-seed act-years">
        <div className="act-yr head">
          <span />
          <span>حسابات</span><span>دخلوا</span><span>اليوم</span><span>الآن</span>
        </div>
        {s.years.map((y) => (
          <div key={y.promo} className="act-yr">
            <b dir="ltr">{String(y.promo).toUpperCase()}</b>
            <span>{y.accounts}</span>
            <span>{y.opened}</span>
            <span>{y.today}</span>
            <span className={y.online ? 'on' : ''}>{y.online}</span>
          </div>
        ))}
      </section>

      <div className="admin-bar"><span>آخر 14 يومًا</span><span>من فتحوا التطبيق</span></div>
      <section className="admin-card admin-seed">
        <div className="act-days">
          {s.days.map((d) => (
            <div key={d.day} className="act-day" title={`${d.day}: ${d.people} (${d.opens} مرة)`}>
              <em>{d.people || ''}</em>
              <i style={{ height: `${Math.max(3, (d.people / peak) * 100)}%` }} />
              <small>{dow(d.day)}</small>
            </div>
          ))}
        </div>
      </section>

      {Object.keys(s.platforms).length > 0 && (
        <section className="admin-card admin-seed act-plat">
          {Object.entries(s.platforms).map(([k, n]) => (
            <span key={k}><b>{n}</b> {PLATFORMS[k] || k}</span>
          ))}
        </section>
      )}

      <p className="act-note" suppressHydrationWarning>
        يحسب التتبّع من لحظة تفعيله{s.startedAt ? ` (${new Date(s.startedAt).toLocaleDateString('ar')})` : ''}؛
        ما سبقه غير مسجَّل. «متصل» يعني أن التطبيق مفتوح أمامه خلال آخر دقيقتين.
      </p>
    </div>
  );
}

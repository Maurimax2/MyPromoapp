'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Icon from '@/components/Icon';

// ساعدنا في بناء MyPromo — five questions, one at a time.
//
// One long form is a wall, and a wall on a phone opened from WhatsApp is a
// page nobody finishes. So it is read the way the app itself is: one question,
// a bar that says how far along you are, and answers that are kept when you
// step back.
//
// The interface is Arabic. What a student writes is theirs and carries
// `dir="auto"`, because half of them will answer in French.

const ENDPOINT = '/api/feedback';

// What is stored is the app's own name for the thing (the admin panel counts
// these); what is shown is how a student says it.
const NEEDS = [
  { v: 'QCM', say: 'QCM', icon: 'check' },
  { v: 'Anatomie 3D', say: 'Anatomie 3D', icon: 'heart' },
  { v: "Groupes d'étude", say: 'غرف الدراسة', icon: 'video' },
  { v: 'Duels', say: 'التحدّيات', icon: 'swords' },
  { v: 'Résumés', say: 'الملخّصات' },
  { v: 'Flashcards', say: 'Flashcards' },
  { v: 'IA', say: 'مساعد ذكي (IA)' },
  { v: 'Autre', say: 'شيء آخر' },
];

const STEPS = 5;

export default function Form({ tracks }) {
  const [step, setStep] = useState(1);
  const [promo, setPromo] = useState('');
  const [needs, setNeeds] = useState([]);
  const [pain, setPain] = useState('');
  const [wish, setWish] = useState('');
  const [reach, setReach] = useState(null);       // true | false | null
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [shared, setShared] = useState('');
  const [source, setSource] = useState('');
  const head = useRef(null);

  // Which WhatsApp group the link was posted in, when the link says:
  // /feedback?from=pcem2-groupe1. Never a person, never an address.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      setSource((q.get('from') || q.get('utm_source') || '').slice(0, 120));
    } catch { /* fine */ }
  }, []);

  const toggle = (n) =>
    setNeeds((all) => (all.includes(n) ? all.filter((x) => x !== n) : [...all, n]));

  // The one thing that has to be answered. Everything else is a question a
  // student may simply not have an answer to.
  const blocked = step === 1 && !promo;

  const go = (to) => {
    setError('');
    setStep(to);
    head.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const send = async () => {
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          promo, needs, pain: pain.trim(), wish: wish.trim(),
          reach: reach === true,
          name: reach ? name.trim() : '',
          phone: reach ? phone.trim() : '',
          source,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
      head.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } catch {
      setError('تعذّر الإرسال. تحقّق من اتصالك ثم أعد المحاولة.');
    } finally {
      setSending(false);
    }
  };

  // Passing it on is the most useful thing anybody can do after answering.
  const link = typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '/feedback';
  const message = `شاركنا رأيك في MyPromo — تطبيق لطلبة FMPOS (دقيقة واحدة): ${link}`;
  const share = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'MyPromo', text: message }); return; }
      await navigator.clipboard.writeText(message);
      setShared('نُسخ الرابط — الصقه في مجموعة دفعتك');
    } catch { /* closed the sheet: nothing to say */ }
  };

  if (done) {
    return (
      <div className="lp-card lp-done" ref={head}>
        <span className="lp-pop"><Image src="/feedback/heart.webp" alt="" width={72} height={72} /></span>
        <h2>وصلنا رأيك</h2>
        <p>شكرًا لأنك تبني MyPromo معنا.</p>
        <p className="lp-muted">ساعدنا أكثر: أرسل الرابط لدفعتك.</p>
        <div className="lp-share">
          <button type="button" className="lp-btn primary" onClick={share}>
            <Icon name="share" size={18} /> شارك الرابط
          </button>
          <a className="lp-btn ghost" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
            أرسله على واتساب
          </a>
        </div>
        {shared && <p className="lp-hint" role="status">{shared}</p>}
      </div>
    );
  }

  return (
    <div className="lp-card" ref={head}>
      <div className="lp-steps">
        <b>ساعدنا في بناء MyPromo</b>
        <span className="lp-count" dir="ltr">{step} / {STEPS}</span>
      </div>
      <div className="lp-bar" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS}
        aria-valuenow={step} aria-label="تقدّمك في الاستبيان">
        <i style={{ width: `${(step / STEPS) * 100}%` }} />
      </div>

      {step === 1 && (
        <div className="lp-step" key="s1">
          <h3 className="lp-q">أولًا، في أي سنة أنت؟</h3>
          {tracks.map((t) => (
            <div key={t.id} className="lp-group">
              <span className="lp-group-t">{t.name}</span>
              <div className="lp-opts years">
                {t.years.map((p) => (
                  <button key={p.id} type="button" className="lp-opt year" aria-pressed={promo === p.id}
                    onClick={() => setPromo(p.id)}>
                    <span dir="ltr">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="lp-step" key="s2">
          <h3 className="lp-q">أيّ ميزة تحتاجها أكثر؟</h3>
          <p className="lp-hint">اختر ما شئت.</p>
          <div className="lp-opts">
            {NEEDS.map((n) => (
              <button key={n.v} type="button" className="lp-opt" aria-pressed={needs.includes(n.v)} onClick={() => toggle(n.v)}>
                {n.icon
                  ? <Image src={`/feedback/${n.icon}.webp`} alt="" width={26} height={26} />
                  : <span className="lp-tick">{needs.includes(n.v) && <Icon name="check" size={13} />}</span>}
                <span dir="auto">{n.say}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="lp-step" key="s3">
          <label className="lp-q" htmlFor="lp-pain">ما أكثر شيء يزعجك أثناء المراجعة؟</label>
          <textarea id="lp-pain" className="lp-ta" dir="auto" value={pain} onChange={(e) => setPain(e.target.value)}
            placeholder="مثلًا: الملفات مبعثرة في المجموعات، لا أجد QCM لمحاضرة معيّنة…" />
        </div>
      )}

      {step === 4 && (
        <div className="lp-step" key="s4">
          <label className="lp-q" htmlFor="lp-wish">لو أضفنا ميزة واحدة من أجلك، ماذا تكون؟</label>
          <textarea id="lp-wish" className="lp-ta" dir="auto" value={wish} onChange={(e) => setWish(e.target.value)}
            placeholder="اكتب ما يخطر ببالك…" />
        </div>
      )}

      {step === 5 && (
        <div className="lp-step" key="s5">
          <h3 className="lp-q">نخبرك يوم الإطلاق؟</h3>
          <div className="lp-opts two">
            <button type="button" className="lp-opt" aria-pressed={reach === true} onClick={() => setReach(true)}>نعم، أخبروني</button>
            <button type="button" className="lp-opt" aria-pressed={reach === false} onClick={() => setReach(false)}>لا، شكرًا</button>
          </div>
          {reach === true && (
            <div className="lp-fields">
              <div className="lp-field">
                <label htmlFor="lp-name">الاسم <span>(اختياري)</span></label>
                <input id="lp-name" className="lp-inp" dir="auto" value={name}
                  onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div className="lp-field">
                <label htmlFor="lp-wa">رقم الواتساب <span>(اختياري)</span></label>
                <input id="lp-wa" className="lp-inp" dir="ltr" inputMode="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+222 …" />
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="lp-err" role="alert">{error}</p>}

      <div className="lp-nav">
        {step > 1 && <button type="button" className="lp-btn ghost" onClick={() => go(step - 1)}>رجوع</button>}
        {step < STEPS ? (
          <button type="button" className="lp-btn primary" disabled={blocked} onClick={() => go(step + 1)}>
            {(step === 3 && !pain.trim()) || (step === 4 && !wish.trim()) ? 'تخطَّ' : 'التالي'}
          </button>
        ) : (
          <button type="button" className="lp-btn gold" disabled={sending} onClick={send}>
            {sending ? 'جاري الإرسال…' : 'أرسل رأيك'}
          </button>
        )}
      </div>
      {blocked && <p className="lp-hint center">اختر سنتك للمتابعة</p>}
    </div>
  );
}

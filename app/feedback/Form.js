'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { badgeOf } from '@/lib/data';

// ساعدنا نبني MyPromo — six questions, one at a time.
//
// One long form is a wall, and a wall on a phone opened from WhatsApp is a
// page nobody finishes. So it is read the way the app itself is: one question,
// a bar that says how far along you are, and answers that are kept when you
// step back.
//
// The interface is Arabic. What a student writes is theirs and carries
// `dir="auto"`, because half of them will answer in French.

const ENDPOINT = '/api/feedback';

// What a student needs while revising. These are the app's own words for the
// things it holds — the same names the screens use — so an answer here points
// at something real.
const NEEDS = [
  'QCM', 'Flashcards', 'Résumés', 'IA', "Groupes d'étude", 'Autre',
];

const STEPS = 5;

export default function Form({ promos }) {
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
  const head = useRef(null);

  const toggle = (n) =>
    setNeeds((all) => (all.includes(n) ? all.filter((x) => x !== n) : [...all, n]));

  // The one thing that has to be answered. Everything else is a question a
  // student may simply not have an answer to, and refusing to let them past
  // is how a form gets abandoned at step three.
  const blocked = step === 1 && !promo;

  const go = (to) => {
    setError('');
    setStep(to);
    // The card, not the top of the page: the question they are now on should
    // be the thing in front of them.
    head.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const send = async () => {
    if (sending) return;                       // no second submission
    setSending(true);
    setError('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          promo,
          needs,
          pain: pain.trim(),
          wish: wish.trim(),
          reach: reach === true,
          name: reach ? name.trim() : '',
          phone: reach ? phone.trim() : '',
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setError('تعذّر الإرسال. تحقّق من اتصالك ثم أعد المحاولة.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="pl-card" id="form">
        <div className="pl-done">
          <span className="pl-pop"><Logo size={62} /></span>
          <h2>وصلنا رأيك ❤️</h2>
          <p>شكرًا لأنك تساعدنا نبني MyPromo.</p>
          <p style={{ marginTop: 10 }}>هذا التطبيق لكم… ولذلك نريد أن نسمع منكم.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-card" id="form" ref={head}>
      <div className="pl-steps">
        <b>ساعدنا نبني MyPromo</b>
        <span className="pl-grow" />
        <span className="pl-count" dir="ltr">{step} / {STEPS}</span>
      </div>
      <div className="pl-bar" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS}
        aria-valuenow={step} aria-label="تقدّمك في الاستبيان">
        <i style={{ width: `${(step / STEPS) * 100}%` }} />
      </div>

      {step === 1 && (
        <div className="pl-step" key="s1">
          <h3 className="pl-q">أولاً، من أي Promo أنت؟</h3>
          <div className="pl-opts">
            {promos.map((p) => (
              <button key={p.id} type="button" className="pl-opt"
                data-on={promo === p.id} onClick={() => setPromo(p.id)}>
                <span className="pl-dotc" style={{ background: badgeOf(p) }} />
                <span dir="ltr">{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="pl-step" key="s2">
          <h3 className="pl-q">ما أكثر شيء تحتاجه أثناء المراجعة؟</h3>
          <div className="pl-opts">
            {NEEDS.map((n) => (
              <button key={n} type="button" className="pl-opt"
                aria-pressed={needs.includes(n)} onClick={() => toggle(n)}>
                <span className="pl-tick">
                  {needs.includes(n) && <Icon name="check" size={13} />}
                </span>
                <span dir="auto">{n}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="pl-step" key="s3">
          <h3 className="pl-q">ما أكثر شيء يزعجك أثناء المراجعة؟</h3>
          <textarea className="pl-ta" dir="auto" value={pain} onChange={(e) => setPain(e.target.value)}
            aria-label="ما أكثر شيء يزعجك أثناء المراجعة؟"
            placeholder="مثلاً: صعوبة العثور على QCM، كثرة الملفات، عدم تنظيم الدروس..." />
        </div>
      )}

      {step === 4 && (
        <div className="pl-step" key="s4">
          <h3 className="pl-q">ما الميزة التي تتمنى وجودها في MyPromo؟</h3>
          <textarea className="pl-ta" dir="auto" value={wish} onChange={(e) => setWish(e.target.value)}
            aria-label="ما الميزة التي تتمنى وجودها في MyPromo؟"
            placeholder="اكتب ما يخطر ببالك..." />
        </div>
      )}

      {step === 5 && (
        <div className="pl-step" key="s5">
          <h3 className="pl-q">هل تريد أن نخبرك عند إطلاق MyPromo؟</h3>
          <div className="pl-opts">
            <button type="button" className="pl-opt" data-on={reach === true}
              onClick={() => setReach(true)}>نعم، أخبروني</button>
            <button type="button" className="pl-opt" data-on={reach === false}
              onClick={() => setReach(false)}>لا، شكرًا</button>
          </div>
          {reach === true && (
            <div className="pl-step">
              <div className="pl-field">
                <label htmlFor="pl-name">الاسم <span style={{ color: 'var(--ink-3)' }}>(اختياري)</span></label>
                <input id="pl-name" className="pl-inp" dir="auto" value={name}
                  onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div className="pl-field">
                <label htmlFor="pl-wa">WhatsApp <span style={{ color: 'var(--ink-3)' }}>(اختياري)</span></label>
                <input id="pl-wa" className="pl-inp" dir="ltr" inputMode="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+222 ..." />
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="pl-err" role="alert">{error}</p>}

      <div className="pl-nav">
        {step > 1 && (
          <button type="button" className="pl-btn q" onClick={() => go(step - 1)}>رجوع</button>
        )}
        {step < STEPS ? (
          <button type="button" className="pl-btn g" disabled={blocked} onClick={() => go(step + 1)}>
            التالي
          </button>
        ) : (
          <button type="button" className="pl-btn p" disabled={sending} onClick={send}>
            {sending ? 'جاري الإرسال...' : 'أرسل رأيك'}
          </button>
        )}
      </div>
      {step === 1 && !promo && (
        <p className="pl-hint" style={{ margin: '10px 0 0', textAlign: 'center' }}>
          اختر سنتك للمتابعة
        </p>
      )}
    </div>
  );
}

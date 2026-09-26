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
// This is the pre-account marketing page, not the app's own interface — a lot
// of students here are not Arabic speakers, so it answers in French too
// (`lang` prop, from the page's `?lang=fr`). What a student writes is theirs
// and carries `dir="auto"` either way, because some will still answer in the
// other language.

const ENDPOINT = '/api/feedback';

// What is stored is the app's own name for the thing (the admin panel counts
// these); what is shown is how a student says it, in whichever language the
// page is in.
const NEEDS = [
  { v: 'QCM', say: { ar: 'QCM', fr: 'QCM' }, icon: 'check' },
  { v: 'Anatomie 3D', say: { ar: 'Anatomie 3D', fr: 'Anatomie 3D' }, icon: 'heart' },
  { v: "Groupes d'étude", say: { ar: 'غرف الدراسة', fr: "Groupes d'étude" }, icon: 'video' },
  { v: 'Duels', say: { ar: 'التحدّيات', fr: 'Duels' }, icon: 'swords' },
  { v: 'Résumés', say: { ar: 'الملخّصات', fr: 'Résumés' } },
  { v: 'Flashcards', say: { ar: 'Flashcards', fr: 'Flashcards' } },
  { v: 'IA', say: { ar: 'مساعد ذكي (IA)', fr: 'Assistant IA' } },
  { v: 'Autre', say: { ar: 'شيء آخر', fr: 'Autre chose' } },
];

const STEPS = 5;

const STR = {
  ar: {
    errSend: 'تعذّر الإرسال. تحقّق من اتصالك ثم أعد المحاولة.',
    shareCopied: 'نُسخ الرابط — الصقه في مجموعة دفعتك',
    waMessage: (link) => `شاركنا رأيك في MyPromo — تطبيق لطلبة FMPOS (دقيقة واحدة): ${link}`,
    doneTitle: 'وصلنا رأيك',
    doneThanks: 'شكرًا لأنك تبني MyPromo معنا.',
    doneMore: 'ساعدنا أكثر: أرسل الرابط لدفعتك.',
    shareBtn: 'شارك الرابط',
    waBtn: 'أرسله على واتساب',
    heading: 'ساعدنا في بناء MyPromo',
    progressLabel: 'تقدّمك في الاستبيان',
    q1: 'أولًا، في أي سنة أنت؟',
    q2: 'أيّ ميزة تحتاجها أكثر؟',
    q2Hint: 'اختر ما شئت.',
    q3: 'ما أكثر شيء يزعجك أثناء المراجعة؟',
    q3Ph: 'مثلًا: الملفات مبعثرة في المجموعات، لا أجد QCM لمحاضرة معيّنة…',
    q4: 'لو أضفنا ميزة واحدة من أجلك، ماذا تكون؟',
    q4Ph: 'اكتب ما يخطر ببالك…',
    q5: 'نخبرك يوم الإطلاق؟',
    reachYes: 'نعم، أخبروني',
    reachNo: 'لا، شكرًا',
    nameLabel: 'الاسم',
    optional: '(اختياري)',
    waLabel: 'رقم الواتساب',
    back: 'رجوع',
    skip: 'تخطَّ',
    next: 'التالي',
    sending: 'جاري الإرسال…',
    submit: 'أرسل رأيك',
    pickYear: 'اختر سنتك للمتابعة',
  },
  fr: {
    errSend: "Envoi impossible. Vérifie ta connexion et réessaie.",
    shareCopied: 'Lien copié — colle-le dans le groupe de ta promo',
    waMessage: (link) => `Donne ton avis sur MyPromo — une appli pour les étudiants de la FMPOS (une minute) : ${link}`,
    doneTitle: 'Ton avis nous est parvenu',
    doneThanks: 'Merci de construire MyPromo avec nous.',
    doneMore: 'Aide-nous encore plus : envoie le lien à ta promo.',
    shareBtn: 'Partager le lien',
    waBtn: "Envoyer sur WhatsApp",
    heading: 'Aide-nous à construire MyPromo',
    progressLabel: 'Ta progression dans le questionnaire',
    q1: "D'abord, tu es en quelle année ?",
    q2: 'De quelle fonctionnalité as-tu le plus besoin ?',
    q2Hint: 'Choisis ce que tu veux.',
    q3: "Qu'est-ce qui te dérange le plus en révisant ?",
    q3Ph: 'Par exemple : les fichiers sont éparpillés dans les groupes, je ne trouve pas de QCM pour un cours précis…',
    q4: "Si on ajoutait une seule fonctionnalité pour toi, ce serait laquelle ?",
    q4Ph: 'Écris ce qui te vient à l\'esprit…',
    q5: 'On te préviendra le jour du lancement ?',
    reachYes: 'Oui, préviens-moi',
    reachNo: 'Non, merci',
    nameLabel: 'Nom',
    optional: '(facultatif)',
    waLabel: 'Numéro WhatsApp',
    back: 'Retour',
    skip: 'Passer',
    next: 'Suivant',
    sending: 'Envoi en cours…',
    submit: 'Envoyer mon avis',
    pickYear: 'Choisis ton année pour continuer',
  },
};

export default function Form({ tracks, lang = 'ar' }) {
  const s = STR[lang] || STR.ar;
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
      const from = (q.get('from') || q.get('utm_source') || '').slice(0, 120);
      setSource(from);
      // Counted once per visit (the panel reads visits against answers).
      let visitor = '';
      try {
        visitor = localStorage.getItem('mypromo.visitor') || '';
        if (!visitor) { visitor = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('mypromo.visitor', visitor); }
      } catch { /* private window: still counted, just not as the same person */ }
      fetch('/api/feedback/visit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ visitor, source: from }), keepalive: true }).catch(() => {});
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
      setError(s.errSend);
    } finally {
      setSending(false);
    }
  };

  // Passing it on is the most useful thing anybody can do after answering.
  const link = typeof window !== 'undefined' ? `${window.location.origin}/feedback` : '/feedback';
  const message = s.waMessage(link);
  const share = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: 'MyPromo', text: message }); return; }
      await navigator.clipboard.writeText(message);
      setShared(s.shareCopied);
    } catch { /* closed the sheet: nothing to say */ }
  };

  if (done) {
    return (
      <div className="lp-card lp-done" ref={head}>
        <span className="lp-pop"><Image src="/feedback/heart.webp" alt="" width={72} height={72} /></span>
        <h2>{s.doneTitle}</h2>
        <p>{s.doneThanks}</p>
        <p className="lp-muted">{s.doneMore}</p>
        <div className="lp-share">
          <button type="button" className="lp-btn primary" onClick={share}>
            <Icon name="share" size={18} /> {s.shareBtn}
          </button>
          <a className="lp-btn ghost" href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
            {s.waBtn}
          </a>
        </div>
        {shared && <p className="lp-hint" role="status">{shared}</p>}
      </div>
    );
  }

  return (
    <div className="lp-card" ref={head}>
      <div className="lp-steps">
        <b>{s.heading}</b>
        <span className="lp-count" dir="ltr">{step} / {STEPS}</span>
      </div>
      <div className="lp-bar" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS}
        aria-valuenow={step} aria-label={s.progressLabel}>
        <i style={{ width: `${(step / STEPS) * 100}%` }} />
      </div>

      {step === 1 && (
        <div className="lp-step" key="s1">
          <h3 className="lp-q">{s.q1}</h3>
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
          <h3 className="lp-q">{s.q2}</h3>
          <p className="lp-hint">{s.q2Hint}</p>
          <div className="lp-opts">
            {NEEDS.map((n) => (
              <button key={n.v} type="button" className="lp-opt" aria-pressed={needs.includes(n.v)} onClick={() => toggle(n.v)}>
                {n.icon
                  ? <Image src={`/feedback/${n.icon}.webp`} alt="" width={26} height={26} />
                  : <span className="lp-tick">{needs.includes(n.v) && <Icon name="check" size={13} />}</span>}
                <span dir="auto">{n.say[lang] || n.say.ar}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="lp-step" key="s3">
          <label className="lp-q" htmlFor="lp-pain">{s.q3}</label>
          <textarea id="lp-pain" className="lp-ta" dir="auto" value={pain} onChange={(e) => setPain(e.target.value)}
            placeholder={s.q3Ph} />
        </div>
      )}

      {step === 4 && (
        <div className="lp-step" key="s4">
          <label className="lp-q" htmlFor="lp-wish">{s.q4}</label>
          <textarea id="lp-wish" className="lp-ta" dir="auto" value={wish} onChange={(e) => setWish(e.target.value)}
            placeholder={s.q4Ph} />
        </div>
      )}

      {step === 5 && (
        <div className="lp-step" key="s5">
          <h3 className="lp-q">{s.q5}</h3>
          <div className="lp-opts two">
            <button type="button" className="lp-opt" aria-pressed={reach === true} onClick={() => setReach(true)}>{s.reachYes}</button>
            <button type="button" className="lp-opt" aria-pressed={reach === false} onClick={() => setReach(false)}>{s.reachNo}</button>
          </div>
          {reach === true && (
            <div className="lp-fields">
              <div className="lp-field">
                <label htmlFor="lp-name">{s.nameLabel} <span>{s.optional}</span></label>
                <input id="lp-name" className="lp-inp" dir="auto" value={name}
                  onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </div>
              <div className="lp-field">
                <label htmlFor="lp-wa">{s.waLabel} <span>{s.optional}</span></label>
                <input id="lp-wa" className="lp-inp" dir="ltr" inputMode="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+222 …" />
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="lp-err" role="alert">{error}</p>}

      <div className="lp-nav">
        {step > 1 && <button type="button" className="lp-btn ghost" onClick={() => go(step - 1)}>{s.back}</button>}
        {step < STEPS ? (
          <button type="button" className="lp-btn primary" disabled={blocked} onClick={() => go(step + 1)}>
            {(step === 3 && !pain.trim()) || (step === 4 && !wish.trim()) ? s.skip : s.next}
          </button>
        ) : (
          <button type="button" className="lp-btn gold" disabled={sending} onClick={send}>
            {sending ? s.sending : s.submit}
          </button>
        )}
      </div>
      {blocked && <p className="lp-hint center">{s.pickYear}</p>}
    </div>
  );
}

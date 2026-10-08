'use client';

// A subject, in the new design: its model standing out of the banner, how far
// you are through it, and one tab for each thing it holds.
//
// What you have read and your best scores live in this browser (lib/resume.js,
// lib/best.js), so they arrive a moment after the page; everything else is
// the server's.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { readsOf, isDone } from '@/lib/resume';
import { bests } from '@/lib/best';
import { useT } from '@/components/Lang';
import { plural, lecturesWord, questionsWord } from '@/lib/i18n';

const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};

const RING = 150.8;   // 2πr, r = 24
const SMALL = 119.4;  // 2πr, r = 19

// After «من» the dual takes its genitive: «1 من محاضرتين», never «محاضرتان».
const ofLectures = (t, n) => plural(t, n, ['محاضرة واحدة', 'محاضرتين', 'محاضرات', 'محاضرة'], ['cours', 'cours']);
const platesWord = (t, n) => plural(t, n, ['لوحة واحدة', 'لوحتان', 'لوحات', 'لوحة'], ['planche', 'planches']);

function Lecture({ l, i, r }) {
  const t = useT();
  const done = isDone(r);
  const going = !!r && !done;
  const mark = done ? <Icon name="check" size={14} /> : going ? '◐' : (l.n ?? i + 1);
  const sub = done ? t('قرأتها')
    : going ? (r.pages ? t('الصفحة {v0} من {pages}', { v0: r.page || 1, pages: r.pages }) : t('فتحتها'))
    : [l.prof, l.year, l.mb && `${l.mb} MB`].filter(Boolean).join(' · ');
  return (
    <>
      <Link className="sj-lec" href={`/file/${l.fid}`}>
        <span className={`sj-mark${done ? ' done' : going ? ' going' : ''}`}>{mark}</span>
        <span className="grow">
          <b dir="auto">{l.title}</b>
          <s className={going ? 'going' : ''} dir="auto">{sub}</s>
        </span>
        <Icon name="chev" size={14} />
      </Link>
      {/* The lecture's body in 3D, its drawings and its questions: one tap
          from the lecture they explain. */}
      {l.lessons?.length > 0 && (
        <div className="sj-3d">
          {l.lessons.map((x) => (
            <Link key={x.href} href={x.href} className="sj-3d-chip">
              <Icon name="box" size={14} /><b>3D</b><span dir="ltr">{x.title}</span>
            </Link>
          ))}
        </div>
      )}
      {l.versions?.length > 0 && (
        <details className="sj-alts">
          <summary>{l.versions.length === 1 ? t('نسخة أخرى') : t('{length} نسخ أخرى', { length: l.versions.length })}</summary>
          {l.versions.map((v) => (
            <Link key={v.fid} className="sj-lec alt" href={`/file/${v.fid}`}>
              <span className="grow">
                <b dir="auto">{v.title}</b>
                <s dir="auto">{[v.prof, v.year, v.mb && `${v.mb} MB`].filter(Boolean).join(' · ')}</s>
              </span>
              <Icon name="chev" size={14} />
            </Link>
          ))}
        </details>
      )}
    </>
  );
}

export default function Subject({
  id, name, promo, semester, semesters, img, bg, professors,
  chapters, extra, banks, notes, atlas = null, empty, tab: firstTab = null,
}) {
  const t = useT();
  const [tab, setTab] = useState(firstTab === 'atlas' && atlas ? 'atlas' : 'lectures');
  const [reads, setReads] = useState({});
  const [best, setBest] = useState({});
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const r = readsOf();
    setReads(r);
    setBest(bests());
    // Open the chapter you are in the middle of, or else the first.
    const at = chapters.findIndex((c) => c.lectures.some((l) => r[l.fid] && !isDone(r[l.fid])));
    setOpen(at >= 0 ? at : 0);
  }, [chapters]);

  const all = useMemo(() => chapters.flatMap((c) => c.lectures), [chapters]);
  const read = all.filter((l) => isDone(reads[l.fid])).length;
  const pct = all.length ? Math.round((read / all.length) * 100) : 0;
  const total = banks.reduce((n, b) => n + b.count, 0);
  const top = Object.entries(best)
    .filter(([k]) => k.startsWith(`${id}:`))
    .reduce((n, [, v]) => Math.max(n, v.best ?? 0), -1);

  const TABS = [
    ['lectures', t('المحاضرات')],
    ['qcm', 'QCM'],
    ['notes', t('الملخصات')],
    // Every anatomy subject has one: at the least the whole body and the
    // drawings; for a year whose lectures are mapped, each lecture's own.
    ...(atlas ? [['atlas', t('الأطلس')]] : []),
  ];

  const topics = chapters.map((c) => c.title).slice(0, 3).join(' · ');

  return (
    <>
      <div className="sj">
        {/* ================= the banner ================= */}
        <div className="sj-hero r1" style={{ '--sj-bg': bg }}>
          <div className="sj-hero-top">
            <Link href="/study" className="sj-back" aria-label={t('رجوع')}><Icon name="chevR" size={18} /></Link>
            <span className="grow" />
            {semesters.length > 1 && (
              <span className="sj-sem" role="group" aria-label={t('السداسي')}>
                {semesters.map((s) => (
                  <Link key={s.id} href={`/archive/${s.id}`} data-on={s.id === id} dir="ltr">{s.semester}</Link>
                ))}
              </span>
            )}
          </div>

          <img className="sj-model" src={img} alt="" />

          <div className="sj-hero-t">
            <span className="sj-promo" dir="ltr">{promo} · {semester}</span>
            <b dir="ltr">{name}</b>
            {topics && <span className="sj-topics" dir="ltr">{topics}</span>}
          </div>

          <div className="sj-hero-p">
            <span className="sj-ring">
              <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true">
                <circle cx="29" cy="29" r="24" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="5" />
                <circle className="sj-ring-go" cx="29" cy="29" r="24" fill="none" stroke="#FFFDF8" strokeWidth="5"
                  strokeLinecap="round" strokeDasharray={RING} strokeDashoffset={RING * (1 - pct / 100)} />
              </svg>
              <b>{pct}%</b>
            </span>
            <span className="sj-hero-n">
              <span><b>{read}</b>{' '}{t('من {ofLectures}', { ofLectures: ofLectures(t, all.length) })}</span>
              <span className="dim">
                {top >= 0 ? <>{t('أفضل نتيجة')}{' '}<b dir="ltr">{top}%</b>{' '}{t('في QCM')}</>
                  : total ? t('{questionsWord} في QCM', { questionsWord: questionsWord(t, total) })
                  : professors.length ? professors.join(' · ') : ' '}
              </span>
            </span>
          </div>
        </div>

        {/* ================= the tabs ================= */}
        <div className="sj-tabs r2" role="tablist">
          {TABS.map(([t, label]) => (
            <button key={t} role="tab" aria-selected={tab === t} data-on={tab === t} onClick={() => setTab(t)}>
              {label}
            </button>
          ))}
        </div>

        <div className="sj-body">
          {/* ---------- المحاضرات ---------- */}
          {tab === 'lectures' && (
            <div className="sj-pane">
              {chapters.map((c, i) => {
                const n = c.lectures.filter((l) => isDone(reads[l.fid])).length;
                const on = open === i;
                return (
                  <div key={`${c.title}-${i}`} className={`sj-ch${on ? ' on' : ''}`}>
                    <button className="sj-ch-h" onClick={() => setOpen(on ? null : i)} aria-expanded={on}>
                      <span className="sj-ch-art">
                        <img src={c.img} alt="" style={{ animationDelay: `${-i * 0.7}s` }} />
                      </span>
                      <span className="grow">
                        <b dir="auto">{c.title}</b>
                        <s>{lecturesWord(t, c.lectures.length)}{n ? t(' · {n} مقروءة', { n }) : ''}</s>
                        <span className="sj-bar"><i style={{ width: `${c.lectures.length ? (n / c.lectures.length) * 100 : 0}%` }} /></span>
                      </span>
                      <span className="sj-caret"><Icon name="chev" size={15} /></span>
                    </button>
                    {on && (
                      <div className="sj-ch-b">
                        {c.lectures.map((l, j) => <Lecture key={l.fid || j} l={l} i={j} r={reads[l.fid]} />)}
                      </div>
                    )}
                  </div>
                );
              })}

              {extra.map((s, k) => {
                const key = `x${k}`;
                const on = open === key;
                return (
                  <div key={s.id} className={`sj-ch${on ? ' on' : ''}`}>
                    <button className="sj-ch-h" onClick={() => setOpen(on ? null : key)} aria-expanded={on}>
                      <span className="sj-ch-ic"><Icon name={s.icon || 'file'} size={22} /></span>
                      <span className="grow">
                        <b>{s.title}</b>
                        <s>{t('{length} ملف', { length: s.items.length })}</s>
                      </span>
                      <span className="sj-caret"><Icon name="chev" size={15} /></span>
                    </button>
                    {on && (
                      <div className="sj-ch-b">
                        {s.items.map((it, j) => (
                          <div key={it.fid || j}>
                            <Lecture l={it} i={j} r={reads[it.fid]} />
                            {it.correction && (
                              <Link className="sj-lec alt" href={`/file/${it.correction}`}>
                                <span className="grow"><b>Correction</b></span>
                                <Icon name="chev" size={14} />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {!chapters.length && !extra.length && (
                <div className="sj-empty">
                  <img src={img} alt="" />
                  <b>{empty ? t('المجلد فارغ في Drive') : t('لم تُفهرس بعد')}</b>
                  <s>{t('لا توجد محاضرات في')}{' '}<span dir="ltr">{name}</span>{' '}{t('حتى الآن.')}</s>
                </div>
              )}
            </div>
          )}

          {/* ---------- QCM ---------- */}
          {tab === 'qcm' && (
            <div className="sj-pane">
              {total > 0 ? (
                <>
                  <Link href={`/quiz/${id}`} className="sj-exam">
                    <span className="sj-exam-wm"><Icon name="quiz" size={110} /></span>
                    <span className="sj-exam-ic"><Icon name="clock" size={24} weight="fill" /></span>
                    <span className="grow">
                      <b>{t('اختبر نفسك')}</b>
                      <s>{t('{questionsWord} · اختر المحاضرات أو الأوراق', { questionsWord: questionsWord(t, total) })}</s>
                    </span>
                    <span className="sj-exam-go">{t('ابدأ')}</span>
                  </Link>
                  {banks.map((b) => {
                    const rec = best[`${id}:${b.fid}`];
                    const ink = !rec ? '#979992' : rec.best >= 70 ? '#2A5B3E' : rec.best >= 50 ? '#8A6A14' : '#A8502A';
                    return (
                      <Link key={b.fid} href={`/quiz/${id}/${b.fid}`} className="sj-bank">
                        <span className="sj-bank-r">
                          <svg width="46" height="46" viewBox="0 0 46 46" aria-hidden="true">
                            <circle cx="23" cy="23" r="19" fill="none" stroke="#EAE8E0" strokeWidth="4" />
                            <circle className="sj-ring-go" cx="23" cy="23" r="19" fill="none" stroke={ink} strokeWidth="4"
                              strokeLinecap="round" strokeDasharray={SMALL} strokeDashoffset={SMALL * (1 - (rec?.best || 0) / 100)} />
                          </svg>
                          <b style={{ color: ink }}>{rec ? `${rec.best}%` : '—'}</b>
                        </span>
                        <span className="grow">
                          <b dir="auto">{b.title}</b>
                          <s>{questionsWord(t, b.count)}{rec ? ` · ${rec.runs === 1 ? t('مرة واحدة') : t('{runs} مرات', { runs: rec.runs })}` : t(' · لم تبدأ')}</s>
                        </span>
                        <span className="sj-play"><Icon name="chev" size={16} /></span>
                      </Link>
                    );
                  })}
                </>
              ) : (
                <div className="sj-empty">
                  <img src={img} alt="" />
                  <b>{t('لا أسئلة مستخرجة بعد')}</b>
                  <s>{t('ستظهر هنا أوراق')}{' '}<span dir="ltr">{name}</span>{' '}{t('حين تُستخرج أسئلتها.')}</s>
                </div>
              )}
            </div>
          )}

          {/* ---------- الملخصات ---------- */}
          {tab === 'notes' && (
            <div className="sj-pane">
              {notes.map((n) => {
                const body = (
                  <>
                    <span className="sj-paper" aria-hidden="true">
                      <i style={{ background: n.whoId ? faceOf(n.whoId) : 'var(--olive)' }} />
                      <i /><i /><i />
                      <em>{n.ext}</em>
                    </span>
                    <span className="grow">
                      <b dir="auto">{n.title}</b>
                      {n.who && (
                        <span className="sj-who">
                          <span style={{ background: faceOf(n.whoId) }}>{n.who.slice(0, 2)}</span>
                          <span dir="auto">{n.who}</span>
                        </span>
                      )}
                      <span className="sj-note-m">
                        {n.mb && <span dir="ltr">{n.mb} MB</span>}
                        {n.likes != null && <span className="sj-likes"><Icon name="heartFill" size={12} />{n.likes}</span>}
                        {!n.who && <span>{t('من ملفات المادة')}</span>}
                      </span>
                    </span>
                  </>
                );
                return n.external
                  ? <a key={n.id} className="sj-note" href={n.href} target="_blank" rel="noreferrer">{body}</a>
                  : <Link key={n.id} className="sj-note" href={n.href}>{body}</Link>;
              })}
              <Link href="/notes" className="sj-add"><Icon name="plus" size={16} />{' '}{t('انشر ملخّصك')}</Link>
              {!notes.length && (
                <div className="sj-empty small">
                  <s>{t('لا ملخّصات لهذه المادة بعد — كن أول من يرفع واحدًا.')}</s>
                </div>
              )}
            </div>
          )}

          {/* ---------- الأطلس: the course's anatomy, lecture by lecture ---------- */}
          {tab === 'atlas' && atlas && (
            <div className="sj-pane">
              {atlas.filter((c) => c.lessons.length).map((c) => (
                <section key={c.title} className="sj-at">
                  <h3 className="sj-at-h" dir="ltr">{c.title}</h3>
                  <div className="sj-grid">
                    {c.lessons.map((l) => (
                      <Link key={l.id} href={l.href} className="sj-region sj-lesson">
                        <img src={l.img} alt="" />
                        {l.lectures.length > 0 && (
                          <span className="sj-at-n">{t('المحاضرة {n}', { n: l.lectures.join(' · ') })}</span>
                        )}
                        <b dir="ltr">{l.title}</b>
                        {/* Each part isolated: «3D · 5 لوحات» joined as one
                            string came out reordered in Arabic. */}
                        <s className="sj-at-meta">
                          {['3D', l.planches.length ? platesWord(t, l.planches.length) : null, l.region ? null : t('اختبار')]
                            .filter(Boolean).map((x) => <span key={x}>{x}</span>)}
                        </s>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}

              {/* For revising across lectures: every system in one body. */}
              <Link href="/anatomie/corps" className="sj-whole">
                <img src="/anatomy/thumbs/corps.webp" alt="" />
                <span className="grow">
                  <b dir="ltr">Le corps entier</b>
                  <s>{t('كل الأجهزة في جسم واحد، شرّحه طبقة بطبقة')}</s>
                </span>
                <Icon name="chev" size={16} />
              </Link>
              <Link href="/anatomie/planches" className="sj-whole light">
                <span className="sj-whole-ic"><Icon name="images" size={24} /></span>
                <span className="grow">
                  <b dir="ltr">Planches d’anatomie</b>
                  <s>{t('كل اللوحات، حسب الجهاز')}</s>
                </span>
                <Icon name="chev" size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* The one action this screen is for. */}
      {total > 0 && tab !== 'qcm' && tab !== 'atlas' && (
        <Link href={`/quiz/${id}`} className="sj-cta">
          <Icon name="quiz" size={19} />{' '}{t('اختبر نفسك في')}{' '}<span dir="ltr">{name}</span>
        </Link>
      )}
    </>
  );
}

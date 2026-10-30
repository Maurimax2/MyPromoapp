'use client';

// الرئيسية.
//
// The v2 home (owner's pick, 2026-10): a green head that says who you are and
// the one thing to do now, four shortcuts — test, challenge, summaries, rooms,
// each carrying what is waiting there — then your subjects as banners, one at
// a time, and under them what your promo is saying.
//
// Duels, rooms and the next lecture used to be sections of their own here.
// The challenge and the rooms are a tap away with their count on the
// shortcut; the faculty's timetable is not trusted enough to lead the screen.

import { useEffect, useRef, useState } from 'react';
import Link from '@/components/Link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Post from '@/components/Post';
import PickPromo from './PickPromo';
import { imageThumb, pdfThumb } from '@/lib/thumb';
import { dueCount, trackedCount } from '@/lib/review';
import { lastOpened } from '@/lib/resume';
import { daysKnown } from '@/lib/streak';
import Flame from '@/components/Flame';
import { streakOf, dayOf } from '@/lib/habit';
import Welcome from '@/components/Welcome';
import PushAsk from './PushAsk';
import SubjectBanner from '@/components/SubjectBanner';
import ThemeToggle from '@/components/ThemeToggle';
import { useT } from '@/components/Lang';
import { daysWord } from '@/lib/i18n';

// A face needs a colour, and it has to be the same colour tomorrow or a promo
// of forty people becomes a promo of forty strangers — so it is read off the
// id rather than handed out.
const FACES = ['#2A5B3E', '#A8502A', '#14555F', '#8A6A14', '#4B5B3A', '#6B4A3A'];
const faceOf = (id = '') => {
  let n = 0;
  for (let i = 0; i < id.length; i += 1) n = (n * 31 + id.charCodeAt(i)) % 997;
  return FACES[n % FACES.length];
};
const initials = (name = '') => name.trim().slice(0, 2);

const mb = (b) => (b ? `${(b / 1048576).toFixed(1)} Mo` : '');

export default function Home({ me, posts, subjects, mySubjects = [],
                               promos = [], unseen = 0, every = false,
                               studying = [], rooms = [], duels = [], rivals = [],
                               readError = null, refused = 0,
                               next = null, term = null, now = 0, habitDays = null }) {
  const t = useT();
  const router = useRouter();
  // These three live in this browser, so they can only be read once we are in
  // one. Until then each draws its own resting state rather than a number that
  // changes a tick later.
  const [review, setReview] = useState(null);
  const [resume, setResume] = useState(null);
  const [streak, setStreak] = useState(0);
  const [writing, setWriting] = useState(false);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState([]);      // what has been uploaded, not what is chosen
  const [module, setModule] = useState('');    // the subject it belongs to
  // A post, or a résumé: a résumé is filed under its subject in الملخصات as
  // well as shown here, which is why it cannot go without one.
  const [kind, setKind] = useState('post');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const picker = useRef(null);
  const field = useRef(null);

  useEffect(() => {
    setReview({ due: dueCount(), tracked: trackedCount() });
    setResume(lastOpened());
    // This phone's days and the server's (habits.sql), counted with the
    // freezes the server counts, so the number here and on أنا agree.
    setStreak(streakOf(Object.keys(daysKnown(habitDays)), dayOf()).current);
  }, [habitDays]);

  // `/feed?write=1` opens the composer, for the few places that link here to
  // post something.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('write')) {
      setWriting(true);
      setTimeout(() => {
        field.current?.focus();
        field.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 0);
    }
  }, []);

  // Files go up as they are chosen, not when the post is sent — a student on
  // LTE should be waiting while they write, not after.
  const take = async (list) => {
    setError('');
    for (const file of Array.from(list).slice(0, 6 - files.length)) {
      const kind = file.type.startsWith('image/') ? 'image' : 'file';
      const holding = { name: file.name, kind, bytes: file.size,
                        pending: true, id: crypto.randomUUID(),
                        thumb: kind === 'image' ? imageThumb(file) : null };
      setFiles((f) => [...f, holding]);

      if (kind === 'file') {
        pdfThumb(file).then((thumb) => {
          if (thumb) setFiles((f) => f.map((x) => (x.id === holding.id ? { ...x, thumb } : x)));
        });
      }

      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFiles((f) => f.filter((x) => x.id !== holding.id));
        setError(data.error || t('تعذّر الرفع ({status})', { status: res.status }));
        continue;
      }
      setFiles((f) => f.map((x) => (
        x.id === holding.id ? { ...data, id: holding.id, thumb: x.thumb } : x)));
    }
  };

  const send = async () => {
    if (busy) return;
    if (kind === 'note' && !module) { setError(t('اختر مادة الملخص')); return; }
    if (kind === 'note' && !files.some((f) => !f.pending)) { setError(t('أرفق الملخص: ملف أو صورة')); return; }
    setBusy(true); setError('');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        body,
        kind,
        module: module || null,
        media: files.filter((f) => !f.pending).map(({ kind, path, name, bytes }) =>
          ({ kind, path, name, bytes })),
      }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(data.error || t('تعذّر النشر ({status})', { status: res.status })); return; }
    setBody(''); setFiles([]); setModule(''); setKind('post'); setWriting(false);
    router.refresh();
  };

  const ready = !busy && (body.trim() || files.some((f) => !f.pending))
    && !files.some((f) => f.pending);
  const first = me.name.split(' ')[0];
  // Morning or evening is the phone's, so it is worked out once we are on it.
  const [hello, setHello] = useState(t('أهلًا {first}', { first }));
  useEffect(() => {
    setHello(new Date().getHours() < 12
      ? t('صباح الخير، {first}', { first })
      : t('مساء الخير، {first}', { first }));
  }, [first, t]);

  // The one thing to do now, until the planner says better: what came back
  // for review, else the lecture left open, else a first test. Never a
  // button that leads nowhere.
  const due = review?.due ?? 0;
  const act = due > 0 ? { href: '/review', label: t('راجع الآن') }
    : resume ? { href: `/file/${resume.fid}`, label: t('تابع القراءة') }
    : { href: '/quiz', label: t('ابدأ اختبارًا') };
  const yourTurn = duels.filter((d) => d.at === 'invited' || d.at === 'play').length;
  const year = me.promo && (promos.find((p) => p.id === me.promo)?.name || me.promo.toUpperCase());

  return (
    <>
      <Welcome name={me.name} ready={me.approved && !!me.promo} />

      <div className="scroll flow h-flow">
        {/* ================= the green head: who you are, and what now ================= */}
        <header className="hh r1">
          <img className="hh-ghost" src="/art/crane.webp" alt="" />
          <div className="hh-bar">
            <Link href="/profile" className="hh-me" style={{ background: faceOf(me.id) }} aria-label={t('أنا')}>
              {initials(me.name)}
            </Link>
            <Link href="/study" className="hh-find">
              <Icon name="search" size={18} /><span>{t('ابحث في موادك')}</span>
            </Link>
            <ThemeToggle className="hh-bell" />
            <Link href="/notifications" className="hh-bell"
                  aria-label={t('الإشعارات{v0}', {
                    v0: unseen ? t(' — {unseen} جديدة', { unseen }) : ''
                  })}>
              <Icon name="bell" size={21} />
              {unseen > 0 && <i />}
            </Link>
          </div>
          <div className="hh-now">
            {streak > 0 && (
              <span className="hh-streak"><Flame streak={streak} size={14} />{daysWord(t, streak)}</span>
            )}
            <b>{hello}</b>
            {due > 0 && (
              <span className="hh-due">
                {t('{due} {v1} المراجعة', { due, v1: due === 1 ? t('سؤال يستحقّ') : t('أسئلة تستحقّ') })}
              </span>
            )}
            <Link href={act.href} className="hh-go">{act.label}</Link>
          </div>
          <nav className="hh-quick" aria-label={t('أدوات')}>
            <Link href="/quiz"><span><Icon name="quiz" size={22} /></span>{t('اختبر')}</Link>
            <Link href="/duel">
              <span><Icon name="swords" size={22} />{yourTurn > 0 && <i>{yourTurn}</i>}</span>{t('تحدَّ')}
            </Link>
            <Link href="/notes"><span><Icon name="book2" size={22} /></span>{t('ملخصات')}</Link>
            <Link href="/rooms">
              <span><Icon name="video" size={22} />{studying.length > 0 && <i className="live" />}</span>{t('غرف')}
            </Link>
          </nav>
        </header>

        {/* ================= موادك — a banner each, one at a time ================= */}
        {subjects.length > 0 && (
          <section className="hh-sheet r2">
            <div className="h-sec">
              <b>{t('موادك')}</b>
              <Link href="/study" className="h-sec-all">{t('الكل')}</Link>
            </div>
            <div className="hh-strip">
              {subjects.map((m, i) => (
                <SubjectBanner key={m.id} subject={m} href={`/archive/${m.id}`} index={i}
                               tag={[year, m.semester].filter(Boolean).join(' · ')} />
              ))}
            </div>
          </section>
        )}

        <PushAsk />

        {/* ================= the promo, or every promo ================= */}
        <div className="fd-head r6">
          <b>{every ? t('من الدفعات') : t('من دفعتك')}</b>
          <span className="fd-switch" role="tablist" aria-label={t('المنشورات')}>
            <Link href="/feed" scroll={false} replace role="tab" aria-selected={!every} data-on={!every}>{t('دفعتي')}</Link>
            <Link href="/feed?all=1" scroll={false} replace role="tab" aria-selected={every} data-on={every}>{t('كل الدفعات')}</Link>
          </span>
          {/* الأسئلة has no other door. */}
          <Link href="/qa" className="h-sec-all">{t('الأسئلة')}</Link>
        </div>

        {!me.promo ? <PickPromo /> : !writing ? (
          <button className="h-say" onClick={() => {
            setWriting(true);
            setTimeout(() => field.current?.focus(), 0);
          }}>
            <span className="face" style={{ background: faceOf(me.id) }}>{initials(me.name)}</span>
            <span className="grow">{t('شارك ملخّصًا أو اسأل دفعتك…')}</span>
            <span className="h-say-pdf"><Icon name="image" size={18} /></span>
            <span className="h-say-pdf"><Icon name="file" size={18} /></span>
          </button>
        ) : (
        <div className="composer">
          <div className="composer-top">
            <div className="face composer-me" style={{ background: faceOf(me.id) }}>
              {initials(me.name)}
            </div>
            <textarea
              ref={field}
              className="composer-field"
              dir="auto"
              rows={3}
              placeholder={t('شارك شيئًا مع دفعتك…')}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              aria-label={t('منشور جديد')}
            />
          </div>

          {files.length > 0 && (
            <div className="draft">
              {files.map((f) => (
                <div key={f.id} className={`draft-f${f.pending ? ' up' : ''}`}>
                  {f.thumb
                    ? <img className="draft-thumb" src={f.thumb} alt="" />
                    : <Icon name={f.kind === 'image' ? 'image' : 'file'} size={17} />}
                  <span className="grow" dir="ltr">{f.name}</span>
                  <span className="draft-mb">{f.pending ? '…' : mb(f.bytes)}</span>
                  {!f.pending && (
                    <button aria-label={t('احذف')}
                      onClick={() => setFiles((l) => l.filter((x) => x.id !== f.id))}>
                      <Icon name="x" size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {(body.trim() || files.length > 0) && (
            <div className="composer-kind" role="radiogroup" aria-label={t('نوع المنشور')}>
              {[['post', t('منشور')], ['note', t('ملخص')]].map(([k, label]) => (
                <button key={k} type="button" role="radio" aria-checked={kind === k} data-on={kind === k}
                        onClick={() => { setKind(k); setError(''); }}>{label}</button>
              ))}
            </div>
          )}

          {/* Your own year's subjects: the post is going into your year. Tap
              the chosen one again to post without a subject. */}
          {(body.trim() || files.length > 0) && mySubjects.length > 0 && (
            <div className="composer-subjects" role="radiogroup" aria-label={t('المادة')}>
              {mySubjects.map((m) => (
                <button key={m.id} type="button" role="radio" dir="ltr"
                        aria-checked={module === m.id} data-on={module === m.id}
                        onClick={() => { setModule(module === m.id ? '' : m.id); setError(''); }}>
                  {m.name}
                </button>
              ))}
            </div>
          )}

          {error && <div className="admin-err">{error}</div>}

          <div className="composer-acts">
            <input
              ref={picker} type="file" hidden multiple
              accept="image/*,application/pdf"
              onChange={(e) => { take(e.target.files); e.target.value = ''; }}
            />
            <button onClick={() => picker.current?.click()}>
              <span className="ic-img"><Icon name="image" size={18} /></span>{t('صورة')}</button>
            <button onClick={() => picker.current?.click()}>
              <span className="ic-pdf"><Icon name="file" size={18} /></span>{t('ملف')}</button>
            <button className="composer-send" disabled={!ready} onClick={send}>
              {busy ? '…' : t('انشر')}
            </button>
          </div>
        </div>
        )}

        {/* Silence here is what cost an afternoon: the feed came back refused
            and drew an empty screen, which reads exactly like "nobody has
            posted yet". */}
        {readError && (
          <div className="admin-err" style={{ padding: '0 2px' }}>{t('تعذّرت قراءة المنشورات — {readError}', { readError })}</div>
        )}

        {!readError && refused > 0 && (
          <div className="admin-err" style={{ padding: '0 2px' }}>{t(
              'في دفعتك {refused} منشورًا لا يسمح لك الخادم بقراءتها — تحقّق من حالة حسابك وسنتك في اللوحة.',
              {
                refused
              }
            )}</div>
        )}

        {posts.length > 0
          ? posts.map((p) => <Post key={p.id} post={p} me={me} />)
          : (
            <div className="empty">
              <div className="tile tint-olive"><Icon name="msg" size={24} /></div>
              <div className="empty-t">{t('لا منشورات بعد')}</div>
            </div>
          )}
      </div>
    </>
  );
}

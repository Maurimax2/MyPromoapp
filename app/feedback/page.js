import Image from 'next/image';
import { Zain, IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google';
import { PROMOS } from '@/lib/data';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Reveal from './Reveal';
import Form from './Form';

// ساعدنا في بناء MyPromo — the page a student opens from a WhatsApp message,
// before there is an account.
//
// It is the one screen read by somebody who has never seen MyPromo, so the
// product does the talking: every phone on this page is the running app
// photographed, every number is one the app actually shows, and the page wears
// the campaign's own type (the poster's: Zain, IBM Plex Sans Arabic, Poppins)
// so the poster and the link read as one thing.
//
// Signed out on purpose. The middleware lets this one through.
export const dynamic = 'force-dynamic';

const zain = Zain({ subsets: ['arabic', 'latin'], weight: ['700', '800', '900'], variable: '--lp-head', display: 'swap' });
const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700'], variable: '--lp-body', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['700', '800'], variable: '--lp-mark', display: 'swap' });

const SITE = process.env.MYPROMO_URL || 'https://mypromo-nu.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'ساعدنا في بناء MyPromo',
  description: 'QCM من المحاضرات والامتحانات السابقة، Anatomie 3D، غرف دراسة وتحديات — تطبيق لطلبة FMPOS. شاركنا رأيك في دقيقة.',
  openGraph: {
    title: 'ساعدنا في بناء MyPromo',
    description: 'تطبيق لطلبة FMPOS — شاركنا رأيك في دقيقة واحدة.',
    images: [{ url: '/og/feedback.jpg', width: 1200, height: 630, alt: 'MyPromo — ساعدنا في بناء التطبيق' }],
    locale: 'ar',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og/feedback.jpg'] },
};

const TRACKS = [
  { id: 'medicine', name: 'الطب' },
  { id: 'pharmacy', name: 'الصيدلة' },
  { id: 'dental', name: 'طب الأسنان' },
];

/**
 * The years a student can say they are in, grouped by track.
 *
 * Read from the database, because the panel can add a year; `promos` is
 * readable by approved students only and whoever opens this page is signed
 * out, so it is read here with the service key. If that is not configured,
 * the years the app ships with are the answer rather than an empty screen.
 */
async function years() {
  let rows = null;
  try {
    const db = supabaseAdmin();
    let { data, error } = await db.from('promos').select('id, name, badge, position, track, year').order('position');
    if (error) ({ data } = await db.from('promos').select('id, name, badge, position').order('position'));
    rows = data?.length ? data : null;
  } catch { /* not configured */ }
  const list = rows || PROMOS;
  const fromFile = Object.fromEntries(PROMOS.map((p) => [p.id, p]));
  const trackOf = (p) => p.track || fromFile[p.id]?.track || 'medicine';
  return TRACKS.map((t) => ({
    ...t,
    years: list.filter((p) => trackOf(p) === t.id).map(({ id, name, badge }) => ({ id, name, badge })),
  })).filter((t) => t.years.length);
}

function Mark({ size = 34, light = false }) {
  const left = light ? '#FFFFFF' : '#1B5E37';
  const id = light ? 'lpm-l' : 'lpm-d';
  return (
    <svg viewBox="270 190 700 810" width={size} height={size * 810 / 700} aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={light ? '#9AF3B6' : '#4CC27A'} /><stop offset="1" stopColor={light ? '#22C766' : '#1E7A45'} />
      </linearGradient></defs>
      <circle cx="395" cy="312" r="115" fill={left} />
      <path d="M372 905 L372 555 L620 792" fill="none" stroke={left} strokeWidth="180" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="847" cy="312" r="115" fill={`url(#${id})`} />
      <path d="M870 905 L870 555 L605 812" fill="none" stroke={`url(#${id})`} strokeWidth="180" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A phone with a real screen in it — whole screens, top bar to bottom bar.
function Phone({ src, alt, className = '', priority = false }) {
  return (
    <div className={`lp-phone ${className}`}>
      <Image src={src} alt={alt} width={390} height={845} priority={priority}
        sizes="(max-width: 860px) 64vw, 300px" />
    </div>
  );
}

const Ico = ({ n, size = 44, className = '' }) => (
  <Image src={`/feedback/${n}.webp`} alt="" width={size} height={size} className={className} aria-hidden="true" />
);

/** One feature: its icon, what it is, and the screen it is. */
function Feature({ id, icon, kicker, title, children, shots, flip = false, dark = false, extra = null }) {
  return (
    <section id={id} className={`lp-sec${dark ? ' dark' : ''}`}>
      <div className={`lp-in lp-split${flip ? ' flip' : ''}`}>
        <Reveal className="lp-copy">
          <span className="lp-kick"><Ico n={icon} size={30} />{kicker}</span>
          <h2 className="lp-h2">{title}</h2>
          <div className="lp-p">{children}</div>
          {extra}
        </Reveal>
        <Reveal delay={90} className={`lp-shots n${shots.length}`}>
          {shots.map((s, i) => <Phone key={s.src} {...s} className={shots.length > 1 ? (i ? 'back' : 'front') : ''} />)}
        </Reveal>
      </div>
    </section>
  );
}

export default async function Feedback() {
  const tracks = await years();

  return (
    <div className={`lp ${zain.variable} ${plex.variable} ${poppins.variable}`} dir="rtl">
      {/* ------------------------------------------------------------ hero */}
      <header className="lp-hero">
        <div className="lp-in">
          <nav className="lp-top">
            <span className="lp-brand" dir="ltr"><Mark size={30} light /><b>MyPromo</b></span>
            <span className="lp-slogan">منّا ولنا</span>
          </nav>

          <div className="lp-hero-grid">
            <div className="lp-hero-copy">
              <span className="lp-chip"><i />قريبًا · لطلبة FMPOS</span>
              <h1>
                <span className="lp-h1a">ساعدنا في بناء</span>
                <span className="lp-h1b" dir="ltr">MyPromo</span>
              </h1>
              <p className="lp-lead">
                تطبيق واحد لكل دراستك: <b>QCM</b> من المحاضرات والامتحانات السابقة،
                {' '}<b dir="ltr">Anatomie 3D</b>، غرف دراسة وتحديات مع دفعتك.
              </p>
              <div className="lp-cta">
                <a className="lp-btn gold" href="#form">شاركنا رأيك</a>
                <small>دقيقة واحدة · بدون حساب</small>
              </div>
            </div>

            <div className="lp-stage" aria-label="صور حقيقية من التطبيق">
              <Phone src="/preview/study.webp" alt="شاشة الدراسة في MyPromo: المواد، QCM، الملخصات والنموذج ثلاثي الأبعاد" className="side" />
              <Phone src="/preview/home.webp" alt="الشاشة الرئيسية في MyPromo: سؤال اليوم والتحديات" className="main" priority />
              <Ico n="check" size={64} className="lp-float f1" />
              <Ico n="heart" size={70} className="lp-float f2" />
              <Ico n="swords" size={58} className="lp-float f3" />
              <span className="lp-cap">صور حقيقية من التطبيق</span>
            </div>
          </div>
        </div>

        <div className="lp-in">
          <ul className="lp-strip" aria-label="ما في MyPromo">
            <li><a href="#qcm"><Ico n="check" size={30} /><span dir="ltr">+10,000 QCM</span></a></li>
            <li><a href="#anatomie"><Ico n="heart" size={30} /><span dir="ltr">Anatomie 3D</span></a></li>
            <li><a href="#rooms"><Ico n="video" size={30} />غرف الدراسة</a></li>
            <li><a href="#duels"><Ico n="swords" size={30} />التحدّيات</a></li>
            <li><a href="#rank"><Ico n="trophy" size={30} />ترتيب دفعتك</a></li>
          </ul>
        </div>
      </header>

      {/* -------------------------------------------------------- features */}
      <Feature id="qcm" icon="check" kicker="QCM" title={<><span dir="ltr">+10,000</span> سؤال، من المحاضرات والامتحانات السابقة</>}
        shots={[{ src: '/preview/qcm.webp', alt: 'سؤال QCM في ANATOMIE مع الجواب الصحيح' }]}>
        <p>مرتّبة حسب المادة والمحاضرة. تعرف الجواب فور إجابتك، وما تخطئ فيه يعود إليك في «المراجعة» حتى تتقنه.</p>
      </Feature>

      <Feature id="anatomie" icon="heart" kicker={<span dir="ltr">Anatomie 3D</span>} title="أدِر النموذج، والمس لتعرف الاسم" dark flip
        shots={[
          { src: '/preview/heart.webp', alt: 'نموذج Cœur ثلاثي الأبعاد، وقد لُمس Ventricule droit' },
          { src: '/preview/knee.webp', alt: 'نموذج Genou ثلاثي الأبعاد، وقد لُمست Patella' },
        ]}
        extra={(
          <dl className="lp-stats">
            <div><dt>33</dt><dd>منطقة من الجسم</dd></div>
            <div><dt>319</dt><dd>معلمًا مُسمّى</dd></div>
            <div><dt>818</dt><dd>اسمًا بالفرنسية</dd></div>
          </dl>
        )}>
        <p>
          نماذج ثلاثية الأبعاد تديرها وتكبّرها بإصبعك. المس أي بنية فيظهر اسمها بالفرنسية —
          {' '}<span dir="ltr">Ventricule droit</span>، <span dir="ltr">Patella</span> — كما ستجدها في الامتحان.
        </p>
      </Feature>

      <Feature id="rooms" icon="video" kicker="غرف الدراسة" title="راجعوا معًا، بالصوت والصورة"
        shots={[{ src: '/preview/room.webp', alt: 'غرفة دراسة فيها أربعة طلبة، مع مؤقّت التركيز والدردشة' }]}>
        <p>افتح غرفة لمادة، ادعُ أصدقاءك، وراجعوا معًا بمؤقّت تركيز ودردشة — من البيت، وفي أي ساعة.</p>
      </Feature>

      <Feature id="duels" icon="swords" kicker="التحدّيات" title="من فيكم يعرف أكثر؟" flip
        shots={[{ src: '/preview/duel.webp', alt: 'نتيجة تحدٍّ: 9 مقابل 7' }]}>
        <p>أرسل تحدّيًا لزميلك: نفس الأسئلة لكما، والنتيجة الأعلى تفوز. ثم ردّ التحدّي متى شئت.</p>
      </Feature>

      <Feature id="rank" icon="trophy" kicker="ترتيب دفعتك" title="سلسلة يومية، وترتيب يبدأ من جديد كل أسبوع"
        shots={[
          { src: '/preview/rank.webp', alt: 'ترتيب الدفعة مع منصّة الثلاثة الأوائل' },
          { src: '/preview/streak.webp', alt: 'صفحتك: المستوى، السلسلة وأيام الدراسة' },
        ]}>
        <p>سؤال واحد كل يوم يحافظ على سلسلتك. نقاط على ما تشاركه وتجيب عنه، وترتيب أسبوعي يبدأ كل سبت.</p>
        <p className="lp-inline"><Ico n="fire" size={26} /> لا تكسر السلسلة.</p>
      </Feature>

      {/* ------------------------------------------------------ community */}
      <section className="lp-sec tight">
        <div className="lp-in">
          <Reveal className="lp-band">
            <Ico n="cap" size={64} />
            <div>
              <h2 className="lp-h3">مجتمع دفعتك</h2>
              <p>ملخّصات، ملفات، وأسئلة وأجوبة من دفعتك في مكان واحد — بدل البحث في عشرين مجموعة واتساب.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- tracks */}
      <section className="lp-sec tight">
        <div className="lp-in">
          <Reveal>
            <h2 className="lp-h2 center">لكل طلبة FMPOS</h2>
            <div className="lp-tracks">
              {tracks.map((t) => (
                <div key={t.id} className="lp-track">
                  <b>{t.name}</b>
                  <span className="lp-years">{t.years.map((y) => <i key={y.id} dir="ltr">{y.name}</i>)}</span>
                </div>
              ))}
            </div>
            <p className="lp-note">محاضرات الصيدلة وطب الأسنان تُضاف تباعًا.</p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ by the students */}
      <section className="lp-us">
        <div className="lp-in">
          <Reveal>
            <Mark size={46} light />
            <h2>منّا… ولنا.</h2>
            <p>نحن طلبة في FMPOS مثلك: نفس الدروس، ونفس الضغط قبل الامتحانات. ولهذا نبني MyPromo معكم.</p>
            <p className="lp-line">رأيك اليوم يحدّد ما ستجده في التطبيق غدًا.</p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- form */}
      <section className="lp-form-wrap" id="form">
        <div className="lp-in">
          <Form tracks={tracks} />
        </div>
      </section>

      <footer className="lp-foot">
        <div className="lp-in">
          <span className="lp-brand dark" dir="ltr"><Mark size={24} /><b>MyPromo</b></span>
          <small>FMPOS · Nouakchott</small>
          <small className="lp-credit" dir="ltr">3D icons: Microsoft Fluent Emoji (MIT)</small>
        </div>
      </footer>
    </div>
  );
}

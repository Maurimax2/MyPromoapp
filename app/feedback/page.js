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
//
// Not every student reads Arabic — this is the pre-account marketing page,
// not the app's own interface, so it also answers in French: `?lang=fr`.
export const dynamic = 'force-dynamic';

const zain = Zain({ subsets: ['arabic', 'latin'], weight: ['700', '800', '900'], variable: '--lp-head', display: 'swap' });
const plex = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700'], variable: '--lp-body', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['700', '800'], variable: '--lp-mark', display: 'swap' });

const SITE = process.env.MYPROMO_URL || 'https://mypromo-nu.vercel.app';

const T = {
  ar: {
    dir: 'rtl',
    metaTitle: 'ساعدنا في بناء MyPromo',
    metaDesc: 'QCM من المحاضرات والامتحانات السابقة، Anatomie 3D، غرف دراسة وتحديات — تطبيق لطلبة FMPOS. شاركنا رأيك في دقيقة.',
    ogDesc: 'تطبيق لطلبة FMPOS — شاركنا رأيك في دقيقة واحدة.',
    ogAlt: 'MyPromo — ساعدنا في بناء التطبيق',
    ogLocale: 'ar',
    langSwitch: 'FR',
    tracks: { medicine: 'الطب', pharmacy: 'الصيدلة', dental: 'طب الأسنان' },
    heroA: 'ساعدنا في بناء',
    lead: (
      <>
        تطبيق واحد لكل دراستك: <b>QCM</b> من المحاضرات والامتحانات السابقة،
        {' '}<b dir="ltr">Anatomie 3D</b>، غرف دراسة وتحديات مع دفعتك.
      </>
    ),
    ctaBtn: 'شاركنا رأيك',
    ctaSmall: 'دقيقة واحدة · بدون حساب',
    stageLabel: 'صور حقيقية من التطبيق',
    studyAlt: 'شاشة الدراسة في MyPromo: المواد، QCM، الملخصات والنموذج ثلاثي الأبعاد',
    homeAlt: 'الشاشة الرئيسية في MyPromo: سؤال اليوم والتحديات',
    stageCap: 'صور حقيقية من التطبيق',
    stripLabel: 'ما في MyPromo',
    strip: { qcm: <span dir="ltr">+10,000 QCM</span>, anatomie: <span dir="ltr">Anatomie 3D</span>, rooms: 'غرف الدراسة', duels: 'التحدّيات', rank: 'ترتيب دفعتك' },
    qcmTitle: <><span dir="ltr">+10,000</span> سؤال، من المحاضرات والامتحانات السابقة</>,
    qcmAlt: 'سؤال QCM في ANATOMIE مع الجواب الصحيح',
    qcmBody: <p>مرتّبة حسب المادة والمحاضرة. تعرف الجواب فور إجابتك، وما تخطئ فيه يعود إليك في «المراجعة» حتى تتقنه.</p>,
    anatomieTitle: 'أدِر النموذج، والمس لتعرف الاسم',
    heartAlt: 'نموذج Cœur ثلاثي الأبعاد، وقد لُمس Ventricule droit',
    kneeAlt: 'نموذج Genou ثلاثي الأبعاد، وقد لُمست Patella',
    stats: [{ n: 33, l: 'منطقة من الجسم' }, { n: 319, l: 'معلمًا مُسمّى' }, { n: 818, l: 'اسمًا بالفرنسية' }],
    roomsTitle: 'راجعوا معًا، بالصوت والصورة',
    roomAlt: 'غرفة دراسة فيها أربعة طلبة، مع مؤقّت التركيز والدردشة',
    roomsBody: <p>افتح غرفة لمادة، ادعُ أصدقاءك، وراجعوا معًا بمؤقّت تركيز ودردشة — من البيت، وفي أي ساعة.</p>,
    duelsTitle: 'من فيكم يعرف أكثر؟',
    duelAlt: 'نتيجة تحدٍّ: 9 مقابل 7',
    duelsBody: <p>أرسل تحدّيًا لزميلك: نفس الأسئلة لكما، والنتيجة الأعلى تفوز. ثم ردّ التحدّي متى شئت.</p>,
    rankTitle: 'سلسلة يومية، وترتيب يبدأ من جديد كل أسبوع',
    rankAlt: 'ترتيب الدفعة مع منصّة الثلاثة الأوائل',
    streakAlt: 'صفحتك: المستوى، السلسلة وأيام الدراسة',
    rankBody: <p>سؤال واحد كل يوم يحافظ على سلسلتك. نقاط على ما تشاركه وتجيب عنه، وترتيب أسبوعي يبدأ كل سبت.</p>,
    rankLine: 'لا تكسر السلسلة.',
    communityTitle: 'مجتمع دفعتك',
    communityBody: 'ملخّصات، ملفات، وأسئلة وأجوبة من دفعتك في مكان واحد — بدل البحث في عشرين مجموعة واتساب.',
    tracksTitle: 'لكل طلبة FMPOS',
    usTitle: 'منّا… ولنا.',
    usBody: 'نحن طلبة في FMPOS مثلك: نفس الدروس، ونفس الضغط قبل الامتحانات. ولهذا نبني MyPromo معكم.',
    usLine: 'رأيك اليوم يحدّد ما ستجده في التطبيق غدًا.',
    footPromo: 'FMPOS · Nouakchott',
  },
  fr: {
    dir: 'ltr',
    metaTitle: 'Aidez-nous à construire MyPromo',
    metaDesc: "QCM tirés des cours et des examens précédents, Anatomie 3D, groupes d'étude et défis — une appli pour les étudiants de la FMPOS. Donnez votre avis en une minute.",
    ogDesc: "Une appli pour les étudiants de la FMPOS — donnez votre avis en une minute.",
    ogAlt: "MyPromo — aidez-nous à construire l'appli",
    ogLocale: 'fr',
    langSwitch: 'AR',
    tracks: { medicine: 'Médecine', pharmacy: 'Pharmacie', dental: 'Médecine dentaire' },
    heroA: 'Aidez-nous à construire',
    lead: (
      <>
        Une seule appli pour toutes tes études : <b>QCM</b> tirés des cours et des examens précédents,
        {' '}<b>Anatomie 3D</b>, groupes d'étude et défis avec ta promo.
      </>
    ),
    ctaBtn: 'Donne ton avis',
    ctaSmall: 'Une minute · sans compte',
    stageLabel: "Vraies captures de l'appli",
    studyAlt: "Écran d'étude de MyPromo : matières, QCM, résumés et le modèle 3D",
    homeAlt: "Écran d'accueil de MyPromo : la question du jour et les défis",
    stageCap: "Vraies captures de l'appli",
    stripLabel: 'Ce que propose MyPromo',
    strip: { qcm: '+10 000 QCM', anatomie: 'Anatomie 3D', rooms: "Groupes d'étude", duels: 'Défis', rank: 'Classement de ta promo' },
    qcmTitle: '+10 000 questions, tirées des cours et des examens précédents',
    qcmAlt: 'Question QCM en ANATOMIE avec la bonne réponse',
    qcmBody: <p>Classées par matière et par cours. Tu connais la réponse dès que tu réponds, et ce que tu rates revient dans « Révision » jusqu'à ce que tu le maîtrises.</p>,
    anatomieTitle: 'Fais tourner le modèle, touche pour connaître le nom',
    heartAlt: 'Modèle 3D du Cœur, Ventricule droit touché',
    kneeAlt: 'Modèle 3D du Genou, Patella touchée',
    stats: [{ n: 33, l: 'régions du corps' }, { n: 319, l: 'repères nommés' }, { n: 818, l: 'noms en français' }],
    roomsTitle: 'Révisez ensemble, en audio et vidéo',
    roomAlt: "Groupe d'étude avec quatre étudiants, minuteur de concentration et chat",
    roomsBody: <p>Ouvre un groupe pour une matière, invite tes amis, et révisez ensemble avec un minuteur de concentration et un chat — depuis chez toi, à toute heure.</p>,
    duelsTitle: 'Qui de vous en sait le plus ?',
    duelAlt: "Résultat d'un défi : 9 contre 7",
    duelsBody: <p>Envoie un défi à un camarade : les mêmes questions pour vous deux, le meilleur score gagne. Renvoie le défi quand tu veux.</p>,
    rankTitle: 'Une série quotidienne, et un classement qui redémarre chaque semaine',
    rankAlt: 'Classement de la promo avec le podium des trois premiers',
    streakAlt: 'Ton profil : niveau, série et jours d\'étude',
    rankBody: <p>Une question par jour garde ta série. Des points pour ce que tu partages et pour tes réponses, et un classement hebdomadaire qui repart chaque samedi.</p>,
    rankLine: 'Ne casse pas ta série.',
    communityTitle: 'La communauté de ta promo',
    communityBody: "Résumés, fichiers, questions et réponses de ta promo au même endroit — plutôt que de chercher dans vingt groupes WhatsApp.",
    tracksTitle: 'Pour tous les étudiants de la FMPOS',
    usTitle: 'Par nous… pour nous.',
    usBody: "Nous sommes des étudiants de la FMPOS comme toi : les mêmes cours, la même pression avant les examens. C'est pour ça qu'on construit MyPromo avec vous.",
    usLine: "Ton avis aujourd'hui décide ce que tu trouveras dans l'appli demain.",
    footPromo: 'FMPOS · Nouakchott',
  },
};

function langOf(sp) {
  return sp?.lang === 'fr' ? 'fr' : 'ar';
}

export async function generateMetadata({ searchParams }) {
  const lang = langOf(await searchParams);
  const t = T[lang];
  return {
    metadataBase: new URL(SITE),
    title: t.metaTitle,
    description: t.metaDesc,
    openGraph: {
      title: t.metaTitle,
      description: t.ogDesc,
      images: [{ url: '/og/feedback.jpg', width: 1200, height: 630, alt: t.ogAlt }],
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', images: ['/og/feedback.jpg'] },
  };
}

const TRACK_IDS = ['medicine', 'pharmacy', 'dental'];

/**
 * The years a student can say they are in, grouped by track.
 *
 * Read from the database, because the panel can add a year; `promos` is
 * readable by approved students only and whoever opens this page is signed
 * out, so it is read here with the service key. If that is not configured,
 * the years the app ships with are the answer rather than an empty screen.
 */
async function years(t) {
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
  return TRACK_IDS.map((id) => ({
    id,
    name: t.tracks[id],
    years: list.filter((p) => trackOf(p) === id).map(({ id, name, badge }) => ({ id, name, badge })),
  })).filter((tr) => tr.years.length);
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

export default async function Feedback({ searchParams }) {
  const sp = await searchParams;
  const lang = langOf(sp);
  const t = T[lang];
  const otherLang = lang === 'ar' ? 'fr' : 'ar';
  const otherHref = (() => {
    const params = new URLSearchParams();
    if (sp?.from) params.set('from', sp.from);
    params.set('lang', otherLang);
    return `/feedback?${params.toString()}`;
  })();
  const tracks = await years(t);

  return (
    <div className={`lp ${zain.variable} ${plex.variable} ${poppins.variable}`} dir={t.dir}>
      {/* ------------------------------------------------------------ hero */}
      <header className="lp-hero">
        <div className="lp-in">
          <nav className="lp-top">
            <span className="lp-brand" dir="ltr"><Mark size={30} light /><b>MyPromo</b></span>
            <a className="lp-lang" href={otherHref} dir="ltr">{t.langSwitch}</a>
          </nav>

          <div className="lp-hero-grid">
            <div className="lp-hero-copy">
              <h1>
                <span className="lp-h1a">{t.heroA}</span>
                <span className="lp-h1b" dir="ltr">MyPromo</span>
              </h1>
              <p className="lp-lead">{t.lead}</p>
              <div className="lp-cta">
                <a className="lp-btn gold" href="#form">{t.ctaBtn}</a>
                <small>{t.ctaSmall}</small>
              </div>
            </div>

            <div className="lp-stage" aria-label={t.stageLabel}>
              <Phone src="/preview/study.webp" alt={t.studyAlt} className="side" />
              <Phone src="/preview/home-v2.webp" alt={t.homeAlt} className="main" priority />
              <Ico n="check" size={64} className="lp-float f1" />
              <Ico n="heart" size={70} className="lp-float f2" />
              <Ico n="swords" size={58} className="lp-float f3" />
              <span className="lp-cap">{t.stageCap}</span>
            </div>
          </div>
        </div>

        <div className="lp-in">
          <ul className="lp-strip" aria-label={t.stripLabel}>
            <li><a href="#qcm"><Ico n="check" size={30} />{t.strip.qcm}</a></li>
            <li><a href="#anatomie"><Ico n="heart" size={30} />{t.strip.anatomie}</a></li>
            <li><a href="#rooms"><Ico n="video" size={30} />{t.strip.rooms}</a></li>
            <li><a href="#duels"><Ico n="swords" size={30} />{t.strip.duels}</a></li>
            <li><a href="#rank"><Ico n="trophy" size={30} />{t.strip.rank}</a></li>
          </ul>
        </div>
      </header>

      {/* -------------------------------------------------------- features */}
      <Feature id="qcm" icon="check" kicker="QCM" title={t.qcmTitle}
        shots={[{ src: '/preview/qcm-v2.webp', alt: t.qcmAlt }]}>
        {t.qcmBody}
      </Feature>

      <Feature id="anatomie" icon="heart" kicker={<span dir="ltr">Anatomie 3D</span>} title={t.anatomieTitle} dark flip
        shots={[
          { src: '/preview/heart-v2.webp', alt: t.heartAlt },
          { src: '/preview/knee-v2.webp', alt: t.kneeAlt },
        ]}
        extra={(
          <dl className="lp-stats">
            {t.stats.map((s) => <div key={s.l}><dt>{s.n}</dt><dd>{s.l}</dd></div>)}
          </dl>
        )} />

      <Feature id="rooms" icon="video" kicker={t.strip.rooms} title={t.roomsTitle}
        shots={[{ src: '/preview/room.webp', alt: t.roomAlt }]}>
        {t.roomsBody}
      </Feature>

      <Feature id="duels" icon="swords" kicker={t.strip.duels} title={t.duelsTitle} flip
        shots={[{ src: '/preview/duel.webp', alt: t.duelAlt }]}>
        {t.duelsBody}
      </Feature>

      <Feature id="rank" icon="trophy" kicker={t.strip.rank} title={t.rankTitle}
        shots={[
          { src: '/preview/rank.webp', alt: t.rankAlt },
          { src: '/preview/streak.webp', alt: t.streakAlt },
        ]}>
        {t.rankBody}
        <p className="lp-inline"><Ico n="fire" size={26} /> {t.rankLine}</p>
      </Feature>

      {/* ------------------------------------------------------ community */}
      <section className="lp-sec tight">
        <div className="lp-in">
          <Reveal className="lp-band">
            <Ico n="cap" size={64} />
            <div>
              <h2 className="lp-h3">{t.communityTitle}</h2>
              <p>{t.communityBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- tracks */}
      <section className="lp-sec tight">
        <div className="lp-in">
          <Reveal>
            <h2 className="lp-h2 center">{t.tracksTitle}</h2>
            <div className="lp-tracks">
              {tracks.map((tr) => (
                <div key={tr.id} className="lp-track">
                  <b>{tr.name}</b>
                  <span className="lp-years">{tr.years.map((y) => <i key={y.id} dir="ltr">{y.name}</i>)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ by the students */}
      <section className="lp-us">
        <div className="lp-in">
          <Reveal>
            <Mark size={46} light />
            <h2>{t.usTitle}</h2>
            <p>{t.usBody}</p>
            <p className="lp-line">{t.usLine}</p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- form */}
      <section className="lp-form-wrap" id="form">
        <div className="lp-in">
          <Form tracks={tracks} lang={lang} />
        </div>
      </section>

      <footer className="lp-foot">
        <div className="lp-in">
          <span className="lp-brand dark" dir="ltr"><Mark size={24} /><b>MyPromo</b></span>
          <small>{t.footPromo}</small>
          <small className="lp-credit" dir="ltr">
            3D models: Z-Anatomy (CC BY-SA 4.0), after BodyParts3D © The Database Center for Life Science (CC BY 4.0) · 3D icons: Microsoft Fluent Emoji (MIT)
          </small>
        </div>
      </footer>
    </div>
  );
}

import Image from 'next/image';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { PROMOS } from '@/lib/data';
import { supabaseAdmin } from '@/lib/supabase/admin';
import Reveal from './Reveal';
import Form from './Form';

// شاركنا رأيك — the page a student opens before there is an account.
//
// It is the one screen in MyPromo that is read by somebody who has never seen
// MyPromo, so the product does the talking: every screenshot on this page is
// the running app photographed, not a drawing of it, and every number is
// counted from what the app actually holds.
//
// Signed out on purpose. The middleware lets this one through.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'شاركنا رأيك — MyPromo',
  description: 'منّا ولنا — تطبيق من طلبة الطب، لطلبة الطب. ساعدنا نبني MyPromo لطلبة FMPOS.',
};

/**
 * The years a student can say they are in.
 *
 * Six is where this started, but the panel can add a year — so the list is
 * read from the database. `promos` is readable by approved students only and
 * whoever opens this page is signed out, so it is read on the server with the
 * service key and never in the browser. If that is not configured, the six
 * the app shipped with are the answer rather than an empty screen.
 */
async function promosFor() {
  try {
    const { data } = await supabaseAdmin()
      .from('promos').select('id, name, badge, position').order('position');
    if (data?.length) return data;
  } catch { /* not configured, or the table is not there yet */ }
  return PROMOS.map(({ id, name, badge }) => ({ id, name, badge }));
}

// A phone with a screenshot in it.
//
// `h` is the screenshot's own height at 390 wide. Most are a whole screen —
// 844 — but one was sent in already cropped, and a frame that forces every
// picture to the same shape either stretches it or pads it with dead grey.
// A shorter screenshot simply gets a shorter phone.
function Phone({ src, alt, size = '', priority = false, h = 844 }) {
  return (
    <div className={`pl-phone ${size}`}>
      <Image src={src} alt={alt} width={390} height={h} priority={priority}
        sizes="(max-width: 760px) 70vw, 300px" />
    </div>
  );
}

// The QCM screenshot, as it was taken: 1290 × 1985.
const MCQ = Math.round((390 * 1985) / 1290);

/**
 * One feature: what it is, and the screen it is.
 *
 * Alternating sides on a wide screen, stacked on a phone — and the picture
 * comes first in the markup so that on a phone you see the thing before you
 * read about it.
 */
function Feature({ kicker, title, body, src, alt, h, flip = false, children }) {
  return (
    <section className="pl-sec">
      <div className={`pl-in pl-split${flip ? ' flip' : ''}`}>
        <Reveal>
          <div className="pl-shot"><Phone src={src} alt={alt} h={h} /></div>
        </Reveal>
        <Reveal delay={100}>
          <span className="pl-kicker">{kicker}</span>
          <h2 className="pl-h2">{title}</h2>
          <p className="pl-sub">{body}</p>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default async function Feedback() {
  const promos = await promosFor();

  return (
    <div className="pl">
      <header className="pl-head">
        <div className="pl-in">
          <span className="pl-mark"><Logo size={28} /><span>MyPromo</span></span>
          <span className="pl-grow" />
          <a className="pl-btn p sm" href="#form">شاركنا رأيك</a>
        </div>
      </header>

      {/* ---------------------------------------------------------- hero */}
      <section className="pl-hero">
        <span className="pl-glow" aria-hidden="true" />
        <div className="pl-in">
          <Reveal>
            <span className="pl-float" style={{ display: 'inline-flex' }}><Logo size={58} /></span>
            <h1>منّا <em>ولنا.</em></h1>
            <p>نعرف صعوبة الدراسة، كثرة الدروس، وضغط الامتحانات.</p>
            <p style={{ marginTop: 6 }}>
              لذلك بنينا <b>MyPromo</b> — تطبيقًا من طلبة الطب، لطلبة الطب.
            </p>
            <div className="pl-cta">
              <a className="pl-btn p" href="#form">شاركنا رأيك</a>
              <small>ساعدنا نبني تجربة أفضل لطلبة FMPOS</small>
            </div>
          </Reveal>

          {/* Three phones. Side by side where there is room, and one row you
              push sideways where there is not — the same gesture as the
              subject banners inside the app. */}
          <Reveal delay={120}>
            <div className="pl-stage">
              <Phone src="/preview/mcq.webp" h={MCQ} alt="سؤال QCM في مادة Sémiologie داخل MyPromo" />
              <Phone src="/preview/feed.webp" alt="الشاشة الرئيسية في MyPromo" size="lg" priority />
              <Phone src="/preview/crane3d.webp" alt="نموذج الجمجمة ثلاثي الأبعاد مع معالمه" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="pl-rail top">
              <Phone src="/preview/feed.webp" alt="الشاشة الرئيسية في MyPromo" priority />
              <Phone src="/preview/mcq.webp" h={MCQ} alt="سؤال QCM في مادة Sémiologie داخل MyPromo" />
              <Phone src="/preview/crane3d.webp" alt="نموذج الجمجمة ثلاثي الأبعاد مع معالمه" />
            </div>
          </Reveal>
          <p className="pl-cap">صور حقيقية من التطبيق — لا رسوم توضيحية.</p>
        </div>
      </section>

      {/* --------------------------------------------------- the features */}
      <div className="pl-sec grey" style={{ paddingBottom: 0 }}>
        <div className="pl-in">
          <Reveal>
            <h2 className="pl-h2" style={{ textAlign: 'center' }}>شوف MyPromo كما هو</h2>
            <p className="pl-sub" style={{ textAlign: 'center', margin: '0 auto' }}>
              ما بُني حتى الآن، شاشة بشاشة.
            </p>
          </Reveal>
        </div>
      </div>

      <Feature
        kicker="المجتمع"
        title="دفعتك، في مكان واحد"
        body="ما يُنشر يصل إلى دفعتك وحدها: ملخّص قبل الامتحان، تأجيل حصة، سؤال في مادة — مع الملفات، لا روابط تضيع في مجموعة."
        src="/preview/posts.webp"
        alt="منشورات الدفعة في MyPromo مع ملف PDF مرفق"
      />

      <Feature
        kicker="QCM"
        title="اختبر نفسك قبل الامتحان"
        body="أسئلة مرتّبة حسب المادة والمحاضرة، مع الجواب وسببه. وما تُخطئ فيه يعود إليك وحده في المراجعة."
        src="/preview/mcq.webp"
        h={MCQ}
        alt="سؤال QCM مع الأجوبة الصحيحة في MyPromo"
        flip
      />

      <Feature
        kicker="تحدّي زميلك"
        title="نفس الأسئلة، ونتيجتان"
        body="اختر مادة، أجب على عشرة أسئلة، وأرسلها إلى زميل برقمه الجامعي. يجيب على الأسئلة نفسها، وتريان النتيجتين."
        src="/preview/duel.webp"
        alt="شاشة تحدّي زميلك مع نتيجة 9–7"
      />

      <Feature
        kicker="غرف الدراسة"
        title="ادرسوا معًا في نفس الوقت"
        body="غرفة لمادة أو لمحاضرة، يفتحها أي طالب وينضم إليها من يريد المراجعة الآن."
        src="/preview/rooms.webp"
        alt="غرف الدراسة المفتوحة في MyPromo"
        flip
      />

      {/* ------------------------------------------------------- anatomy */}
      <section className="pl-sec grey">
        <div className="pl-in pl-split">
          <Reveal>
            <span className="pl-kicker">Anatomie</span>
            <h2 className="pl-h2">وحتى التشريح… بطريقة مختلفة</h2>
            <p className="pl-sub">
              استكشف البنى التشريحية وتعلّمها بطريقة أكثر وضوحًا: نموذج تدور حوله،
              تلمس العظم فيه فيخبرك باسمه، ومعالم مُسمّاة على العظم نفسه — لا صورة
              في كتاب.
            </p>
            <div className="pl-tiles">
              <div className="pl-tile">
                <span className="pl-tile-ic"><Icon name="box" size={17} /></span>
                <b dir="auto">Modèles 3D</b>
                <span>33 منطقة من الجسم، حسب برنامج PCEM1 و PCEM2</span>
              </div>
              <div className="pl-tile">
                <span className="pl-tile-ic"><Icon name="pin" size={17} /></span>
                <b dir="auto">Repères osseux</b>
                <span>319 معلمًا مُسمّى على العظام</span>
              </div>
              <div className="pl-tile">
                <span className="pl-tile-ic"><Icon name="book" size={17} /></span>
                <b dir="auto">Descriptions</b>
                <span>ما هي البنية، ما تتمفصل معه، وما يعبرها</span>
              </div>
              <div className="pl-tile">
                <span className="pl-tile-ic"><Icon name="search" size={17} /></span>
                <b dir="auto">Recherche</b>
                <span>ابحث عن أي بنية بالاسم، تُفتح لك في مكانها</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="pl-rail">
              <Phone src="/preview/crane.webp" alt="قاعدة الجمجمة، مع تسمية الثقبة البيضية" />
              <Phone src="/preview/genou.webp" alt="نموذج الركبة مع معالم العظم" />
              <Phone src="/preview/regions.webp" alt="مناطق الجسم في التشريح" />
            </div>
            <p className="pl-cap">Base du crâne · Genou · Les régions du programme</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- by students */}
      <section className="pl-purple">
        <div className="pl-in">
          <Reveal>
            <h2>من طلبة الطب… لطلبة الطب.</h2>
            <p>نحن لا نبني MyPromo من الخارج.</p>
            <p>
              نحن ندرس نفس الدروس، نواجه نفس الضغط، ونبحث عن طرق أفضل للمراجعة.
              ولهذا نريد أن نبنيه معكم.
            </p>
            <p className="pl-line">رأيك اليوم يمكن أن يغيّر ما ستجده في MyPromo غدًا.</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- form */}
      <section className="pl-form-wrap">
        <div className="pl-in">
          <Reveal>
            <Form promos={promos} />
          </Reveal>
        </div>
      </section>

      <footer className="pl-foot">
        <div className="pl-in">
          <span className="pl-mark"><Logo size={26} /><span>MyPromo</span></span>
          <p>صنعه طلبة الطب… لطلبة الطب.</p>
          <small>FMPOS</small>
        </div>
      </footer>
    </div>
  );
}

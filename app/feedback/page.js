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
  description: 'تطبيق من طلبة الطب، لطلبة الطب. ساعدنا نبني MyPromo لطلبة FMPOS.',
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

function Phone({ src, alt, size = '', priority = false }) {
  return (
    <div className={`pl-phone ${size}`}>
      <Image src={src} alt={alt} width={390} height={844} priority={priority}
        sizes="(max-width: 760px) 70vw, 300px" />
    </div>
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
            <h1>نحن طلبة طب <em>مثلكم.</em></h1>
            <p>نعرف صعوبة الدراسة، كثرة الدروس، وضغط الامتحانات.</p>
            <p style={{ marginTop: 6 }}>
              لذلك بنينا <b>MyPromo</b> — تطبيقًا من طلبة الطب، لطلبة الطب.
            </p>
            <div className="pl-cta">
              <a className="pl-btn p" href="#form">شاركنا رأيك</a>
              <small>ساعدنا نبني تجربة أفضل لطلبة FMPOS</small>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="pl-stage">
              <Phone src="/preview/archive.webp" alt="شاشة الأرشيف في MyPromo" />
              <Phone src="/preview/feed.webp" alt="الشاشة الرئيسية في MyPromo" size="lg" priority />
              <Phone src="/preview/crane.webp" alt="نموذج ثلاثي الأبعاد لقاعدة الجمجمة في MyPromo" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="pl-rail">
              <Phone src="/preview/feed.webp" alt="الشاشة الرئيسية في MyPromo" priority />
              <Phone src="/preview/archive.webp" alt="شاشة الأرشيف في MyPromo" />
              <Phone src="/preview/crane.webp" alt="نموذج ثلاثي الأبعاد لقاعدة الجمجمة في MyPromo" />
            </div>
          </Reveal>
          <p className="pl-cap">صور حقيقية من التطبيق — لا رسوم توضيحية.</p>
        </div>
      </section>

      {/* ------------------------------------------------------- screens */}
      <section className="pl-sec grey">
        <div className="pl-in">
          <Reveal>
            <span className="pl-kicker">التطبيق</span>
            <h2 className="pl-h2">شوف MyPromo كما هو</h2>
            <p className="pl-sub">
              كل شيء في مكان واحد: محاضرات دفعتك، الملخصات، الأرشيف، والاختبارات —
              مرتّبة حسب المادة والسداسي.
            </p>
          </Reveal>

          <div className="pl-rail">
            <Reveal delay={60}>
              <Phone src="/preview/feed.webp" alt="الشاشة الرئيسية" />
              <p className="pl-cap">الرئيسية — دفعتك، وكل الأدوات</p>
            </Reveal>
            <Reveal delay={140}>
              <Phone src="/preview/archive.webp" alt="الأرشيف" />
              <p className="pl-cap">الأرشيف — المواد والملفات</p>
            </Reveal>
            <Reveal delay={220}>
              <Phone src="/preview/regions.webp" alt="مناطق الجسم في التشريح" />
              <p className="pl-cap">التشريح — مناطق الجسم حسب البرنامج</p>
            </Reveal>
            <Reveal delay={300}>
              <Phone src="/preview/genou.webp" alt="نموذج الركبة مع معالم العظم" />
              <p className="pl-cap">معالم العظم، على النموذج نفسه</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- anatomy */}
      <section className="pl-sec">
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Phone src="/preview/crane.webp" alt="قاعدة الجمجمة، مع تسمية الثقبة البيضية" size="lg" />
            </div>
            <p className="pl-cap">Base du crâne — le foramen ovale, nommé sur le modèle</p>
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

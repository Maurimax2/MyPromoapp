import Logo from '@/components/Logo';
import Icon from '@/components/Icon';

export const dynamic = 'force-static';

const SITE = process.env.MYPROMO_URL || 'https://mypromo-nu.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE),
  title: 'حمّل MyPromo لأندرويد',
  description: 'QCM، محاضرات، Anatomie 3D وغرف دراسة لطلبة FMPOS — حمّل التطبيق وثبّته في نصف دقيقة.',
  openGraph: {
    title: 'حمّل MyPromo لأندرويد',
    description: 'تطبيق دفعتك: QCM، محاضرات، Anatomie 3D وغرف دراسة.',
    images: [{ url: '/icon-512.png', width: 512, height: 512 }],
    type: 'website',
    locale: 'ar',
  },
};

// Written down because the file is served from public/, where the page cannot
// ask how big it is. Change both when a new APK replaces public/MyPromo.apk.
const VERSION = '1.0.4';
const SIZE = '4.8';

const STEPS = [
  ['اضغط «تحميل التطبيق»', 'يبدأ التحميل فورًا، والملف صغير.'],
  ['افتح الملف', 'من إشعار التحميل أو من مجلد التنزيلات. إن سألك الهاتف، اسمح بالتثبيت من هذا المصدر.'],
  ['إن ظهر تحذير Play Protect', 'اختر «التثبيت على أي حال». التطبيق لم يُنشر على المتجر بعد، وهذا هو سبب التحذير.'],
  ['افتح MyPromo', 'أنشئ حسابك واختر سنتك — ويُفتح لك التطبيق مباشرة.'],
];

export default function Download() {
  return (
    <main className="dl">
      <section className="dl-hero">
        <span className="dl-logo"><Logo size={64} white /></span>
        <h1>MyPromo</h1>
        <p>كل ما تشاركه دفعتك، في مكان واحد</p>
        <img className="dl-art a" src="/art/coeur.webp" alt="" />
        <img className="dl-art b" src="/art/crane.webp" alt="" />
        <img className="dl-art c" src="/art/encephale.webp" alt="" />
      </section>

      <a className="dl-go" href="/MyPromo.apk" download="MyPromo.apk">
        <Icon name="download" size={22} />
        <span>
          <b>تحميل التطبيق لأندرويد</b>
          <s dir="ltr">APK · {SIZE} MB · v{VERSION}</s>
        </span>
      </a>

      <ol className="dl-steps">
        {STEPS.map(([head, text], i) => (
          <li key={head}>
            <span className="dl-n">{i + 1}</span>
            <span><b>{head}</b><s>{text}</s></span>
          </li>
        ))}
      </ol>

    </main>
  );
}

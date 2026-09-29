import Legal, { Section, Contact } from '@/components/Legal';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'سياسة الخصوصية — MyPromo' };

const UPDATED = { ar: 'آخر تحديث: 29 سبتمبر 2026', fr: 'Dernière mise à jour : 29 septembre 2026' };

export default async function Privacy({ searchParams }) {
  const fr = (await searchParams)?.lang === 'fr';

  if (fr) {
    return (
      <Legal lang="fr" path="/privacy" title="Politique de confidentialité" updated={UPDATED.fr}>
        <p>
          MyPromo est une application pour les étudiants de la faculté (FMPOS) : révisions, QCM,
          résumés, discussions et salles d&apos;étude avec sa promo. Cette page explique quelles
          données nous gardons et pourquoi.
        </p>

        <Section title="Ce que nous collectons">
          <ul>
            <li>Votre adresse e-mail, votre nom, votre matricule et votre promo, donnés à l&apos;inscription.</li>
            <li>Pour les étudiants de première année : votre numéro WhatsApp, uniquement pour que l&apos;équipe vérifie votre inscription.</li>
            <li>Ce que vous publiez : publications, commentaires, questions et réponses, messages, photos et fichiers PDF que vous envoyez.</li>
            <li>Votre activité d&apos;étude : réponses aux QCM, points, séries, cours consultés, défis.</li>
            <li>Un identifiant de notification de votre téléphone ou navigateur, si vous activez les notifications.</li>
          </ul>
        </Section>

        <Section title="Caméra et microphone">
          <p>
            Ils ne sont utilisés que si vous les activez vous-même dans une salle d&apos;étude. L&apos;appel
            passe par notre prestataire LiveKit. Nous n&apos;enregistrons ni l&apos;audio ni la vidéo.
          </p>
        </Section>

        <Section title="Pourquoi">
          <p>
            Pour faire fonctionner l&apos;application : vous identifier, montrer vos publications à votre
            promo, calculer vos points, vous envoyer les notifications que vous avez choisies.
            Un compte est approuvé par l&apos;équipe avant d&apos;accéder au contenu.
          </p>
        </Section>

        <Section title="Où sont les données">
          <p>
            Elles sont stockées chez Supabase (base de données et fichiers). Le site est hébergé par
            Vercel. Les notifications passent par Firebase Cloud Messaging (Google). Les appels des
            salles d&apos;étude passent par LiveKit. Nous ne vendons aucune donnée et n&apos;affichons aucune
            publicité. Il n&apos;y a pas d&apos;outil de suivi publicitaire ni d&apos;analyse tierce dans l&apos;application.
          </p>
        </Section>

        <Section title="Qui voit quoi">
          <p>
            Les membres de votre promo voient votre nom et ce que vous publiez. Votre e-mail et votre
            numéro WhatsApp ne sont jamais affichés aux autres étudiants ; seule l&apos;équipe de
            MyPromo peut les consulter.
          </p>
        </Section>

        <Section title="Supprimer votre compte">
          <p>
            Dans l&apos;application : Profil, puis « حذف حسابي ». Sans l&apos;application, suivez la page{' '}
            <a href="/delete-account?lang=fr">Suppression de compte</a>. Le compte, les publications,
            messages, points et paramètres sont supprimés définitivement. Les résumés et questions que
            vous avez partagés restent pour votre promo, sans votre nom.
          </p>
        </Section>

        <Section title="Contact">
          <p>Pour toute question sur vos données, écrivez-nous.</p>
          <Contact fr />
        </Section>
      </Legal>
    );
  }

  return (
    <Legal lang="ar" path="/privacy" title="سياسة الخصوصية" updated={UPDATED.ar}>
      <p>
        MyPromo تطبيق لطلبة الكلية (FMPOS): مراجعة، أسئلة QCM، ملخصات، محادثات وغرف دراسة مع دفعتك.
        توضّح هذه الصفحة ما البيانات التي نحتفظ بها ولماذا.
      </p>

      <Section title="ما الذي نجمعه">
        <ul>
          <li>بريدك الإلكتروني واسمك ورقم matricule ودفعتك، وتُدخلها عند إنشاء الحساب.</li>
          <li>لطلبة السنة الأولى: رقم واتساب، ليتحقق الفريق من تسجيلك فقط.</li>
          <li>ما تنشره: المنشورات والتعليقات والأسئلة والأجوبة والرسائل، والصور وملفات PDF التي ترفعها.</li>
          <li>نشاطك الدراسي: إجاباتك على الأسئلة، النقاط، الأيام المتتالية، المحاضرات التي فتحتها، والتحديات.</li>
          <li>معرّف الإشعارات لهاتفك أو متصفحك إن فعّلت الإشعارات.</li>
        </ul>
      </Section>

      <Section title="الكاميرا والميكروفون">
        <p>
          لا يُستخدمان إلا إذا شغّلتهما بنفسك داخل غرفة دراسة. تمر المكالمة عبر مزوّد الخدمة LiveKit،
          ولا نسجّل الصوت ولا الفيديو.
        </p>
      </Section>

      <Section title="لماذا">
        <p>
          لتشغيل التطبيق: التعرّف عليك، عرض منشوراتك لدفعتك، حساب نقاطك، وإرسال الإشعارات التي اخترتها.
          يوافق الفريق على كل حساب قبل أن يرى المحتوى.
        </p>
      </Section>

      <Section title="أين تُحفظ البيانات">
        <p>
          تُحفظ لدى Supabase (قاعدة البيانات والملفات). يُستضاف الموقع على Vercel، وتمر الإشعارات عبر
          Firebase Cloud Messaging من Google، وتمر مكالمات غرف الدراسة عبر LiveKit. لا نبيع أي بيانات
          ولا نعرض إعلانات، ولا توجد في التطبيق أدوات تتبّع إعلاني أو تحليلات من طرف ثالث.
        </p>
      </Section>

      <Section title="من يرى ماذا">
        <p>
          يرى أفراد دفعتك اسمك وما تنشره. لا يُعرض بريدك ولا رقم واتساب لأي طالب آخر؛ لا يطّلع عليهما
          إلا فريق MyPromo.
        </p>
      </Section>

      <Section title="حذف حسابك">
        <p>
          من داخل التطبيق: الملف الشخصي ثم «حذف حسابي». ودون التطبيق، اتبع صفحة{' '}
          <a href="/delete-account">حذف الحساب</a>. يُحذف الحساب والمنشورات والرسائل والنقاط والإعدادات
          نهائيًا. أما الملخصات والأسئلة التي شاركتها فتبقى لدفعتك دون اسمك.
        </p>
      </Section>

      <Section title="التواصل">
        <p>لأي سؤال عن بياناتك، راسلنا.</p>
        <Contact />
      </Section>
    </Legal>
  );
}

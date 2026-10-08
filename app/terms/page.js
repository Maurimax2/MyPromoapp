import Legal, { Section, Contact } from '@/components/Legal';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'شروط الاستخدام — MyPromo' };

const UPDATED = { ar: 'آخر تحديث: 8 أكتوبر 2026', fr: 'Dernière mise à jour : 8 octobre 2026' };

// The rules a student agrees to by signing in. Apple asks for them in so many
// words (1.2: terms that say there is no tolerance for objectionable content
// or abusive users), and a promo needs them written down the first time
// somebody asks why a post was taken away.
export default async function Terms({ searchParams }) {
  const asked = (await searchParams)?.lang;
  const fr = asked ? asked === 'fr' : (await getLang()) === 'fr';

  if (fr) {
    return (
      <Legal lang="fr" path="/terms" title="Conditions d'utilisation" updated={UPDATED.fr}>
        <p>
          MyPromo est une application d&apos;entraide entre étudiants de la faculté (FMPOS) : cours,
          QCM, résumés, questions, discussions et salles d&apos;étude avec sa promo. En créant un compte
          ou en te connectant, tu acceptes ces conditions.
        </p>

        <Section title="Ton compte">
          <ul>
            <li>MyPromo est réservé aux étudiants de la faculté. L&apos;équipe peut refuser ou suspendre un compte qui n&apos;en fait pas partie.</li>
            <li>Un compte par personne, avec ton vrai nom et ta vraie promo. Tu es responsable de ce qui est fait avec ton compte.</li>
            <li>Tu peux supprimer ton compte à tout moment : Moi, puis « Supprimer mon compte ».</li>
          </ul>
        </Section>

        <Section title="Tolérance zéro">
          <p>Aucun contenu inacceptable et aucun comportement abusif ne sont tolérés. Il est interdit de publier ou d&apos;envoyer :</p>
          <ul>
            <li>des insultes, du harcèlement, des menaces ou des moqueries visant une personne ;</li>
            <li>des propos haineux ou discriminatoires ;</li>
            <li>du contenu sexuel, violent ou choquant ;</li>
            <li>les données personnelles de quelqu&apos;un d&apos;autre (numéro, photos, adresse) sans son accord ;</li>
            <li>du spam, de la publicité, ou un compte qui se fait passer pour quelqu&apos;un d&apos;autre ;</li>
            <li>des documents que tu n&apos;as pas le droit de partager, comme des livres commerciaux.</li>
          </ul>
        </Section>

        <Section title="Signaler et bloquer">
          <p>
            Chaque publication, réponse, résumé, conversation, profil et salle a un menu « ⋯ » pour le
            signaler ou bloquer son auteur. Un compte bloqué ne voit plus ce que tu publies, ne peut plus
            t&apos;écrire ni te défier, et tu ne vois plus ce qu&apos;il publie. Il n&apos;en est pas informé.
          </p>
          <p>
            L&apos;équipe examine chaque signalement sous 24 heures. Elle retire le contenu qui enfreint ces
            règles et suspend le compte de son auteur si nécessaire, sans préavis.
          </p>
        </Section>

        <Section title="Ce que tu publies">
          <p>
            Tu restes responsable de ce que tu publies. En le publiant, tu permets à MyPromo de l&apos;afficher
            aux étudiants de ta promo. Les résumés et questions que tu partages restent disponibles pour ta
            promo, sans ton nom, si tu supprimes ton compte.
          </p>
        </Section>

        <Section title="Le contenu d'étude">
          <p>
            Les cours, QCM et corrections sont une aide à la révision. Certaines réponses sont proposées par
            MyPromo et peuvent contenir des erreurs : en cas de doute, le cours de ton enseignant fait foi.
            MyPromo n&apos;est pas un service officiel de la faculté.
          </p>
        </Section>

        <Section title="Changements">
          <p>
            Ces conditions peuvent évoluer. La date en haut de la page indique la dernière version ; continuer à
            utiliser l&apos;application signifie que tu l&apos;acceptes.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Une question, un problème, un contenu à signaler en urgence : écris-nous.
            Voir aussi la <a href="/privacy?lang=fr">politique de confidentialité</a>.
          </p>
          <Contact fr />
        </Section>
      </Legal>
    );
  }

  return (
    <Legal lang="ar" path="/terms" title="شروط الاستخدام" updated={UPDATED.ar}>
      <p>
        MyPromo تطبيق تعاون بين طلبة الكلية (FMPOS): محاضرات، أسئلة QCM، ملخصات، أسئلة وأجوبة، محادثات
        وغرف دراسة مع دفعتك. بإنشاء حساب أو بتسجيل الدخول، أنت توافق على هذه الشروط.
      </p>

      <Section title="حسابك">
        <ul>
          <li>MyPromo لطلبة الكلية فقط. يستطيع الفريق رفض أو إيقاف أي حساب لا ينتمي إليها.</li>
          <li>حساب واحد لكل شخص، باسمك الحقيقي ودفعتك الحقيقية. أنت مسؤول عمّا يُفعل بحسابك.</li>
          <li>تستطيع حذف حسابك متى شئت: أنا، ثم «حذف حسابي».</li>
        </ul>
      </Section>

      <Section title="لا تسامح مطلقًا">
        <p>لا نقبل أي محتوى مسيء ولا أي سلوك مؤذٍ. يُمنع أن تنشر أو ترسل:</p>
        <ul>
          <li>الشتائم أو التحرّش أو التهديد أو السخرية من شخص؛</li>
          <li>خطاب الكراهية أو التمييز؛</li>
          <li>المحتوى الجنسي أو العنيف أو الصادم؛</li>
          <li>بيانات شخص آخر (رقمه، صوره، عنوانه) دون إذنه؛</li>
          <li>الإزعاج والإعلانات، أو حسابًا ينتحل شخصية غيرك؛</li>
          <li>ملفات لا يحقّ لك مشاركتها، كالكتب التجارية.</li>
        </ul>
      </Section>

      <Section title="الإبلاغ والحظر">
        <p>
          لكل منشور وردّ وملخص ومحادثة وملف شخصي وغرفة قائمة «⋯» للإبلاغ عنه أو لحظر صاحبه. الحساب المحظور
          لا يرى ما تنشره ولا يستطيع مراسلتك أو تحدّيك، ولا ترى ما ينشره، ولا يُخبَر بذلك.
        </p>
        <p>
          يراجع الفريق كل بلاغ خلال 24 ساعة، ويحذف المحتوى المخالف لهذه الشروط ويوقف حساب صاحبه عند الحاجة،
          دون إنذار مسبق.
        </p>
      </Section>

      <Section title="ما تنشره">
        <p>
          أنت مسؤول عمّا تنشره. بنشره تسمح لـ MyPromo بعرضه على طلبة دفعتك. تبقى الملخصات والأسئلة التي
          شاركتها متاحة لدفعتك، دون اسمك، إن حذفت حسابك.
        </p>
      </Section>

      <Section title="محتوى الدراسة">
        <p>
          المحاضرات والأسئلة والتصحيحات عون على المراجعة. بعض الأجوبة يقترحها MyPromo وقد تحتوي أخطاء؛
          عند الشك فالمرجع درس أستاذك. MyPromo ليس خدمة رسمية من الكلية.
        </p>
      </Section>

      <Section title="التغييرات">
        <p>
          قد تتغيّر هذه الشروط. التاريخ أعلى الصفحة يدلّ على آخر نسخة، ومتابعة استعمال التطبيق تعني قبولها.
        </p>
      </Section>

      <Section title="التواصل">
        <p>
          لأي سؤال أو مشكلة أو محتوى يحتاج تدخّلًا عاجلًا، راسلنا. وانظر أيضًا{' '}
          <a href="/privacy">سياسة الخصوصية</a>.
        </p>
        <Contact />
      </Section>
    </Legal>
  );
}

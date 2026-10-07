import Legal, { Section, Contact } from '@/components/Legal';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'حذف الحساب — MyPromo' };

const UPDATED = { ar: 'آخر تحديث: 29 سبتمبر 2026', fr: 'Dernière mise à jour : 29 septembre 2026' };

export default async function DeleteAccountPage({ searchParams }) {
  // ?lang= when the link asks for one; otherwise the language the app is in
  const asked = (await searchParams)?.lang;
  const fr = asked ? asked === 'fr' : (await getLang()) === 'fr';

  if (fr) {
    return (
      <Legal lang="fr" path="/delete-account" title="Supprimer votre compte MyPromo" updated={UPDATED.fr}>
        <Section title="Dans l'application">
          <ol>
            <li>Ouvrez MyPromo et connectez-vous.</li>
            <li>Allez sur votre profil (votre photo, en haut de l&apos;accueil).</li>
            <li>Tout en bas, touchez « Supprimer mon compte » (« حذف حسابي » en arabe), puis confirmez.</li>
          </ol>
          <p>La suppression est immédiate et définitive.</p>
        </Section>

        <Section title="Sans l'application">
          <p>
            Vous n&apos;avez plus l&apos;application ou ne pouvez plus vous connecter ? Écrivez-nous depuis
            l&apos;adresse e-mail du compte, avec pour objet « Suppression de compte MyPromo » ; nous le
            supprimons sous 30 jours.
          </p>
          <Contact fr />
        </Section>

        <Section title="Ce qui est supprimé">
          <ul>
            <li>Votre compte : e-mail, nom, matricule, promo, numéro WhatsApp.</li>
            <li>Vos publications, commentaires, questions, réponses et messages.</li>
            <li>Vos points, séries, réponses aux QCM et paramètres de notification.</li>
          </ul>
          <p>
            Les résumés et questions que vous avez partagés restent disponibles pour votre promo, sans
            votre nom. Voir aussi la <a href="/privacy?lang=fr">politique de confidentialité</a>.
          </p>
        </Section>
      </Legal>
    );
  }

  return (
    <Legal lang="ar" path="/delete-account" title="حذف حسابك في MyPromo" updated={UPDATED.ar}>
      <Section title="من داخل التطبيق">
        <ol>
          <li>افتح MyPromo وسجّل الدخول.</li>
          <li>اذهب إلى ملفك الشخصي (صورتك أعلى الشاشة الرئيسية).</li>
          <li>في أسفل الصفحة اضغط «حذف حسابي» ثم أكّد.</li>
        </ol>
        <p>يتم الحذف فورًا ولا يمكن التراجع عنه.</p>
      </Section>

      <Section title="دون التطبيق">
        <p>
          إن لم يعد التطبيق عندك أو لا تستطيع الدخول، راسلنا من البريد المسجّل في الحساب وعنوان الرسالة
          «حذف حساب MyPromo»، وسنحذفه خلال 30 يومًا.
        </p>
        <Contact />
      </Section>

      <Section title="ما الذي يُحذف">
        <ul>
          <li>حسابك: البريد والاسم ورقم matricule والدفعة ورقم واتساب.</li>
          <li>منشوراتك وتعليقاتك وأسئلتك وأجوبتك ورسائلك.</li>
          <li>نقاطك وأيامك المتتالية وإجاباتك وإعدادات الإشعارات.</li>
        </ul>
        <p>
          الملخصات والأسئلة التي شاركتها تبقى لدفعتك دون اسمك. راجع أيضًا{' '}
          <a href="/privacy">سياسة الخصوصية</a>.
        </p>
      </Section>
    </Legal>
  );
}

import Legal, { Section, Contact } from '@/components/Legal';
import { getLang } from '@/lib/lang';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'المساعدة — MyPromo' };

const UPDATED = { ar: 'آخر تحديث: 8 أكتوبر 2026', fr: 'Dernière mise à jour : 8 octobre 2026' };

// The support address both stores ask for: how to reach a person, and the
// answers to what students actually ask. Readable signed out, like /privacy.
export default async function Support({ searchParams }) {
  const asked = (await searchParams)?.lang;
  const fr = asked ? asked === 'fr' : (await getLang()) === 'fr';

  if (fr) {
    return (
      <Legal lang="fr" path="/support" title="Aide et contact" updated={UPDATED.fr}>
        <p>MyPromo est fait par des étudiants de la faculté, pour leur promo. Une personne de l&apos;équipe lit chaque message.</p>

        <Section title="Nous écrire">
          <p>Un bug, une question sur ton compte, un contenu à retirer : écris-nous, nous répondons sous 48 heures.</p>
          <Contact fr />
        </Section>

        <Section title="Mon compte est suspendu ou refusé">
          <p>
            Écris-nous avec ton nom et ton matricule (ou ton numéro WhatsApp en première année) : l&apos;équipe
            vérifie et te répond sous 48 heures.
          </p>
        </Section>

        <Section title="Signaler quelqu'un ou un contenu">
          <p>
            Touche « ⋯ » à côté de la publication, la réponse, le résumé, la conversation, le profil ou la salle,
            puis « Signaler ». Le même menu permet de bloquer la personne. L&apos;équipe examine chaque
            signalement sous 24 heures. Voir les <a href="/terms?lang=fr">conditions d&apos;utilisation</a>.
          </p>
        </Section>

        <Section title="Supprimer mon compte">
          <p>
            Dans l&apos;application : Moi, puis « Supprimer mon compte ». Sans l&apos;application :{' '}
            <a href="/delete-account?lang=fr">suppression de compte</a>.
          </p>
        </Section>

        <Section title="Mes données">
          <p>Voir la <a href="/privacy?lang=fr">politique de confidentialité</a>.</p>
        </Section>
      </Legal>
    );
  }

  return (
    <Legal lang="ar" path="/support" title="المساعدة والتواصل" updated={UPDATED.ar}>
      <p>MyPromo من صنع طلبة الكلية لدفعتهم. يقرأ كل رسالة شخص من الفريق.</p>

      <Section title="راسلنا">
        <p>خلل في التطبيق، سؤال عن حسابك، محتوى يجب حذفه: راسلنا، ونردّ خلال 48 ساعة.</p>
        <Contact />
      </Section>

      <Section title="حسابي موقوف أو مرفوض">
        <p>
          راسلنا باسمك ورقمك الجامعي (أو رقم واتساب لطلبة السنة الأولى)، يتحقّق الفريق ويردّ عليك خلال 48 ساعة.
        </p>
      </Section>

      <Section title="الإبلاغ عن شخص أو محتوى">
        <p>
          اضغط «⋯» بجانب المنشور أو الردّ أو الملخص أو المحادثة أو الملف الشخصي أو الغرفة، ثم «أبلغ». من
          القائمة نفسها تستطيع حظر الشخص. يراجع الفريق كل بلاغ خلال 24 ساعة. انظر{' '}
          <a href="/terms">شروط الاستخدام</a>.
        </p>
      </Section>

      <Section title="حذف حسابي">
        <p>
          من داخل التطبيق: أنا، ثم «حذف حسابي». ودون التطبيق: <a href="/delete-account">حذف الحساب</a>.
        </p>
      </Section>

      <Section title="بياناتي">
        <p>انظر <a href="/privacy">سياسة الخصوصية</a>.</p>
      </Section>
    </Legal>
  );
}

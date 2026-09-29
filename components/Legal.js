import Link from 'next/link';

// The shell for the two pages a store reviewer opens: readable signed out,
// Arabic first, with a French copy for students who read that better.
export default function Legal({ lang, path, title, updated, children }) {
  const fr = lang === 'fr';
  return (
    <main className="legal" dir={fr ? 'ltr' : 'rtl'} lang={fr ? 'fr' : 'ar'}>
      <header className="legal-top">
        <Link href="/login" className="legal-brand">My<b>Promo</b></Link>
        <Link href={fr ? path : `${path}?lang=fr`} className="legal-lang" prefetch={false}>
          {fr ? 'العربية' : 'Français'}
        </Link>
      </header>
      <h1>{title}</h1>
      <p className="legal-date">{updated}</p>
      {children}
    </main>
  );
}

export function Section({ title, children }) {
  return (
    <section className="legal-sec">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// Set CONTACT_EMAIL in Vercel. Until it is, the line is left out rather than
// printing an address nobody reads.
export function Contact({ fr }) {
  const mail = process.env.CONTACT_EMAIL;
  if (!mail) return null;
  return (
    <p>
      {fr ? 'Contact : ' : 'للتواصل: '}
      <a href={`mailto:${mail}`} dir="ltr">{mail}</a>
    </p>
  );
}

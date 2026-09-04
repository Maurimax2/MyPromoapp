import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { MODULES, moduleById, fileCount } from '@/lib/data';

export function generateStaticParams() {
  return MODULES.map((m) => ({ id: m.id }));
}

function Row({ label, clash, none, title, ext, mb, href }) {
  return (
    <a className="lec" href={href} target="_blank" rel="noopener noreferrer">
      <span className={`num${clash ? ' clash' : ''}${none ? ' none' : ''}`}>{label}</span>
      <span className="grow">
        <span className="lec-nm" style={{ display: 'block' }}>{title}</span>
        <span className="lec-mt"><span className="ext">{ext}</span><span className="dot" />{mb} MB</span>
      </span>
      <span className="chev"><Icon name="download" size={17} /></span>
    </a>
  );
}

export default async function Module({ params }) {
  const { id } = await params;
  const m = moduleById(id);
  if (!m) notFound();

  const hasClash = (m.lectures || []).some((l) => l.clash);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <Link href="/archive" className="icobtn" aria-label="رجوع"><Icon name="chevR" size={18} /></Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 18 }}>{m.name}</div>
            <div className="head-s">
              {m.semester} · {fileCount(m)} ملف
              {m.professors.length ? ` · ${m.professors.join(' · ')}` : ''}
            </div>
          </div>
          <div className={`tile sm tint-${m.tint}`}><Icon name={m.icon} size={18} /></div>
        </div>
      </header>

      <div className="scroll">
        <div className="eyebrow">{m.lectures.some((l) => l.n) ? 'حسب ترتيب التدريس' : 'الملفات'}</div>
        {m.lectures.map((l, i) => (
          <Row key={i} label={l.n ?? '—'} clash={l.clash} none={!l.n}
            title={l.title} ext={l.ext} mb={l.mb} href={l.drive} />
        ))}

        {hasClash && (
          <div className="notice">
            <Icon name="alert" size={18} />
            <div>
              <div className="notice-t">ملفان يحملان الرقم 5</div>
              <div className="notice-b">
                «Les vaisseaux tête et cou» و«Lymphatiques tête–cou» كلاهما مُرقّم ‎-5-‎ في Drive.
                الترتيب بينهما لم يُحسم بعد.
              </div>
            </div>
          </div>
        )}

        {m.extra && (
          <>
            <div className="eyebrow">{m.extra.label}</div>
            {m.extra.items.map((l, i) => (
              <Row key={i} label="—" none title={l.title} ext={l.ext} mb={l.mb} href={l.drive} />
            ))}
          </>
        )}
      </div>
    </>
  );
}

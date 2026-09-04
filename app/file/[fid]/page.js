import Link from 'next/link';
import Icon from '@/components/Icon';
import { driveEmbed, driveView, fileByFid } from '@/lib/data';

// Files open inside MyPromo, never by handing the student off to the Drive app.
// The document itself is rendered by Drive's embedded viewer, because the
// browser will not let another site fetch the bytes from someone else's Drive.
// Once files live in our own storage this becomes a native viewer.
export default async function FileView({ params }) {
  const { fid } = await params;
  const file = fileByFid(fid);

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <Link href="/archive" className="icobtn" aria-label="رجوع">
            <Icon name="chevR" size={18} />
          </Link>
          <div className="grow">
            <div className="head-t" style={{ fontSize: 16 }}>
              {file ? file.title : 'ملف'}
            </div>
            <div className="head-s">
              {file ? `${file.module}${file.semester ? ' · ' + file.semester : ''} · ${file.ext} · ${file.mb} MB` : 'من الأرشيف'}
            </div>
          </div>
          <button className="icobtn" aria-label="حفظ"><Icon name="bookmark" size={18} /></button>
        </div>
      </header>

      <div className="viewer">
        <iframe
          src={driveEmbed(fid)}
          title={file ? file.title : 'عارض الملف'}
          allow="autoplay"
          loading="lazy"
        />
      </div>

      <div className="viewer-bar">
        <a className="btn g" href={driveView(fid)} target="_blank" rel="noopener noreferrer">
          <Icon name="download" size={18} />
          <span style={{ marginInlineStart: 8 }}>تحميل الملف</span>
        </a>
      </div>
    </>
  );
}

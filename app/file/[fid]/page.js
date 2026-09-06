import Icon from '@/components/Icon';
import BackButton from '@/components/BackButton';
import Reader from './Reader';
import { fileByFid } from '@/lib/data';

// Files open here, inside MyPromo. The document is fetched through the app's
// own /api/file route, so the browser never leaves this site.
export default async function FileView({ params }) {
  const { fid } = await params;
  const file = fileByFid(fid);
  const src = `/api/file/${fid}`;

  return (
    <>
      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 16 }}>{file ? file.title : 'ملف'}</div>
            <div className="head-s">
              {file
                ? `${file.module}${file.semester ? ' · ' + file.semester : ''} · ${file.ext} · ${file.mb} MB`
                : 'من الأرشيف'}
            </div>
          </div>
          <a className="icobtn" href={src} download aria-label="تحميل">
            <Icon name="download" size={18} />
          </a>
        </div>
      </header>

      <Reader
        fid={fid}
        src={src}
        title={file ? file.title : 'الملف'}
        bytes={file?.mb ? Math.round(Number(file.mb) * 1048576) : null}
      />
    </>
  );
}

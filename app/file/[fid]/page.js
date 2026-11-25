import BackButton from '@/components/BackButton';
import Reader from './Reader';
import { getT } from '@/lib/lang';

// Files open here, inside MyPromo. The document is fetched through the app's
// own /api/file route, so the browser never leaves this site.
export default async function FileView({ params }) {
  const t = await getT();
  const { fid } = await params;
  // The course (lib/data.js, 824 KB) is loaded when this runs, not when the
  // server starts: see lib/data-core.js.
  const { fileByFid } = await import('@/lib/data');
  const file = fileByFid(fid);
  const src = `/api/file/${fid}`;

  return (
    <>
      {/* Read by the stylesheet, drawn by nobody: it tells the column around
          this screen to let a document have the whole tablet. */}
      <span className="file-wide" aria-hidden="true" />

      <header className="head" style={{ paddingBottom: 14 }}>
        <div className="head-row">
          <BackButton />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 16 }}>{file ? file.title : t('ملف')}</div>
            <div className="head-s">
              {file
                ? `${file.module}${file.semester ? ' · ' + file.semester : ''} · ${file.ext} · ${file.mb} MB`
                : t('من الأرشيف')}
            </div>
          </div>
        </div>
      </header>

      <Reader
        fid={fid}
        src={src}
        title={file ? file.title : t('الملف')}
        subject={file?.module || null}
        ext={file?.ext || null}
      />
    </>
  );
}

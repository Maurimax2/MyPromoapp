// الإشعارات while they are read — and, by opening this screen, marked read.

import { SkRow } from '@/components/Skeleton';
import { getT } from '@/lib/lang';

export default async function Loading() {
  const t = await getT();
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">{t('الإشعارات')}</div>
            <div className="sk sk-line" style={{ width: 72, marginTop: 7 }} />
          </div>
        </div>
      </header>

      <div className="scroll">
        <SkRow /><SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

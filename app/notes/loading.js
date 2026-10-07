// الملخصات while the promo's summaries are read.

import { SkRow } from '@/components/Skeleton';
import { getT } from '@/lib/lang';

export default async function Loading() {
  const t = await getT();
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">{t('الملخصات')}</div>
            <div className="sk sk-line" style={{ width: 84, marginTop: 7 }} />
          </div>
        </div>
        <label className="srch" />
      </header>

      <div className="scroll">
        <SkRow /><SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

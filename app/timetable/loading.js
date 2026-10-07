// جدول الحصص while the planning is read.

import { SkRow } from '@/components/Skeleton';
import { getT } from '@/lib/lang';

export default async function Loading() {
  const t = await getT();
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="sk sk-flat" style={{ width: 44, height: 44, borderRadius: 13 }} />
          <div className="grow">
            <div className="head-t">{t('جدول الحصص')}</div>
            <div className="sk sk-line" style={{ width: 96, marginTop: 7 }} />
          </div>
        </div>
      </header>
      <div className="scroll">
        <SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

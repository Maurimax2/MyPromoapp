// المحادثات while the conversations are read.
//
// The most opened of the four tabs and the only one that can be waiting for
// you, so it is the one where a blank screen is noticed.

import { SkRow } from '@/components/Skeleton';
import { getT } from '@/lib/lang';

export default async function Loading() {
  const t = await getT();
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow"><div className="head-t">{t('المحادثات')}</div></div>
        </div>
      </header>

      <div className="scroll">
        <SkRow /><SkRow /><SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

// جدول الحصص while the planning is read.

import { SkRow } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="sk sk-flat" style={{ width: 44, height: 44, borderRadius: 13 }} />
          <div className="grow">
            <div className="head-t">جدول الحصص</div>
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

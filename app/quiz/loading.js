// الاختبارات while the database is asked which subjects have questions.

import { SkRow } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الاختبارات</div>
            <div className="head-s">اختبر نفسك قبل الامتحان</div>
          </div>
          <div className="sk sk-flat" style={{ width: 38, height: 38, borderRadius: 12 }} />
        </div>
      </header>

      <div className="scroll">
        <SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

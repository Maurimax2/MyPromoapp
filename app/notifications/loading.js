// الإشعارات while they are read — and, by opening this screen, marked read.

import { SkRow } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الإشعارات</div>
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

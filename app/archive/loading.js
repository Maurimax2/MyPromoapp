// الأرشيف while the years and their subjects are read.
//
// The name is written rather than greyed: it needs no data, and a screen that
// can say what it is should say it immediately. The search box is drawn for
// real too — it is an empty grey field either way.

import { SkRow } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="head">
        <div className="head-row">
          <div className="grow">
            <div className="head-t">الأرشيف</div>
            <div className="sk sk-line" style={{ width: 96, marginTop: 7 }} />
          </div>
          <div className="sk sk-flat" style={{ width: 44, height: 44, borderRadius: 13 }} />
        </div>

        <label className="srch" />

        <div className="chips">
          {[62, 62, 62, 62].map((w, i) => (
            <div key={i} className="sk sk-flat"
                 style={{ width: w, height: 32, borderRadius: 999, flexShrink: 0 }} />
          ))}
        </div>
      </header>

      <div className="scroll">
        <SkRow /><SkRow /><SkRow /><SkRow />
      </div>
    </>
  );
}

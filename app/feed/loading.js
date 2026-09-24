// الرئيسية while the promo is being read.
//
// Drawn in the shape the screen arrives in — the greeting row, who is
// studying, the duels, «تابع», the subjects with their models, the composer,
// the feed — each placeholder the size of the thing it stands for, so
// nothing moves when the real screen lands. The old one drew the violet
// header of a design this app no longer has.

import { SkPost } from '@/components/Skeleton';

export default function Loading() {
  return (
    <>
      <header className="h-top">
        <div className="sk sk-line" style={{ width: 44, height: 44, borderRadius: '50%' }} />
        <div className="grow">
          <div className="sk sk-line big" style={{ width: '48%' }} />
          <div className="sk sk-line" style={{ width: '30%', marginTop: 7 }} />
        </div>
        <div className="sk sk-line" style={{ width: 40, height: 40, borderRadius: '50%' }} />
      </header>

      <div className="scroll flow h-flow">
        <div className="sk" style={{ height: 62, borderRadius: 18 }} />

        <div className="sk sk-line" style={{ width: 90 }} />
        <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
          <div className="sk dark" style={{ flex: '0 0 236px', height: 168, borderRadius: 20 }} />
          <div className="sk dark" style={{ flex: '0 0 236px', height: 168, borderRadius: 20 }} />
        </div>

        <div className="sk" style={{ height: 84, borderRadius: 20 }} />

        <div className="sk sk-line" style={{ width: 70 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden', paddingTop: 30 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="sk olive" style={{ flex: '0 0 150px', height: 118, borderRadius: 20 }} />
          ))}
        </div>

        <div className="sk" style={{ height: 52, borderRadius: 18 }} />
        <SkPost />
        <SkPost />
      </div>
    </>
  );
}

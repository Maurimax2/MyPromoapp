// الرئيسية while the promo is being read.
//
// Drawn in the shape the screen arrives in — the green head with its bar,
// greeting, button and four shortcuts, then the subject banners and the
// feed — so nothing moves when the real screen lands.

import { SkPost } from '@/components/Skeleton';

const pale = (style) => ({ background: 'rgba(255,255,255,.12)', ...style });

export default function Loading() {
  return (
    <div className="scroll flow h-flow">
      <header className="hh">
        <div className="hh-bar">
          <span className="hh-me" style={pale({ boxShadow: 'none' })} />
          <span className="hh-find" />
          <span className="hh-bell" />
          <span className="hh-bell" />
        </div>
        <div className="hh-now">
          <div style={pale({ width: '58%', height: 32, borderRadius: 12, margin: '14px auto 0' })} />
          <div style={pale({ width: 150, height: 46, borderRadius: 999, margin: '16px auto 0' })} />
        </div>
        <div className="hh-quick">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'grid', justifyItems: 'center', gap: 7, minWidth: 64 }}>
              <span />
              <div style={pale({ width: 40, height: 10, borderRadius: 6 })} />
            </div>
          ))}
        </div>
      </header>

      <section className="hh-sheet">
        <div className="sk sk-line" style={{ width: 70 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          <div className="sk olive" style={{ flex: '0 0 272px', height: 156, borderRadius: 24 }} />
          <div className="sk olive" style={{ flex: '0 0 272px', height: 156, borderRadius: 24 }} />
        </div>
      </section>

      <div className="sk" style={{ height: 52, borderRadius: 18 }} />
      <SkPost />
      <SkPost />
    </div>
  );
}

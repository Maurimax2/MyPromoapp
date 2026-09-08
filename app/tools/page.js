// كل الأدوات — every feature, with room to say what it is.
//
// Ten of them crammed onto الرئيسية could only fit a name, so «تحدّي زميلك»
// was a coloured square nobody could want. Given a screen of their own they
// each get a line, and «قريبًا» becomes a promise rather than a label.

import Link from 'next/link';
import BackButton from '@/components/BackButton';
import Icon from '@/components/Icon';
import { TOOLS } from '@/lib/tools';

export const dynamic = 'force-dynamic';

export default function ToolsPage() {
  const live = TOOLS.filter((t) => t.href);
  const soon = TOOLS.filter((t) => !t.href);

  return (
    <>
      <header className="head">
        <div className="head-row">
          <BackButton fallback="/feed" />
          <div className="grow">
            <div className="head-t" style={{ fontSize: 17 }}>الأدوات</div>
            <div className="head-s">كل ما في MyPromo</div>
          </div>
        </div>
      </header>

      <div className="scroll">
        <div className="tools-grid">
          {live.map((t) => (
            <Link key={t.id} href={t.href} className="tool-c">
              <span className="tool-c-ic"><Icon name={t.icon} size={18} /></span>
              <b>{t.label}</b>
              <span className="tool-c-b">{t.about}</span>
            </Link>
          ))}
        </div>

        {soon.length > 0 && (
          <>
            <div className="eyebrow" style={{ margin: '18px 2px 8px' }}>قريبًا</div>
            <div className="tools-grid">
              {soon.map((t) => (
                <div key={t.id} className="tool-c soon" aria-disabled="true">
                  <span className="tool-c-ic"><Icon name={t.icon} size={18} /></span>
                  <b>{t.label}</b>
                  <span className="tool-c-b">{t.about}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

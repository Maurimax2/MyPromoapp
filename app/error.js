'use client';

// What a student sees when something breaks.
//
// Next's own screen is an English stack trace or a blank page, which tells a
// student nothing and makes the app look dead. This says what happened, in
// Arabic, and offers the two things that actually help: try again, or go
// home. The message itself is never shown — it names our tables.

import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Error({ reset }) {
  return (
    <div className="scroll">
      <div className="empty">
        <div className="tile tint-orange"><Icon name="alert" size={24} /></div>
        <div className="empty-t">تعذّر فتح هذه الصفحة</div>
        <div className="empty-b">حدث خطأ عندنا، لا عندك. جرّب مرة أخرى.</div>
        <button className="btn p" style={{ maxWidth: 240 }} onClick={() => reset()}>
          أعد المحاولة
        </button>
        <Link href="/feed" className="btn g" style={{ maxWidth: 240 }}>الرئيسية</Link>
      </div>
    </div>
  );
}

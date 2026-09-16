'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

// The answers themselves, and a way to take them out of here.
//
// What a student wrote is the thing on the screen — not the row's id, not a
// table of columns. Everything else is small and grey beside it, because what
// is being read is a sentence somebody typed on a phone.

const when = (iso) => {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')} · `
    + `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

// A spreadsheet's quoting rules, which are not negotiable: a field holding a
// comma, a quote or a newline is wrapped, and quotes inside it are doubled.
const cell = (v) => {
  const s = Array.isArray(v) ? v.join(' · ') : String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export default function Answers({ rows }) {
  const [said, setSaid] = useState('');

  const csv = async () => {
    const head = ['id', 'promo', 'needs', 'pain', 'wish', 'reach', 'name', 'phone', 'source', 'created_at'];
    const body = rows.map((r) => head.map((k) => cell(r[k])).join(','));
    // A BOM, because Excel opens a UTF-8 file as Latin-1 without one and
    // every Arabic answer arrives as mojibake.
    const text = `﻿${head.join(',')}\n${body.join('\n')}`;
    try {
      await navigator.clipboard.writeText(text);
      setSaid('نُسخت كـ CSV — الصقها في جدول');
    } catch {
      setSaid('تعذّر النسخ');
    }
  };

  if (!rows.length) {
    return (
      <div className="empty">
        <div className="tile tint-purple"><Icon name="msgs" size={24} /></div>
        <div className="empty-t">لا آراء بعد</div>
        <div className="empty-b">شارك رابط /feedback مع الطلبة.</div>
      </div>
    );
  }

  return (
    <>
      <div className="fb-bar">
        <button type="button" className="btn g sm" onClick={csv}>
          <Icon name="file" size={16} /> انسخ الكل CSV
        </button>
        {said && <span className="admin-card-b">{said}</span>}
      </div>

      {rows.map((r) => (
        <article key={r.id} className="admin-card fb-row">
          <div className="fb-top">
            <span className="pill grey" dir="ltr">{r.promo.toUpperCase()}</span>
            {(r.needs || []).map((n) => (
              <span key={n} className="fb-need sm" dir="auto">{n}</span>
            ))}
            <span className="grow" />
            <span className="fb-when" dir="ltr">{when(r.created_at)}</span>
          </div>

          {r.pain && (
            <div className="fb-said">
              <span className="fb-q">يزعجه</span>
              <p dir="auto">{r.pain}</p>
            </div>
          )}
          {r.wish && (
            <div className="fb-said">
              <span className="fb-q">يتمنّى</span>
              <p dir="auto">{r.wish}</p>
            </div>
          )}

          {r.reach && (r.name || r.phone) && (
            <div className="fb-who">
              <Icon name="user" size={14} />
              <span dir="auto">{r.name || '—'}</span>
              {r.phone && <a href={`https://wa.me/${r.phone.replace(/[^\d]/g, '')}`}
                target="_blank" rel="noreferrer" dir="ltr">{r.phone}</a>}
            </div>
          )}
        </article>
      ))}
    </>
  );
}

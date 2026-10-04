'use client';

// Reading a lecture without pulling it onto the phone first.
//
// Google renders the pages on their side and sends images as you scroll, which
// for the big scanned lectures is the difference between two seconds and two
// minutes. It is the only reader: it is still inside MyPromo — an iframe on
// our own screen, not the student handed to the Drive app.
//
// If Google refuses to frame the file (Safari blocks some third-party frames)
// the way out is the download, through our own route.

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

export default function QuickView({ fid, src }) {
  const [failed, setFailed] = useState(false);
  const frame = useRef(null);

  // A frame that is refused fires no error of its own: it simply never
  // loads. So we give it a while and then offer the way out.
  useEffect(() => {
    const late = setTimeout(() => {
      if (!frame.current?.dataset.loaded) setFailed(true);
    }, 8000);
    return () => clearTimeout(late);
  }, [fid]);

  if (failed) {
    return (
      <div className="pdf-msg">
        <Icon name="alert" size={26} />
        <span>تعذّر العرض السريع لهذا الملف.</span>
        <a className="btn p" style={{ maxWidth: 240 }} href={src} download>
          حمّل الملف
        </a>
      </div>
    );
  }

  return (
    <iframe
      ref={frame}
      className="pdf-frame"
      src={`https://drive.google.com/file/d/${fid}/preview`}
      title="عرض الملف"
      allow="autoplay"
      onLoad={(e) => { e.currentTarget.dataset.loaded = '1'; }}
    />
  );
}

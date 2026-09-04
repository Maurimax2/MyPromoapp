'use client';
import { useRouter } from 'next/navigation';
import Icon from './Icon';

// Goes back the way the student came. Falls back to a sensible screen when
// the viewer was opened directly from a link.
export default function BackButton({ fallback = '/archive' }) {
  const router = useRouter();
  return (
    <button
      className="icobtn"
      aria-label="رجوع"
      onClick={() => {
        if (window.history.length > 1) router.back();
        else router.push(fallback);
      }}
    >
      <Icon name="chevR" size={18} />
    </button>
  );
}

'use client';

// Signing out. A POST, so no link prefetch can end a session by accident.

import Icon from '@/components/Icon';
import { useT } from '@/components/Lang';

export default function Sign() {
  const t = useT();
  return (
    <form action="/auth/signout" method="post" style={{ marginTop: 6 }}>
      <button className="btn g"><Icon name="logout" size={18} />{' '}{t('خروج')}</button>
    </form>
  );
}

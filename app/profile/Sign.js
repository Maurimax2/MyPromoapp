'use client';

// Signing out. A POST, so no link prefetch can end a session by accident.

import Icon from '@/components/Icon';

export default function Sign() {
  return (
    <form action="/auth/signout" method="post" style={{ marginTop: 6 }}>
      <button className="btn g"><Icon name="logout" size={18} /> خروج</button>
    </form>
  );
}

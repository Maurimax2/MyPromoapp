// Stand-in for the MyPromo mark, drawn from the identity sheet.
// Replace with the real artwork when the transparent PNG lands.
export default function Logo({ size = 34, white = false, id = 'a' }) {
  const p = white ? '#FFFFFF' : `url(#mp${id})`;
  const o = white ? '#FFFFFF' : `url(#mo${id})`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id={`mp${id}`} x1="10" y1="14" x2="26" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#6B21B5" />
        </linearGradient>
        <linearGradient id={`mo${id}`} x1="38" y1="14" x2="22" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDBA74" /><stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
      <path d="M12 40V23l12 13" stroke={p} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 40V23L24 36" stroke={o} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="5.6" fill={white ? '#FFFFFF' : '#8B5CF6'} />
      <circle cx="36" cy="12" r="5.6" fill={white ? '#FFFFFF' : '#F97316'} />
    </svg>
  );
}

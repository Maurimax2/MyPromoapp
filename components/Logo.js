// The MyPromo mark: two students side by side, forming an M.
//
// Flat, in زيتون — ink and olive. The gradients it used to carry were the one
// thing that stopped it working in a single colour, which is what a stamp, an
// embroidery and a one-ink print all need. The `id` prop is kept so the call
// sites don't all have to change; nothing needs it any more.
export default function Logo({ size = 34, white = false }) {
  const p = white ? '#FFFFFF' : '#17201A';
  const o = white ? '#FFFFFF' : '#2A5B3E';
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12.5" cy="10.5" r="5.2" fill={p} />
      <circle cx="35.5" cy="10.5" r="5.2" fill={o} />
      <path d="M12.5 40V24l11.5 12" stroke={p} strokeWidth="8.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M35.5 40V24L24 36" stroke={o} strokeWidth="8.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

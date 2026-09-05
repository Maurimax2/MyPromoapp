// What a tap looks like before the answer arrives.
//
// Server components mean a navigation shows the OLD screen until the new one
// is ready. On a phone that reads as a dead button: you press, nothing moves,
// and a second later the page is simply different. This is what stands in the
// gap — the shape of the screen, greyed, straight away.

export default function Loading() {
  return (
    <div className="admin-body">
      <div className="sk sk-bar" />
      <div className="admin-grid">
        <div className="sk sk-tile" /><div className="sk sk-tile" />
        <div className="sk sk-tile" /><div className="sk sk-tile" />
      </div>
      <div className="sk sk-card" />
    </div>
  );
}

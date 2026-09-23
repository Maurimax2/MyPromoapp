// Who is in a room right now — not who once joined it.
//
// «3 من دفعتك يدرسون الآن» used to count everybody who had ever joined a room
// nobody had closed, and nobody closes rooms, and closing the app does not
// leave one. A room opened on Monday was still «studying» on Thursday.
//
// So a room screen that is open says so every half minute (PATCH /api/rooms
// { here }), which moves the member's `seen_at` forward, and «here» means
// seen in the last LIVE milliseconds. A phone put in a pocket drops out on
// its own a minute and a half later; there is no «leave» to forget.

export const PING = 30 * 1000;
export const LIVE = 90 * 1000;

/** Whether a room_members row is somebody sitting there now. */
export const isHere = (member, now = Date.now()) =>
  !!member?.seen_at && now - new Date(member.seen_at).getTime() < LIVE;

/** The LiveKit room a study room talks in. One name, used by the token and nobody else. */
export const liveName = (id) => `mypromo-room-${id}`;

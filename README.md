# MyPromo

A web app for medical, pharmacy and dental students in Mauritania: everything a
promo shares, in one place. Arabic interface, right-to-left, phone first.

## Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## What is in here

| Path | What it does |
|---|---|
| `app/page.js` | الرئيسية — the feed, spanning every promo |
| `app/lectures/page.js` | المحاضرات — today's lectures |
| `app/archive/page.js` | الأرشيف — browse by promo, then S1 / S2 |
| `app/archive/[id]/page.js` | one module's files, in teaching order |
| `app/profile/page.js` | الملف الشخصي |
| `app/login/page.js` | sign-in screen — **open, authenticates nobody yet** |
| `lib/data.js` | the archive itself: promos, modules, lectures |
| `app/globals.css` | the design system as tokens |
| `design/` | the source artboards for the screen mockups |
| `prototype/` | the first standalone archive prototype |

## The state of things

- **Sign-in is deliberately open.** The buttons just go in. Nothing is
  authenticated and there are no accounts.
- **Only PCEM2 is indexed.** The other five promos appear but are empty.
- **Files open from Google Drive.** Nothing has been copied into app storage
  yet, and no file in Drive is ever renamed — the clean titles live in
  `lib/data.js` and point at the untouched originals.
- **Two lectures are both numbered `-5-`** in Drive. The app shows them side by
  side and flags it rather than guessing an order.
- **Light theme only.** Dark mode is not designed yet.

## Deploying

Hosting is Vercel. Connect this repository once at vercel.com → Add New →
Project, and every push to the branch deploys automatically.

# Getting MyPromo onto the App Store and Google Play

Prepared 8 October 2026, while Apple reviews the developer account and Play's
closed test has about 7 days to run (so production can be requested around
**15 October**).

| File | What it is for |
|---|---|
| `listing.md` | names, subtitles, descriptions, keywords, URLs — Arabic and French |
| `review-notes.md` | the reviewer's account, App Review notes, Play «App access», content rights |
| `privacy-answers.md` | Apple App Privacy, age rating, Play Data safety, content rating, target audience |
| `play-production-access.md` | answers for Play's «Apply for production» form |
| `screenshots/ios-ar`, `ios-fr` | App Store, iPhone 6.9" (1320×2868), 7 each |
| `screenshots/play-ar`, `play-fr` | Google Play phone (1080×1920), 7 each |
| `screenshots/play-feature-graphic.png` | Play feature graphic (1024×500) |

The screenshots are the real app, running on the mock data set
(`npm run mock`), in a frame with a headline. To remake them after the app
changes, see the end of this file.

---

## 1. Now — before either review

These change the live app, so they are yours to do:

- [ ] **Deploy `claude/store-ready`.** It carries everything the reviewers
      look for (report and block everywhere, terms, support page, iPhone
      notifications) and the French interface it was built on. Merge it into
      the branch Vercel deploys and push.
- [ ] **Paste `supabase/blocks.sql`** in Supabase → SQL Editor → Run. Until
      then «احظر» says blocking is not switched on yet.
- [ ] **Make the reviewer's account** — `review-notes.md` §1.
- [ ] Open `/terms`, `/support`, `/privacy` and `/delete-account` on a phone,
      in both languages, and read them once. They are public: the stores
      open them.
- [ ] Try it yourself on a second account: report a post, block someone,
      unblock them from أنا ← المحظورون, and look at اللوحة ← البلاغات.

## 2. Google Play — this week

- [ ] Keep all 12+ testers opted in until day 14, and ask them to open the
      app a few times this week. If one leaves, the count can fall below 12.
- [ ] Play Console → **Main store listing**: paste the texts from
      `listing.md`, upload `screenshots/play-ar` (and `play-fr` under the
      French translation) and the feature graphic.
- [ ] **App content**: fill each section from `privacy-answers.md`, and App
      access from `review-notes.md` §3.
- [ ] Day 14: **Dashboard → Apply for production**, with
      `play-production-access.md` (fill the brackets first).
- [ ] When Google agrees: create the production release with the same
      bundle the testers have (versionCode 5) or a newer one, and roll out.

## 3. The day Apple approves the account

In this order; `codemagic.yaml` has the same steps at its top.

1. developer.apple.com → **Identifiers** → (+) App ID `com.mypromo.app`,
   tick **Push Notifications**.
2. **Keys** → (+) → APNs key → download the `.p8` → put `APNS_KEY`,
   `APNS_KEY_ID`, `APNS_TEAM_ID` on Vercel (SETUP.md, «…and three more for
   the iPhone app») → redeploy.
3. App Store Connect → **Users and Access → Integrations → App Store Connect
   API** → new key, role App Manager. Add it in Codemagic → Teams →
   Integrations, named `mypromo`.
4. App Store Connect → **Apps → (+) New App**: iOS, name `MyPromo`, primary
   language Arabic, bundle id `com.mypromo.app`, SKU `mypromo-ios`.
5. Codemagic → this repo → workflow **MyPromo iOS → TestFlight** → Start.
   About 20 minutes; the build appears in TestFlight.
6. Install it from TestFlight on an iPhone (yours, or a classmate's). Check:
   sign in, a lecture opens, a quiz works, the 3D model turns, notifications
   switch on (then اللوحة ← إعلان للطلبة ← جرّب على هاتفي), a study room
   asks for the microphone only when you turn it on.
7. Fill the App Store page:
   - App Information: category, content rights (`review-notes.md` §4),
     age rating (`privacy-answers.md`).
   - App Privacy (`privacy-answers.md`) and the privacy URL.
   - Version 1.0: screenshots `ios-ar` (and `ios-fr` in the French
     localisation), promotional text, description, keywords, support URL
     (`listing.md`), the build from TestFlight.
   - App Review Information: account and notes (`review-notes.md` §2).
8. **Add for Review → Submit.** The first review usually takes one to
   three days.

## While a review is open

- Every push to the live site changes the app the reviewer is using, at
  once. Ship only fixes until both stores have approved.
- Answer Apple's messages in App Store Connect → **App Review**. If
  something is rejected, paste the message here and it will be fixed the same
  day — most first rejections are one paragraph to answer, not a rebuild.

## After both are live

- `/download` still offers the APK and the Windows app. Point it at the two
  store pages.
- Publish the intro films (the Remotion project): they were waiting for this.

---

### Remaking the screenshots

1. `npm run mock`, then the app against it in production mode (the dev
   server is too slow on the 3D screen): `next build && next start` with
   `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321` and any value for
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`.
2. `QUIZ=1 node scripts/store-raw.mjs` and `QUIZ=1 node scripts/store-raw.mjs fr`
   — the screens, signed in as the mock's owner.
3. `node scripts/store-frame.mjs` — the frames and headlines, into
   `store/screenshots/`. The headlines are at the top of that script.

The quiz shows a question with its right answers ticked but not confirmed,
so no answer key is on show; the script knows the right options for the
mock's questions only.

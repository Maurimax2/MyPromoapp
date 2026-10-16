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

Approved on 16 October 2026. There is no Mac: Codemagic builds the app on
one of its own, and everything below happens in a browser. In this order —
each step needs the one before it. `codemagic.yaml` has the same list at its
top.

**On developer.apple.com → Certificates, IDs & Profiles**

1. **Identifiers** → (+) → App IDs → App → Continue. Description `MyPromo`,
   Bundle ID **Explicit** `com.mypromo.app`. Scroll down, tick **Push
   Notifications** → Continue → Register.
2. **Keys** → (+). Name `MyPromo push`, tick **Apple Push Notifications
   service (APNs)** → Continue → Register → **Download**. The `.p8`
   downloads once only; keep it. Put it on Vercel as `APNS_KEY` (the file
   pasted whole), `APNS_KEY_ID` (the 10 characters beside the key) and
   `APNS_TEAM_ID` (top right of the account page), then redeploy
   (SETUP.md, «…and three more for the iPhone app»).

**On appstoreconnect.apple.com**

3. **Users and Access → Integrations → App Store Connect API** (the first
   time, **Request Access**, then accept). **Team Keys** → (+): name
   `Codemagic`, access **App Manager** → Generate. Download the `.p8`
   (once only) and note the **Issuer ID** (above the list) and the **Key ID**.
4. **Apps → (+) → New App**: iOS, name `MyPromo`, primary language Arabic,
   bundle id `com.mypromo.app`, SKU `mypromo-ios`, full access. If the
   name is taken on the store, `MyPromo — طلاب الطب` reads the same.

**On codemagic.io** (sign up with the GitHub account that owns the repo)

5. **Add application** → GitHub → `MyPromoapp` → it finds `codemagic.yaml`.
6. **Team settings → Team integrations → Developer Portal → Connect**:
   name it `mypromo` (exactly — the yaml asks for that name), paste the
   Issuer ID and Key ID from step 3, upload its `.p8`.
7. **Team settings → codemagic.yaml settings → Code signing identities →
   iOS certificates → Generate certificate**: type **Apple Distribution**,
   key `mypromo` → Create. If it offers the certificate to download, keep
   the file and its password.

**Back on developer.apple.com**

8. **Profiles** → (+) → Distribution → **App Store Connect** → App ID
   `com.mypromo.app` → the certificate from step 7 (created today) → name
   `MyPromo App Store` → Generate.

**Back on codemagic.io**

9. Code signing identities → **iOS provisioning profiles → Fetch profiles**
   → tick `MyPromo App Store` → Download selected. Codemagic now has both
   halves of the signature; without them the build stops at «Apply the
   signing files».
10. The app → **Start new build** → branch `claude/mypromo-web-kickoff-mwtduw`
    (any branch would do: the app is a frame around the live site) →
    workflow **MyPromo iOS → TestFlight**. About 20 minutes, then Apple
    processes it for 10 to 30 more; it appears in App Store Connect →
    TestFlight. The encryption question is answered in the app itself.

**Then**

11. App Store Connect → TestFlight → **Internal Testing** → (+) a group, add
    yourself; install **TestFlight** on an iPhone (yours or a classmate's, who
    must be added the same way) and the app from it. Check: sign in, a
    lecture opens, a quiz works, the 3D model turns, notifications switch on
    (then اللوحة ← إعلان للطلبة ← جرّب على هاتفي), a study room asks for the
    microphone only when you turn it on, a photo can be posted.
12. Fill the App Store page:
    - App Information: category Education, content rights
      (`review-notes.md` §4), age rating (`privacy-answers.md`).
    - App Privacy (`privacy-answers.md`) and the privacy URL.
    - Version 1.0: screenshots `ios-ar` (and `ios-fr` in the French
      localisation), promotional text, description, keywords, support URL
      (`listing.md`), and the build from TestFlight.
    - App Review Information: account and notes (`review-notes.md` §2).
13. **Add for Review → Submit.** The first review usually takes one to
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

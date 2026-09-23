# The native app

MyPromo on the App Store and Google Play, as a Capacitor shell around the
deployment.

## Why a shell and not a bundle

Capacitor normally ships a folder of static files. This app cannot produce
one: 37 of its 41 pages are `force-dynamic`, 30 of them read the signed-in
profile on the server, and `middleware.js` guards every route. Exporting that
statically means moving all of it into the browser — every page rewritten to
fetch its own data, auth moved out of cookies the server can read, the
middleware replaced by client-side guards. That is weeks, and it would arrive
after the school year starts.

So the shell opens the live site. The trade is written down in
`capacitor.config.js` beside the setting that makes it true.

**What this costs.** The app needs a network. There is no offline reading,
and the fallback is one screen (`native/shell/offline.html`) that says so in
Arabic. If offline lectures matter later, that is the moment to reconsider
the bundle.

**The App Store risk, plainly.** Apple's guideline 4.2 rejects apps that are
a website in a window. Push notifications are the thing that makes this an
app rather than a bookmark, and they are not built yet — see below. Google
Play has no equivalent rule and will accept the shell as it stands.

## The URL

The shell has to know where the app lives, and it is not defaulted on
purpose: a build pointing at the wrong host looks completely normal and
serves the wrong thing. Without it, `cap sync` stops.

Put it in `.env.local` (gitignored):

```
MYPROMO_URL=https://your-app.vercel.app
```

…or pass it for one command:

```
MYPROMO_URL=https://your-app.vercel.app npm run native:sync
```

## Android — buildable on Windows, this week

Nothing for Android needs the Mac.

1. Install **Android Studio** (it brings its own JDK).
   <https://developer.android.com/studio>
2. Add the platform and sync, once:
   ```
   npx cap add android
   npm run native:sync
   ```
3. `npm run native:android` opens the project in Android Studio.
4. Plug in a phone with USB debugging on, press Run. That is the app on a
   real device.
5. For Play: **Build → Generate Signed App Bundle**. Keep the keystore file
   and its password somewhere you will still have them in five years —
   losing it means never updating the app again under the same listing.

**Play's testing rule.** A new personal developer account must run a closed
test with **12 testers for 14 continuous days** before production. Twelve
classmates on the tester list, and the clock only starts once they are opted
in — so start that the same day the first build works, not after everything
else is finished.

## iOS — Saturday, on the MacBook

An M1 is fine. Everything below is on the Mac.

1. `git clone` the repo, `npm install`.
2. Xcode from the App Store, then:
   ```
   sudo gem install cocoapods     # or: brew install cocoapods
   npx cap add ios
   MYPROMO_URL=https://your-app.vercel.app npm run native:sync
   npm run native:ios
   ```
3. In Xcode: pick your team under **Signing & Capabilities**, plug in an
   iPhone, press Run.
4. Study rooms use the camera and microphone. iOS refuses both — and the App
   Store rejects the build — unless `ios/App/App/Info.plist` says why. Add:
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>لتظهر لزملائك في غرفة الدراسة حين تشغّل الكاميرا.</string>
   <key>NSMicrophoneUsageDescription</key>
   <string>ليسمعك زملاؤك في غرفة الدراسة حين تشغّل الميكروفون.</string>
   ```
   Android already has its permissions in the manifest; it asks only when a
   student turns their microphone or camera on.

## Study rooms: voice and video

The call is LiveKit's. Until the three variables below are set in Vercel,
a room works as text and says so; nothing breaks.

1. Make a free account at livekit.io → **Cloud** → create a project.
2. In the project's **Settings → Keys**, create an API key.
3. In Vercel → the project → **Settings → Environment Variables**, add, for
   Production (and Preview if you use it):
   - `LIVEKIT_URL` — the `wss://….livekit.cloud` address on the project page
   - `LIVEKIT_API_KEY`
   - `LIVEKIT_API_SECRET`
4. Redeploy. Never paste the secret into chat or into the repo — it only
   lives in Vercel (and in `.env.local` on your own machine, which git
   ignores).

For testing on a computer without an account, `livekit-server --dev` runs a
local server with the key `devkey` and secret `secret` on `ws://127.0.0.1:7880`.

A **free** Apple ID signs an app onto your own phone — it expires after 7
days, which is enough to show people. Submitting to the App Store needs the
**Apple Developer Program, $99/year**, and enrolment can take a few days to
be approved. If the store is the goal, start that enrolment before Saturday
rather than on it.

## What is still missing before either store

- **Push notifications.** The one piece that makes this a real app to Apple,
  and the thing students will actually notice. Needs `@capacitor/push-
  notifications`, a Firebase project with `google-services.json` for Android,
  and an APNs key from the Apple developer account for iOS. The app already
  has a `notifications` table and writes to it — this is the delivery half.
- **Store assets.** Icon at 1024×1024 (in `design/brand-olive/logo/`),
  feature graphic 1024×500, and phone screenshots. The shooter makes real
  ones: `node scripts/shoot-olive-app.mjs`.
- **A privacy policy at a public URL.** Both stores require one before
  review. It has to say what is collected (email, name, matricule, what is
  posted) and that it lives in Supabase.
- **An account deletion route.** Google Play requires that a student can
  delete their account from inside the app, and a web link to do it.

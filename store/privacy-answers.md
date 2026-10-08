# Privacy and rating questionnaires — the answers

Every answer here matches what the code does and what `/privacy` says. If the
app starts collecting something new, change both.

---

## Apple — App Store Connect → App Privacy

**Do you or your third-party partners collect data from this app?** Yes.

For every type below: **Linked to the user: Yes. Used for tracking: No.**

| Apple's category → type | What it is in MyPromo | Purpose(s) |
|---|---|---|
| Contact Info → **Name** | full name at sign-up | App Functionality |
| Contact Info → **Email Address** | sign-in | App Functionality |
| Contact Info → **Phone Number** | first-years' WhatsApp number, for verification | App Functionality |
| User Content → **Photos or Videos** | photos attached to posts | App Functionality |
| User Content → **Other User Content** | posts, replies, answers, chat messages, room messages, PDFs, reports | App Functionality |
| Identifiers → **User ID** | account id, username, university number | App Functionality |
| Usage Data → **Product Interaction** | quiz answers, points, streak days, lectures opened, which screen is open (النشاط) | App Functionality, Analytics |

Not collected — answer **No** for: Health & Fitness, Financial Info, Location,
Sensitive Info, Contacts, Browsing History, Search History, Diagnostics,
Purchases, Device ID, Audio Data, Gameplay content, Customer Support,
Advertising Data, Other Data.

- **Audio and video in study rooms** are not "collected" in Apple's sense:
  they pass live through LiveKit and are never stored.
- **Push tokens** are not an Apple "Device ID" (that means advertising or
  vendor identifiers).

**Privacy Policy URL:** `https://mypromo-nu.vercel.app/privacy`

---

## Apple — Age Rating

Apple's questionnaire, answered for what is in the app:

| Question | Answer |
|---|---|
| Violence (cartoon, realistic, graphic) | None |
| Sexual content or nudity | None |
| Profanity or crude humour | None |
| Alcohol, tobacco, drugs | None |
| Horror / fear themes | None |
| Mature or suggestive themes | None |
| Simulated gambling | None |
| **Medical or treatment information** | **Frequent** — it is a medical-school study app |
| Contests | None |
| **User-generated content** | **Yes** |
| **Messaging and chat** | **Yes** |
| Unrestricted web access | No |
| Age assurance / parental controls | No |

The anatomy models are textbook medical models (bones, muscles, organs) for
students, which is medical information, not nudity. Whatever rating Apple
computes from these is fine: every user is a university student.

---

## Google Play — Data safety

**Does your app collect or share any of the required user data types?** Yes.
**Is all of the user data collected by your app encrypted in transit?** Yes.
**Do you provide a way for users to request that their data is deleted?** Yes
— in the app (أنا ← حذف حسابي) and at
`https://mypromo-nu.vercel.app/delete-account`.

**Shared with third parties:** No, for every type. (Supabase, Vercel, Google
Firebase, Apple and LiveKit are service providers acting for MyPromo, which
Google does not count as sharing.)

Collected — all **required** (not optional) unless marked, all for **App
functionality** (plus **Analytics** where marked), none processed only
ephemerally unless marked:

| Section → type | Notes |
|---|---|
| Personal info → **Name** | |
| Personal info → **Email address** | also Account management |
| Personal info → **User IDs** | username, university number |
| Personal info → **Phone number** | optional for most; first-years only |
| Messages → **Other in-app messages** | private chats, room messages |
| Photos and videos → **Photos** | optional — only when attached to a post |
| Audio → **Voice or sound recordings** | optional — study rooms; **processed ephemerally** (live, never stored) |
| Photos and videos → **Videos** | optional — study-room camera; **processed ephemerally** |
| Files and docs → **Files and docs** | optional — PDFs students upload |
| App activity → **App interactions** | screens opened, app opens — App functionality, **Analytics** |
| App activity → **Other user-generated content** | posts, replies, answers, reports |
| App activity → **Other actions** | quiz answers, points, streaks |
| Device or other IDs → **Device or other IDs** | the push token, if notifications are on |

Not collected: Location, Financial info, Health and fitness, Contacts,
Calendar, Web browsing, App info and performance (crash logs, diagnostics),
Search history, Installed apps.

---

## Google Play — the rest of App content

| Section | Answer |
|---|---|
| Privacy policy | `https://mypromo-nu.vercel.app/privacy` |
| Ads | **No**, the app contains no ads |
| App access | restricted — see `review-notes.md` §3 |
| Content rating (IARC) | Category **Reference, News, or Educational**. Users interact or exchange content: **Yes**. Shares location: No. Digital purchases: No. Everything else: No. |
| Target audience | **18 and over** only. Not designed for children. |
| News app | No |
| COVID-19 contact tracing | No |
| Data safety | above |
| Government app | No |
| Financial features | None |
| Health apps | **No** — study material for students, not a health service for patients |
| Account deletion | `https://mypromo-nu.vercel.app/delete-account` |

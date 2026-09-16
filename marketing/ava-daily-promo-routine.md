# AVA Daily Promo Routine — aivideoauditor.com

**Source of truth for AVA's autonomous daily marketing.** Read at session start. Model: content-strategy framework (search-first / share-first), executed on the ONLY channels that don't need a new account.

**Product**: AVA = done-for-you AI product-video studio for DTC/handmade brands. Photo in → QC'd (consistency-gate) 9:16 clips in 2–3 days, from $59, platform-native for IG Reels / TikTok / RED. Funnels to **/order**. Competes with people fighting Runway/Sora/Veo themselves.

**Non-negotiable goal**: drive REAL tracked CLICKS to the site → **/order**. Optimize for tracked visits, NOT reach/impressions. Every action ships with a UTM'd link and gets logged with clicks observed.

---

## 0. Reality guards (what is / isn't executable — DON'T drift)

| Channel | Status | Daily? |
|---|---|---|
| **Cold email (Brevo drip)** | ✅ EXECUTABLE NOW — infra at `~/.config/outreach/drip.py`, key `~/.config/ventures/brevo-api-key`. AVA just has **no queue yet** → build it. | YES — biggest lever |
| **Community/Q&A seeding** (Quora / IndieHackers / Discords / niche forums) | ✅ EXECUTABLE — no new account gate on most | YES |
| **Directory / tool-list submissions** | ✅ EXECUTABLE — public submit forms | YES (1–2/day) |
| **Compounding SEO** (publish 1 spoke/day) | ✅ EXECUTABLE — repo is here | YES |
| **Social produce+STAGE** (IG/TikTok/RED Reels) | ✅ produce/stage OK; posting BLOCKED | Stage 1/day |
| IG / TikTok / 小紅書 posting | ⛔ NO ACCOUNTS (Joe-gated) | see Unblock Checklist |
| X @AIVideoAuditor | ⛔ staged/blocked (no session/keys) | see Unblock Checklist |
| Reddit | ⛔ karma-walled | build karma separately |

**Rule**: never burn a daily wave on a blocked channel. Blocked ≠ pending-each-day. The daily routine below is ONLY the ✅ rows.

---

## 1. North-star metric + weekly click targets

**North star**: tracked clicks to **aivideoauditor.com/order** per week (proxy for the only thing that matters — order starts).

**Weekly click targets (measure by UTM, ramping from a cold start):**

| Destination | Wk-1 floor | Wk-4 target | Primary source of the clicks |
|---|---|---|---|
| `/prompts` (+ `/prompts/*`, `/wall`) | 40 | 150 | community Q&A answers, directories (share hooks) |
| `/product-videos/*` | 30 | 120 | cold email (each links the matched vertical) |
| `/compare`, `/alternatives`, `/best` | 15 | 60 | community answers to "X vs Y / cheapest" questions |
| **`/order`** (north star) | **8** | **35** | downstream of all of the above |

Order-start conversion assumption: ~5–8% of `/product-videos` + `/prompts` visits reach `/order`. If `/order` clicks lag while upstream clicks hit target → the landing pages convert poorly (fix copy/CTA), not the top of funnel.

### How to measure

1. **Vercel Analytics** (project `aivideoauditor-app-redesign`) — Referrers + top pages + UTM query breakdown. Primary dashboard.
2. **Google Search Console** — `aivideoauditor.com` property → Performance → Pages/Queries. This is the organic-search half (the SEO pillar).
3. **UTM = the join key.** Every link we place off-site MUST carry UTMs so Vercel Analytics attributes the click.

### UTM naming convention (USE EXACTLY — don't freestyle)

```
?utm_source=<where>&utm_medium=<how>&utm_campaign=<pillar-or-batch>&utm_content=<specific-asset>
```

- `utm_source`: the property, lowercase — `quora`, `indiehackers`, `taaft`, `futurepedia`, `producthunt`, `coldemail`, `discord-<name>`, `alternativeto`.
- `utm_medium`: `community` (Q&A/forum answers), `email` (cold email), `directory` (tool-list/backlink), `social` (once social unblocks).
- `utm_campaign`: the content pillar or send batch — `prompts-by-model`, `product-video-<industry>`, `tool-comparison`, `coldemail-<YYYYMMDD>`.
- `utm_content`: the exact asset — e.g. `veo3-jewelry-teardown`, `skincare-lp`, `cheapest-generator-answer`.

**Canonical examples (copy-paste and swap):**
```
https://aivideoauditor.com/product-videos/jewelry?utm_source=coldemail&utm_medium=email&utm_campaign=coldemail-20260813&utm_content=jewelry-touch1
https://aivideoauditor.com/prompts/model/veo-3?utm_source=quora&utm_medium=community&utm_campaign=prompts-by-model&utm_content=veo3-best-prompts-answer
https://aivideoauditor.com/wall?utm_source=indiehackers&utm_medium=community&utm_campaign=prompts-by-model&utm_content=wall-share
https://aivideoauditor.com/compare?utm_source=alternativeto&utm_medium=directory&utm_campaign=tool-comparison&utm_content=alternativeto-listing
https://aivideoauditor.com/product-videos/candles?utm_source=futurepedia&utm_medium=directory&utm_campaign=tool-comparison&utm_content=futurepedia-listing
```

---

## 2. Content pillars + topic-cluster map (existing pages slotted in)

Every action targets content that is **searchable** (SEO/Q&A intent) or **shareable** (free useful resource → click). Pillars map to buyer stage + keyword modifiers.

### Pillar 1 — AI video prompts by model (SHAREABLE hook / awareness → consideration)
*Keyword modifiers*: "best {model} prompt for X", "{model} prompt examples", "how to prompt {Sora/Veo 3/Runway}".
- **Pillar page**: `/prompts` · **Wall**: `/wall` (85 entries grouped by model)
- **Model hubs**: `/prompts/model/[model]` (8 — Sora, Runway, Veo 3…) — "Best {Model} prompts"
- **Spokes**: `/prompts/[slug]` (85 teardowns: video + exact copyable prompt + how-made + /order CTA)
- *Role*: the free-resource magnet. People come for the prompt, see the QC'd output, click /order because "I'd rather someone just make this."

### Pillar 2 — AI product video for [industry] (COMMERCIAL intent / decision → implementation)
*Keyword modifiers*: "AI product video for jewelry", "how to make {candle/skincare} video with AI", "product video for Etsy shop".
- **Pillar page**: `/product-videos`
- **Spokes**: `/product-videos/[industry]` (10: jewelry, skincare, candles, ceramics, fashion, food, pet, home-decor, etsy, supplements)
- *Role*: the money landing pages. This is where cold email points, matched to the prospect's vertical.

### Pillar 3 — AI video tool failures & comparisons (consideration → decision, high commercial intent)
*Keyword modifiers*: "Sora alternatives", "cheapest AI video generator", "Runway vs Sora", "{tool} not worth it / failures".
- **Pages**: `/compare`, `/alternatives`, `/best`, `/cheapest-ai-video-generator`, `/sora-alternatives`, `/failures`, `/graveyard`
- *Role*: catch people already shopping/burned by DIY tools → reframe "stop fighting the tool, hand us the photo".

### Pillar 4 — How to make [X] product video with AI (implementation / how-to, awareness)
*Keyword modifiers*: "how to make a product video with AI", "AI video for small business / handmade / DTC", "9:16 reel from a product photo".
- **Pages**: `/studio`, `/product-videos/[industry]` how-to sections, prompt teardowns' "how it was made"
- *Role*: bridges the DIY searcher into the done-for-you offer.

**Cluster logic**: shareable hooks (P1 wall/prompts) + comparison pages (P3) sit at the top and middle; every page internally links down to a matched `/product-videos/[industry]` (P2) → `/order`. Off-site placements always link the pillar page that fits the reader's stage, never bare /order.

---

## 3. THE DAILY ROUTINE — Tier-1 (do EVERY day, no Joe, no new accounts)

Run in order. Skip an item only if today's log already shows it done. Target ~30–45 min.

### T1. Cold email — the biggest executable-now lever
The AVA queue doesn't exist yet; the drip **engine** does (`drip.py`, Brevo-gated, 2-touch max). Do this:

**One-time (first run):** add an `"ava"` venture block to `~/.config/outreach/drip.py` (sender e.g. `hello@aivideoauditor.com`, `daily_cap: 8`, `followup_days: 3`, `queue: ~/.config/ava/queue.json`) and create `~/.config/ava/queue.json = []`. Mirror the existing tutumargin/freshverdict blocks exactly.

**Every day:**
1. **Source 15–25 DTC/handmade prospects** with weak/no video. Where to find them (real sources):
   - **Etsy** — top-selling shops in jewelry/candles/ceramics/skincare with only static photos (grab the shop's linked website + contact email).
   - **Instagram/TikTok hashtag scrape** — `#smallbusinesscheck`, `#handmadejewelry`, `#candlemaker`, `#skincarebrand` → brands posting only photos, no reels.
   - **Faire** (wholesale marketplace) brand directory — handmade/DTC makers, public brand pages.
   - **Shopify-powered stores** via BuiltWith / Storeleads free tiers, filtered by the 10 verticals we have LPs for.
   - **Product Hunt / indie DTC launches** — new brands with a landing page but no video.
   - Only enqueue REAL published emails (the engine never guesses). Personalize body at enqueue time.
2. **Match each prospect to the right `/product-videos/[industry]` LP** and bake the UTM'd link into touch-1:
   `…/product-videos/<their-vertical>?utm_source=coldemail&utm_medium=email&utm_campaign=coldemail-<YYYYMMDD>&utm_content=<vertical>-touch1`
3. **3-touch sequence** (engine sends touch-1 + one bump; touch-3 breakup added to queue body):
   - **Touch 1 (Day 0)** — practitioner, not vendor. One line on their product + "I made a 9:16 sample-style clip approach for shops like yours" → link the matched LP. Soft ask.
   - **Touch 2 (Day 3)** — proof angle: link `/wall` or a matched `/prompts/[slug]` ("here's the exact output + how it's QC'd"). UTM `…-touch2`.
   - **Touch 3 (Day 7)** — breakup: "closing the loop — if reels are ever on the list, the $59 sample stands." UTM `…-touch3`.
4. **Send cap: 8/day** (gentle domain warmup — do NOT blast). Brevo health-gate must pass or the engine aborts all sends.
5. Log sends + any replies (drip engine reconciles replies via IMAP; a reply = a lead, stop follow-ups).

### T2. Community / Q&A answer-seeding (9:1 value-to-promo, no spam)
1. **Find 2–3 live questions** matching our pillars. Real example queries to search:
   - Quora: "best Veo 3 prompt for product videos", "how do I make product videos with AI", "cheapest AI video generator 2026", "is Sora worth it for e-commerce".
   - **Indie Hackers** — threads on AI video, DTC content, "how are you making product videos".
   - **Niche forums**: r/-adjacent off-Reddit — Etsy Forums, Shopify Community, Later/Buffer blogs' comment sections, `smallbusiness`-type Discords, AI-video Discords (Runway/Pika community servers), Facebook DTC/maker groups (read-only-safe).
2. **Answer genuinely first** — solve the OP's actual problem with a real prompt or a real comparison takeaway. THEN, only if it naturally helps, link the matching free resource:
   - prompt question → `/prompts/model/[model]` or a `/prompts/[slug]` teardown
   - "cheapest / X vs Y / alternatives" → `/compare` or `/cheapest-ai-video-generator`
   - "how to make a product video" → `/product-videos/[industry]` how-to
   UTM: `utm_source=<site>&utm_medium=community&utm_campaign=<pillar>&utm_content=<question-slug>`.
3. **Cap: 1 answer per property per day.** No link-drops, no CTAs, no feature bullets (per content-style guardrails). Reddit is karma-walled → do NOT attempt; build karma on a separate track (see Unblock Checklist).

### T3. Directory / tool-list submissions (1–2/day → backlinks + referral clicks)
Submit AVA to one or two AI-tool directories per day. Homepage or `/product-videos` as the listing URL, UTM `utm_medium=directory`. Starter target list (work down it, ~1–2/day):
- **There's An AI For That (TAAFT)** · **Futurepedia** · **AI Tools Directory / aitools.fyi** · **Toolify.ai** · **Insidr AI** · **Futuretools.io** · **SaaSHub** · **AlternativeTo** (list as alternative to Runway/Sora/Veo) · **Product Hunt** (save a real launch for the Unblock day, but the "upcoming" page is submittable now) · **BetaList** · **G2 / Capterra** (video-maker category) · **AI video tools" listicles** — pitch inclusion to authors of "best AI video generators 2026" roundups (email the writer, link `/best`).
- Track each: does it give a dofollow backlink + does it drive referral clicks (check Vercel referrers next day).

### T4. Compounding SEO — publish 1 spoke page/day (programmatic-seo pattern)
Ship ONE new fresh page daily so the site compounds:
- A new **`/prompts/[slug]`** teardown as new wall entries land (each: video + exact copyable prompt + how-made + related + /order CTA) — highest leverage, feeds Pillar 1.
- OR a new **`/product-videos/[industry]`** variant / sub-vertical LP (e.g. Etsy-jewelry, vegan-skincare) — feeds Pillar 2.
- OR a new **`/compare`** matchup page ("{Model A} vs {Model B} for product video") — feeds Pillar 3.
- Programmatic pattern: one data row (prompt/model/industry) → one templated page → internal-link into the pillar + a matched `/product-videos` + `/order`. Commit + let Vercel deploy; verify the route renders (curl the path) before logging done.

---

## 4. Batch-produce & STAGE social (posting blocked, so pre-load it)

**Daily: produce/stage 1 vertical clip** so posting is instant the moment accounts exist.
- Produce a 9:16 QC'd sample clip (the actual AVA output) from a stock/portfolio product photo, one of our 10 verticals rotating.
- Write the caption + hashtags for IG Reels / TikTok / RED, plus the profile-bio /order link (link goes in bio/caption, never a raw drop).
- **Store** in `marketing/staged-social/<YYYYMMDD>-<industry>.{mp4,txt}` with the caption + intended platform + the UTM'd bio link.
- Do NOT attempt to post (no accounts). Just stack the library — target 30+ staged clips before accounts unblock so we can launch daily-cadence from day one.

---

## 5. ONE-TIME UNBLOCK CHECKLIST (NOT daily — Joe-gated)

Run once when Joe is available. Each item unlocks a channel the daily routine currently skips.

- [ ] **Create @aivideoauditor Instagram account** → unlocks IG Reels posting (staged library goes live; Pillar-1/2 clips get distribution). *Needs Joe: phone/email verify.*
- [ ] **Create @aivideoauditor TikTok account** → unlocks TikTok Reels (biggest DTC-discovery surface). *Needs Joe: verify.*
- [ ] **Create 小紅書 (RED) account** → unlocks RED (handmade/DTC-heavy audience). *Needs Joe: verify (often phone-gated).*
- [ ] **X @AIVideoAuditor login / API keys** → unlocks X reply-guy + thread distribution of prompt teardowns. *Needs Joe: session or API keys.*
- [ ] **Reddit karma-build track** → unlocks AI-video subreddits (r/aivideo, r/StableDiffusion-adjacent, r/Entrepreneur DTC threads). *Needs: separate slow karma-farming, not daily promo.*
- [ ] **5 affiliate signups** (Runway/Pika/Higgsfield/etc. affiliate/referral programs) → unlocks monetized comparison pages (`/compare`, `/alternatives`, `/best` earn on outbound). *Needs Joe: signups behind identity walls.*
- [ ] **Product Hunt launch** (real, coordinated) → one-time spike + durable backlink. *Needs Joe: PH account + launch-day presence.*

---

## 6. Daily log (append below — never rewrite; check before running to avoid dupes)

Format — one block per day:

```
### YYYY-MM-DD
- T1 cold-email: sourced <N> prospects (<verticals>), enqueued <N>, sent <N> (cap 8), replies <N>. UTM campaign coldemail-YYYYMMDD.
- T2 community: answered <site>/<thread-url> → linked <page> (utm_content=<x>). answered <site2>/... 
- T3 directory: submitted <directory> (listing url <page>), backlink=<yes/no/pending>.
- T4 SEO: published <route> (verified renders: yes). 
- T5 social-staged: <YYYYMMDD>-<industry>.mp4 + caption for <platforms>.
- CLICKS OBSERVED (Vercel Analytics, prev 24h): /prompts <n>, /product-videos <n>, /compare <n>, /order <n>. Top referrer: <x>.
- Notes / blockers: <...>
```

**Weekly (Mondays):** pull Vercel Analytics + GSC 7-day numbers into the North-star table; if `/order` clicks < target while upstream is on target → flag landing-page conversion for a copy/CTA fix.

### 2026-08-15
- T1 cold-email: 8 sent at 08:10 (cap 8), campaign coldemail-20260815 (ran upstream, not this session).
- T2 community: 3 answers DRAFTED + STAGED (all target platforms login-gated → could not post autonomously):
  - Shopify Community /t/ai-video-generation-tools/645283 → links /wall (utm_content=wall-share). STAGED — needs Shopify account.
  - Shopify Community /t/would-product-photo-to-video-drafts-help-small-shopify-teams-test-creatives-faster/646235 → links /product-videos (utm_content=photo-to-video-drafts). STAGED — needs Shopify account.
  - Indie Hackers /post/can-we-talk-about-how-good-ai-has-become-for-creating-product-startup-videos-a49221c8bd → links /prompts/model/veo-3 (utm_content=veo3-prompts-answer). STAGED — needs IH account.
- T3 directory: checked 8 directories; NONE support anonymous no-account free submission.
  - Free but account-gated (STAGED, fields ready): SaaSHub, AlternativeTo, BetaList (BetaList usable via @AIVideoAuditor login on CDP :9227).
  - Paid (NEEDS JOE decision): TAAFT $347 one-time; Futurepedia $497 one-time.
  - FutureTools.io (`/submit-a-tool`): FREE + no-account form, ALL fields filled (Generative Video / Paid / joejoego23@gmail.com) but blocked at final Cloudflare Turnstile "verify you are human" checkbox — puppeteer cannot pass. NEEDS JOE: 1 manual checkbox click then Submit (form re-fillable in one call). This is the ONLY genuinely-free no-account submittable directory found.
  - Dead/skip: aitools.fyi (Tally→paywall); Toolify.ai (403, login required).
- Notes/blockers: 0 items went LIVE this session — every directory + Q&A channel today is account-gated. Joe decisions needed: (a) approve puppeteer account-create + submit for the 3 free directories; (b) approve/decline the 2 paid directory listings.

---
_Created 2026-08-13. Executable channels only (cold email + community Q&A + directories + SEO + staged social). Social posting / X / Reddit remain in the Unblock Checklist until Joe clears them._

# AVA Cold-Email Copy — 2-Touch Sequence (BUILD-ONLY, unsent — awaiting Joe approval)

Product: AI Video Auditor (aivideoauditor.com) — done-for-you AI product-video studio.
Photo in → QC'd 9:16 vertical clips in 2–3 days, from $59. Funnels to /order.

**Send model (what drip.py actually fires):** Touch 1 (Day 0) + one auto-bump Touch 2 (Day 3, `followup_days:3`). Cap 8/day. Optional Touch 3 breakup text is appended to the queue body if desired (engine sends max 2 auto-touches).

**UTM convention (per ava-daily-promo-routine.md):**
```
https://aivideoauditor.com/product-videos/<vertical>?utm_source=coldemail&utm_medium=email&utm_campaign=coldemail-<YYYYMMDD>&utm_content=<vertical>-touch1
```
`utm_content=<vertical>-touch2` for touch 2. Valid vertical slugs (confirmed against the live `/product-videos/[industry]` route):
`jewelry`, `skincare-beauty`, `candles`, `ceramics-pottery`, `fashion-apparel`, `food-beverage`, `pet-products`, `home-decor`, `handmade-etsy`, `supplements-wellness`.

**CAN-SPAM compliance (baked into every body — drip.py has no auto footer):**
- Real sender identity: `AI Video Auditor <contact@aivideoauditor.com>` (sender + reply-to).
- Physical postal address line (REQUIRED — Joe must confirm/replace the placeholder below before send).
- Working opt-out: "reply STOP / 'not interested' and I won't email again" — the drip engine's IMAP reconciler catches any reply and permanently stops follow-ups. (A one-click unsubscribe link is stronger; see BLOCKERS.)

> ✅ FILLED (2026-08-14): postal address = `5475 Snell Ave, San Jose, CA 95123, USA`. Required by CAN-SPAM §5(a)(5).

---

## Touch 1 (Day 0) — practitioner, not vendor. ≤120 words.

Template (swap `{Hook}`, `{vertical}`, `{LP-URL}`):

```
Subject: a 9:16 clip idea for {Brand}

Hi {name},

{Hook} — which is exactly the gap I help {vertical} brands close.

I run AI Video Auditor. You send one product photo; we come back in 2–3 days with a QC'd 9:16 clip built for Reels/TikTok — motion, not another flat-lay. Every clip goes through a consistency gate so the product actually looks like your product.

Here's the approach for shops like yours: {LP-URL}

First sample is $59 if you ever want to try one — no retainer, no call needed. Worth a look?

Joe
AI Video Auditor — aivideoauditor.com
5475 Snell Ave, San Jose, CA 95123, USA
Not interested? Just reply "stop" and I won't email again.
```

## Touch 2 (Day 3) — proof angle. ≤90 words.

Template (link `/wall` or a matched `/prompts` page as proof; UTM `...-touch2`):

```
Subject: Re: a 9:16 clip idea for {Brand}

Hi {name},

Floating this back up once. If you want to see the actual output quality before deciding, here's the wall of QC'd clips + the exact way each one is checked: https://aivideoauditor.com/wall?utm_source=coldemail&utm_medium=email&utm_campaign=coldemail-<YYYYMMDD>&utm_content={vertical}-touch2

If reels aren't on the list right now, no problem — the $59 first-sample offer stands whenever it is. Either way I won't keep following up.

Joe
AI Video Auditor — aivideoauditor.com
5475 Snell Ave, San Jose, CA 95123, USA
Reply "stop" to opt out.
```

## Touch 3 (OPTIONAL breakup — only if manually added to body) — ≤50 words.

```
Subject: Re: a 9:16 clip idea for {Brand}

Closing the loop — I'll stop here. If product video ever moves up the list, the $59 first sample is a low-risk way to test it: https://aivideoauditor.com/product-videos/{vertical}?utm_source=coldemail&utm_medium=email&utm_campaign=coldemail-<YYYYMMDD>&utm_content={vertical}-touch3

Joe
AI Video Auditor — aivideoauditor.com
5475 Snell Ave, San Jose, CA 95123, USA
```

---

## Per-vertical Touch-1 opener lines (personalization by vertical)

Use as the `{Hook}` seed; append the prospect-specific detail sourced at enqueue time.

- **jewelry**: "Fine jewelry sells on sparkle and scale, and a still photo can't show either the way a slow rotating clip can"
- **skincare-beauty**: "Texture and the 'glide' moment are what sell skincare, and neither reads in a flat product shot"
- **candles**: "A candle's whole appeal is the flame and the melt — motion your static flat-lays can't show"
- **ceramics-pottery**: "Hand-thrown pieces look 10x more premium in a slow turntable clip than in a straight-on photo"
- **fashion-apparel**: "Drape and movement are the entire pitch for apparel, and a lookbook still leaves them on the table"
- **food-beverage**: "The pour / steam / first-bite moment is what stops a scroll — a plated photo can't do it"
- **pet-products**: "Pet buyers want to see the product in use/motion, and static packshots don't earn the tap"
- **home-decor**: "Decor sells on how it lives in a room — a single angle photo flattens that"
- **handmade-etsy**: "Etsy listings with video convert noticeably better, and yours are running photos only"
- **supplements-wellness**: "Trust + ritual sell supplements; a bottle-on-white shot doesn't build either — short motion does"

---

_Created BUILD-ONLY. Nothing sent. All sends gated by `enabled:False` in drip.py + Joe's approval._

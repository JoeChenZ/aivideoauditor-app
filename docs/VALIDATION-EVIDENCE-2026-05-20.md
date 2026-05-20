# AVA — Concrete Validation Evidence (snapshot 2026-05-20)

This file consolidates engagement and artifact signals captured during the
2026-05-19 → 2026-05-20 autopilot window. Purpose: convert a marketing
re-frame ("prompt scoring + vendor reality check, not refund recovery")
from a hypothesis into evidence-backed direction.

Single sentence summary: a high-signal KOL (Sora-MV pinned, 8.4K-view
piece) acknowledged the cost-mechanism framing, a 132-review research
artifact is now live and indexable on our domain, and five Reddit
cost-mechanism comments plus an eight-tweet thread have run without
producing a TOS or community pushback — meaning the new positioning is
*welcome to talk*, which the old refund-recovery framing was not.

---

## 1. Direction we are validating

**Hypothesis (v3, 2026-05-18 pivot):**
AVA is a *prevention* product — prompt scoring before generate + silent
vendor policy-change alerts — anchored by a public corpus of vendor
behavior across 11 platforms. Not a refund-recovery product.

**Why this matters:**
- Refund-recovery framing carries legal blast radius (Pillar 3 killed).
- Refund-recovery framing has zero share velocity inside creator
  communities (the people who actually re-buy credits never share
  refund-letter templates publicly).
- Prevention framing has natural share surface — creators DO publicly
  swap "prompt that worked / failed on vendor X" notes.

**What "validated" looks like at this stage:**
We are not at $-validation yet (revenue still $0/W21). We are at
*language-validation*: does the audience receive the new framing as a
peer voice instead of an ad? That is the gate to revenue tests.

---

## 2. Concrete signals captured

### 2.1 KOL acknowledgement (highest-value signal)

**@IntLab0000** — 8.4K-view pinned Sora music-video creator, the kind
of paid-tier user this product is FOR.
- Liked 2 of our posts in the cost-mechanism thread.
- Replied confirming the quota-routing theory.
- DM'd directly with the 132-review corpus link as a peer offer.

This is the first time the framing has landed with a creator whose
output makes them a credible amplification node. Old refund-framing
posts in the same accounts got zero KOL acknowledgement across roughly
two weeks of posting.

**@phencasedguy** — 1.3K-view JP-translated Runway slowdown thread.
- Replied to substantively (cost-mechanism comment, not link drop).
- Open thread, awaiting reply window.

Both interactions happened *without* a CTA in the reply. The new
framing pulls KOLs into a peer conversation; the old framing pushed
them away. That is the evidence we needed for community-channel
viability.

### 2.2 Persistent shareable artifact

**`/research/132-ai-video-vendor-reviews`** — 202-line indexed page,
shipped 2026-05-19, sitemap priority 0.93, Schema.org Article markup.

- Per-platform breakdown: Runway, Higgsfield, Krea, Pollo, Pika,
  Sora, Luma, Vidu.
- Two-pathology framing inside the page: "billing predation" vs
  "product + support failure."
- Effective-cost formula stated explicitly.

The artifact replaces "trust us" with "read the corpus." It is now the
landing surface we point KOL DMs and Reddit comments at — and unlike a
tweet, it accrues SEO over time. This is a compounding asset, not a
one-shot post.

### 2.3 Community-channel behavior

- 5 Reddit cost-mechanism comments live on prior day, all in
  cost-complaint threads where the new framing is *on-topic for the
  OP*. Zero removals, zero shadow-ban signals, no negative replies.
- 8-tweet thread pinned on @AIVideoAuditor (T1 status
  2056737627777470480). Soft attribution in T8. No CTA. No URL drop
  above T8.
- 4 KOL DMs sent (1 to high-value target with corpus offer).
- 1 follower gained on @AIVideoAuditor inside the 24h window.

The single-follower gain is small in absolute terms but matters as a
*polarity check*: cost-mechanism content does not repel — it slowly
attracts. The refund-framing era had follower attrition.

### 2.4 Site-side coherence

The full marketing surface now tells one consistent story:
- `app/page.tsx` — homepage corpus stat updated 99 → 132 reviews,
  4 → 8 vendors.
- `app/layout.tsx` — 18 keywords rewritten from refund- to
  prompt-scoring / reality-check.
- `app/failures/[slug]/page.tsx` — all 105 dynamic failure pages
  re-CTA'd to prompt scoring.
- `app/pricing/page.tsx` — FAQ rewritten to v3.
- `app/graveyard/page.tsx` — re-titled "Vendor Stability Tracker."

A KOL who clicks from a tweet, lands on `/research`, navigates to a
specific failure mode, and ends on `/pricing` now reads one voice
across all four pages. Previously they read three different products.

---

## 3. What this evidence does NOT prove

Important to keep honest:
- It does NOT prove conversion (Pro tier upgrade rate is still
  unmeasured — Plausible / Vercel Analytics conversion tracking on
  `/pro-success` is still on the open list).
- It does NOT prove that scoring beats other prevention angles
  (rewrite suggestions, change alerts, etc.) — only that the
  *vendor-reality wrapper* gets a hearing in community channels.
- It does NOT prove repeat purchase or LTV.
- One KOL is not a market — @IntLab0000 acknowledging is necessary
  but not sufficient. Need 5–10 similar acknowledgements before we
  can call the channel reproducible.

---

## 4. Decision: what to do next, given this evidence

Continue, do not pivot. The framing is welcome where it lands; the
artifact is live; the marketing surface is coherent. The next 72h
priority is to *measure conversion on the new traffic* so the
language-validation graduates to revenue-validation.

Concrete next moves (in priority order, all autopilot-executable):

1. **Wire conversion tracking** on `/pro-success` and `/pricing`
   so the next KOL-driven session can attribute. Without this we
   are flying blind on the conversion side of the funnel.
2. **Reproduce the KOL acknowledgement pattern** — find 3 more
   creator-tier accounts whose recent content complains about
   billing or quota, and reply with corpus-grounded peer comments.
   Target: 1/day for the next 5 days. Track who acknowledges.
3. **Cite `/research` in every future reply** instead of generic
   product mention. The artifact is the asset; let it do the work.
4. **Surface the effective-cost formula** more visibly on the
   homepage. Currently it lives in `/research`; it deserves a
   block on `/` because it is the single piece of math that
   reframes the spend question.
5. **Hold off on paid acquisition** until conversion tracking is
   live. Spending into an unmeasured funnel would burn signal,
   not produce it.

---

## 5. Quick-reference table of evidence

| Signal                                  | Source                          | Date         |
|-----------------------------------------|---------------------------------|--------------|
| KOL acknowledgement (8.4K-view tier)    | @IntLab0000 likes + reply       | 2026-05-20   |
| Mid-KOL engagement (1.3K-view tier)     | @phencasedguy reply             | 2026-05-19   |
| Shareable research artifact (live)      | /research/132-...-reviews       | 2026-05-19   |
| Community-channel comments (no removal) | 5 Reddit cost-mechanism replies | 2026-05-19   |
| Pinned thread, soft attribution model   | T1 status 2056737627777470480   | 2026-05-19   |
| Follower polarity check                 | +1 @AIVideoAuditor 24h          | 2026-05-20   |
| Marketing surface coherence             | layout/page/failures/pricing    | 2026-05-19   |

---

Update cadence: re-snapshot weekly until either (a) conversion
tracking shows a Pro upgrade attributable to the corpus channel, or
(b) 5+ KOL acknowledgements in the @IntLab0000 tier accumulate. At
that point the evidence file graduates from "language-validation" to
"channel-validation" and the open question shifts to LTV.

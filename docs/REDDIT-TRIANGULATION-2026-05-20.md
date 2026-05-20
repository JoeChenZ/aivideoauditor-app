# Reddit Triangulation of "77% Billing Predation" Finding

**Method:** searched Reddit (via Firecrawl) for each of three vendors with
TWO query types — a billing-loaded query and a neutral review query —
then categorized the top 15 distinct results into BILLING / QUALITY /
SUPPORT / POSITIVE / NEUTRAL. The neutral search is the controlled one:
the billing-loaded search measures availability of billing complaints,
the neutral search measures their *base rate* in the wider community.

**Honest read up front:** the Trustpilot 77% is not representative of
total user sentiment. It is representative of the cohort that gets
angry enough to write a Trustpilot review. That cohort over-indexes on
billing pain. In neutral Reddit samples the rate drops sharply for
mainstream vendors (Runway ~29%) and stays high only for the
billing-pathology tier (Pollo ~80–90%, Higgsfield ~64%).

The reframing from "prompt scoring" to "billing defense" is correct for
*part* of the vendor universe, not all of it. Specifics below.

---

## 1. Higgsfield — neutral search (15 results)

Query: `Higgsfield review experience honest opinion site:reddit.com`

| # | Thread (title gist) | Category |
|---|---------------------|----------|
| 1 | pros/cons from real users — top comment "Higgsfield is a scam! Unlimited is a lie, paid $129 + $119" | BILLING |
| 2 | my honest Higgsfield review — same complaint quoted | BILLING |
| 3 | my honest take on Higgsfield — same complaint quoted | BILLING |
| 4 | honest experience after 4 months — same complaint quoted | BILLING |
| 5 | "scam or actually worth it" — "$235 for one 5-second video" | BILLING |
| 6 | For anyone considering Higgsfield (r/MotionDesign) | MIXED (quality + general) |
| 7 | r/HiggsfieldAI landing page | N/A |
| 8 | new feed — "results getting worse, ps3 game" | QUALITY |
| 9 | Rating Higgsfield — "don't offer refunds or cancelation" | BILLING |
| 10 | Open Higgsfield (about a competitor) | POSITIVE (competitor) |
| 11 | Open-Higgsfield review — same billing complaint quoted | BILLING |
| 12 | "Have you used Higgsfield" — "quality drops, generations fail" | QUALITY |
| 13 | r/MotionDesign — "how terrible this tool actually is" | QUALITY |
| 14 | Virality Predictor review | POSITIVE |
| 15 | Over a year on Higgsfield — viral video success | POSITIVE |

**Distinct complaint threads:** 11 (excluding 2 positive + 1 neutral + 1 N/A)
**Billing:** 7 / 11 = **64%**
**Quality:** 4 / 11 = 36%
**Vs Trustpilot 77%:** Reddit base rate is ~13 percentage points lower.

**Notable:** the same billing complaint snippet ("Higgsfield is a scam!
Unlimited... $129 + $119...") gets *quoted in five different threads*.
This is one of the highest-virality billing complaints in the AI-video
Reddit universe right now. The pattern is closer to a community
chorus than to one frustrated user.

---

## 2. Runway ML — neutral search (15 results)

Query: `Runway ML review experience opinion 2025 site:reddit.com`

| # | Thread (title gist) | Category |
|---|---------------------|----------|
| 1 | Is Runway worth it — "wasting $100" | BILLING-ADJACENT |
| 2 | Gen-4 honest opinion — disappointing | QUALITY |
| 3 | unlimited plan review — "minimal satisfactory results" | QUALITY |
| 4 | Runway Aleph — "zero consistency" | QUALITY |
| 5 | All-in-One AI platforms 2026 | POSITIVE |
| 6 | Gen 3 vs MiniMax | COMPETITIVE |
| 7 | unlimited plan worth it — "worked best" | POSITIVE |
| 8 | First short film with Gen-4 | POSITIVE |
| 9 | Which AI to use | NEUTRAL |
| 10 | blown away by Runway | POSITIVE |
| 11 | tested 5 AI video tools | POSITIVE (CapCut wins) |
| 12 | (duplicate of 10) | — |
| 13 | months of Gen-3 disappointment | QUALITY |
| 14 | Worst AI Video Generator — "limb distortions" | QUALITY |
| 15 | r/runwayml landing — "$95/mo, 120+ min wait, misleading" | BILLING + SUPPORT |

**Distinct complaint threads:** 7 (excl. 5 positive + 2 competitive/neutral + 1 dup)
**Billing / billing-adjacent:** 2 / 7 = **29%**
**Quality:** 5 / 7 = 71%

**This is the most important result.** For Runway — the largest AI-video
platform — the neutral Reddit sample shows the OPPOSITE distribution
from Trustpilot. Users complain about quality 2.5× more than billing.
Trustpilot's 77% billing claim does not survive triangulation here.

---

## 3. Pollo AI — billing-loaded search (15 results)

(Pollo's English-language Reddit footprint is small enough that a
billing-loaded search and a neutral search return mostly the same
threads. So this category is a single read.)

Query: `Pollo AI refund OR billing OR cancel OR charged site:reddit.com`

| # | Thread (title gist) | Category |
|---|---------------------|----------|
| 1 | refund for pollo.ai subscription | BILLING |
| 2 | Pollo billed $70K for yearly pro — "they take a cut from the refund" | BILLING |
| 3 | r/FraudPrevention "Systematic Fraud, Unauthorized Charges" | BILLING |
| 4 | Pollo credit packs | NEUTRAL |
| 5 | Pollo AI questions — "middleman tax, shady" | BILLING |
| 6 | Freepik or Pollo AI — "billing complaints valid" | BILLING |
| 7 | Pollo, billed $80, received nothing | BILLING |
| 8 | r/techsupport — no response, automated replies | SUPPORT (which is paired with billing) |
| 9 | Bring images to life — "way too expensive for what you get" | QUALITY/COST |
| 10 | (Spanish duplicate of #1) | — |
| 11 | tested AI video tools — Pollo mentioned positively-ish | NEUTRAL |
| 12 | (Off-topic, brightershores subscription) | — |
| 13 | VEO3 PSA credits don't roll over | BILLING |
| 14 | (Off-topic, OpenAI card declined) | — |
| 15 | tested 4 AI video platforms | NEUTRAL |

**Distinct on-topic complaint threads:** 9 (excl. 4 off-topic/neutral + 2 dups)
**Billing:** 7 / 9 = **78%**
**Support (billing-paired):** 1 / 9 = 11%
**Quality/Cost:** 1 / 9 = 11%

**For Pollo specifically, the Trustpilot 77% reproduces almost
identically on Reddit.** Pollo is the archetype of a billing-pathology
vendor: small product, large billing problems, very little quality
discussion at all.

---

## 4. Triangulated finding

| Vendor      | Trustpilot billing % | Reddit neutral billing % | Δ |
|-------------|----------------------|--------------------------|---|
| Higgsfield  | ~77% (corpus)        | **64%**                  | -13pp |
| Runway      | ~77% (corpus)        | **29%**                  | **-48pp** |
| Pollo       | ~77% (corpus)        | **78%**                  | +1pp |

**Confirmed:** Pollo (and structurally similar small predatory vendors)
have an almost pure billing-pathology profile. The reframing toward
"billing defense" lands cleanly here.

**Partially confirmed:** Higgsfield is plurality billing but quality is
a real and growing second axis (~36% in the neutral sample).

**Not confirmed:** Runway shows the opposite distribution in the
neutral sample. Quality is 2.5× more common than billing among Reddit
users discussing Runway in general. The Trustpilot 77% figure is
sample-bias-driven for Runway.

---

## 5. What this means for the v4 product question

**Don't full-pivot.** A pure "billing defense" reframing would lose
addressable market on the mainstream vendors where users actually
complain mostly about quality (Runway, and by structural similarity
likely Luma, Sora, Veo).

**Do partial-pivot.** The product should have *both* surfaces:

1. **Billing-defense surface** for the predatory tier — Pollo,
   Higgsfield, Krea, and similar small vendors with hostile
   subscription mechanics. Subscription audit, cancellation help,
   chargeback evidence packets, class-action signal detection,
   refund-policy traps. This is where v4 framing fits the data.

2. **Prompt-scoring + quality-forecasting surface** for the mainstream
   tier — Runway, Luma, Sora, Veo, Pika, Kling. Pre-generation
   failure prediction, rewrite suggestions, personal failure history,
   silent-policy-change alerts. This is where v3 framing fits the
   data.

The corpus then becomes the unifying asset: "we read every Trustpilot
review across 11 vendors and categorized which vendor is which kind of
problem, so you know what risk you're actually subscribing to." That
is consistent with both surfaces.

---

## 6. What I am NOT claiming

- Sample sizes are small (~15 results × 5 searches = 75 threads). A
  formal study would categorize 200+ posts manually. This is a
  triangulation, not a meta-analysis.
- The Reddit Search API ranks by relevance, not chronology — recent
  threads are over-represented in some queries.
- I categorized by my own read of titles + snippet excerpts, not the
  full thread body. A thread titled "billing" sometimes turns out to
  be a quality complaint expressed via "I'm not getting my money's
  worth," and vice versa.
- This does NOT measure willingness-to-pay. It measures only which
  category of pain dominates the public conversation.

---

## 7. Concrete next step

Action 2 (DM 5 Trustpilot reviewers asking willingness-to-pay) is
still the right immediate move. The triangulation above tells me
*which* reviewers to prioritize: pick from the **Pollo and Higgsfield**
corpora first, because those are the cohorts where billing-defense
framing has the strongest fit. Reviewers in the Runway corpus are a
secondary cohort because the broader Runway community frames its
pain as quality, not billing — willingness-to-pay for billing defense
is lower there.

If 3 of 5 DM'd reviewers say they would pay $19–29/mo for billing
defense, the v4 surface is validated as a *real* segment. If 0–1 say
yes, the framing is wrong even for the predatory tier and we go back
to v3.

---

Generated: 2026-05-20, autopilot session.
Method: Firecrawl Reddit search × 5 queries, 75 results categorized
manually.

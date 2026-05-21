import type { Metadata } from 'next';
import Link from 'next/link';
import LeadCaptureForm from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'AVA Affiliate Program — 30% Recurring Commission on AVA Pro Signups',
  description: 'Join the AVA affiliate program. 30% recurring commission on AVA Pro ($19/mo) signups for 24 months. Designed for AI video creators, failure-documentation educators, and tooling reviewers.',
  alternates: { canonical: 'https://www.aivideoauditor.com/affiliate-program' },
  openGraph: {
    title: 'AVA Affiliate Program — 30% Recurring Commission',
    description: 'AI video creator? Earn 30% recurring on every AVA Pro signup you refer, for 24 months. Apply now.',
    type: 'website',
  },
};

export default function AffiliateProgramPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <nav className="text-xs font-mono text-ink-muted mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-ink-secondary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink-primary">Affiliate Program</span>
        </nav>

        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Affiliate Program · Pre-launch waitlist open
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink-primary mb-4 leading-tight tracking-tight">
            Earn 30% recurring on every AVA Pro signup you refer
          </h1>
          <p className="text-ink-secondary text-lg leading-relaxed mb-4">
            AVA Pro is $19/month. You earn $5.70/month per active referred subscriber, recurring for
            24 months. Average lifetime value to affiliate: $80-120 per signup.
          </p>
          <p className="text-ink-muted text-sm">
            Stripe-LIVE is shipping this week. Apply now to lock in pre-launch tier rates and get your
            referral code ready before the official launch.
          </p>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          <div className="bg-elevated border border-border rounded-xl p-5">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Commission</p>
            <p className="text-3xl font-bold text-neon-green">30%</p>
            <p className="text-xs text-ink-muted">on every AVA Pro signup</p>
          </div>
          <div className="bg-elevated border border-border rounded-xl p-5">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Duration</p>
            <p className="text-3xl font-bold text-ink-primary">24mo</p>
            <p className="text-xs text-ink-muted">recurring per subscriber</p>
          </div>
          <div className="bg-elevated border border-border rounded-xl p-5">
            <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Avg LTV</p>
            <p className="text-3xl font-bold text-neon-green">$100</p>
            <p className="text-xs text-ink-muted">to affiliate per signup</p>
          </div>
        </div>

        {/* Who this is for */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">Who this is for</h2>
          <p className="text-ink-secondary leading-relaxed mb-5">
            The affiliate program works best for people who already have an audience overlapping with
            AVA&apos;s user base. We&apos;re selective about approvals — quality of referrals matters more
            than volume, and we want long-term partners rather than one-time link drops.
          </p>
          <ul className="space-y-3 text-sm text-ink-secondary">
            <li>
              <strong className="text-ink-primary">AI video creators</strong> on YouTube, TikTok, Instagram, X
              (1k+ followers in the AI/creative niche). You reference AVA in workflow videos or in posts about
              failed generations.
            </li>
            <li>
              <strong className="text-ink-primary">AI tool reviewers + comparison content publishers</strong>.
              You publish &ldquo;best AI video tool&rdquo; rankings or comparison articles. You can include AVA
              as the &ldquo;hidden saver&rdquo; in the workflow.
            </li>
            <li>
              <strong className="text-ink-primary">Refund-recovery educators</strong> — people who run paid
              communities or courses on AI workflow optimization, cost reduction, or commercial AI video work.
            </li>
            <li>
              <strong className="text-ink-primary">Newsletter operators</strong> in AI / creative / tooling
              with 500+ engaged subscribers. AVA fits as one of your &ldquo;here&apos;s a useful tool&rdquo;
              recommendations.
            </li>
            <li>
              <strong className="text-ink-primary">Production agencies + studios</strong> who can integrate
              AVA into client workflows + earn commission on team-tier signups.
            </li>
          </ul>
        </section>

        {/* What you get */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">What you get on approval</h2>
          <div className="space-y-3">
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">1</p>
              <p className="font-bold text-ink-primary mb-1">Personalised referral link</p>
              <p className="text-ink-secondary text-sm">aivideoauditor.com/?ref=YOUR-CODE — tracks 30-day cookie window.</p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">2</p>
              <p className="font-bold text-ink-primary mb-1">Pre-launch 30% commission rate lock-in</p>
              <p className="text-ink-secondary text-sm">Public rate post-launch will be 25%. Pre-launch affiliates get 30% locked for 24 months on every signup.</p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">3</p>
              <p className="font-bold text-ink-primary mb-1">Asset pack — copy, screenshots, video clips</p>
              <p className="text-ink-secondary text-sm">Pre-written tweet threads, Reddit comment templates, YouTube b-roll, IG carousel slides. All optional — use as much or as little as fits your voice.</p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">4</p>
              <p className="font-bold text-ink-primary mb-1">Real-time affiliate dashboard</p>
              <p className="text-ink-secondary text-sm">Click-through, signup, and active-subscriber counts. Monthly payouts via Stripe Connect (US bank or international).</p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-2">5</p>
              <p className="font-bold text-ink-primary mb-1">Direct line to Joe (founder)</p>
              <p className="text-ink-secondary text-sm">Top 10 affiliates get a private Slack channel. Roadmap input, feature requests, early access to new tools.</p>
            </div>
          </div>
        </section>

        {/* Math */}
        <section className="mb-12 bg-elevated border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold text-ink-primary mb-4">The math, transparently</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-ink-secondary">AVA Pro price</span>
              <span className="font-mono text-ink-primary">$19 / month</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-ink-secondary">Your commission (30%)</span>
              <span className="font-mono text-neon-green">$5.70 / month per active subscriber</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-ink-secondary">Median subscriber lifespan</span>
              <span className="font-mono text-ink-primary">~14 months</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-ink-secondary">Median commission per signup</span>
              <span className="font-mono text-neon-green">$80</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-ink-primary font-bold">If you refer 30 signups/month</span>
              <span className="font-mono text-neon-green font-bold">~$2,400 / month at steady state</span>
            </div>
          </div>
          <p className="text-xs text-ink-muted mt-4 italic">
            Numbers are realistic medians, not best-case. Top affiliates referring 100+ signups/mo are projected
            to clear $8,000+/mo at steady state. Joe will share full historical data with approved affiliates.
          </p>
        </section>

        {/* Anti-spam guardrails */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">What we won&apos;t accept</h2>
          <ul className="space-y-2 text-sm text-ink-secondary ml-4">
            <li>• Spam-style mass posting to Reddit / X / Discord. Reddit + X bans hurt AVA&apos;s brand — refunds your account immediately.</li>
            <li>• Bidding on AVA-branded keywords (Google Ads). We bid on those ourselves; affiliate competition there is forbidden.</li>
            <li>• Promising things AVA doesn&apos;t deliver. AVA helps you document failures and present the strongest possible goodwill-credit request — refund outcomes are always at the platform&apos;s discretion. Affiliate copy that promises &ldquo;guaranteed refunds&rdquo; or specific approval rates is grounds for program removal.</li>
            <li>• Coupon-site syndication. Coupons distort our pricing experiments and we don&apos;t run them.</li>
            <li>• Self-referrals or sock-puppet accounts. Tracked and refunded.</li>
            <li>• Mass-emailing un-opted-in lists.</li>
          </ul>
        </section>

        {/* Apply */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">Apply to the program</h2>
          <p className="text-ink-secondary text-sm leading-relaxed mb-5">
            Drop your email. We&apos;ll send the affiliate-application form within 24h — it asks for your
            distribution channels, content style, and approximate audience size. Approvals typically run
            48 hours for established creators, 5-7 days for newer accounts.
          </p>
          <LeadCaptureForm
            source="affiliate-program"
            heading="Get the affiliate application within 24h"
            blurb="One email when we send the application + one followup if you don't respond within 7 days. No marketing spam."
            cta="Send me the application →"
          />
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-ink-primary mb-4">FAQ</h2>
          <div className="space-y-4">
            <div className="bg-elevated border border-border rounded-xl p-5">
              <h3 className="text-ink-primary font-semibold text-sm mb-2">When does the program go live?</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                The application opens immediately. Commission accrual starts the day AVA Pro Stripe-LIVE flips
                — expected within 7-14 days. Pre-launch applicants get their referral links pre-provisioned so
                you can start sharing content the moment we go live.
              </p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <h3 className="text-ink-primary font-semibold text-sm mb-2">What about Business-tier signups ($79/mo)?</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Same 30% rate. That&apos;s $23.70/month per active Business subscriber, $300+ median lifetime
                commission per Business signup. Agency-network affiliates typically do better on Business than Pro.
              </p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <h3 className="text-ink-primary font-semibold text-sm mb-2">When do I get paid?</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Monthly. 30-day refund-clawback window (commissions pay out 30 days after the signup to cover
                trial cancellations). Stripe Connect handles US + international payouts. Net-30 standard.
              </p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <h3 className="text-ink-primary font-semibold text-sm mb-2">Can I run paid traffic to AVA via my referral link?</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Yes, except on AVA-branded keywords (which we reserve for our own ads). You can run paid social,
                YouTube pre-roll, sponsored newsletter slots, etc. The 30% commission has to cover your CAC — at
                a $100 median LTV, paid traffic works for affiliates running &lt;$30 CPA campaigns.
              </p>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5">
              <h3 className="text-ink-primary font-semibold text-sm mb-2">What if I&apos;m an agency with team members?</h3>
              <p className="text-ink-secondary text-sm leading-relaxed">
                Separate program for resellers. Email{' '}
                <a href="mailto:joe@aivideoauditor.com" className="text-neon-purple hover:underline">
                  joe@aivideoauditor.com
                </a>
                {' '}— resellers get bulk pricing, team accounts, and higher commission tiers on Business-tier signups.
              </p>
            </div>
          </div>
        </section>

        {/* Closing pitch */}
        <div className="bg-surface border border-neon-green/20 rounded-2xl p-8 text-center">
          <p className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase mb-3">
            Pre-launch tier closing
          </p>
          <h2 className="text-2xl font-bold text-ink-primary mb-3">
            30% commission locks in for pre-launch applicants
          </h2>
          <p className="text-ink-secondary text-sm mb-2 max-w-md mx-auto">
            Post-launch rate will be 25%. Pre-launch affiliates get 30% locked for 24 months.
          </p>
          <p className="text-ink-muted text-xs mb-6">
            Apply above. We&apos;ll respond within 24h with the full application.
          </p>
        </div>

      </div>
    </main>
  );
}

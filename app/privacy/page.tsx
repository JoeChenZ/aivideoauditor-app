import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AIVideoAuditor handles your data — transparently and locally.',
  alternates: { canonical: 'https://www.aivideoauditor.com/privacy' },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'May 9, 2026';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <p className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-ink-primary mb-3 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-ink-muted text-sm font-mono mb-12">
          Last updated: {LAST_UPDATED} · Applies to the AIVideoAuditor Chrome Extension and aivideoauditor.com
        </p>

        <div className="space-y-12 text-ink-secondary leading-relaxed">

          {/* 1 — Single Purpose */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">1. Single Purpose</h2>
            <p>
              AIVideoAuditor (&ldquo;AVA&rdquo;, &ldquo;the Extension&rdquo;) exists for one purpose: to help
              you document technical failures in AI-generated videos on{' '}
              <strong className="text-ink-primary">app.runwayml.com</strong> so you can
              request credit refunds from the platform. The Extension does not monitor general
              browsing, track user behaviour across sites, or serve any advertising function.
            </p>
          </section>

          {/* 2 — Data We Collect */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">2. Data We Collect — and Why</h2>
            <p className="mb-6">
              AVA collects the minimum data required to build a refund documentation report.
              All collection is triggered by explicit user action or scoped strictly to the
              Runway domain.
            </p>

            <div className="space-y-5">

              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="font-mono font-bold text-ink-primary text-sm mb-2">
                  Generation Metadata
                </h3>
                <p className="text-sm">
                  When you use Runway&rsquo;s generation interface, AVA passively reads the
                  <strong className="text-ink-primary"> Generation ID</strong>,{' '}
                  <strong className="text-ink-primary">Share / Asset ID</strong>, and{' '}
                  <strong className="text-ink-primary">timestamp</strong> from Runway&rsquo;s
                  own API responses (URLs matching <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">app.runwayml.com/api/*</code>).
                  This data is needed to identify your specific generation in a refund request.
                  No data is sent to AVA servers at this stage.
                </p>
              </div>

              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="font-mono font-bold text-ink-primary text-sm mb-2">
                  Visual Evidence — Screen Capture
                </h3>
                <p className="text-sm">
                  AVA uses Chrome&rsquo;s <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">chrome.tabs.captureVisibleTab</code> API{' '}
                  <strong className="text-ink-primary">only when you click &ldquo;Mark Failure&rdquo;</strong> on
                  a specific video frame. The screenshot is immediately cropped to the video
                  element bounds and stored in memory for the current session. It is included
                  in your audit report only if you choose to generate one. The screenshot is
                  never uploaded to our servers automatically.
                </p>
              </div>

              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="font-mono font-bold text-ink-primary text-sm mb-2">
                  Prompts
                </h3>
                <p className="text-sm">
                  If your prompt text is visible in Runway&rsquo;s interface at the time of
                  marking a failure, AVA may read and include it in your audit report for
                  context. It is stored locally in{' '}
                  <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">chrome.storage.local</code> only.
                </p>
              </div>

              <div className="bg-elevated border border-border rounded-xl p-5">
                <h3 className="font-mono font-bold text-ink-primary text-sm mb-2">
                  Authentication Token (Pro users)
                </h3>
                <p className="text-sm">
                  Pro users authenticate via the AIVideoAuditor website. A session token is
                  stored locally using <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">chrome.storage.local</code>{' '}
                  with AES-GCM encryption. This token is used solely to verify Pro status
                  against our API — it is never shared with third parties.
                </p>
              </div>

            </div>
          </section>

          {/* 3 — What We Do NOT Collect */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">3. What We Do Not Collect</h2>
            <p className="mb-4">The following data is never collected, stored, or transmitted by AVA:</p>
            <ul className="space-y-2">
              {[
                'Email addresses, passwords, or account credentials',
                'Payment information or financial data',
                'Browsing history outside of app.runwayml.com',
                'Cookies or session data from any website other than our own',
                'Biometric data, location, or device identifiers',
                'Content from tabs other than the active Runway tab when Mark Failure is clicked',
                'Keystrokes or clipboard contents',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="text-neon-green mt-0.5 shrink-0 font-bold">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 4 — Principle of Least Privilege */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">4. Principle of Least Privilege</h2>
            <p className="mb-4">
              AVA requests only the permissions required for its stated function:
            </p>
            <div className="space-y-3">
              {[
                {
                  perm: 'Host permission: app.runwayml.com',
                  reason: 'Required to inject the panel UI and intercept generation metadata. The Extension does not activate on, read from, or communicate with any other domain.',
                },
                {
                  perm: 'tabs / activeTab',
                  reason: 'Required solely to call captureVisibleTab when you click Mark Failure. The Extension does not query tab URLs, titles, or content passively.',
                },
                {
                  perm: 'scripting',
                  reason: 'Required to inject the content script into app.runwayml.com pages. Scripts run only on the declared Runway URL pattern.',
                },
                {
                  perm: 'storage',
                  reason: 'Required to persist your audit reports and (for Pro users) the encrypted session token between browser sessions.',
                },
                {
                  perm: 'clipboardWrite',
                  reason: 'Required to copy the generated refund letter to your clipboard when you click "Copy Refund Letter". No clipboard data is read.',
                },
              ].map((row) => (
                <div key={row.perm} className="bg-elevated border border-border rounded-xl p-4">
                  <p className="font-mono text-xs font-bold text-neon-purple mb-1">{row.perm}</p>
                  <p className="text-sm">{row.reason}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              The Extension does not listen to network traffic, tabs, or activity outside of{' '}
              <strong className="text-ink-primary">app.runwayml.com</strong>. No background
              polling or idle monitoring occurs.
            </p>
          </section>

          {/* 5 — Data Storage & Retention */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">5. Data Storage &amp; Retention</h2>
            <p className="mb-3">
              All data collected by AVA is stored in{' '}
              <code className="font-mono text-xs bg-surface px-1 py-0.5 rounded">chrome.storage.local</code>{' '}
              on your device. It does not leave your browser unless you take one of the
              following explicit actions:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-neon-amber mt-0.5 shrink-0">→</span>
                <span><strong className="text-ink-primary">Download PDF Report</strong> — generates a PDF file saved to your local Downloads folder. No server upload.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-amber mt-0.5 shrink-0">→</span>
                <span><strong className="text-ink-primary">Copy Refund Letter</strong> — copies text to your clipboard. No server upload.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-amber mt-0.5 shrink-0">→</span>
                <span><strong className="text-ink-primary">Pro cloud sync</strong> (if enabled) — audit metadata (not screenshots) is synced to your Pro account. You can delete this data at any time from your dashboard.</span>
              </li>
            </ul>
            <p className="mt-4 text-sm">
              Local storage is cleared when you uninstall the Extension or manually clear
              extension data from Chrome settings.
            </p>
          </section>

          {/* 6 — Third-Party Services */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">6. Third-Party Services</h2>
            <p className="mb-4">AVA uses the following third-party services in limited, scoped ways:</p>
            <div className="space-y-3">
              {[
                { name: 'Supabase', use: 'Authentication and Pro account data storage. Only accessed when you log in to a Pro account. Data is processed under Supabase\'s privacy policy.' },
                { name: 'Vercel', use: 'Hosts the AIVideoAuditor website and the Pro-status verification API. Standard server access logs apply.' },
              ].map((svc) => (
                <div key={svc.name} className="bg-elevated border border-border rounded-xl p-4">
                  <p className="font-mono text-xs font-bold text-ink-primary mb-1">{svc.name}</p>
                  <p className="text-sm">{svc.use}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              No advertising networks, analytics providers, or data brokers receive any data
              from AVA.
            </p>
          </section>

          {/* 7 — Chrome Web Store Certifications */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">7. Chrome Web Store Certifications</h2>
            <p className="mb-4">
              In accordance with Google&rsquo;s User Data Policy, AIVideoAuditor certifies that:
            </p>
            <div className="space-y-3">
              {[
                { cert: 'We do not sell user data', detail: 'User data collected by AVA is never sold, rented, or traded to any third party for any purpose.' },
                { cert: 'We do not use data for unrelated purposes', detail: 'All data processed by AVA is used exclusively to generate refund documentation for the user\'s own Runway ML generations. It is not used for advertising, profiling, or any purpose unrelated to the Extension\'s stated function.' },
                { cert: 'We do not use data to determine creditworthiness', detail: 'AVA does not use any collected data to assess, determine, or influence creditworthiness or financial standing.' },
              ].map((item) => (
                <div key={item.cert} className="flex gap-4 bg-neon-green/5 border border-neon-green/20 rounded-xl p-5">
                  <span className="text-neon-green font-bold text-lg shrink-0 mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-ink-primary text-sm mb-1">{item.cert}</p>
                    <p className="text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8 — Your Rights */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">8. Your Rights</h2>
            <p className="mb-3">You may at any time:</p>
            <ul className="space-y-2 text-sm">
              {[
                'Delete all locally stored data by uninstalling the Extension or clearing its storage in chrome://extensions',
                'Request deletion of your Pro account data by emailing us at the address below',
                'Export your audit history from the dashboard before deletion',
              ].map((right) => (
                <li key={right} className="flex items-start gap-3">
                  <span className="text-neon-purple mt-0.5 shrink-0">·</span>
                  {right}
                </li>
              ))}
            </ul>
          </section>

          {/* 9 — Children */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">9. Children&rsquo;s Privacy</h2>
            <p className="text-sm">
              AVA is not directed at children under 13. We do not knowingly collect data from
              children. If you believe a child has provided us with personal data, contact us
              and we will delete it promptly.
            </p>
          </section>

          {/* 10 — Changes */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">10. Changes to This Policy</h2>
            <p className="text-sm">
              We may update this policy as the Extension evolves. Material changes will be
              noted with an updated &ldquo;Last updated&rdquo; date at the top of this page.
              Continued use of the Extension after changes constitutes acceptance of the
              revised policy.
            </p>
          </section>

          {/* 11 — Contact */}
          <section>
            <h2 className="text-xl font-bold text-ink-primary mb-3">11. Contact</h2>
            <p className="text-sm">
              Questions about this policy or data deletion requests:{' '}
              <a
                href="mailto:joejoego23@gmail.com"
                className="text-neon-purple hover:underline font-mono"
              >
                joejoego23@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}

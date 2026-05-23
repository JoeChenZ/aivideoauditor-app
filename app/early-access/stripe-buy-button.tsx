export default function StripeBuyButton({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-neon-green/15 hover:bg-neon-green/25 border border-neon-green/40 text-neon-green font-mono font-semibold text-sm tracking-wide uppercase px-8 py-3.5 rounded-md transition-colors"
    >
      Pay $50 with Stripe →
    </a>
  );
}

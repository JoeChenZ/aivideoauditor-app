export default function FAQ() {
  const faqs = [
    {
      q: 'How long does it take?',
      a: '2-3 business days from photo submission to delivery. Rush 24-hour delivery is available for an additional $30.',
    },
    {
      q: 'What is the revision policy?',
      a: 'One free revision is included with every order. Request it within 7 days of delivery. Additional revisions are $20 each.',
    },
    {
      q: 'Do I own the videos?',
      a: 'Yes. Once delivered and paid, you own full commercial rights. Use them anywhere: IG, TikTok, your website, paid ads.',
    },
    {
      q: 'What is AI video and what is not?',
      a: 'We generate video motion from your product photo using AI image-to-video tools. The result is a real video clip - not a slideshow or Ken-Burns effect. AI generates the motion; we provide the creative direction and QC.',
    },
    {
      q: 'Will the product look different in the video?',
      a: "That is our core guarantee: it will not. Every clip passes a consistency gate where we scrub start-to-end to catch any product morphing, color shifts, or shape changes. Clips that fail QC are regenerated.",
    },
    {
      q: 'What formats do I get?',
      a: 'Every order includes 9:16 vertical format (IG Reels / TikTok / native). 1:1 square and 16:9 landscape are available as add-ons (+$15).',
    },
    {
      q: 'Is AI-generated video disclosed to platforms?',
      a: 'Yes. We recommend adding "AI-assisted" in your caption for transparency. Most platforms currently allow AI-generated video in organic posts.',
    },
    {
      q: 'What makes a good product photo to submit?',
      a: 'Clean background (white or solid), good lighting, product clearly in frame. We can work with lifestyle shots too - just let us know the style in your order.',
    },
    {
      q: 'Can I see examples before ordering?',
      a: 'Yes. Visit the Samples page to see before-and-after pairs from real client work.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We send a secure Stripe link after reviewing your order. You pay once we confirm the order details. All major cards accepted.',
    },
    {
      q: 'How do I contact you or ask a question?',
      a: 'Email us at contact@aivideoauditor.com — we reply within one business day.',
    },
  ];

  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-white mb-16">Questions, answered.</h1>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group border-b border-zinc-800 pb-4"
            >
              <summary className="cursor-pointer flex items-center justify-between text-white font-medium py-2 list-none">
                {faq.q}
                <span className="text-zinc-500 group-open:text-blue-500 transition-colors text-lg leading-none ml-4 flex-shrink-0">+</span>
              </summary>
              <p className="text-zinc-400 leading-relaxed mt-3 pr-8">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 flex gap-4">
          <a
            href="/samples"
            className="inline-flex items-center justify-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            View Samples
          </a>
          <a
            href="/order"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Order Now
          </a>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';

const PRICES = {
  quantity: { '1': 59, '3': 149, '5': 229 },
  rush: 30,
  formats: 15,
};

type QuantityKey = '1' | '3' | '5';

export default function Order() {
  const [form, setForm] = useState({
    brandName: '',
    productDescription: '',
    style: 'hero',
    quantity: '1' as QuantityKey,
    rush: false,
    extraFormats: false,
    email: '',
    notes: '',
    photo: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const total =
    PRICES.quantity[form.quantity] +
    (form.rush ? PRICES.rush : 0) +
    (form.extraFormats ? PRICES.formats : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: form.brandName,
          productDescription: form.productDescription,
          style: form.style,
          quantity: form.quantity,
          rush: form.rush,
          extraFormats: form.extraFormats,
          email: form.email,
          notes: form.notes,
          total,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen pt-16 flex items-center">
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
          <div className="text-5xl mb-6">+</div>
          <h1 className="text-3xl font-bold text-white mb-4">Order received.</h1>
          <p className="text-zinc-300 leading-relaxed">
            We will reach out to {form.email} within 24 hours with your secure payment link and next steps.
          </p>
        </div>
      </main>
    );
  }

  const inputClass = 'bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 w-full transition-colors';
  const labelClass = 'text-sm text-zinc-300 font-medium mb-1 block';

  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] gap-16">
          {/* Left sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h1 className="text-4xl font-bold text-white mb-8">Order a Video</h1>
            <div className="space-y-6">
              {[
                { title: '2-3 day turnaround', desc: 'Rush 24h available for +$30' },
                { title: '1 free revision included', desc: 'Request within 7 days of delivery' },
                { title: 'Product consistency guarantee', desc: 'Every clip passes our QC gate before delivery' },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-blue-600 pl-4">
                  <div className="text-white font-medium text-sm">{item.title}</div>
                  <div className="text-zinc-500 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-zinc-900 rounded-xl p-6">
              <div className="text-zinc-400 text-sm mb-1">Estimated total</div>
              <div className="text-4xl font-bold text-white">${total}</div>
              <div className="text-zinc-500 text-xs mt-2">You will not be charged yet. We send a secure payment link after reviewing your order.</div>
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="brandName">Brand name</label>
              <input
                id="brandName"
                type="text"
                required
                className={inputClass}
                value={form.brandName}
                onChange={(e) => setForm({ ...form, brandName: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="productDescription">Product description</label>
              <textarea
                id="productDescription"
                rows={3}
                required
                className={inputClass}
                placeholder="What is the product, what makes it special?"
                value={form.productDescription}
                onChange={(e) => setForm({ ...form, productDescription: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="style">Style preference</label>
              <select
                id="style"
                className={inputClass}
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value })}
              >
                <option value="hero">Hero product motion</option>
                <option value="lifestyle">On-model lifestyle</option>
                <option value="flatlay">Minimal flatlay motion</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Quantity</label>
              <div className="grid grid-cols-3 gap-3">
                {([['1', '$59', '1 video'], ['3', '$149', '3-video project'], ['5', '$229', '5-video project']] as [QuantityKey, string, string][]).map(([val, price, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, quantity: val })}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      form.quantity === val
                        ? 'border-blue-500 bg-blue-600/10 text-white'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-lg font-bold">{price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={form.rush}
                  onChange={(e) => setForm({ ...form, rush: e.target.checked })}
                />
                <span className="text-zinc-300 text-sm">Rush delivery - 24h turnaround (+$30)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={form.extraFormats}
                  onChange={(e) => setForm({ ...form, extraFormats: e.target.checked })}
                />
                <span className="text-zinc-300 text-sm">Extra aspect ratios 1:1 and 16:9 (+$15)</span>
              </label>
            </div>

            <div>
              <label className={labelClass} htmlFor="email">Your email</label>
              <input
                id="email"
                type="email"
                required
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="notes">Additional notes (optional)</label>
              <textarea
                id="notes"
                rows={3}
                className={inputClass}
                placeholder="Any specific requests, inspiration references, or brand guidelines?"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="photo">Product photo</label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                required
                className="w-full text-zinc-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer cursor-pointer"
                onChange={(e) => setForm({ ...form, photo: e.target.files?.[0] ?? null })}
              />
              <p className="text-zinc-600 text-xs mt-1">Clean background preferred. JPG, PNG, or WEBP.</p>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-4 rounded-full transition-colors text-lg"
            >
              {submitting ? 'Submitting...' : `Submit Order - $${total}`}
            </button>

            <p className="text-zinc-500 text-xs text-center">
              You will not be charged yet. After we review your order, we will send a secure payment link via email.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

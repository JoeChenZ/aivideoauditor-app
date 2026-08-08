'use client';

// Posters are self-hosted at /wall/<id>.jpg (public/wall/).
// Videos are proxied via /api/wall/[id] to bypass CDN hotlink blocking.

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import galleryData from '@/data/prompt-gallery.json';

type GalleryItem = {
  id: string;
  title: string;
  model: string;
  prompt: string;
  videoUrl: string;
  thumbnailUrl: string | null;
  creator: string;
  sourceUrl: string;
  tags: string[];
  embeddable: boolean;
  embedMethod: string;
};

const items = galleryData as GalleryItem[];

const ALL_TAGS = Array.from(new Set(items.flatMap((i) => i.tags))).sort();

// Derive distinct model names sorted alphabetically
const ALL_MODELS = Array.from(new Set(items.map((i) => i.model))).sort();

const MODEL_BADGE_STYLES: Record<string, string> = {
  'Runway Gen-3 Alpha': 'bg-blue-600/20 border-blue-500/40 text-blue-300',
  'OpenAI Sora': 'bg-zinc-700/60 border-zinc-600/40 text-zinc-300',
  'Luma Dream Machine': 'bg-purple-600/20 border-purple-500/40 text-purple-300',
  'Kling AI': 'bg-orange-600/20 border-orange-500/40 text-orange-300',
  'Pika': 'bg-pink-600/20 border-pink-500/40 text-pink-300',
  'Google Veo 2': 'bg-green-600/20 border-green-500/40 text-green-300',
  'Google Veo 3': 'bg-teal-600/20 border-teal-500/40 text-teal-300',
  'Higgsfield AI': 'bg-yellow-600/20 border-yellow-500/40 text-yellow-300',
  'MiniMax Hailuo': 'bg-cyan-600/20 border-cyan-500/40 text-cyan-300',
  'ByteDance Seedance': 'bg-red-600/20 border-red-500/40 text-red-300',
};

function modelBadge(model: string) {
  const style = MODEL_BADGE_STYLES[model] ?? 'bg-zinc-700/60 border-zinc-600/40 text-zinc-300';
  // Use a shortened label for display
  const label = model.replace('Gen-3 Alpha', '').replace('Dream Machine', '').replace(' AI', '').trim();
  return (
    <span className={`inline-flex items-center gap-1 border text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${style}`}>
      {label}
    </span>
  );
}

function PlaceholderTile({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-800 to-zinc-900 p-4">
      <div className="w-8 h-8 mb-3 rounded-full bg-zinc-700 flex items-center justify-center">
        <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      </div>
      <span className="text-zinc-400 text-xs text-center font-medium leading-snug">{title}</span>
    </div>
  );
}

function VideoTile({
  item,
  isSelected,
  onSelect,
  onHover,
}: {
  item: GalleryItem;
  isSelected: boolean;
  onSelect: (item: GalleryItem) => void;
  onHover: (item: GalleryItem | null) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: only initialize when tile enters viewport
  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on selection
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isSelected) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [isSelected]);

  return (
    <div
      ref={tileRef}
      onClick={() => onSelect(item)}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      className={`relative aspect-video bg-zinc-900 rounded-lg overflow-hidden cursor-pointer group transition-all duration-200 ${
        isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-950'
          : 'hover:ring-1 hover:ring-zinc-500 hover:ring-offset-1 hover:ring-offset-zinc-950'
      }`}
    >
      <img
        src={`/wall/${item.id}.jpg`}
        alt={item.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isSelected ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
        }`}
        loading="lazy"
      />

      <video
        ref={videoRef}
        src={`/api/wall/${item.id}`}
        poster={`/wall/${item.id}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay on hover/selection */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent transition-opacity duration-200 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />

      {/* Bottom meta */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-200 ${
          isSelected ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
        }`}
      >
        <p className="text-white text-xs font-medium truncate mb-1">{item.title}</p>
        {modelBadge(item.model)}
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
      )}
    </div>
  );
}

function PromptPanel({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(item.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Close button (mobile only) */}
      {onClose && (
        <div className="flex items-center justify-between mb-4">
          <span className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">Prompt</span>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Video preview */}
      <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-5 flex-shrink-0">
        <img
          src={`/wall/${item.id}.jpg`}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <video
          key={item.id}
          src={`/api/wall/${item.id}`}
          poster={`/wall/${item.id}.jpg`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Title + badges */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h2 className="text-white font-semibold text-lg leading-snug">{item.title}</h2>
        {modelBadge(item.model)}
      </div>

      {/* Prompt text */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-2">Prompt</div>
        <p className="text-zinc-300 text-sm leading-relaxed font-mono bg-zinc-900 rounded-lg p-4 border border-zinc-800 whitespace-pre-wrap">
          {item.prompt}
        </p>
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span key={tag} className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-full capitalize">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Creator + source */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-zinc-500">
          by{' '}
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline underline-offset-2 transition-colors"
          >
            {item.creator}
          </a>
        </span>
        <a
          href={item.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white text-xs transition-colors flex items-center gap-1"
        >
          Source
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Copy button */}
      <button
        onClick={copyPrompt}
        className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
          copied
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 hover:bg-blue-500 text-white'
        }`}
      >
        {copied ? 'Copied!' : 'Copy Prompt'}
      </button>
    </div>
  );
}

export default function WallPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem>(items[0]);
  const [hoveredItem, setHoveredItem] = useState<GalleryItem | null>(null);
  const [modelFilter, setModelFilter] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeItem = hoveredItem ?? selectedItem;

  const filtered = items.filter((item) => {
    const modelMatch = modelFilter === 'all' || item.model === modelFilter;
    const tagMatch = activeTag === null || item.tags.includes(activeTag);
    return modelMatch && tagMatch;
  });

  const handleSelect = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
    setSheetOpen(true);
  }, []);

  const handleHover = useCallback((item: GalleryItem | null) => {
    setHoveredItem(item);
  }, []);

  return (
    <main className="bg-zinc-950 text-white min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3">
          Creators Wall
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          The best AI videos on the internet — and the exact prompts behind them.
          Curated from Sora, Runway, Luma, Kling, Pika, Veo 2&amp;3, Higgsfield, Hailuo, Seedance, and more.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-wrap gap-3">
        {/* Model tabs — data-driven from gallery JSON */}
        <div className="flex flex-wrap bg-zinc-900 rounded-full p-1 gap-0.5">
          {(['all', ...ALL_MODELS]).map((f) => (
            <button
              key={f}
              onClick={() => setModelFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                modelFilter === f
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>

        {/* Tag chips */}
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                activeTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout — two columns on desktop */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-8 items-start">
          {/* LEFT: scrollable tile grid (~62%) */}
          <div className="flex-[1.65] min-w-0">
            {filtered.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                No videos match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filtered.map((item) => (
                  <VideoTile
                    key={item.id}
                    item={item}
                    isSelected={selectedItem.id === item.id}
                    onSelect={handleSelect}
                    onHover={handleHover}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: sticky prompt panel (~38%) — desktop only */}
          <div className="hidden lg:block flex-1 sticky top-20 max-h-[calc(100vh-6rem)] overflow-hidden">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-semibold mb-5 hidden lg:block">
                Director's Notes
              </div>
              <PromptPanel item={activeItem} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {sheetOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSheetOpen(false);
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 rounded-t-2xl p-6 max-h-[85dvh] overflow-y-auto animate-[slideUp_0.25s_ease-out]">
            <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mb-5" />
            <PromptPanel item={selectedItem} onClose={() => setSheetOpen(false)} />
          </div>
        </div>
      )}

      {/* CTA section */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-zinc-400 text-lg mb-3">
            Don&apos;t want to wrestle with prompts?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">
            We&apos;ll make your product video for you.
          </h2>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg"
          >
            Order a Video — from $59
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <p className="text-zinc-500 text-sm mt-4">2–3 day turnaround · 1 free revision · You own the clips</p>
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

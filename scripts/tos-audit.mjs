#!/usr/bin/env node
/**
 * Weekly ToS auto-audit — Phase 0.4b.
 *
 * Fetches the canonical Terms-of-Use page for each AI-video platform AVA supports,
 * diffs against the last cached version stored in `.tos-cache/<slug>.txt`,
 * and exits non-zero if any page shows >5% character-level change.
 *
 * GitHub Action consumes the non-zero exit + uploads `.tos-cache/changes.json`
 * as a workflow artifact, then posts to the alert channel.
 *
 * Local dev:
 *   node scripts/tos-audit.mjs            # uses real network
 *   node scripts/tos-audit.mjs --dry-run  # uses cached fixtures only
 *
 * No external deps — uses Node 20+ built-in fetch + fs.
 */

import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const CACHE_DIR = resolve(REPO_ROOT, '.tos-cache');

const PLATFORMS = [
  { slug: 'runway',   url: 'https://runwayml.com/terms-of-use' },
  { slug: 'luma',     url: 'https://lumalabs.ai/legal/tos' },
  { slug: 'openai',   url: 'https://openai.com/policies/terms-of-use' },
  { slug: 'google',   url: 'https://policies.google.com/terms' },
  { slug: 'kling',    url: 'https://klingai.com/terms-of-service' },
  { slug: 'vidu',     url: 'https://www.vidu.studio/terms' },
  { slug: 'pika',     url: 'https://pika.art/terms' },
  { slug: 'hailuo',   url: 'https://hailuoai.com/terms' },
];

const CHANGE_THRESHOLD = 0.05; // 5% character-level diff triggers alert

// Strip cheap noise: scripts, style, whitespace runs, html tags.
function normalize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Character-level Levenshtein-lite: change ratio = |new - old| / max(len)
// Fast, good enough for "alert me if the doc changed materially."
function changeRatio(oldText, newText) {
  if (!oldText) return 1;
  if (oldText === newText) return 0;
  const minLen = Math.min(oldText.length, newText.length);
  const maxLen = Math.max(oldText.length, newText.length);
  let same = 0;
  for (let i = 0; i < minLen; i++) {
    if (oldText[i] === newText[i]) same++;
  }
  return 1 - same / maxLen;
}

async function fetchOne(p) {
  const ctrl = new AbortController();
  const timeout = setTimeout(() => ctrl.abort(), 30_000);
  try {
    // Browser-like headers — a bare bot UA gets 403'd by Cloudflare/WAF on
    // several vendor sites (OpenAI 403'd, and kling/hailuo returned near-empty
    // shells). A realistic UA + Accept headers gets the real ToS HTML.
    const res = await fetch(p.url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    if (!res.ok) {
      return { ok: false, status: res.status, error: `HTTP ${res.status}` };
    }
    const html = await res.text();
    return { ok: true, status: 200, text: normalize(html) };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function loadCache(slug) {
  const path = resolve(CACHE_DIR, `${slug}.txt`);
  if (!existsSync(path)) return null;
  return await readFile(path, 'utf8');
}

async function saveCache(slug, text) {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(resolve(CACHE_DIR, `${slug}.txt`), text);
}

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  const dryRun = process.argv.includes('--dry-run');
  const results = [];

  for (const p of PLATFORMS) {
    const previous = await loadCache(p.slug);
    let current;
    if (dryRun && previous) {
      current = { ok: true, status: 200, text: previous };
    } else {
      current = await fetchOne(p);
    }

    if (!current.ok) {
      results.push({
        slug: p.slug,
        url: p.url,
        status: 'FETCH_FAILED',
        error: current.error,
        ratio: null,
      });
      continue;
    }

    const ratio = changeRatio(previous, current.text);
    const isFirstFetch = previous === null;
    const changed = ratio > CHANGE_THRESHOLD;

    results.push({
      slug: p.slug,
      url: p.url,
      status: isFirstFetch ? 'BASELINE' : changed ? 'CHANGED' : 'STABLE',
      ratio: Number(ratio.toFixed(4)),
      oldLen: previous?.length ?? 0,
      newLen: current.text.length,
    });

    // Always update cache on a successful fetch so next run compares against latest.
    await saveCache(p.slug, current.text);
  }

  // A genuine ToS CHANGE and a FETCH_FAILED are different severities:
  //   - changed: a vendor's terms materially moved → red alert, inspect now.
  //   - fetchFailed: we couldn't read the page (e.g. Cloudflare 403) → the
  //     monitor is blind, but the terms did NOT necessarily change. Surfacing
  //     this as the same red "material change" alert spammed false failures.
  const changed = results.filter((r) => r.status === 'CHANGED');
  const fetchFailed = results.filter((r) => r.status === 'FETCH_FAILED');

  // Emit summary JSON for the GitHub Action to consume.
  const summary = {
    runAt: new Date().toISOString(),
    threshold: CHANGE_THRESHOLD,
    results,
    changed: changed.map((r) => r.slug),
    fetchFailed: fetchFailed.map((r) => r.slug),
    // `alert` (red CI + email) is reserved for a REAL material change.
    alert: changed.length > 0,
  };
  const summaryPath = resolve(CACHE_DIR, 'changes.json');
  await writeFile(summaryPath, JSON.stringify(summary, null, 2));

  // Pretty stdout for humans + CI logs.
  console.log('\nAVA ToS Audit —', summary.runAt);
  console.log('Threshold:', `${(CHANGE_THRESHOLD * 100).toFixed(1)}%`);
  console.log('');
  for (const r of results) {
    const tag =
      r.status === 'STABLE' ? '✓' :
      r.status === 'CHANGED' ? '⚠' :
      r.status === 'BASELINE' ? '◯' : '✗';
    const ratio = r.ratio !== null ? `${(r.ratio * 100).toFixed(2)}%` : '—';
    console.log(`${tag} ${r.slug.padEnd(8)} ${r.status.padEnd(13)} ${ratio.padStart(7)}  ${r.url}`);
    if (r.error) console.log(`  ↳ ${r.error}`);
  }
  console.log('');
  console.log('Summary written:', summaryPath);

  if (fetchFailed.length) {
    // Warning only — does NOT fail the run. GitHub surfaces ::warning:: without
    // the red failure email; the artifact records which monitors were blind.
    console.log(`\n::warning::ToS audit could not fetch: ${summary.fetchFailed.join(', ')} (monitor blind, not a change).`);
  }
  if (summary.alert) {
    console.log(`\nALERT: ToS changed materially: ${summary.changed.join(', ')}. Inspect now.`);
    process.exitCode = 1;
  } else {
    console.log('\nNo material ToS changes.');
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(2);
});

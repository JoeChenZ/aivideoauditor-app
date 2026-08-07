import { NextRequest, NextResponse } from 'next/server';
import galleryData from '@/data/prompt-gallery.json';

type GalleryItem = { id: string; videoUrl: string };
const items = galleryData as GalleryItem[];
const videoMap: Record<string, string> = Object.fromEntries(
  items.map((x) => [x.id, x.videoUrl])
);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const upstream = videoMap[id];
  if (!upstream) {
    return new NextResponse('Not found', { status: 404 });
  }

  const rangeHeader = req.headers.get('range');
  const upstreamHeaders: HeadersInit = {
    'User-Agent': 'Mozilla/5.0 (compatible; AVA/1.0)',
    'Referer': 'https://runwayml.com/',
  };
  if (rangeHeader) {
    upstreamHeaders['Range'] = rangeHeader;
  }

  const upstream_res = await fetch(upstream, {
    headers: upstreamHeaders,
    cache: 'no-store',
  });

  if (!upstream_res.ok && upstream_res.status !== 206) {
    return new NextResponse('Upstream error', { status: 502 });
  }

  const headers = new Headers();
  headers.set('Content-Type', upstream_res.headers.get('Content-Type') ?? 'video/mp4');
  const cl = upstream_res.headers.get('Content-Length');
  if (cl) headers.set('Content-Length', cl);
  const cr = upstream_res.headers.get('Content-Range');
  if (cr) headers.set('Content-Range', cr);
  const al = upstream_res.headers.get('Accept-Ranges');
  if (al) headers.set('Accept-Ranges', al);
  // Cache aggressively at edge — these videos are static
  headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');

  return new NextResponse(upstream_res.body, {
    status: upstream_res.status,
    headers,
  });
}

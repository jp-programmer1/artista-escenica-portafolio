import type { APIRoute } from 'astro';
import { auth } from '../../service';

export const prerender = false;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

type CachedBlob = {
  body: ArrayBuffer;
  contentType: string;
  etag?: string | null;
  lastModified?: string | null;
  expires: number;
};

const blobCache = new Map<string, CachedBlob>();

export const GET: APIRoute = async ({ params, request }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing file id' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  // If client requests a byte range, proxy it directly without caching
  const range = request.headers.get('range');
  if (range) {
    try {
      const client = await auth.getClient();
      const tokenResult: unknown = await (client as unknown as { getAccessToken?: () => Promise<unknown> }).getAccessToken?.();
      const token = typeof tokenResult === 'string'
        ? tokenResult
        : (typeof tokenResult === 'object' && tokenResult !== null && 'token' in tokenResult
            ? (tokenResult as { token?: string | null }).token ?? null
            : null);

      if (!token) {
        return new Response(JSON.stringify({ error: 'Auth token not available' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500,
        });
      }

      const driveUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`;
      const res = await fetch(driveUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Range: range,
        },
      });

      // Pass-through important headers for streaming
      const contentType = res.headers.get('content-type') || 'application/octet-stream';
      const contentLength = res.headers.get('content-length') || undefined;
      const contentRange = res.headers.get('content-range') || undefined;

      const status = res.status === 206 || contentRange ? 206 : res.status;

      return new Response(res.body, {
        headers: {
          'Content-Type': contentType,
          ...(contentLength ? { 'Content-Length': contentLength } : {}),
          ...(contentRange ? { 'Content-Range': contentRange } : {}),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
        status,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error while streaming file';
      return new Response(JSON.stringify({ error: message }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }

  const now = Date.now();
  const cached = blobCache.get(id);
  if (cached && cached.expires > now) {
    return new Response(cached.body, {
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        ...(cached.etag ? { ETag: cached.etag } : {}),
        ...(cached.lastModified ? { 'Last-Modified': cached.lastModified } : {}),
        'Accept-Ranges': 'bytes',
      },
      status: 200,
    });
  }

  try {
    const client = await auth.getClient();
    const tokenResult: unknown = await (client as unknown as { getAccessToken?: () => Promise<unknown> }).getAccessToken?.();
    const token = typeof tokenResult === 'string'
      ? tokenResult
      : (typeof tokenResult === 'object' && tokenResult !== null && 'token' in tokenResult
          ? (tokenResult as { token?: string | null }).token ?? null
          : null);

    if (!token) {
      return new Response(JSON.stringify({ error: 'Auth token not available' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }

    const driveUrl = `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(id)}?alt=media`;
    const res = await fetch(driveUrl, { headers: { Authorization: `Bearer ${token}` } });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return new Response(text || JSON.stringify({ error: 'Failed to fetch file from Drive' }), {
        headers: { 'Content-Type': res.headers.get('content-type') || 'text/plain' },
        status: res.status,
      });
    }

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    const etag = res.headers.get('etag');
    const lastModified = res.headers.get('last-modified');
    const arrayBuffer = await res.arrayBuffer();

    const cacheEntry: CachedBlob = {
      body: arrayBuffer,
      contentType,
      etag,
      lastModified,
      expires: now + CACHE_TTL_MS,
    };
    blobCache.set(id, cacheEntry);

    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        ...(etag ? { ETag: etag } : {}),
        ...(lastModified ? { 'Last-Modified': lastModified } : {}),
      },
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error while fetching file';
    return new Response(JSON.stringify({ error: message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

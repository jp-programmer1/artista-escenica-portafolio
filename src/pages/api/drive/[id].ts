import type { APIRoute } from 'astro';
import { google } from 'googleapis';
import type { drive_v3 } from 'googleapis';
import { auth } from '../service';

export const prerender = false;

const CACHE_TTL_MS = 5 * 60 * 1000;
type DriveFiles = drive_v3.Schema$File[];
const cache = new Map<string, { data: DriveFiles; expires: number }>();

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing folder id' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  const now = Date.now();
  const cached = cache.get(id);
  if (cached && cached.expires > now) {
    return new Response(JSON.stringify(cached.data), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
      status: 200,
    });
  }

  try {
    const drive = google.drive({ version: 'v3', auth });

    const res = await drive.files.list({
      q: `'${id}' in parents and trashed = false`,
      fields: 'files(id,name,mimeType,thumbnailLink)',
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
    });

    const files = (res.data.files ?? []) as DriveFiles;
    cache.set(id, { data: files, expires: now + CACHE_TTL_MS });
    return new Response(JSON.stringify(files), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch from Drive';
    console.error('Drive API error:', err);
    return new Response(JSON.stringify({ error: message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
};

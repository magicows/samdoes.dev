import { NextApiRequest, NextApiResponse } from "next";
import { fetchPages } from "@/components/notion/fetchPages";

function getStringQueryParam(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return undefined;
}

function getIntQueryParam(v: unknown): number | undefined {
  const s = getStringQueryParam(v);
  if (!s) return undefined;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

async function revalidatePaths(
  res: NextApiResponse,
  paths: string[],
  opts: { concurrency: number }
) {
  // basic concurrency limiter to avoid long sequential runs without stampeding
  const concurrency = Math.max(1, Math.floor(opts.concurrency));
  let i = 0;

  async function worker() {
    while (i < paths.length) {
      const idx = i++;
      const path = paths[idx];
      await res.revalidate(path);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, paths.length) }, () =>
    worker()
  );
  await Promise.all(workers);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const slug = getStringQueryParam(req.query.slug);
  const all = getStringQueryParam(req.query.all);
  const limit = getIntQueryParam(req.query.limit) ?? 20;
  const concurrency = getIntQueryParam(req.query.concurrency) ?? 4;

  try {
    const revalidatedPaths: string[] = [];

    // Revalidate the homepage
    await res.revalidate("/");
    revalidatedPaths.push("/");

    // Revalidate the specific blog page by slug
    if (slug) {
      const path = `/blog/${slug}`;
      await res.revalidate(path);
      revalidatedPaths.push(path);
    }

    // Revalidate live blog posts (via Notion)
    // Note: serverless functions can time out if we revalidate too many paths sequentially.
    // Use batching + a reasonable default limit.
    if (all === "1" || all === "true") {
      const pages = await fetchPages();

      const slugs = (pages.results || [])
        .map((post: any) => post?.properties?.Slug?.rich_text?.[0]?.plain_text)
        .filter(Boolean) as string[];

      const uniqueSlugs = Array.from(new Set(slugs)).slice(0, Math.max(0, limit));
      const paths = uniqueSlugs.map((s) => `/blog/${s}`);

      await revalidatePaths(res, paths, { concurrency });
      revalidatedPaths.push(...paths);
    }

    return res.json({ revalidated: true, paths: revalidatedPaths });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error revalidating" });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { fetchPages } from "@/components/notion/fetchPages";

function getStringQueryParam(v: unknown): string | undefined {
  if (typeof v === "string") return v;
  if (Array.isArray(v) && typeof v[0] === "string") return v[0];
  return undefined;
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

    // Revalidate ALL live blog posts (via Notion)
    if (all === "1" || all === "true") {
      const pages = await fetchPages();

      const slugs = (pages.results || [])
        .map((post: any) => post?.properties?.Slug?.rich_text?.[0]?.plain_text)
        .filter(Boolean) as string[];

      for (const s of slugs) {
        const path = `/blog/${s}`;
        await res.revalidate(path);
        revalidatedPaths.push(path);
      }
    }

    return res.json({ revalidated: true, paths: revalidatedPaths });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error revalidating" });
  }
}

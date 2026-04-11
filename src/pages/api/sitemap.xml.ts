import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPages } from '@/components/notion/fetchPages';

function plainText(rt: any[] | undefined): string {
  return (rt || [])
    .map((x: any) => x?.plain_text)
    .filter(Boolean)
    .join('');
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pages = await fetchPages();
    const results = (pages?.results || []) as any[];

    // Static URLs
    const staticUrls = [
      { url: 'https://samdoes.dev/', changefreq: 'weekly', priority: '1.0' },
      { url: 'https://samdoes.dev/blog', changefreq: 'daily', priority: '0.9' },
    ];

    // Dynamic blog post URLs
    const blogUrls = results
      .map((post: any) => {
        const slug = plainText(post?.properties?.Slug?.rich_text);
        const date = post?.last_edited_time || new Date().toISOString();

        if (!slug) return null;

        return {
          url: `https://samdoes.dev/blog/${slug}`,
          lastmod: new Date(date).toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.8',
        };
      })
      .filter(Boolean);

    const allUrls = [...staticUrls, ...blogUrls];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item: any) => `  <url>
    <loc>${escapeXml(item.url)}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ''}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.write(sitemap);
    res.end();
  } catch (err) {
    console.error('Error generating sitemap:', err);
    res.status(500).end('Error generating sitemap');
  }
}

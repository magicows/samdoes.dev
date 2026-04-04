import { Header } from "@/components/nav/Header";
import { SideBar } from "@/components/nav/SideBar";
import {
  fetchBySlug,
  fetchPages,
  fetchPageBlocks,
  notion,
  sortPostsByPublishedDate,
} from "@/components/notion/fetchPages";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import Reveal from "@/components/util/Reveal";
import Head from "next/head";
import { CalendarIcon } from "@/components/blogs/CalendarIcon";
import { AiFillMail } from "react-icons/ai";
import Link from "next/link";
import { CiCircleMore } from "react-icons/ci";

function plainText(rt: any[] | undefined): string {
  return (rt || []).map((x: any) => x?.plain_text).filter(Boolean).join("");
}

export async function getStaticPaths() {
  const pages = await fetchPages();
  const results = (pages?.results || []) as any[];

  const paths = results
    .map((post: any) => plainText(post?.properties?.Slug?.rich_text))
    .filter(Boolean)
    .map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const slug = params?.slug;

  const page: any = await fetchBySlug(slug);
  if (!page?.id) {
    return { notFound: true, revalidate: 60 };
  }

  const pageBlocks: any = await fetchPageBlocks(page.id);
  if (!pageBlocks || !Array.isArray(pageBlocks)) {
    return { notFound: true, revalidate: 60 };
  }

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...pageBlocks);

  // Notion bookmark plugin can emit a literal "undefined" when metadata is missing.
  // Strip it so the UI doesn't show confusing filler.
  const cleanedHtml = html.replace(
    /<p class="bookmark-description">\s*undefined\s*<\/p>/g,
    ""
  );

  // Simple prev/next navigation (Live posts only)
  const all = await fetchPages();
  const posts = ((all?.results || []) as any[]).filter((p) => {
    const s = plainText(p?.properties?.Slug?.rich_text);
    const t = plainText(p?.properties?.Title?.title);
    return Boolean(s && t);
  });

  const sorted = sortPostsByPublishedDate(posts);

  const idx = sorted.findIndex(
    (p) => plainText(p?.properties?.Slug?.rich_text) === slug
  );

  const prev = idx >= 0 ? sorted[idx + 1] : null; // older
  const next = idx > 0 ? sorted[idx - 1] : null; // newer

  const toNav = (p: any) => {
    if (!p) return null;
    const s = plainText(p?.properties?.Slug?.rich_text);
    const t = plainText(p?.properties?.Title?.title);
    if (!s || !t) return null;
    return { slug: s, title: t };
  };
  return {
    props: {
      pageDetails: page,
      content: pageBlocks,
      html: cleanedHtml,
      prevPost: toNav(prev),
      nextPost: toNav(next),
    },
    revalidate: 60 * 5,
  };
}

function Hero({ backgroundImageUrl, title, description, tags, date }: any) {
  return (
    <div className="relative py-10 md:h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden border-y-[3px] border-black blur-[3px]">
        <img
          src={backgroundImageUrl}
          alt="Background Image"
          className="w-full h-full object-cover "
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex h-full max-w-6xl flex-col items-start justify-center px-4 md:mx-auto md:px-8">
        <div className="flex flex-col items-start justify-center">
          <Reveal>
            <div className="mb-4 inline-flex items-center gap-2 border-[3px] border-black bg-[var(--accent-tertiary)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]">
              Article
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-2">
              <h1 className="flex flex-row pointer-events-auto text-3xl sm:text-6xl font-black text-zinc-100 md:text-7xl">
                {title}
              </h1>
              <CalendarIcon dateString={date} />
            </div>
          </Reveal>
          <Reveal>
            <p className="pointer-events-auto leading-relaxed md:leading-relaxed max-w-xl text-sm text-zinc-300 md:text-base mt-2">
              {description}
            </p>
          </Reveal>
          <Reveal>
            <div className="my-3 flex flex-wrap gap-3 text-sm font-bold text-[var(--accent-secondary)]">
              {tags.join(" - ")}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

interface Props {
  content: any;
  html: any;
  pageDetails: any;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

function getPlainText(rt: any[] | undefined): string {
  return (rt || []).map((x: any) => x?.plain_text).filter(Boolean).join("");
}

function getPostTitle(pageDetails: any): string {
  return getPlainText(pageDetails?.properties?.Title?.title) || "Post";
}

function getPostDescription(pageDetails: any): string {
  const summary = getPlainText(pageDetails?.properties?.Summary?.rich_text);
  if (summary) return summary;

  // fallback: basic description if Summary not present
  return `Blog post by Sam Fitz.`;
}

function getPostSlug(pageDetails: any): string | undefined {
  const slug = getPlainText(pageDetails?.properties?.Slug?.rich_text);
  return slug || undefined;
}

function getPostDescriptionFromProperties(pageDetails: any): string {
    return getPostDescription(pageDetails);
}

function getPostCanonicalUrl(pageDetails: any): string {
  const slug = getPostSlug(pageDetails);
  return slug ? `https://samdoes.dev/blog/${slug}` : "https://samdoes.dev/blog";
}

function getPostOgImage(pageDetails: any): string | undefined {
  return (
    pageDetails?.cover?.external?.url ||
    pageDetails?.cover?.file?.url ||
    undefined
  );
}

export default function BlogPost({ content, html, pageDetails, prevPost, nextPost }: Props) {

  if (!pageDetails) {
    return <></>;
  }

  const tags =
    pageDetails.properties.Tags.multi_select.map((tag: any) => tag.name) || [];

  const date = pageDetails.properties.Date.date.start;

  return (
    <>
      <Head>
        <title>{getPostTitle(pageDetails)} | Sam Fitz</title>
        <meta name="description" content={getPostDescription(pageDetails)} />

        <link rel="canonical" href={getPostCanonicalUrl(pageDetails)} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${getPostTitle(pageDetails)} | Sam Fitz`} />
        <meta property="og:description" content={getPostDescription(pageDetails)} />
        <meta property="og:url" content={getPostCanonicalUrl(pageDetails)} />
        {getPostOgImage(pageDetails) ? (
          <meta property="og:image" content={getPostOgImage(pageDetails)} />
        ) : null}

        {/* Twitter */}
        <meta name="twitter:card" content={getPostOgImage(pageDetails) ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={`${getPostTitle(pageDetails)} | Sam Fitz`} />
        <meta name="twitter:description" content={getPostDescription(pageDetails)} />
        {getPostOgImage(pageDetails) ? (
          <meta name="twitter:image" content={getPostOgImage(pageDetails)} />
        ) : null}
      </Head>
      <div className="site-shell grid min-h-screen grid-cols-[54px_1fr] md:grid-cols-[76px_1fr]">
        <SideBar />
        <main className="relative">
          <Header />
          <nav aria-label="Breadcrumb" className="max-w-[360px] px-4 pt-6 md:mx-auto md:max-w-6xl md:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border-[3px] border-black bg-zinc-100 px-3 py-2 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-[var(--accent-tertiary)]"
            >
              <span aria-hidden="true">←</span>
              <span>All posts</span>
            </Link>
          </nav>
          <Hero
            backgroundImageUrl={getPostOgImage(pageDetails) || "/og-default.jpg"}
            title={getPostTitle(pageDetails)}
            description={getPostDescription(pageDetails)}
            date={date}
            tags={tags}
          />
          <div className="max-w-[360px] w-full px-4 pb-12 md:mx-auto md:max-w-6xl md:px-8">
            <div
              className="section-panel prose mx-auto mt-10 max-w-none px-6 py-8 text-xl leading-10 prose-p:text-white prose-headings:text-white prose-blockquote:text-white md:px-10 md:py-10 md:text-justify"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="max-w-[360px] w-full px-4 pb-12 md:mx-auto md:max-w-6xl md:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="section-panel-soft p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-secondary)]">Previous</div>
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="mt-2 block text-zinc-100 font-black tracking-tight transition-colors hover:text-[var(--accent-tertiary)]"
                  >
                    {prevPost.title}
                  </Link>
                ) : (
                  <div className="mt-2 text-zinc-500">No older post</div>
                )}
              </div>
              <div className="section-panel-soft p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[var(--accent-primary)]">Next</div>
                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="mt-2 block text-zinc-100 font-black tracking-tight transition-colors hover:text-[var(--accent-secondary)]"
                  >
                    {nextPost.title}
                  </Link>
                ) : (
                  <div className="mt-2 text-zinc-500">No newer post</div>
                )}
              </div>
            </div>

            <div className="section-panel-soft mt-10 p-6">
              <Reveal width="w-fit">
                <Link href="/blog" className="no-underline">
                  <div className="mx-auto flex w-fit items-center justify-center gap-2 border-[3px] border-black bg-[var(--accent-tertiary)] px-5 py-3 text-lg font-black uppercase tracking-[0.16em] text-black shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:translate-x-1 md:text-xl">
                    <CiCircleMore />
                    <span>View all posts</span>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
          <div className="section-panel mx-auto mb-24 flex max-w-[360px] flex-col items-center justify-center px-8 py-12 prose md:max-w-xl">
            <Reveal width="w-full">
              <>
                <h3 className="text-xl md:text-3xl text-center text-white font-black mb-2 mt-0">
                  Want to discuss this post<span className="text-[var(--accent-primary)]">?</span>
                </h3>
                <p className="text-center text-zinc-300 leading-relaxed">
                  While I haven't enabled comments to keep things simple and
                  focused, I'm always open to hearing from readers!
                </p>
                <p className="text-center text-zinc-300 leading-relaxed mt-0">
                  If you'd like to discuss anything, feel free to email me at
                </p>
              </>
            </Reveal>
            <Reveal width="w-full">
              <>
                <Link href="mailto:hello@samdoes.dev" className="no-underline">
                  <div className="mx-auto flex w-fit items-center justify-center gap-3 border-[3px] border-black bg-[var(--accent-primary)] px-5 py-3 text-lg font-black text-white shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:translate-x-1 hover:bg-[var(--accent-secondary)] hover:text-black md:text-2xl">
                    <AiFillMail />
                    <span>hello@samdoes.dev</span>
                  </div>
                </Link>
                <p className="text-center text-zinc-500 text-sm mt-4 mb-0">
                  You can also DM me on LinkedIn/X (icons in the header).
                </p>
              </>
            </Reveal>
          </div>
        </main>
      </div>
    </>
  );
}

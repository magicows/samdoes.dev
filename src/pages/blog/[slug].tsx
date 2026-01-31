import { Header } from "@/components/nav/Header";
import { SideBar } from "@/components/nav/SideBar";
import {
  fetchBySlug,
  fetchPages,
  fetchPageBlocks,
  notion,
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

export async function getStaticPaths() {
  const pages = await fetchPages();

  if (pages.results.length === 0) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = pages.results.map((post: any) => ({
    params: { slug: post.properties.Slug.rich_text[0].plain_text },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const slug = params?.slug;

  const page: any = await fetchBySlug(slug);
  const pageBlocks: any = await fetchPageBlocks(page?.id);

  const renderer = new NotionRenderer({
    client: notion,
  });

  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...pageBlocks);

  return {
    props: {
      pageDetails: page,
      content: pageBlocks,
      html: html,
    },
    revalidate: 60 * 5,
  };
}

function Hero({ backgroundImageUrl, title, description, tags, date }: any) {
  return (
    <div className="relative py-10 md:h-[500px]">
      {/* Background Image */}
      <div className="absolute inset-0 blur-[3px]">
        <img
          src={backgroundImageUrl}
          alt="Background Image"
          className="w-full h-full object-cover "
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:px-8 mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-center">
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
            <div className="flex flex-wrap gap-4 text-sm text-burnLight my-2">
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

export default function BlogPost({ content, html, pageDetails }: Props) {

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
      <div className="grid grid-cols-[54px_1fr]">
        <SideBar />
        <main>
          <Header />
          <Hero
            backgroundImageUrl={getPostOgImage(pageDetails) || "/og-default.jpg"}
            title={getPostTitle(pageDetails)}
            description={getPostDescription(pageDetails)}
            date={date}
            tags={tags}
          />
          <div className="md:mx-auto max-w-[360px] md:max-w-5xl px-4 md:px-8 space-y-32 pb-12 w-full">
            <div
              className="text-xl mt-10 mx-auto leading-10 prose max-w-none md:text-justify prose-p:text-white prose-headings:text-white prose-blockquote:text-white"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="md:mx-auto max-w-[360px] md:max-w-5xl px-4 md:px-8 space-y-32 pb-12 w-full">
            <Reveal width="w-fit">
              <Link href="/blog" className="no-underline">
                <div className="flex items-center justify-center gap-2 w-fit text-lg md:text-2xl whitespace-normal mx-auto hover:text-burnLight transition-colors text-burn ">
                  <CiCircleMore />
                  <span>View more posts.</span>
                </div>
              </Link>
            </Reveal>
          </div>
          <div className="md:mx-auto max-w-[360px] prose md:max-w-xl mx-auto bg-zinc-800 px-8 py-12 rounded-xl flex flex-col items-center justify-center mb-24">
            <Reveal width="w-full">
              <>
                <h3 className="text-xl md:text-3xl text-center text-white font-black mb-2 mt-0">
                  Want to discuss this post<span className="text-burn">?</span>
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
              <Link href="mailto:hello@samdoes.dev" className="no-underline">
                <div className="flex items-center justify-center gap-2 w-fit text-lg md:text-2xl whitespace-normal mx-auto hover:text-burnLight transition-colors text-burn ">
                  <AiFillMail />
                  <span>hello@samdoes.dev</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </main>
      </div>
    </>
  );
}

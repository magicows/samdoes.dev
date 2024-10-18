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
import { useEffect } from "react";
import Reveal from "@/components/util/Reveal";
import Head from "next/head";

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

function Hero({ backgroundImageUrl, title, description, tags }: any) {
  return (
    <div className="relative h-[250px] md:h-[500px]">
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
        <Reveal>
          <div className="flex flex-col items-start justify-center">
            <h1 className="pointer-events-auto text-4xl sm:text-6xl font-black text-zinc-100 md:text-8xl">
              {title}
            </h1>
            <p className="pointer-events-auto leading-relaxed md:leading-relaxed max-w-xl text-sm text-zinc-300 md:text-base mt-2">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-burnLight my-2">
              {tags.join(" - ")}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

interface Props {
  content: any;
  html: any;
  pageDetails: any;
}

export default function BlogPost({ content, html, pageDetails }: Props) {
  // useEffect(() => {
  //   console.log(content);
  //   console.log(pageDetails);
  // }, []);

  if (!pageDetails) {
    return <></>;
  }

  const tags =
    pageDetails.properties.Tags.multi_select.map((tag: any) => tag.name) || [];

  return (
    <>
      <Head>
        <title>{pageDetails.properties.Title.title[0].plain_text} | Sam Fitz</title>
      </Head>
      <div className="grid grid-cols-[54px_1fr]">
        <SideBar />
        <main>
          <Header />
          <Hero
            backgroundImageUrl={pageDetails.cover.external.url}
            title={pageDetails.properties.Title.title[0].plain_text}
            description={pageDetails.properties.Summary.rich_text[0].plain_text}
            tags={tags}
          />
          <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-32 pb-24 w-full">
            <div
              className="text-xl mt-10 mx-auto leading-10 prose max-w-none text-justify prose-p:text-white prose-headings:text-white prose-blockquote:text-white"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </main>
      </div>
    </>
  );
}

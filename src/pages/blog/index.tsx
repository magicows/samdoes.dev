// @ts-nocheck

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useEffect } from "react";
import { NotionAPI } from "notion-client";
import { fetchPages } from "@/components/notion/fetchPages";
import Head from "next/head";
import { Blog } from "@/components/blogs/Blog";
import { BlogPage } from "@/components/BlogPage";
import { notFound } from 'next/navigation'
import { use } from "react";

export default function Blogs({posts}) {
    if(!posts) return notFound();

  return (
    <>
      <Head>
        <title>Posts | Sam Fitz</title>
        <meta
          name="description"
          content="Blog posts about React, React Native, infrastructure, and building things."
        />
        <link rel="canonical" href="https://samdoes.dev/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Posts | Sam Fitz" />
        <meta
          property="og:description"
          content="Blog posts about React, React Native, infrastructure, and building things."
        />
        <meta property="og:url" content="https://samdoes.dev/blog" />
      </Head>
      <main className={inter.className}>
       <BlogPage posts={posts} />
      </main>
    </>
  );
}

export async function getStaticProps() {

  const pages = await fetchPages();

  return {
    props: {
      posts: pages,
    },
    revalidate: 60*5,
  };
}

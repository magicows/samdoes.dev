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
        <title>Sam Fitz - Software Dev</title>
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

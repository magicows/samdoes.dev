// @ts-nocheck

import { Inter } from "next/font/google";
import { HomPage } from "@/components";

const inter = Inter({ subsets: ["latin"] });

import { NotionAPI } from "notion-client";
import { fetchPages } from "@/components/notion/fetchPages";
import Head from "next/head";

export default function Home({posts}) {
  return (
    <>
      <Head>
        <title>Sam Fitz - Software Dev</title>
      </Head>
      <main className={inter.className}>
        <HomPage posts={posts} />      
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

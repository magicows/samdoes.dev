// @ts-nocheck
import React, { useEffect } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { NotionPage } from "../notion/Renderer";
import { fetchPages } from "../notion/fetchPages";
import Link from "next/link";
import { Blog } from "./Blog";
import Reveal from "../util/Reveal";
import { CiCircleMore } from "react-icons/ci";

export default function Blogs({ posts }) {
  return (
    <section className="section-wrapper" id="blogs">
      <SectionHeader title="Recently" dir="l" />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {posts.results.slice(0, 2).map((post) => {
          return <Blog key={post.id} post={post} />;
        })}
      </div>
      <div className="mt-10 flex w-full flex-col items-center justify-center px-4 md:px-8">
        <Reveal width="w-fit">
          <Link href="/blog" className="no-underline">
            <div className="flex w-fit items-center justify-center gap-2 border-[3px] border-black bg-[var(--accent-tertiary)] px-5 py-3 text-lg font-black uppercase tracking-[0.16em] text-black shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:translate-x-1 md:text-xl">
              <CiCircleMore />
              <span>View all posts</span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

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
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
        {posts.results.map((post) => {
          return <Blog key={post.id} post={post} />;
        })}
      </div>
      <div className="px-4 md:px-8 mt-10 w-full flex flex-col items-center justify-center">
        <Reveal width="w-fit">
          <Link href="/blog" className="no-underline">
            <div className="flex items-center justify-center gap-2 w-fit text-lg md:text-2xl whitespace-normal mx-auto hover:text-burnLight transition-colors text-burn ">
              <CiCircleMore />
              <span>View all posts.</span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

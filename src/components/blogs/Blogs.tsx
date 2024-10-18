// @ts-nocheck
import React, { useEffect } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { NotionPage } from "../notion/Renderer";
import { fetchPages } from "../notion/fetchPages";
import Link from "next/link";
import { Blog } from "./Blog";

export default function Blogs({posts}) {

  return (
    <section className="section-wrapper" id="blogs">
      <SectionHeader title="Recently" dir="l" />
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2">
        {posts.results.map((post) => {          
          return (
            <Blog key={post.id} post={post} />            
          );
        })}
      </div>          
    </section>
  );
};


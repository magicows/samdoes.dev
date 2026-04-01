// @ts-nocheck
import React, { useEffect } from "react";
import { SectionHeader } from "../util/SectionHeader";
import { NotionPage } from "../notion/Renderer";
import { fetchPages } from "../notion/fetchPages";
import Link from "next/link";
import { Blog } from "./Blog";

export default function BlogCollation({posts}) {

  return (
    <section className="section-wrapper" id="blogs">
      <SectionHeader title="Recently" dir="l" />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {posts.results.map((post, index) => {          
          return (
            <Blog key={post.id} post={post} />            
          );
        })}
      </div>          
    </section>
  );
};

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SideBar } from "./nav/SideBar";
import { Header } from "./nav/Header";
import Hero from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Experience } from "./experience/Experience";
import { Contact } from "./contact/Contact";
import  Blogs from "./blogs/Blogs";

export const HomPage = ({posts = []} : any) => {
  const { scrollY } = useScroll();
  const leftShapeY = useTransform(scrollY, [0, 700], [0, 180]);
  const leftShapeOpacity = useTransform(scrollY, [0, 700], [0.8, 0]);
  const rightShapeY = useTransform(scrollY, [0, 900], [0, 220]);
  const rightShapeOpacity = useTransform(scrollY, [0, 900], [0.9, 0]);

  return (
    <div className="site-shell grid min-h-screen grid-cols-[54px_1fr] md:grid-cols-[76px_1fr]">
      <SideBar posts={posts} />
      <main className="relative">
        <Header />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[8%] top-32 h-28 w-28 rotate-6 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[8px_8px_0px_0px_#000]"
            style={{ y: leftShapeY, opacity: leftShapeOpacity }}
          />
          <motion.div
            className="absolute right-[10%] top-[28rem] h-24 w-24 -rotate-6 rounded-full border-[3px] border-black bg-[var(--accent-tertiary)] shadow-[8px_8px_0px_0px_#000]"
            style={{ y: rightShapeY, opacity: rightShapeOpacity }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-8 space-y-32 pb-24">
          <Hero />
          <About />
          {/* <Projects />           */}
          <Experience />
          {posts.results.length >= 1 ? <Blogs posts={posts} /> : <></>}
          <Contact />
        </div>
      </main>
    </div>
  );
};

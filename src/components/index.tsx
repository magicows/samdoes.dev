import React from "react";
import { SideBar } from "./nav/SideBar";
import { Header } from "./nav/Header";
import Hero from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Experience } from "./experience/Experience";
import { Contact } from "./contact/Contact";
import  Blogs from "./blogs/Blogs";

export const HomPage = ({posts = []} : any) => {
  return (
    <div className="grid grid-cols-[54px_1fr]">
      <SideBar posts={posts} />
      <main>
        <Header />
        <div className="mx-auto max-w-5xl px-4 md:px-8 space-y-32 pb-24">
          <Hero />
          <About />
          {/* <Projects /> */}          
          <Experience />
          {posts.results.length >= 1 ? <Blogs posts={posts} /> : <></>}
          <Contact />
        </div>
      </main>
    </div>
  );
};

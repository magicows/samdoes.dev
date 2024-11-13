import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SideBarLink } from "./SideBarLink";
import { useRouter } from "next/router";

export const SideBar = ({ posts = { results: [] } }) => {
  const [selected, setSelected] = useState("");
  const router = useRouter();
  // Check if the current page is the homepage
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const sections = document.querySelectorAll(".section-wrapper");

    const options = {
      threshold: 0.3,
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setSelected(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => observer.observe(section));

    console.log(!isHomePage && posts.results.length >= 1 );
  }, []);

  return (
    <motion.nav
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="no-scrollbar bg-zinc-950 h-screen sticky top-0 left-0 z-20 flex flex-col items-center overflow-y-scroll"
    >
      <span className="shrink-0 text-xl font-black leading-[1] size-10 flex items-center justify-center my-4">
        SF<span className="text-burn">.</span>
      </span>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="about"
        href="#about"
      >
        About.
      </SideBarLink>
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="experience"
        href="#experience"
      >
        Exp.
      </SideBarLink>
      {isHomePage && posts.results.length >= 1 ? (
        <SideBarLink
          selected={selected}
          setSelected={setSelected}
          value="Posts"
          href="#blogs"
        >
          Posts.
        </SideBarLink>
      ) : null}
      {!isHomePage ? (
        <SideBarLink
          selected={selected}
          setSelected={setSelected}
          value="Posts"
          href="blog"
        >
          Posts.
        </SideBarLink>
      ) : null}
      <SideBarLink
        selected={selected}
        setSelected={setSelected}
        value="contact"
        href="#contact"
      >
        Contact.
      </SideBarLink>
    </motion.nav>
  );
};

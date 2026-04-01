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
      className="no-scrollbar sticky top-0 left-0 z-20 flex h-screen flex-col items-center overflow-y-scroll border-r-[3px] border-black bg-[rgba(13,14,18,0.95)] shadow-[8px_0px_0px_0px_#000]"
    >
      <span className="my-4 flex h-12 w-12 shrink-0 items-center justify-center border-[3px] border-black bg-[var(--accent-tertiary)] text-xl font-black leading-[1] text-black shadow-[4px_4px_0px_0px_#000]">
        SF<span className="text-[var(--accent-primary)]">.</span>
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

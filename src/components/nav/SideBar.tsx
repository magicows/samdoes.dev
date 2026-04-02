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
    const visibleSections = new Map<string, number>();

    const options = {
      threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
    };

    const callback = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      const [nextSelected] = Array.from(visibleSections.entries()).sort(
        (a, b) => b[1] - a[1]
      )[0] || [];

      if (nextSelected) {
        setSelected(nextSelected);
      }
    };

    const observer = new IntersectionObserver(callback, options);

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollPosition < 96) {
        setSelected("contact");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="no-scrollbar sticky top-0 z-30 flex h-screen flex-col items-center overflow-y-scroll border-r-[3px] border-black bg-[rgba(13,14,18,0.95)] shadow-[8px_0px_0px_0px_#000]"
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
          value="blogs"
          href="#blogs"
        >
          Posts.
        </SideBarLink>
      ) : null}
      {!isHomePage ? (
        <SideBarLink
          selected={selected}
          setSelected={setSelected}
          value="blogs"
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

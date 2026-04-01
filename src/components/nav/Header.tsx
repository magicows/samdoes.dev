import Link from "next/link";
import React from "react";
import { SiCodepen, SiGithub, SiX, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { OutlineButton } from "../buttons/OutlineButton";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 px-3 pt-3 md:px-6">
      <div className="section-panel-soft flex h-[72px] items-center justify-between px-4 backdrop-blur-md">
        <MyLinks />
      </div>
      {/* <OutlineButton onClick={() => window.open("/fake_resume.pdf")}>
        My Resume
      </OutlineButton> */}
    </header>
  );
};

export const MyLinks = () => (
  <div className="flex items-center gap-3 text-lg">
    <Link
      className="flex h-10 w-10 items-center justify-center border-2 border-black bg-zinc-900 text-zinc-200 shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-secondary)] hover:text-black"
      href="https://www.linkedin.com/in/samfitzpatrick1"
      target="_blank"
      rel="nofollow"
    >
      <FaLinkedinIn />
    </Link>
    <Link
      className="flex h-10 w-10 items-center justify-center border-2 border-black bg-zinc-900 text-zinc-200 shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-primary)] hover:text-white"
      href="https://www.x.com/samfitzpatrick"
      target="_blank"
      rel="nofollow"
    >
      <SiX />
    </Link>
    <Link
      className="flex h-10 w-10 items-center justify-center border-2 border-black bg-zinc-900 text-zinc-200 shadow-[3px_3px_0px_0px_#000] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-tertiary)] hover:text-black"
      href="https://www.instagram.com/samfitzpatrick"
      target="_blank"
      rel="nofollow"
    >
      <SiInstagram />
    </Link>
  </div>
);

import Link from "next/link";
import React from "react";
import { SiCodepen, SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";
import { OutlineButton } from "../buttons/OutlineButton";

export const Header = () => {
  return (
    <header className="h-[72px] px-4 flex items-center justify-between sticky top-0 z-20 bg-zinc-900/50 backdrop-blur-md">
      <MyLinks />
      {/* <OutlineButton onClick={() => window.open("/fake_resume.pdf")}>
        My Resume
      </OutlineButton> */}
    </header>
  );
};

export const MyLinks = () => (
  <div className="flex items-center text-lg gap-4">
    <Link
      className="text-zinc-300 hover:text-burnLight transition-colors"
      href="https://www.linkedin.com/in/samfitzpatrick1"
      target="_blank"
      rel="nofollow"
    >
      <SiLinkedin />
    </Link>
    <Link
      className="text-zinc-300 hover:text-burnLight transition-colors"
      href="https://www.x.com/samfitzpatrick"
      target="_blank"
      rel="nofollow"
    >
      <SiX />
    </Link>
    <Link
      className="text-zinc-300 hover:text-burnLight transition-colors"
      href="https://www.instagram.com/samfitzpatrick"
      target="_blank"
      rel="nofollow"
    >
      <SiInstagram />
    </Link>
  </div>
);

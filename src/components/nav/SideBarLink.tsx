import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  href: string;
  children: string;
  value: string;
}

const MotionLink = motion(Link);


export const SideBarLink = ({
  setSelected,
  selected,
  children,
  href,
  value,
}: Props) => {
  const router = useRouter();
  // Check if the current page is the homepage
  const isHomePage = router.pathname === '/';
  const targetHash = href;

  return (
    <MotionLink
      initial={{ x: -70 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      href={isHomePage ? targetHash : `/${targetHash}`}
      onClick={() => {
        setSelected(value);
      }}
      className={`writing-vertical flex h-24 w-full shrink-0 items-center justify-center border-r-[3px] border-black text-[11px] font-black uppercase tracking-[0.24em] transition-all ${
        selected === value
          ? "bg-[var(--accent-primary)] text-white opacity-100"
          : "border-transparent bg-transparent text-zinc-400 opacity-80 hover:bg-zinc-900 hover:text-[var(--accent-secondary)]"
      }`}
    >
      {children}
    </MotionLink>
  );
};

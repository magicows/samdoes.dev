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
      className={`writing-vertical h-24 shrink-0 flex items-center justify-center border-r-2 text-sm transition-all w-full ${
        selected === value
          ? "bg-zinc-800 border-burn opacity-100"
          : "border-transparent hover:border-r-zinc-50 opacity-50 hover:bg-zinc-900"
      }`}
    >
      {children}
    </MotionLink>
  );
};

import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const OutlineButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        `relative z-0 flex items-center gap-2 overflow-hidden border-[3px]
        border-black px-5 py-3 font-black text-sm uppercase tracking-[0.2em]
        text-white transition-all duration-300 shadow-[6px_6px_0px_0px_#000]
        
        before:absolute before:inset-0
        before:-z-10 before:translate-x-[150%]
        before:translate-y-[150%] before:scale-[2.5]
        before:bg-white
        before:transition-transform before:duration-1000
        before:content-[""]

        hover:-translate-y-1 hover:translate-x-1 hover:text-zinc-950
        hover:before:translate-x-[0%]
        hover:before:translate-y-[0%]
        active:scale-95`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

import React from "react";

export const Chip = ({ children }: { children: string }) => {
  return (
    <span className="border-2 border-black bg-zinc-100 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.08em] text-black shadow-[3px_3px_0px_0px_#000]">
      {children}
    </span>
  );
};

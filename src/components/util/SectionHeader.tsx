import { Reveal } from "./Reveal";

interface Props {
  title: string;
  dir?: "l" | "r";
}

export const SectionHeader = ({ title, dir = "r" }: Props) => {
  return (
    <div
      className="mb-12 flex items-center gap-4 md:gap-8"
      style={{ flexDirection: dir === "r" ? "row" : "row-reverse" }}
    >
      <div className="h-[6px] w-full border-y-[3px] border-black bg-[var(--accent-secondary)]" />
      <h2>
        <Reveal>
          <span className="inline-block whitespace-nowrap border-[3px] border-black bg-zinc-100 px-4 py-2 text-end text-3xl font-black uppercase leading-none tracking-tight text-black shadow-[6px_6px_0px_0px_#000] md:text-5xl md:leading-tight">
            {title}
            <span className="text-[var(--accent-primary)]">.</span>
          </span>
        </Reveal>
      </h2>
    </div>
  );
};

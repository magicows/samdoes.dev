import { Chip } from "../util/Chip";
import Reveal from "../util/Reveal";

interface Props {
  title: string;
  position: string;
  time: string;
  location: string;
  description: string;
  tech: string[];
}

export const ExperienceItem = ({
  title,
  position,
  time,
  location,
  description,
  tech,
}: Props) => {
  return (
    <div className="section-panel relative overflow-hidden px-5 py-5 md:px-6 md:py-6">
      <div className="absolute right-4 top-4 h-5 w-5 border-[3px] border-black bg-[var(--accent-tertiary)] shadow-[3px_3px_0px_0px_#000]" />
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <span className="text-2xl font-black uppercase tracking-tight">{title}</span>
        </Reveal>
        <Reveal>
          <span className="inline-block border-[3px] border-black bg-[var(--accent-secondary)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[4px_4px_0px_0px_#000]">{time}</span>
        </Reveal>
      </div>

      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Reveal>
          <span className="text-lg font-black text-[var(--accent-primary)]">{position}</span>
        </Reveal>
        <Reveal>
          <span className="text-sm font-bold uppercase tracking-[0.14em] text-zinc-400">{location}</span>
        </Reveal>
      </div>
      <Reveal>
        <p className="mb-6 max-w-3xl border-l-[6px] border-zinc-700 pl-4 leading-relaxed text-zinc-300">{description}</p>
      </Reveal>
      <Reveal>
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
      </Reveal>
    </div>
  );
};

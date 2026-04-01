import { AiOutlineArrowRight } from "react-icons/ai";
import { SectionHeader } from "../util/SectionHeader";
import Reveal from "../util/Reveal";
import { MyLinks } from "../nav/Header";
import { Stats } from "./Stats";
import TopTracks from "../spotify/TopTracks";

export const About = () => {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title="About" dir="l" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.3fr)_340px]">
        <div className="section-panel relative overflow-hidden px-6 py-6 md:px-8 md:py-8">
          <div className="absolute right-4 top-4 h-5 w-16 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[4px_4px_0px_0px_#000]" />
          <div className="space-y-5">
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              <span className="mr-2 inline-block border-[3px] border-black bg-[var(--accent-primary)] px-3 py-2 align-top text-2xl font-black text-white shadow-[4px_4px_0px_0px_#000]">
                H
              </span>
              ey! I&apos;m Sam Fitzpatrick, if you haven&apos;t already gathered that by
              now. I build web and mobile applications across a few tech stacks. I specialise in frontend development, primarily React ⚛️ and Next.js, but I love building with whatever tools are right for the job 🛠️.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              I currently work as a Senior Developer with <a className="accent-link" href="https://freestyle.agency">Freestyle</a>, a marketing agency in Warwick, England 🇬🇧. Outside of my day-to-day, I also build, maintain, and host several websites for local businesses 🖥️.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              Outside of work, I&apos;m an enthusastic-but-not-great drummer 🥁. I like getting to the gym, running 🏃‍♂️, and partaking in Peloton classes 🚴.
              I&apos;m also into experimenting with home networking & automation 🌐, as well as 3D design & printing 🖨️.
            </p>
          </Reveal>
          <Reveal>
            <p className="border-l-[6px] border-[var(--accent-tertiary)] pl-4 text-lg font-medium leading-relaxed text-zinc-100">
              If you think you&apos;ve got something I can help with, let&apos;s connect
              🔗
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-col gap-4 md:mb-2 md:flex-row md:items-center">
              <div className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.18em] text-[var(--accent-secondary)]">
                <span>My links</span>
                <AiOutlineArrowRight />
              </div>
              <MyLinks />
            </div>
          </Reveal>
          </div>
        </div>
        <div className="section-panel-soft px-5 py-6 md:px-6">
        <Stats />  
           
        </div>  
      </div>
      <TopTracks /> 
    </section>
  );
};

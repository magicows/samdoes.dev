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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              <span className="bg-burn text-white py-2 px-3 rounded font-bold mr-1 float-left text-2xl">
                H
              </span>
              ey! I&apos;m Sam Fitzpatrick, if you haven&apos;t already gathered that by
              now. I build web and mobile applications across a few tech stacks. I specialise in frontend development, primarily React ⚛️ and Next.js, but I love building with whatever tools are right for the job 🛠️.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              I currently work as a Senior Developer with <a className="text-burn hover:text-burnDark" href="https://freestyle.agency">Freestyle</a>, a marketing agency in Warwick, England 🇬🇧. Outside of my day-to-day, I also build, maintain, and host several websites for local businesses 🖥️.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              Outside of work, I&apos;m an enthusastic-but-not-great drummer 🥁. I like getting to the gym, running 🏃‍♂️, and partaking in Peloton classes 🚴.
              I&apos;m also into experimenting with home networking & automation 🌐, as well as 3D design & printing 🖨️.
            </p>
          </Reveal>
          <Reveal>
            <p className="leading-relaxed text-zinc-300">
              If you think you&apos;ve got something I can help with, let&apos;s connect
              🔗
            </p>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-burnLight">
                <span>My links</span>
                <AiOutlineArrowRight />
              </div>
              <MyLinks />
            </div>
          </Reveal>
        </div>
        <div>
        <Stats />  
        <TopTracks />    
        </div>  
      </div>
      
    </section>
  );
};

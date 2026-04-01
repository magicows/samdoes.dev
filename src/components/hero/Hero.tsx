import Reveal from "../util/Reveal";
import DotGrid from "./DotGrid";
import { OutlineButton } from "../buttons/OutlineButton";

const Hero = () => {
  return (
    <section className="overflow-hidden py-16 text-slate-100 md:py-24">
      <div className="section-panel relative overflow-hidden bg-[linear-gradient(135deg,rgba(236,94,50,0.18),transparent_40%),linear-gradient(315deg,rgba(55,214,200,0.12),transparent_35%),#161920] px-6 py-8 md:px-10 md:py-12">
        <div className="absolute right-5 top-5 h-6 w-20 border-[3px] border-black bg-[var(--accent-tertiary)] shadow-[4px_4px_0px_0px_#000]" />
        <div className="absolute bottom-5 left-5 h-4 w-4 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[3px_3px_0px_0px_#000]" />
        <div className="pointer-events-none relative z-10 max-w-3xl">
          <Reveal>
            <span className="section-kicker mb-6">Developer / Builder / Tinkerer</span>
          </Reveal>
          <Reveal>
            <h1 className="pointer-events-auto max-w-4xl text-5xl font-black uppercase leading-[0.9] text-zinc-100 md:text-8xl">
              Hi, I&apos;m Sam<span className="text-[var(--accent-primary)]">.</span>
            </h1>
          </Reveal>
          <Reveal>
            <h2 className="pointer-events-auto my-4 max-w-2xl border-l-[6px] border-[var(--accent-secondary)] pl-4 text-xl text-zinc-200 md:my-6 md:text-4xl">
              I build sharp, useful software across{" "}
              <span className="font-semibold text-[var(--accent-tertiary)]">
                web, mobile, and product experiments.
              </span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="pointer-events-auto max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base md:leading-relaxed">
              Based in Royal Leamington Spa. I’ve spent the last 8+ years
              building and scaling software for teams across React, React
              Native, Node.js, and more.
              <br />
              <br />
              If you’ve got a project in mind, let’s talk.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="border-[3px] border-black bg-zinc-100 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[4px_4px_0px_0px_#000]">
                React + Next.js
              </span>
              <span className="border-[3px] border-black bg-[var(--accent-secondary)] px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[4px_4px_0px_0px_#000]">
                React Native + Expo
              </span>
              <span className="border-[3px] border-black bg-[var(--accent-primary)] px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[4px_4px_0px_0px_#000]">
                Product-minded shipping
              </span>
            </div>
          </Reveal>
          <Reveal>
            <OutlineButton
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView();
              }}
              className="pointer-events-auto mt-6 bg-[var(--accent-primary)] text-zinc-100 before:bg-[var(--accent-tertiary)] md:mt-8"
            >
              Contact Me
            </OutlineButton>
          </Reveal>
        </div>
        <DotGrid />
      </div>
    </section>
  );
};

export default Hero;

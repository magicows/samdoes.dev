import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../util/Reveal";
import HeroCircuit from "./HeroCircuit";
import { OutlineButton } from "../buttons/OutlineButton";

const Hero = () => {
  const { scrollY } = useScroll();
  const topAccentY = useTransform(scrollY, [0, 500], [0, 24]);
  const topAccentRotate = useTransform(scrollY, [0, 500], [0, 6]);
  const bottomAccentY = useTransform(scrollY, [0, 500], [0, 32]);
  const bottomAccentX = useTransform(scrollY, [0, 500], [0, -8]);

  return (
    <section className=" pt-20 text-slate-100 md:pt-24">
      <div className="section-panel relative overflow-hidden bg-[linear-gradient(135deg,rgba(236,94,50,0.18),transparent_40%),linear-gradient(315deg,rgba(55,214,200,0.12),transparent_35%),#161920] px-6 py-8 md:px-10 md:py-12">
        <motion.div
          className="absolute right-5 top-5"
          style={{ y: topAccentY, rotate: topAccentRotate }}
        >
          <motion.div
            className="h-6 w-20 border-[3px] border-black bg-[var(--accent-secondary)] md:bg-[var(--accent-tertiary)] shadow-[4px_4px_0px_0px_#000]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-5 left-5"
          style={{ y: bottomAccentY, x: bottomAccentX }}
        >
          <motion.div
            className="h-4 w-4 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[3px_3px_0px_0px_#000]"
            animate={{ y: [0, 5, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="pointer-events-none relative z-10 md:max-w-[min(54rem,58%)] md:pr-8">
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
                web and mobile.
              </span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="pointer-events-auto max-w-2xl text-sm leading-relaxed text-zinc-300 md:text-base md:leading-relaxed">
              Based in Royal Leamington Spa. I've spent the last 10+ years
              building and scaling software for teams across React, React
              Native, Node.js, and more.
              <br />
              <br />
              If you've got a project in mind, let's talk.
            </p>
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
        <HeroCircuit />
      </div>
    </section>
  );
};

export default Hero;

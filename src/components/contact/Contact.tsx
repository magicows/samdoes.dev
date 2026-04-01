import { AiFillMail } from "react-icons/ai";
import Link from "next/link";
import Reveal from "../util/Reveal";

export const Contact = () => {
  return (
    <section className="section-wrapper" id="contact">
      <div className="section-panel relative mx-auto max-w-3xl overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="absolute left-4 top-4 h-10 w-10 rotate-12 border-[3px] border-black bg-[var(--accent-secondary)] shadow-[5px_5px_0px_0px_#000]" />
        <div className="absolute bottom-5 right-5 h-6 w-24 -rotate-6 border-[3px] border-black bg-[var(--accent-tertiary)] shadow-[5px_5px_0px_0px_#000]" />
        <Reveal width="w-full">
          <div className="mx-auto mb-6 w-fit border-[3px] border-black bg-zinc-100 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-black shadow-[4px_4px_0px_0px_#000]">
            Open to interesting work
          </div>
          <h4 className="text-center text-4xl font-black uppercase md:text-6xl">
            Contact<span className="text-[var(--accent-primary)]">.</span>
          </h4>
        </Reveal>
        <Reveal width="w-full">
          <p className="my-8 text-center leading-relaxed text-zinc-300">
            Shoot me an email if you want to connect! You can also find me on{" "}
            <Link
              href="https://www.linkedin.com/in/samfitzpatrick1"
              target="_blank"
              className="accent-link"
            >
              Linkedin
            </Link>{" "}
            or{" "}
            <Link
              href="https://instagram.com/samfitzpatrick"
              target="_blank"
              className="accent-link"
            >
              Instagram
            </Link>{" "}
            if that&apos;s more your speed.
          </p>
        </Reveal>
        <Reveal width="w-full">
          <Link href="mailto:hello@samdoes.dev">
            <div className="mx-auto flex w-fit items-center justify-center gap-3 border-[3px] border-black bg-[var(--accent-primary)] px-5 py-3 text-lg font-black text-white shadow-[6px_6px_0px_0px_#000] transition-all hover:-translate-y-1 hover:translate-x-1 hover:bg-[var(--accent-secondary)] hover:text-black md:text-2xl">
              <AiFillMail />
              <span>hello@samdoes.dev</span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

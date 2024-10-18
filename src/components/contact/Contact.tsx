import { AiFillMail } from "react-icons/ai";
import Link from "next/link";
import Reveal from "../util/Reveal";

export const Contact = () => {
  return (
    <section className="section-wrapper" id="contact">
      <div className="max-w-xl mx-auto bg-zinc-800 px-8 py-12 rounded-xl">
        <Reveal width="w-full">
          <h4 className="text-4xl md:text-5xl text-center font-black">
            Contact<span className="text-burn">.</span>
          </h4>
        </Reveal>
        <Reveal width="w-full">
          <p className="text-center my-8 text-zinc-300 leading-relaxed">
            Shoot me an email if you want to connect! You can also find me on{" "}
            <Link
              href="https://www.linkedin.com/in/samfitzpatrick1"
              target="_blank"
              className="text-burnLight hover:underline"
            >
              Linkedin
            </Link>{" "}
            or{" "}
            <Link
              href="https://instagram.com/samfitzpatrick"
              target="_blank"
              className="text-burnLight hover:underline"
            >
              Instagram
            </Link>{" "}
            if that&apos;s more your speed.
          </p>
        </Reveal>
        <Reveal width="w-full">
          <Link href="mailto:hello@samdoes.dev">
            <div className="flex items-center justify-center gap-2 w-fit text-lg md:text-2xl whitespace-normal mx-auto hover:text-burnLight transition-colors">
              <AiFillMail />
              <span>hello@samdoes.dev</span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

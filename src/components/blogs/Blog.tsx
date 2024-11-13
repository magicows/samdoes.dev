import { useAnimation, useInView, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiFillGithub, AiOutlineExport } from "react-icons/ai";
import { BlogModal } from "./BlogModal";
import Reveal from "../util/Reveal";
import { CalendarIcon } from "./CalendarIcon";

interface Props {
  post: any;
}

export const Blog = ({ post }: Props) => {
  const [hovered, setHovered] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const controls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      console.log(post.properties.Date.date);
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);  

  const example = {
    title: "Paint.app",
    imgSrc: "project-imgs/example-project.jpg",
    code: "https://www.github.com",
    projectLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tech: ["Flutter", "MUI", "Python", "FastAPI"],
    description:
      "A real-time coaching app for students learning to paint. This app is my baby, designed and built on my own.",
    modalContent: (
      <>
        <p>
          Pain.app is a real-time coaching app for students learning to paint.
          This app is my baby, designed and built on my own.
        </p>
        <p>
          The tech stack is based on top of Flutter for the mobile app,
          connected to a Python & FastAPI backend, with data stored in Postgres,
          deployed on Heroku.
        </p>
        <p>
          Because this isn&apos;t real, here&apos;s some gibberish to fill space{" "}
          {":)"}
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur
          quia officia odio nulla consectetur aperiam ad tempora magni magnam
          nesciunt.
        </p>
        <p>
          Fuga id sapiente facere ipsa eius exercitationem officiis deleniti,
          rerum dolorum. Deserunt soluta modi culpa animi.
        </p>
      </>
    ),
  };

  const tags =
    post.properties.Tags.multi_select.map((tag: any) => tag.name) || [];
  const slug = post.properties.Slug.rich_text[0]?.plain_text;
  const summary =
    post.properties.Summary.rich_text[0]?.plain_text || "Not yet.";
  const image = post.cover.external.url;
  
  return (
    <>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.75 }}
      >
        <Link href={`/blog/${slug}`}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setIsOpen(true)}
            className="w-full flex items-center aspect-video bg-zinc-700 cursor-pointer relative rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`An image of the ${example.title} project.`}
              style={{
                scale: hovered ? "1.05" : "1",
                rotate: hovered ? "2deg" : "0deg",
                filter: hovered ? "grayscale(1)" : "grayscale(0)",
              }}
              className="w-full transition-all rounded"
            />
          </div>
          <div className="mt-6">
            <Reveal width="w-full">
              <div className="flex items-center gap-2 w-full">
                <h4 className="font-bold text-lg shrink-0 max-w-[calc(100%_-_150px)]">
                  {post.properties.Title.title[0].plain_text}
                </h4>
                <div className="w-full h-[1px] bg-zinc-600" />
                <CalendarIcon dateString={post.properties.Date.date.start} />
                {/* <Link href={example.code} target="_blank" rel="nofollow">
                    <AiFillGithub className="text-xl text-zinc-300 hover:text-burnLight transition-colors" />
                  </Link>

                  <Link href={example.projectLink} target="_blank" rel="nofollow">
                    <AiOutlineExport className="text-xl text-zinc-300 hover:text-burnLight transition-colors" />
                  </Link> */}
              </div>
            </Reveal>
            <Reveal width="w-full">
              <div className={"flex flex-row justify-between items-center"}>
                <div className="flex flex-wrap gap-4 text-sm text-burnLight my-2">
                  {tags.join(" - ")}
                </div>                
              </div>
            </Reveal>
            <Reveal>
              <p className="text-zinc-300 leading-relaxed">
                {summary}{" "}
                <span
                  className="inline-block text-sm text-burn cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  Learn more {">"}
                </span>
              </p>
            </Reveal>
          </div>
        </Link>
      </motion.div>
      {/* <BlogModal
        modalContent={example.modalContent}
        projectLink={example.projectLink}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        imgSrc={example.imgSrc}
        title={post.properties.Title.title[0].plain_text}
        code={example.code}
        tech={tags}
      /> */}
    </>
  );
};

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { SplitFlapText } from "./SplitFlapText";

const shapes = [
  {
    id: "panel-a",
    width: 188,
    height: 94,
    baseX: 18,
    baseY: 24,
    fill: "var(--accent-secondary)",
    words: ["BUILD", "CRAFT", "FORGE", "WRITE", "SHIP"],
    textColor: "#0b0c0f",
    depth: 0.18,
    animDelay: 300,
    cycleInterval: 2600,
  },
  {
    id: "panel-b",
    width: 132,
    height: 132,
    baseX: 274,
    baseY: 54,
    fill: "var(--accent-primary)",
    words: ["TINKER", "DESIGN", "SKETCH", "DEPLOY", "DEBUG"],
    textColor: "#ffffff",
    depth: 0.24,
    animDelay: 550,
    cycleInterval: 3100,
  },
  {
    id: "panel-c",
    width: 176,
    height: 76,
    baseX: 162,
    baseY: 230,
    fill: "#f4f4f5",
    words: ["PLAY", "VIBE", "REST", "LOOP"],
    textColor: "#0b0c0f",
    depth: 0.14,
    animDelay: 800,
    cycleInterval: 3500,
  },
  {
    id: "bar-a",
    width: 82,
    height: 34,
    baseX: 320,
    baseY: 198,
    fill: "var(--accent-tertiary)",
    words: [] as string[],
    textColor: "#0b0c0f",
    depth: 0.3,
    animDelay: 0,
    cycleInterval: 0,
  },
  {
    id: "bar-b",
    width: 58,
    height: 58,
    baseX: 336,
    baseY: 278,
    fill: "#1f242b",
    words: [] as string[],
    textColor: "#ffffff",
    depth: 0.22,
    animDelay: 0,
    cycleInterval: 0,
  },
  {
    id: "dot-a",
    width: 26,
    height: 26,
    baseX: 390,
    baseY: 28,
    fill: "var(--accent-secondary)",
    words: [] as string[],
    textColor: "#0b0c0f",
    depth: 0.32,
    animDelay: 0,
    cycleInterval: 0,
  },
];

export default function HeroCircuit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(0);

  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0, 600], [0, 36]);
  const floatRotate = useTransform(scrollY, [0, 600], [0, 4]);

  return (
    <div className="pointer-events-none absolute right-8 top-1/2 hidden w-[28rem] -translate-y-1/2 items-center justify-center md:flex">
      <div
        ref={containerRef}
        className="pointer-events-auto relative h-[360px] w-full"
        onMouseMove={(event) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;

          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;

          setPointer({ x, y });
        }}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        onClick={() => setPulse((value) => value + 1)}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: floatY, rotate: floatRotate }}
        >
          {shapes.map((shape, index) => {
            const offsetX = pointer.x * 24 * shape.depth;
            const offsetY = pointer.y * 18 * shape.depth;
            const pulseScale = pulse % 2 === 0 ? 1 : 1.03 + shape.depth * 0.08;
            const idleOffset = (index % 2 === 0 ? -1 : 1) * (8 + index * 1.5);

            return (
              // Outer: pointer tracking only — spring re-targets smoothly on every move
              <motion.div
                key={shape.id}
                className="absolute"
                style={{ left: shape.baseX, top: shape.baseY }}
                animate={{ x: offsetX, y: offsetY }}
                transition={{
                  x: { type: "spring", stiffness: 120, damping: 18 },
                  y: { type: "spring", stiffness: 120, damping: 18 },
                }}
              >
                {/* Inner: idle float + pulse — anchored to 0 so it never restarts on mouse move */}
                <motion.div
                  className="border-[3px] border-black shadow-[8px_8px_0px_0px_#000]"
                  style={{ width: shape.width, height: shape.height, background: shape.fill }}
                  animate={{
                    y: [0, idleOffset, 0],
                    scale: pulseScale,
                    rotate: pulse % 2 === 0 ? [0, index % 2 === 0 ? 1.2 : -1.2, 0] : (index % 2 === 0 ? 1.8 : -1.8),
                  }}
                  transition={{
                    y: { duration: 4.8 + index * 0.35, repeat: Infinity, ease: "easeInOut" },
                    scale: { type: "spring", stiffness: 180, damping: 12 },
                    rotate: pulse % 2 === 0
                      ? { duration: 5.4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
                      : { type: "spring", stiffness: 180, damping: 14 },
                  }}
                >
                  {shape.words.length > 0 ? (
                    <div className="flex h-full w-full items-center justify-center text-[22px] font-black uppercase tracking-[0.16em]">
                      <SplitFlapText
                        words={shape.words}
                        textColor={shape.textColor}
                        initialDelay={shape.animDelay}
                        cycleInterval={shape.cycleInterval}
                      />
                    </div>
                  ) : null}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Circle — outer tracks pointer, inner floats + pulses */}
          <motion.div
            className="absolute left-[132px] top-[116px] h-[120px] w-[120px]"
            animate={{ x: pointer.x * -10, y: pointer.y * -12 }}
            transition={{
              x: { type: "spring", stiffness: 110, damping: 18 },
              y: { type: "spring", stiffness: 110, damping: 18 },
            }}
          >
            <motion.div
              className="h-full w-full rounded-full border-[3px] border-black bg-zinc-950 shadow-[8px_8px_0px_0px_#000]"
              animate={{
                y: [0, -10, 0],
                scale: pulse % 2 === 0 ? 1 : 1.08,
              }}
              transition={{
                y: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 170, damping: 12 },
              }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-black bg-[var(--accent-primary)]"
                animate={{ scale: pulse % 2 === 0 ? 1 : 1.22 }}
                transition={{ type: "spring", stiffness: 220, damping: 12 }}
              />
            </motion.div>
          </motion.div>

          {/* Bar — outer tracks pointer, inner floats */}
          <motion.div
            className="absolute left-[354px] top-[250px]"
            animate={{ x: pointer.x * 10, y: pointer.y * 6 }}
            transition={{
              x: { type: "spring", stiffness: 140, damping: 18 },
              y: { type: "spring", stiffness: 140, damping: 18 },
            }}
          >
            <motion.div
              className="h-[16px] w-[50px] border-[3px] border-black bg-zinc-100 shadow-[6px_6px_0px_0px_#000]"
              animate={{ y: [0, 8, 0] }}
              transition={{ y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" } }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

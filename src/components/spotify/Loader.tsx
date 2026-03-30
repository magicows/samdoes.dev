import React, { useEffect, useState } from "react";
import {
  AnimationProps,
  motion,
  useAnimate,
} from "framer-motion";

const NUM_BLOCKS = 5;
const BLOCK_SIZE = 32;

const DURATION_IN_MS = 175;
const DURATION_IN_SECS = DURATION_IN_MS * 0.001;

const TRANSITION = {
  ease: "easeInOut",
  duration: DURATION_IN_SECS,
};

export const ShuffleLoader = () => {
  const [blocks, setBlocks] = useState(
    Array.from(Array(NUM_BLOCKS).keys()).map((n) => ({ id: n }))
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      shuffle();
    }, DURATION_IN_MS * 4); // Control how often shuffle happens

    return () => {
      clearInterval(intervalId); // Clean up on unmount
    };
  }, []);

  const shuffle = async () => {
    const [first, second] = pickTwoRandom();

    const firstSelector = `[data-block-id="${first.id}"]`;
    const secondSelector = `[data-block-id="${second.id}"]`;

    // Animate the elements - using type assertion to work with framer-motion 11
    await animate(firstSelector, { y: -BLOCK_SIZE } as any, TRANSITION as any);
    await animate(secondSelector, { y: BLOCK_SIZE } as any, TRANSITION as any);

    await delay(DURATION_IN_MS);

    setBlocks((pv) => {
      const copy = [...pv];
      const indexForFirst = copy.indexOf(first);
      const indexForSecond = copy.indexOf(second);
      copy[indexForFirst] = second;
      copy[indexForSecond] = first;
      return copy;
    });

    await delay(DURATION_IN_MS * 2);

    await animate(firstSelector, { y: 0 } as any, TRANSITION as any);
    await animate(secondSelector, { y: 0 } as any, TRANSITION as any);

    await delay(DURATION_IN_MS);
  };

  const pickTwoRandom = () => {
    const index1 = Math.floor(Math.random() * blocks.length);
    let index2 = Math.floor(Math.random() * blocks.length);

    while (index2 === index1) {
      index2 = Math.floor(Math.random() * blocks.length);
    }

    return [blocks[index1], blocks[index2]];
  };

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  return (
    <div ref={scope} className="flex divide-x divide-neutral-950">
      {blocks.map((b) => {
        return (
          <motion.div
            layout
            data-block-id={b.id}
            key={b.id}
            transition={TRANSITION as AnimationProps["transition"]}
            style={{
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
            }}
            className="bg-burn"
          />
        );
      })}
    </div>
  );
};
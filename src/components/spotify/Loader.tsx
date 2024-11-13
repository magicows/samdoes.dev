import React, { useEffect, useState } from "react";
import {
  AnimationProps,
  DynamicAnimationOptions,
  motion,
  useAnimate,
} from "framer-motion";

const NUM_BLOCKS = 5;
const BLOCK_SIZE = 32;

const DURATION_IN_MS = 175;
const DURATION_IN_SECS = DURATION_IN_MS * 0.001;

const TRANSITION: DynamicAnimationOptions = {
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

    const firstElement = document.querySelector(`[data-block-id="${first.id}"]`);
    const secondElement = document.querySelector(`[data-block-id="${second.id}"]`);

    if (firstElement && secondElement) {
      // Animate the elements only if they exist
      await animate(firstElement, { y: -BLOCK_SIZE }, TRANSITION);
      await animate(secondElement, { y: BLOCK_SIZE }, TRANSITION);

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

      await animate(firstElement, { y: 0 }, TRANSITION);
      await animate(secondElement, { y: 0 }, TRANSITION);

      await delay(DURATION_IN_MS);
    }
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
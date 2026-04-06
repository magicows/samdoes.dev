"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-+";
const FRAMES_PER_CHAR = 10;
const FRAME_MS = 38;
const STAGGER_MS = 55;

function centerPad(word: string, len: number): string {
  const totalPad = len - word.length;
  if (totalPad <= 0) return word;
  const left = Math.floor(totalPad / 2);
  const right = totalPad - left;
  return "\u00A0".repeat(left) + word + "\u00A0".repeat(right);
}

export function SplitFlapText({
  words,
  cycleInterval = 2800,
  textColor,
  className,
  initialDelay = 500,
}: {
  words: string[];
  cycleInterval?: number;
  textColor: string;
  className?: string;
  initialDelay?: number;
}) {
  const maxLen = Math.max(...words.map((w) => w.length));
  const padded = words.map((w) => centerPad(w, maxLen));

  const [activeWord, setActiveWord] = useState(0);
  const [chars, setChars] = useState<string[]>(() => Array(maxLen).fill("\u00A0"));
  const animTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const animateTo = useCallback((word: string) => {
    animTimers.current.forEach(clearTimeout);
    animTimers.current = [];

    word.split("").forEach((targetChar, charIdx) => {
      const isBlank = targetChar === "\u00A0";

      for (let frame = 0; frame <= (isBlank ? 0 : FRAMES_PER_CHAR); frame++) {
        const t = setTimeout(() => {
          setChars((prev) => {
            const next = [...prev];
            next[charIdx] =
              isBlank || frame === FRAMES_PER_CHAR
                ? targetChar
                : CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)];
            return next;
          });
        }, charIdx * STAGGER_MS + frame * FRAME_MS);
        animTimers.current.push(t);
      }
    });
  }, []);

  // Trigger animation whenever active word changes
  useEffect(() => {
    const target = padded[activeWord];
    if (activeWord === 0) {
      const t = setTimeout(() => animateTo(target), initialDelay);
      return () => clearTimeout(t);
    }
    animateTo(target);
  // padded and animateTo are stable — activeWord drives this
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWord]);

  // Cycle the word index
  useEffect(() => {
    const t = setInterval(() => {
      setActiveWord((i) => (i + 1) % words.length);
    }, cycleInterval);
    return () => clearInterval(t);
  }, [words.length, cycleInterval]);

  // Cleanup animation timers on unmount
  useEffect(() => {
    return () => { animTimers.current.forEach(clearTimeout); };
  }, []);

  return (
    <span className={className} style={{ color: textColor }}>
      {chars.join("")}
    </span>
  );
}

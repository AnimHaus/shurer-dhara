"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface WordRevealProps {
  /** The text to split and reveal word by word */
  text: string;
  /** className applied to the wrapping element */
  className?: string;
  /** Base delay before the first word starts */
  delay?: number;
  /** Stagger between each word in seconds */
  stagger?: number;
  /** Duration of each word's slide */
  duration?: number;
  /**
   * If true, fires on page load.
   * If false/omitted, fires when scrolled into view.
   */
  onLoad?: boolean;
}

/**
 * Splits `text` into words and reveals each one individually from behind
 * an overflow-hidden mask, staggered left to right.
 *
 * Uses useInView on the outer container so clipped children are observed
 * correctly (whileInView on overflow-hidden children can silently fail).
 */
export default function WordReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  duration = 0.85,
  onLoad = false,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (onLoad || inView) {
      controls.start("visible");
    }
  }, [onLoad, inView, controls]);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => {
        const wordDelay = delay + i * stagger;
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.22em] last:mr-0 leading-[1.1]">
            <motion.span
              className="inline-block"
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%" },
              }}
              transition={{ duration, delay: wordDelay, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

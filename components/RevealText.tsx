"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface RevealTextProps {
  /** className applied to the outer overflow-hidden wrapper */
  className?: string;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  /**
   * If true, fires on page load.
   * If false/omitted, fires when scrolled into view.
   */
  onLoad?: boolean;
}

/**
 * Clip-reveal wrapper: slides children up from behind an overflow-hidden mask.
 *
 * Uses useInView on the outer wrapper so the clipped inner element is
 * observed correctly (whileInView on overflow-hidden children can silently fail).
 */
export default function RevealText({
  className,
  children,
  delay = 0,
  duration = 0.85,
  onLoad = false,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (onLoad || inView) {
      controls.start({ y: "0%" });
    }
  }, [onLoad, inView, controls]);

  return (
    <div ref={ref} className={`overflow-hidden${className ? ` ${className}` : ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={controls}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import TransitionLink from "@/components/TransitionLink";

interface School {
  country: string;
  city: string;
  flag: string;
  description: string;
  address: string;
  image: string;
  founded: string;
}

interface SchoolsListSectionProps {
  id?: string;
  label: string;
  title: string;
  cta: string;
  href: string;
  schools: School[];
}

export default function SchoolsListSection({
  id,
  label,
  title,
  cta,
  href,
  schools,
}: SchoolsListSectionProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0.05, 0.3], [30, 0]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative bg-parchment overflow-hidden pb-24 px-8 md:px-24"
    >
      {/* Floating image preview — removed, now inline per row */}

      {/* Header */}
      <motion.div
        style={{ y: yText }}
        className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-16 border-t border-charcoal/15 pt-10"
      >
        <p className="text-[10px] uppercase  text-charcoal/40 font-semibold flex items-center gap-2 mt-1">
          {label}
        </p>
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-charcoal leading-tight mb-8 mr-0 md:mr-36">
            <WordReveal text={title} />
          </h2>
          <TransitionLink
            href={href}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-parchment text-xs font-semibold uppercase hover:bg-crimson transition-colors duration-500 rounded-full"
          >
            {cta}
          </TransitionLink>
        </div>
      </motion.div>

      {/* School list */}
      <motion.div style={{ opacity, y: yText }}>
        {schools.map((school, idx) => (
          <TransitionLink
            key={idx}
            href={href}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative flex items-center justify-between border-t border-charcoal/15 py-5 md:py-6 gap-4 md:gap-6 cursor-pointer"
          >
            {/* Name */}
            <span
              className="font-display text-xl md:text-3xl font-semibold text-charcoal/50 group-hover:text-charcoal transition-colors duration-300"
            >
              {school.country}
            </span>

            {/* Centered hover image */}
            <AnimatePresence>
              {hoveredIdx === idx && (
                <motion.div
                  key="img"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-20 w-52 h-64 overflow-hidden shadow-2xl shadow-charcoal/20"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={school.image}
                    alt={school.city}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Arrow */}
            <span className="text-charcoal/30 group-hover:text-charcoal transition-colors duration-300 text-lg">↗</span>
          </TransitionLink>
        ))}
        <div className="border-t border-charcoal/15" />
      </motion.div>
    </section>
  );
}
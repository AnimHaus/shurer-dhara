"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function HeroSection({ hero }: { hero: Dictionary["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Parallax image layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Evening_on_Tagore_-_Kolkata_2011-05-09_3084.JPG"
          alt="Prof. Rezwana Choudhury Bannya performing at an Evening on Tagore event, Kolkata 2011"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <h1 className="font-display text-[3.5rem] sm:text-7xl md:text-[11rem] font-bold text-white leading-none mb-6 md:mb-8">
            <WordReveal text={hero.title} onLoad delay={0.35} duration={1.1} />
          </h1>

        <RevealText onLoad delay={0.55} duration={0.9}>
          <p className="text-base md:text-xl text-white/55 leading-relaxed mb-8 md:mb-12 max-w-xl mx-auto font-light">
            {hero.tagline}
          </p>
        </RevealText>

        <RevealText onLoad delay={0.7} duration={0.8}>
          <a
            href="#schools-preview"
            className="inline-block px-10 py-4 border border-white/35 text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
          >
            {hero.cta}
          </a>
        </RevealText>
      </div>
    </section>
  );
}

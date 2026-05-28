"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80"
          alt="Classical music performance"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-8xl md:text-[11rem] font-bold text-white leading-none mb-8 "
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-white/55 leading-relaxed mb-12 max-w-xl mx-auto font-light"
        >
          {hero.tagline}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          href="#schools-preview"
          className="inline-block px-10 py-4 border border-white/35 text-white text-xs font-semibold  uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
        >
          {hero.cta}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  );
}

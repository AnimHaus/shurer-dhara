"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type SchoolsDict = Dictionary["pages"]["schools"];

export default function SchoolsHero({ p }: { p: SchoolsDict }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden flex items-end pb-16 px-8 md:px-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
          alt="Music schools"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight">
            <WordReveal text={p.title} onLoad delay={0.15} />
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-8 md:px-24 max-w-4xl">
        <RevealText onLoad delay={0.4} duration={0.8}>
          <p className="text-white/60 text-xl leading-relaxed font-light">{p.intro}</p>
        </RevealText>
      </section>
    </>
  );
}

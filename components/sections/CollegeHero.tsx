"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type CollegeDict = Dictionary["pages"]["college"];

export default function CollegeHero({ p }: { p: CollegeDict }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden flex items-end pb-20 px-8 md:px-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.shurerdhara.com/shurer_dhara_college_1.jpeg"
          alt="Surer Dhara College of Music"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs uppercase text-crimson font-semibold tracking-widest mb-5"
          >
            {p.heroLabel}
          </motion.p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8">
            <WordReveal text={p.heroTitle} onLoad delay={0.25} />
          </h1>
          <RevealText onLoad delay={0.5} duration={0.8}>
            <p className="text-white/55 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
              {p.heroTagline}
            </p>
          </RevealText>
        </div>
      </section>
    </>
  );
}

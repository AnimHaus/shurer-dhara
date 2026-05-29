"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorHero({ p }: { p: ProfDict }) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Rezwana_Choudhury_Bannya.jpg"
          alt="Prof. (Dr.) Rezwana Choudhury Bannya"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark bottom scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 min-h-screen flex items-end pb-20 px-8 md:px-24 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl backdrop-blur-md bg-white/8 border border-white/15 rounded-2xl px-8 py-8"
          >
              <h1 className="font-display text-2xl md:text-4xl font-bold leading-tight text-white mb-6">
                <WordReveal text={p.name} onLoad delay={0.35} duration={1} />
              </h1>
            <RevealText onLoad delay={0.55} duration={0.8}>
              <p className="text-white/70 text-sm md:text-[16px] leading-relaxed font-light">{p.tagline}</p>
            </RevealText>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-charcoal py-24 px-8 md:px-24">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-display text-3xl md:text-4xl text-white leading-relaxed italic mb-8">
            &ldquo;{p.quote}&rdquo;
          </p>
          <cite className="text-white/40 text-xs uppercase not-italic">{p.quoteCite}</cite>
        </motion.blockquote>
      </section>
    </>
  );
}

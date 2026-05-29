"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorBio({ p }: { p: ProfDict }) {
  return (
    <section className="py-24 px-8 md:px-24 max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ x: -40 }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <RevealText>
          <p className="text-xs uppercase text-crimson font-medium mb-5">{p.aboutLabel}</p>
        </RevealText>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
            <WordReveal text={p.aboutTitle} delay={0.1} />
          </h2>
        <div className="space-y-5 text-charcoal/65 leading-relaxed font-light">
          <p>{p.bio1}</p>
          <p>{p.bio2}</p>
          <p>{p.bio3}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Rezwana_Choudhury_Bannya_New_Jersey_2_(cropped).jpg"
          alt="Prof. (Dr.) Rezwana Choudhury Bannya"
          className="w-full aspect-[4/5] object-cover object-top"
        />
        <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ddnews.gov.in/wp-content/uploads/2024/04/bangla-padma-2.jpeg"
            alt="Rezwana Choudhury Bannya receiving Padma Shri Award 2024"
            className="w-full h-full object-cover object-left border-4 border-parchment"
          />
        </div>
      </motion.div>
    </section>
  );
}

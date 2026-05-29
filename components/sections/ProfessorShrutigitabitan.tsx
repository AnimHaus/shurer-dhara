"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorShrutigitabitan({ p }: { p: ProfDict }) {
  return (
    <section className="py-24 px-8 md:px-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Ambassador_Earl_Miller_at_Dhaka_University_on_EMK_Day_(50325334878).jpg"
            alt="Prof. Bannya at Dhaka University"
            className="w-full aspect-[4/3] object-cover rounded-2xl"
          />
          {/* Stat overlay */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-crimson text-white p-3 md:p-6 rounded-xl md:rounded-2xl shadow-xl">
            <p className="font-display text-3xl md:text-5xl font-bold leading-none">2,233</p>
            <p className="text-[10px] md:text-xs uppercase  mt-1 text-white/80">{p.shrutiStatSongs}</p>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ x: 40 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <RevealText>
            <p className="text-xs uppercase text-crimson font-medium mb-5">{p.shrutiLabel}</p>
          </RevealText>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
              <WordReveal text={p.shrutiTitle} delay={0.1} />
            </h2>
          <p className="text-charcoal/65 leading-relaxed font-light text-lg mb-8">
            {p.shrutiBody}
          </p>
          <div className="flex gap-8">
            <div>
              <p className="font-display text-3xl font-bold text-charcoal">{p.shrutiStat400}</p>
              <p className="text-xs text-charcoal/50 uppercase  mt-1">{p.shrutiStatSingers}</p>
            </div>
            <div className="w-px bg-charcoal/15" />
            <div>
              <p className="font-display text-3xl font-bold text-charcoal">{p.shrutiStat2011}</p>
              <p className="text-xs text-charcoal/50 uppercase  mt-1">{p.shrutiStatLaunched}</p>
            </div>
            <div className="w-px bg-charcoal/15" />
            <div>
              <p className="font-display text-3xl font-bold text-charcoal">{p.shrutiStatAmartyaSen}</p>
              <p className="text-xs text-charcoal/50 uppercase  mt-1">{p.shrutiStatInauguratedBy}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

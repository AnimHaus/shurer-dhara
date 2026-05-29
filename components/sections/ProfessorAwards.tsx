"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorAwards({ p }: { p: ProfDict }) {
  return (
    <section className="py-24 px-8 md:px-24 bg-parchment">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <RevealText>
            <p className="text-xs uppercase text-crimson font-medium mb-4">{p.awardsLabel}</p>
          </RevealText>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              <WordReveal text={p.awardsTitle} delay={0.1} />
            </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-charcoal/12 hidden md:block" />

          <div className="space-y-0">
            {p.awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 group py-5 border-b border-charcoal/8 last:border-0"
              >
                {/* Year */}
                <div className="w-20 shrink-0 text-right hidden md:block">
                  <span className={`text-sm font-bold ${award.highlight ? "text-crimson" : "text-charcoal/40"}`}>
                    {award.year}
                  </span>
                </div>

                {/* Dot */}
                <div className="hidden md:flex items-start pt-1">
                  <div className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ring-2 ring-offset-2 ring-offset-parchment ${award.highlight ? "bg-crimson ring-crimson/30" : "bg-charcoal/20 ring-transparent"}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="md:hidden text-xs font-bold text-crimson">{award.year}</span>
                    <h3 className={`font-semibold text-base leading-snug ${award.highlight ? "text-charcoal" : "text-charcoal/80"}`}>
                      {award.title}
                    </h3>
                    {award.highlight && (
                      <span className="text-[9px] font-bold uppercase  bg-crimson/10 text-crimson px-2 py-0.5 rounded-full">
                        {p.majorAwardBadge}
                      </span>
                    )}
                  </div>
                  <p className="text-charcoal/50 text-sm leading-relaxed">{award.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorGlobal({ p }: { p: ProfDict }) {
  return (
    <section className="py-24 px-8 md:px-24 bg-charcoal text-parchment overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="font-display text-white text-4xl md:text-5xl font-bold mb-6">
            <WordReveal text={p.globalTitle} />
          </h2>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">{p.globalBody}</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-parchment/10 rounded-2xl overflow-hidden mb-16"
        >
          {p.globalStats.map((s) => (
            <div key={s.label} className="bg-charcoal px-6 py-8 text-center">
              <div className="font-display text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs uppercase  text-white/40">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Regions grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {p.globalRegions.map((region, i) => (
            <motion.div
              key={region.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="border border-parchment/10 rounded-2xl p-6 hover:border-crimson/40 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold uppercase  text-crimson mb-4">
                {region.label}
              </h3>
              <ul className="space-y-2">
                {region.venues.map((venue) => (
                  <li key={venue} className="flex items-start gap-2 text-white/60 text-sm">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-parchment/25 shrink-0" />
                    {venue}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

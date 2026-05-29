"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type MFDDict = Dictionary["pages"]["mfd"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function MFDTimeline({ p }: { p: MFDDict }) {
  return (
    <section className="py-24 px-8 md:px-24 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-xs uppercase text-crimson font-medium mb-4">{p.historyLabel}</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">{p.historyTitle}</h2>
      </motion.div>
      <div className="space-y-0">
        {p.timeline.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="flex gap-8 py-8 border-b border-white/10 last:border-0"
          >
            <div className="w-20 shrink-0">
              <span className="font-display text-2xl font-bold text-crimson">{item.year}</span>
            </div>
            <p className="text-white/55 leading-relaxed font-light">{item.event}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

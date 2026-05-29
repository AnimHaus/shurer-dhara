"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProfessorAchievements({ p }: { p: ProfDict }) {
  return (
    <section className="bg-charcoal py-24 px-8 md:px-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="text-xs uppercase text-crimson font-medium mb-4">{p.legacyLabel}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">{p.legacyTitle}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {p.achievements.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="bg-charcoal p-8 hover:bg-white/5 transition-colors duration-500"
            >
              <p className="text-crimson font-display text-3xl font-bold mb-3">{item.year}</p>
              <h3 className="text-white font-semibold mb-3">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type SchoolsDict = Dictionary["pages"]["schools"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function SchoolsGrid({ p }: { p: SchoolsDict }) {
  return (
    <section className="px-8 md:px-24 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {p.schools.map((school, i) => (
          <motion.div
            key={school.country}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="group relative overflow-hidden border border-white/10 hover:border-crimson/40 transition-colors duration-500"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={school.image}
                alt={school.city}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
              <div className="absolute top-4 left-4 text-3xl">{school.flag}</div>
              <div className="absolute bottom-4 right-4 text-xs text-white/40">{school.founded}</div>
            </div>
            {/* Content */}
            <div className="p-8">
              <p className="text-xs uppercase text-crimson font-medium mb-2">{school.city}</p>
              <h3 className="font-display text-3xl font-bold text-white mb-4">{school.country}</h3>
              <p className="text-white/50 leading-relaxed text-sm font-light mb-6">{school.description}</p>
              <p className="text-white/30 text-xs">📍 {school.address}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

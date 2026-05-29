"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type MFDDict = Dictionary["pages"]["mfd"];

export default function MFDOurStory({ p }: { p: MFDDict }) {
  return (
    <section className="py-24 px-8 md:px-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs uppercase text-crimson font-medium mb-5">{p.storyLabel}</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {p.storyTitle}
        </h2>
        <div className="space-y-5 text-white/55 leading-relaxed font-light">
          <p>{p.story1}</p>
          <p>{p.story2}</p>
          <p>{p.story3}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-2 gap-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=600&q=80"
          alt="Children singing"
          className="w-full aspect-square object-cover col-span-2"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80"
          alt="Education"
          className="w-full aspect-square object-cover"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80"
          alt="Performance"
          className="w-full aspect-square object-cover"
        />
      </motion.div>
    </section>
  );
}

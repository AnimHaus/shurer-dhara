"use client";

import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ProfDict = Dictionary["pages"]["professor"];

export default function ProfessorCta({ lang, p }: { lang: Locale; p: ProfDict }) {
  return (
    <section className="bg-parchment py-24 px-8 md:px-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">{p.ctaTitle}</h2>
        <p className="text-charcoal/60 text-lg mb-10 font-light">{p.ctaSubtitle}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <TransitionLink
            href={`/${lang}/schools`}
            className="inline-block px-10 py-4 bg-crimson text-white text-xs font-semibold uppercase hover:bg-charcoal transition-all duration-500 rounded-full"
          >
            {p.findSchool}
          </TransitionLink>
          <TransitionLink
            href={`/${lang}/mfd`}
            className="inline-block px-10 py-4 border border-charcoal/30 text-charcoal text-xs font-semibold uppercase hover:bg-charcoal hover:text-white transition-all duration-500 rounded-full"
          >
            {p.mfdLink}
          </TransitionLink>
        </div>
      </motion.div>
    </section>
  );
}

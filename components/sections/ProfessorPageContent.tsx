"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ProfessorPageContent({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const p = dict.pages.professor;

  return (
    <div className="bg-parchment text-charcoal min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
          alt="Professor Rezwana"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/85 to-transparent" />

        <div className="relative z-10 min-h-screen flex items-center px-8 md:px-24 py-32">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl font-bold leading-tight text-charcoal mb-8"
            >
              {p.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="text-charcoal/65 text-lg leading-relaxed font-light"
            >
              {p.tagline}
            </motion.p>
          </div>
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
          <cite className="text-white/40 text-xs uppercase  not-italic">
            {p.quoteCite}
          </cite>
        </motion.blockquote>
      </section>

      {/* About text */}
      <section className="py-24 px-8 md:px-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase  text-crimson font-medium mb-5">
            {p.aboutLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
            {p.aboutTitle}
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
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80"
            alt="Music performance"
            className="w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 w-1/2 aspect-square">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80"
              alt="Singing"
              className="w-full h-full object-cover border-4 border-parchment"
            />
          </div>
        </motion.div>
      </section>

      {/* Achievements timeline */}
      <section className="bg-charcoal py-24 px-8 md:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 text-center"
          >
            <p className="text-xs uppercase  text-crimson font-medium mb-4">
              {p.legacyLabel}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              {p.legacyTitle}
            </h2>
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
                <p className="text-crimson font-display text-3xl font-bold mb-3">
                  {item.year}
                </p>
                <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-parchment py-24 px-8 md:px-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
            {p.ctaTitle}
          </h2>
          <p className="text-charcoal/60 text-lg mb-10 font-light">
            {p.ctaSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${lang}/schools`}
              className="inline-block px-10 py-4 bg-crimson text-white text-xs font-semibold  uppercase hover:bg-charcoal transition-all duration-500"
            >
              {p.findSchool}
            </Link>
            <Link
              href={`/${lang}/mfd`}
              className="inline-block px-10 py-4 border border-charcoal/30 text-charcoal text-xs font-semibold  uppercase hover:bg-charcoal hover:text-white transition-all duration-500"
            >
              {p.mfdLink}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
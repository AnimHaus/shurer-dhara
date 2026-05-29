"use client";

import { motion } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type MFDDict = Dictionary["pages"]["mfd"];

export default function MFDHero({ lang, p }: { lang: Locale; p: MFDDict }) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/MFD.webp"
          alt="Music for Development"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal" />

        <div className="relative z-10 px-8 md:px-24 max-w-4xl pt-32">
          <RevealText onLoad delay={0.2} duration={0.7}>
            <p className="text-xs uppercase text-crimson font-medium mb-6">{p.initLabel}</p>
          </RevealText>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-8">
              <WordReveal text={p.title} onLoad delay={0.35} duration={1} />
            </h1>
          <RevealText onLoad delay={0.55} duration={0.8}>
            <p className="text-white/55 text-xl leading-relaxed font-light max-w-2xl">{p.tagline}</p>
          </RevealText>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-4"
          >
            <a
              href="https://www.musicfordevelopment.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 bg-crimson text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
            >
              {p.visitBtn}
            </a>
            <TransitionLink
              href={`/${lang}/bannya`}
              className="inline-block px-10 py-4 border border-white/25 text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
            >
              {p.meetProfBtn}
            </TransitionLink>
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-crimson py-20 px-8 md:px-24">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl"
        >
          <p className="font-display text-3xl md:text-4xl text-white leading-relaxed italic mb-6">
            &ldquo;{p.quote}&rdquo;
          </p>
          <cite className="text-white/60 text-xs uppercase not-italic">
            {p.quoteCite}
          </cite>
        </motion.blockquote>
      </section>
    </>
  );
}

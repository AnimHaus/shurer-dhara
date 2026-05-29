"use client";

import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type MFDDict = Dictionary["pages"]["mfd"];

export default function MFDCtaBanner({ p }: { p: MFDDict }) {
  return (
    <section className="relative py-32 px-8 md:px-24 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/MFD.webp"
        alt="Support MFD"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8">
            <WordReveal text={p.ctaTitle} />
          </h2>
        <RevealText delay={0.15}>
          <p className="text-white/55 text-lg font-light mb-12">{p.ctaSubtitle}</p>
        </RevealText>
        <RevealText delay={0.25}>
          <a
            href="https://www.musicfordevelopment.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-crimson text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
          >
            {p.ctaBtn}
          </a>
        </RevealText>
      </div>
    </section>
  );
}

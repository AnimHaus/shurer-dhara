"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type MFDDict = Dictionary["pages"]["mfd"];

const rowImages = [
  { src: "/our_story.webp", alt: "Our Story", href: "https://www.musicfordevelopment.net/our-story" },
  { src: "/what_we_do.webp", alt: "What We Do", href: "https://www.musicfordevelopment.net/what-we-do" },
  { src: "/show_case_events.webp", alt: "Showcase of Events", href: "https://www.musicfordevelopment.net/showcase-of-events" },
  { src: "/meet_mfd.webp", alt: "Meet the MFD Children", href: "https://www.musicfordevelopment.net/meet-the-mfd-children" },
];

export default function MFDRows({ p }: { p: MFDDict }) {
  return (
    <section className="py-0">
      {p.rows.map((row, i) => {
        const imgLeft = i % 2 === 0;
        const { src, alt, href } = rowImages[i];
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
          >
            {imgLeft ? (
              <>
                <div className="relative overflow-hidden min-h-[320px] md:min-h-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} className="w-full h-full object-cover absolute inset-0" />
                </div>
                <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-white/5">
                  <p className="text-xs uppercase text-crimson font-medium mb-4">{row.label}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{row.title}</h2>
                  <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">{row.body}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
                  >
                    {row.linkText}
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-charcoal order-2 md:order-1">
                  <p className="text-xs uppercase text-crimson font-medium mb-4">{row.label}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">{row.title}</h2>
                  <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">{row.body}</p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
                  >
                    {row.linkText}
                  </a>
                </div>
                <div className="relative overflow-hidden min-h-[320px] md:min-h-0 order-1 md:order-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={alt} className="w-full h-full object-cover absolute inset-0" />
                </div>
              </>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}

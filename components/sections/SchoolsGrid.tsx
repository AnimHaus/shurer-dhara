"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type SchoolsDict = Dictionary["pages"]["schools"];
type School = SchoolsDict["schools"][number];

interface Production {
  title: string;
  year: string;
  description: string;
}

function hasProductions(school: School): school is School & { productions: Production[] } {
  return "productions" in school && Array.isArray((school as { productions?: unknown }).productions) && ((school as { productions?: Production[] }).productions?.length ?? 0) > 0;
}

function hasHighlights(school: School): school is School & { highlights: string[] } {
  return "highlights" in school && Array.isArray((school as { highlights?: unknown }).highlights);
}

function getTagline(school: School): string | null {
  return "tagline" in school ? ((school as { tagline?: string }).tagline ?? null) : null;
}

export default function SchoolsGrid({ p }: { p: SchoolsDict }) {
  return (
    <section className="pb-1 md:pb-32">
      {p.schools.map((school, i) => {
        const isEven = i % 2 === 0;
        const tagline = getTagline(school);

        return (
          <motion.article
            key={school.country}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid grid-cols-1 md:grid-cols-2 border-t border-white/10 group min-h-[500px]"
          >
            {/* ── Image ── */}
            <div
              className={`relative overflow-hidden h-72 md:h-auto ${
                !isEven ? "md:order-2" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={school.image}
                alt={school.city}
                className="absolute inset-0 w-full h-full object-cover opacity-45 transition-transform duration-[1.2s] group-hover:scale-[1.04]"
              />
              {/* directional fade toward content */}
              <div
                className={`absolute inset-0 bg-gradient-to-${
                  isEven ? "r" : "l"
                } from-charcoal via-charcoal/20 to-transparent`}
              />
              {/* large ghost index */}
              <span className="absolute bottom-4 right-5 font-display text-[7rem] md:text-[9rem] font-bold leading-none text-white/[0.04] select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* flag pill */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-charcoal/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-lg leading-none">{school.flag}</span>
                <span className="text-white/80 text-xs font-medium">{school.city}</span>
              </div>
            </div>

            {/* ── Content ── */}
            <div
              className={`flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 ${
                !isEven ? "md:order-1" : ""
              }`}
            >
              {/* Founded badge */}
              <p className="text-[10px] uppercase text-crimson/70 tracking-[0.22em] font-semibold mb-5">
                {school.founded}
              </p>

              {/* Country name */}
              <h2 className="font-display text-4xl md:text-[3.25rem] font-bold text-white leading-[1.1] mb-2">
                Shurer Dhara
                <br />
                <span className="text-white/80">{school.country}</span>
              </h2>

              {/* Tagline */}
              {tagline && (
                <p className="text-crimson/55 text-sm italic font-light mt-2 mb-7 leading-snug">
                  {tagline}
                </p>
              )}

              {/* Description */}
              <p className="text-white/55 leading-relaxed text-sm font-bold mb-8 max-w-[26rem]">
                {school.description}
              </p>

              {/* Highlights */}
              {hasHighlights(school) && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {school.highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 border border-white/10 text-white/38 text-[11px] rounded-full hover:border-crimson/30 hover:text-white/60 transition-colors duration-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Productions */}
              {hasProductions(school) && (
                <div>
                  <p className="text-[10px] uppercase text-white/25 tracking-[0.2em] font-semibold mb-4">
                    {p.productionsLabel}
                  </p>
                  <div className="space-y-4">
                    {school.productions.map((prod) => (
                      <div
                        key={prod.title}
                        className="flex gap-4 pl-4 border-l border-crimson/25"
                      >
                        <span className="text-crimson text-[11px] font-mono mt-0.5 w-10 shrink-0">
                          {prod.year}
                        </span>
                        <div>
                          <p className="text-white/75 text-sm font-medium leading-snug">
                            {prod.title}
                          </p>
                          <p className="text-white/35 text-xs leading-relaxed mt-0.5">
                            {prod.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Address */}
              <p className="text-white/20 text-[11px] mt-8 tracking-wide">
                📍 {school.address}
              </p>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

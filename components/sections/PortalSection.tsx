"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TransitionLink from "@/components/TransitionLink";
import WordReveal from "@/components/WordReveal";

interface PortalSectionProps {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  reverse?: boolean;
  textLeft?: boolean;
  split?: boolean;
  external?: boolean;
}

export default function PortalSection({
  id,
  title,
  description,
  href,
  cta,
  image,
  reverse = false,
  textLeft = false,
  split = false,
  external = false,
}: PortalSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const yText = useTransform(scrollYProgress, [0.1, 0.4], [40, 0]);

  const LinkComponent = external ? "a" : TransitionLink;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <section ref={ref} id={id} className="relative min-h-screen overflow-hidden bg-charcoal">
      {split ? (
        /* ── Split layout: text left, image right ── */
        <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-stretch">
          {/* Text column */}
          <div className="flex-1 flex items-center px-8 md:px-24 py-8 md:py-0">
            <div className="max-w-xl text-left">
              <motion.h2 style={{ y: yText }} className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                <WordReveal text={title} />
              </motion.h2>
              <motion.div style={{ opacity, y: yText }}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light max-w-md">
                  {description}
                </p>
                <LinkComponent
                  {...linkProps}
                  className="inline-block px-8 py-3.5 bg-crimson text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
                >
                  {cta}
                </LinkComponent>
              </motion.div>
            </div>
          </div>
          {/* Image column */}
          <div className="order-first md:order-none h-[100vw] md:h-auto md:flex-1 relative overflow-hidden">
            <motion.div style={{ y: yImg }} className="absolute inset-0 w-full h-[115%] -top-[7.5%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            style={{ y: yImg }}
            className="absolute inset-0 w-full h-[115%] -top-[7.5%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-50"
            />
          </motion.div>

          {/* Directional gradient */}
          <div
            className={`absolute inset-0 ${
              reverse
                ? "bg-gradient-to-r from-transparent via-black/20 to-black/80"
                : "bg-gradient-to-l from-transparent via-black/20 to-black/80"
            }`}
          />

          {/* Content */}
          <div
            className={`relative z-10 min-h-screen flex items-center ${
              reverse ? "justify-end" : "justify-start"
            } px-8 md:px-24 py-24 md:py-0`}
          >
            <div className={`max-w-xl ${reverse && !textLeft ? "text-right" : "text-left"}`}>
              {/* Title: word-by-word reveal */}
              <motion.h2
                style={{ y: yText }}
                className="font-display text-4xl md:text-7xl font-bold text-white leading-tight mb-4 md:mb-6"
              >
                <WordReveal text={title} />
              </motion.h2>
              {/* Description + CTA: fade in with scroll */}
              <motion.div style={{ opacity, y: yText }}>
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 md:mb-10 font-light max-w-md">
                  {description}
                </p>
                <LinkComponent
                  {...linkProps}
                  className="inline-block px-8 py-3.5 bg-crimson text-white text-xs font-semibold uppercase hover:bg-white hover:text-charcoal transition-all duration-500 rounded-full"
                >
                  {cta}
                </LinkComponent>
              </motion.div>
            </div>
          </div>

          {/* Vertical label */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${
              reverse ? "left-8" : "right-8"
            } hidden md:flex flex-col items-center gap-3 opacity-20`}
          >
            <div className="w-px h-16 bg-white" />
            <div className="w-px h-16 bg-white" />
          </div>
        </>
      )}
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface PortalSectionProps {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  reverse?: boolean;
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

  const LinkComponent = external ? "a" : Link;
  const linkProps = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <section ref={ref} id={id} className="relative h-screen overflow-hidden bg-charcoal">
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
        className={`relative z-10 h-full flex items-center ${
          reverse ? "justify-end" : "justify-start"
        } px-8 md:px-24`}
      >
        <motion.div
          style={{ opacity, y: yText }}
          className={`max-w-xl ${reverse ? "text-right" : "text-left"}`}
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            {title}
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10 font-light max-w-md">
            {description}
          </p>
          <LinkComponent
            {...linkProps}
            className="inline-block px-8 py-3.5 bg-crimson text-white text-xs font-semibold  uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
          >
            {cta}
          </LinkComponent>
        </motion.div>
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
    </section>
  );
}

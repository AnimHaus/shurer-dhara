"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const heroSlides = [
  {
    src: "https://cdn.shurerdhara.com/hero5.jpeg",
    alt: "Prof. Rezwana Choudhury Bannya performing at an Evening on Tagore event, Kolkata 2011",
    objectPosition: "5% 5%",
  },
  {
    src: "https://cdn.shurerdhara.com/hero2.jpeg",
    alt: "Prof. Rezwana Choudhury Bannya in a studio portrait",
  },
  {
    src: "https://cdn.shurerdhara.com/hero3.jpeg",
    alt: "Prof. Rezwana Choudhury Bannya on stage in a musical performance",
    objectPosition: "center 20%",
  },
  {
    src: "https://cdn.shurerdhara.com/hero4.jpeg",
    alt: "Prof. Rezwana Choudhury Bannya in a formal portrait",
  },
] satisfies { src: string; alt: string; objectPosition?: string }[];

const AUTOPLAY_INTERVAL = 7000;

export default function HeroSection({ hero }: { hero: Dictionary["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  function navigate(dir: 1 | -1) {
    setDirection(dir);
    setIndex((prev) => {
      prevIndexRef.current = prev;
      return (prev + dir + heroSlides.length) % heroSlides.length;
    });
  }

  useEffect(() => {
    const id = setInterval(() => navigate(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <section ref={ref} id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax + carousel layer */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        {/* Base layer — always shows the previous image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroSlides[prevIndexRef.current].src}
            alt={heroSlides[prevIndexRef.current].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: heroSlides[prevIndexRef.current].objectPosition ?? "center center" }}
          />
        </div>

        {/* Incoming slide — sweeps over the previous image */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            className="absolute inset-0 z-10"
            variants={{
              enter: (dir: number) => ({
                clipPath:
                  dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
              }),
              center: {
                clipPath: "inset(0 0% 0 0%)",
              },
              exit: {
                clipPath: "inset(0 0% 0 0%)",
              },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
            }}
          >
            <Image
              src={heroSlides[index].src}
              alt={heroSlides[index].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: heroSlides[index].objectPosition ?? "center center" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/65 via-black/35 to-black/70" />

      {/* Left click zone */}
      <button
        aria-label="Previous image"
        className="absolute left-0 top-0 z-30 h-full w-1/2 cursor-w-resize"
        onClick={() => navigate(-1)}
      />

      {/* Right click zone */}
      <button
        aria-label="Next image"
        className="absolute right-0 top-0 z-30 h-full w-1/2 cursor-e-resize"
        onClick={() => navigate(1)}
      />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-40 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              prevIndexRef.current = index;
              setIndex(i);
            }}
            className={`h-px transition-all duration-500 ${
              i === index ? "w-10 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-40 flex h-full flex-col items-center justify-center px-6 text-center pointer-events-none">
        <h1 className="font-display mb-6 text-[3.5rem] font-bold leading-none text-white sm:text-7xl md:mb-8 md:text-[11rem]">
          <WordReveal text={hero.title} onLoad delay={0.35} duration={1.1} />
        </h1>

        <RevealText onLoad delay={0.55} duration={0.9}>
          <p className="mx-auto mb-8 max-w-xl text-base font-bold leading-relaxed text-white/55 md:mb-12 md:text-xl">
            {hero.tagline}
          </p>
        </RevealText>

        <RevealText onLoad delay={0.7} duration={0.8}>
          <a
            href="#schools-preview"
            className="pointer-events-auto inline-block rounded-full border border-white/35 px-10 py-4 text-xs font-semibold uppercase text-white transition-all duration-500 hover:bg-white hover:text-charcoal"
          >
            {hero.cta}
          </a>
        </RevealText>
      </div>
    </section>
  );
}

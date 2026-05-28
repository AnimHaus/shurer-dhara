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

export default function MFDPageContent({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const p = dict.pages.mfd;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
          alt="Music for Development"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal" />

        <div className="relative z-10 px-8 md:px-24 max-w-4xl pt-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs uppercase  text-crimson font-medium mb-6"
          >
            {p.initLabel}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-9xl font-bold leading-none mb-8"
          >
            {p.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-white/55 text-xl leading-relaxed font-light max-w-2xl"
          >
            {p.tagline}
          </motion.p>
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
              className="inline-block px-10 py-4 bg-crimson text-white text-xs font-semibold  uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              {p.visitBtn}
            </a>
            <Link
              href={`/${lang}/professor`}
              className="inline-block px-10 py-4 border border-white/25 text-white text-xs font-semibold  uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              {p.meetProfBtn}
            </Link>
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
          <cite className="text-white/60 text-xs uppercase  not-italic">
            {p.quoteCite}
          </cite>
        </motion.blockquote>
      </section>

      {/* Our Story */}
      <section className="py-24 px-8 md:px-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase  text-crimson font-medium mb-5">
            {p.storyLabel}
          </p>
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

      {/* Alternating content rows */}
      <section className="py-0">
        {/* Row 1: pic left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
        >
          <div className="relative overflow-hidden min-h-[320px] md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/our_story.webp"
              alt="Our Story"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-white/5">
            <p className="text-xs uppercase tracking-[0.35em] text-crimson font-medium mb-4">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">Our Story</h2>
            <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">
              Music for Development (MFD) started in 2009 as a project of Shurer Dhara, a premier college for
              Rabindrasangeet and Bengali performing arts based in Dhaka. It began with a vision to improve the lives
              of the children from the slum areas of Dhaka through music education. In its first year, MFD was funded
              by the United Nations Development Programme (UNDP).
            </p>
            <a
              href="https://www.musicfordevelopment.net/our-story"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              Learn More →
            </a>
          </div>
        </motion.div>

        {/* Row 2: text left, pic right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
        >
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-charcoal order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.35em] text-crimson font-medium mb-4">What We Do</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">What We Do</h2>
            <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">
              Our students are underprivileged children from different slum areas of Dhaka and its adjoining areas.
              Although music is our main focus we also give the children of MFD extra tutoring in mathematics,
              Bengali, English, coding and vocational training — helping these underprivileged children to grow up
              to be successful and happy citizens of Bangladesh.
            </p>
            <a
              href="https://www.musicfordevelopment.net/what-we-do"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              Learn More →
            </a>
          </div>
          <div className="relative overflow-hidden min-h-[320px] md:min-h-0 order-1 md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/what_we_do.webp"
              alt="What We Do"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </motion.div>

        {/* Row 3: pic left, text right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
        >
          <div className="relative overflow-hidden min-h-[320px] md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/show_case_events.webp"
              alt="Showcase of Events"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-white/5">
            <p className="text-xs uppercase tracking-[0.35em] text-crimson font-medium mb-4">Showcase</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">Show Case of Events by Our Students</h2>
            <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">
              Our students love singing, dancing, acting, reciting. Enjoy some photos of our students&rsquo; performances.
            </p>
            <a
              href="https://www.musicfordevelopment.net/showcase-of-events"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              Learn More →
            </a>
          </div>
        </motion.div>

        {/* Row 4: text left, pic right */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 min-h-[480px]"
        >
          <div className="flex flex-col justify-center px-10 md:px-16 py-16 bg-charcoal order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.35em] text-crimson font-medium mb-4">Our Children</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">Meet the MFD Children</h2>
            <p className="text-white/55 leading-relaxed font-light mb-8 text-sm md:text-base">
              Read the inspiring stories of the MFD Children.
            </p>
            <a
              href="https://www.musicfordevelopment.net/meet-the-mfd-children"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-8 py-3 border border-white/25 text-white text-xs font-semibold tracking-[0.3em] uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
            >
              Learn More →
            </a>
          </div>
          <div className="relative overflow-hidden min-h-[320px] md:min-h-0 order-1 md:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/meet_mfd.webp"
              alt="Meet the MFD Children"
              className="w-full h-full object-cover absolute inset-0"
            />
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-8 md:px-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs uppercase  text-crimson font-medium mb-4">
            {p.historyLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            {p.historyTitle}
          </h2>
        </motion.div>
        <div className="space-y-0">
          {p.timeline.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="flex gap-8 py-8 border-b border-white/10 last:border-0"
            >
              <div className="w-20 shrink-0">
                <span className="font-display text-2xl font-bold text-crimson">{item.year}</span>
              </div>
              <p className="text-white/55 leading-relaxed font-light">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-32 px-8 md:px-24 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
          alt="Support MFD"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-8"
          >
            {p.ctaTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/55 text-lg font-light mb-12"
          >
            {p.ctaSubtitle}
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            href="https://www.musicfordevelopment.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-crimson text-white text-xs font-semibold  uppercase hover:bg-white hover:text-charcoal transition-all duration-500"
          >
            {p.ctaBtn}
          </motion.a>
        </div>
      </section>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type CollegeDict = Dictionary["pages"]["college"];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

interface DetailRowProps {
  label: string;
  value: string;
  delay?: number;
}

function DetailRow({ label, value, delay = 0 }: DetailRowProps) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-5 border-b border-white/10 last:border-0"
    >
      <dt className="text-[11px] uppercase tracking-widest text-crimson/70 font-semibold min-w-[180px] pt-0.5">
        {label}
      </dt>
      <dd className="text-white/85 text-base leading-relaxed">{value}</dd>
    </motion.div>
  );
}

export default function CollegeDetails({ p }: { p: CollegeDict }) {
  const details: { label: string; value: string }[] = [
    { label: p.affiliation, value: `${p.affiliationValue} · ${p.affiliationYear}` },
    { label: p.collegeCode, value: p.collegeCodeValue },
    { label: p.course, value: p.courseValue },
    { label: p.duration, value: p.durationValue },
    { label: p.eligibility, value: p.eligibilityValue },
    { label: p.sessionStarted, value: p.sessionStartedValue },
    { label: p.completedBatches, value: p.completedBatchesValue },
    { label: p.founder, value: p.founderValue },
    { label: p.principal, value: p.principalValue },
  ];

  return (
    <section className="pb-32">
      {/* Label + Title */}
      <div className="px-8 md:px-24 py-20 border-t border-white/10">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[10px] uppercase tracking-widest text-crimson/70 font-semibold mb-4"
        >
          {p.detailsLabel}
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl md:text-6xl font-bold leading-tight mb-16"
        >
          {p.detailsTitle}
        </motion.h2>

        {/* Two-column layout: details left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Details table */}
          <dl className="divide-y divide-white/10">
            {details.map((d, i) => (
              <DetailRow key={d.label} label={d.label} value={d.value} delay={0.05 * i} />
            ))}
          </dl>

          {/* Second college image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-sm aspect-[4/3] lg:sticky lg:top-28"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.shurerdhara.com/shurer_dhara_college_2.jpeg"
              alt="Surer Dhara College of Music"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

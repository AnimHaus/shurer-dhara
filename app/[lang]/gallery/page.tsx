import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import WordReveal from "@/components/WordReveal";
import RevealText from "@/components/RevealText";
import GalleryGrid from "@/components/sections/GalleryGrid";

export default async function Gallery({
  params,
}: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.gallery;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-12 px-8 md:px-16 lg:px-24">
        <p className="text-xs uppercase text-crimson font-semibold tracking-widest mb-5">
          {p.heroLabel}
        </p>
        <h1 className="font-display text-6xl md:text-8xl font-bold leading-none mb-8">
          <WordReveal text={p.heroTitle} onLoad delay={0.2} />
        </h1>
        <RevealText onLoad delay={0.45} duration={0.8}>
          <p className="text-white/50 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
            {p.heroTagline}
          </p>
        </RevealText>
      </section>

      {/* Gallery */}
      <GalleryGrid p={p} />
    </div>
  );
}

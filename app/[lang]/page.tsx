import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import PortalSection from "@/components/sections/PortalSection";
import ContactSection from "@/components/sections/ContactSection";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="overflow-x-hidden">
      <HeroSection hero={dict.hero} />

      <PortalSection
        id="schools-preview"
        title={dict.home.schools.title}
        description={dict.home.schools.description}
        href={`/${lang}/schools`}
        cta={dict.home.schools.cta}
        image="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1920&q=80"
      />

      <PortalSection
        id="professor-preview"
        title={dict.home.professor.title}
        description={dict.home.professor.description}
        href={`/${lang}/professor`}
        cta={dict.home.professor.cta}
        image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&q=80"
        reverse={true}
      />

      <PortalSection
        id="mfd-preview"
        title={dict.home.mfd.title}
        description={dict.home.mfd.description}
        href={`/${lang}/mfd`}
        cta={dict.home.mfd.cta}
        image="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
      />

      <ContactSection contact={dict.contact} />
    </div>
  );
}
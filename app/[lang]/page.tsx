import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import HeroSection from "@/components/sections/HeroSection";
import PortalSection from "@/components/sections/PortalSection";
import SchoolsListSection from "@/components/sections/SchoolsListSection";
import NoticesSection from "@/components/sections/NoticesSection";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="[overflow-x:clip]">
      <HeroSection hero={dict.hero} />

      <PortalSection
        id="professor-preview"
        title={dict.home.professor.title}
        description={dict.home.professor.description}
        href={`/${lang}/bannya`}
        cta={dict.home.professor.cta}
        image="https://commons.wikimedia.org/wiki/Special:FilePath/Rezwana_Choudhury_Bannya_New_Jersey_2.jpg"
        split={true}
      />

      <SchoolsListSection
        id="schools-preview"
        label={dict.home.schools.title}
        title={dict.home.schools.subtitle}
        cta={dict.home.schools.cta}
        href={`/${lang}/schools`}
        schools={dict.pages.schools.schools}
      />

      <div className="sticky top-0 z-0">
        <PortalSection
          id="mfd-preview"
          title={dict.home.mfd.title}
          description={dict.home.mfd.description}
          href={`/${lang}/mfd`}
          cta={dict.home.mfd.cta}
          image="/MFD.webp"
        />
      </div>

      <NoticesSection />
    </div>
  );
}
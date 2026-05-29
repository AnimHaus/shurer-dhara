import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import ProfessorHero from "@/components/sections/ProfessorHero";
import ProfessorBio from "@/components/sections/ProfessorBio";
import ProfessorShrutigitabitan from "@/components/sections/ProfessorShrutigitabitan";
import ProfessorAwards from "@/components/sections/ProfessorAwards";
import ProfessorGlobal from "@/components/sections/ProfessorGlobal";
import ProfessorCta from "@/components/sections/ProfessorCta";

export default async function Professor({
  params,
}: PageProps<"/[lang]/bannya">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.professor;

  return (
    <div className="bg-parchment text-charcoal min-h-screen">
      <ProfessorHero p={p} />
      <ProfessorBio p={p} />
      <ProfessorShrutigitabitan p={p} />
      <ProfessorAwards p={p} />
      <ProfessorGlobal p={p} />
      <ProfessorCta lang={lang as Locale} p={p} />
    </div>
  );
}

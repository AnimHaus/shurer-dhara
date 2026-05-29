import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import SchoolsHero from "@/components/sections/SchoolsHero";
import SchoolsGrid from "@/components/sections/SchoolsGrid";

export default async function Schools({
  params,
}: PageProps<"/[lang]/schools">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.schools;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <SchoolsHero p={p} />
      <SchoolsGrid p={p} />
    </div>
  );
}

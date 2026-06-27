import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import CollegeHero from "@/components/sections/CollegeHero";
import CollegeDetails from "@/components/sections/CollegeDetails";

export default async function College({
  params,
}: PageProps<"/[lang]/college">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.college;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <CollegeHero p={p} />
      <CollegeDetails p={p} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import ProfessorPageContent from "@/components/sections/ProfessorPageContent";

export default async function Professor({
  params,
}: PageProps<"/[lang]/professor">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <ProfessorPageContent lang={lang as Locale} dict={dict} />;
}

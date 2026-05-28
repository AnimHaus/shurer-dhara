import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import SchoolsPage from "@/components/sections/SchoolsPageContent";

export default async function Schools({
  params,
}: PageProps<"/[lang]/schools">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <SchoolsPage lang={lang as Locale} dict={dict} />;
}

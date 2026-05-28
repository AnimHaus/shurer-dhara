import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import MFDPageContent from "@/components/sections/MFDPageContent";

export default async function MFD({
  params,
}: PageProps<"/[lang]/mfd">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <MFDPageContent lang={lang as Locale} dict={dict} />;
}

import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import MFDHero from "@/components/sections/MFDHero";
import MFDOurStory from "@/components/sections/MFDOurStory";
import MFDRows from "@/components/sections/MFDRows";
import MFDTimeline from "@/components/sections/MFDTimeline";
import MFDCtaBanner from "@/components/sections/MFDCtaBanner";

export default async function MFD({
  params,
}: PageProps<"/[lang]/mfd">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const p = dict.pages.mfd;

  return (
    <div className="bg-charcoal text-white min-h-screen">
      <MFDHero lang={lang as Locale} p={p} />
      <MFDOurStory p={p} />
      <MFDRows p={p} />
      <MFDTimeline p={p} />
      <MFDCtaBanner p={p} />
    </div>
  );
}

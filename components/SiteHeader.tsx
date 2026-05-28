import Image from "next/image";
import LanguageSelector from "@/components/LanguageSelector";
import type { Locale } from "@/lib/locales";

export default function SiteHeader({ lang }: { lang: Locale }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 py-4">
      {/* Language selector anchored to the right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <LanguageSelector currentLang={lang} />
      </div>
      {/* Centered logo */}
      <a href={`/${lang}`} className="flex items-center">
        <Image
          src="/logo.png"
          alt="Shurer Dhara"
          width={180}
          height={60}
          className="h-14 w-auto object-contain"
          priority
        />
      </a>
    </header>
  );
}

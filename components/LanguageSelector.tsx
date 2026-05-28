"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/locales";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function LanguageSelector({
  currentLang,
}: {
  currentLang: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function cycleLocale() {
    const currentIndex = locales.indexOf(currentLang);
    const nextLocale = locales[(currentIndex + 1) % locales.length];
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(segments.join("/") || "/");
  }

  return (
    <button
      onClick={cycleLocale}
      aria-label="Switch language"
      className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors duration-300 cursor-pointer"
      style={{ filter: "invert(1)" }}
    >
      <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
    </button>
  );
}

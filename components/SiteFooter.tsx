"use client";

import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function SiteFooter({
  footer,
  lang,
}: {
  footer: Dictionary["footer"];
  lang: Locale;
}) {
  const pathname = usePathname();
  const isDark = !pathname.endsWith("/bannya");

  const bg = isDark ? "bg-charcoal" : "bg-parchment";
  const border = isDark ? "border-parchment/10" : "border-charcoal/10";
  const textMuted = isDark ? "text-parchment/50" : "text-charcoal/50";
  const textHover = isDark ? "hover:text-parchment" : "hover:text-charcoal";
  const textCopyright = isDark ? "text-parchment/30" : "text-charcoal/30";

  return (
    <footer className={`relative z-10 py-12 px-8 border-t ${border} ${bg}`}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.png"
              alt="Shurer Dhara"
              width={100}
              height={32}
              className="h-8 w-auto object-contain opacity-70"
            />
            <p className={`${textMuted} text-sm max-w-xs`}>{footer.tagline}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <TransitionLink
              href={`/${lang}/schools`}
              className={`text-xs uppercase ${textMuted} ${textHover} transition-colors duration-300`}
            >
              {footer.links.schools}
            </TransitionLink>
            <TransitionLink
              href={`/${lang}/bannya`}
              className={`text-xs uppercase ${textMuted} ${textHover} transition-colors duration-300`}
            >
              {footer.links.professor}
            </TransitionLink>
            <TransitionLink
              href={`/${lang}/mfd`}
              className={`text-xs uppercase ${textMuted} ${textHover} transition-colors duration-300`}
            >
              {footer.links.mfd}
            </TransitionLink>
            <a
              href="#contact"
              className={`text-xs uppercase ${textMuted} ${textHover} transition-colors duration-300`}
            >
              {footer.links.contact}
            </a>
          </nav>
        </div>

        <div className={`mt-10 pt-6 border-t ${border} flex items-center justify-between`}>
          <p className={`${textCopyright} text-xs`}>
            © {new Date().getFullYear()} {footer.rights}
          </p>
          <a
            href="https://www.musicfordevelopment.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-crimson/60 hover:text-crimson transition-colors duration-300 uppercase"
          >
            musicfordevelopment.net
          </a>
        </div>
      </div>
    </footer>
  );
}

"use client";

import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import LanguageSelector from "@/components/LanguageSelector";
import type { Locale } from "@/lib/locales";

interface SiteHeaderProps {
  lang: Locale;
  labels: {
    home: string;
    schools: string;
    professor: string;
    mfd: string;
  };
}

type NavKey = "home" | "schools" | "professor" | "mfd";

export default function SiteHeader({ lang, labels }: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const getActive = (): NavKey => {
    if (pathname.endsWith("/bannya")) return "professor";
    if (pathname.endsWith("/schools")) return "schools";
    if (pathname.endsWith("/mfd")) return "mfd";
    return "home";
  };

  const activeKey = getActive();

  const navItems: { key: NavKey; href: string }[] = [
    { key: "home", href: `/${lang}` },
    { key: "schools", href: `/${lang}/schools` },
    { key: "professor", href: `/${lang}/bannya` },
    { key: "mfd", href: `/${lang}/mfd` },
  ];

  const allMobileItems = [
    ...navItems.map(({ key, href }) => ({ label: labels[key], href, key })),
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ease-in-out ${
          scrolled || menuOpen
            ? "backdrop-blur-md bg-charcoal/20"
            : "backdrop-blur-none bg-transparent"
        }`}
      >
        {/* Logo */}
        <TransitionLink href={`/${lang}`} className="relative flex items-center">
          <Image
            src="/logo.png"
            alt="Shurer Dhara"
            width={180}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
          </TransitionLink>

        {/* Right side */}
        <div className="relative flex items-center gap-8">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(({ key, href }) => (
              <TransitionLink
                key={key}
                href={href}
                className={`text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  activeKey === key
                    ? "text-crimson"
                    : "text-white opacity-55 hover:opacity-100"
                }`}
              >
                {labels[key]}
              </TransitionLink>
            ))}
          </nav>

          {/* Desktop language selector */}
          <div className="hidden md:block">
            <LanguageSelector currentLang={lang} />
          </div>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 gap-0 cursor-pointer"
          >
            {/* Top bar */}
            <span
              className={`block h-px w-6 bg-white transition-all duration-400 ease-in-out origin-center ${
                menuOpen ? "translate-y-[0px] rotate-45" : "-translate-y-[4px]"
              }`}
            />
            {/* Middle bar */}
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />
            {/* Bottom bar */}
            <span
              className={`block h-px w-6 bg-white transition-all duration-400 ease-in-out origin-center ${
                menuOpen ? "-translate-y-[0px] -rotate-45" : "translate-y-[4px]"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col md:hidden transition-all duration-500 ease-in-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: "rgba(30,28,26,0.75)" }}
      >
        <nav className="flex flex-col items-center justify-center flex-1 gap-10">
          {allMobileItems.map(({ label, href, key }, i) => (
            <div
              key={key}
              className="transition-all duration-500 ease-in-out"
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <TransitionLink
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl font-semibold uppercase tracking-widest transition-opacity duration-300 ${
                  activeKey === key
                    ? "text-crimson opacity-100"
                    : "text-white opacity-55 hover:opacity-100"
                }`}
              >
                {label}
              </TransitionLink>
            </div>
          ))}

          {/* Language selector inside mobile menu */}
          <div
            className="transition-all duration-500 ease-in-out"
            style={{
              transitionDelay: menuOpen ? `${100 + allMobileItems.length * 60}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <LanguageSelector currentLang={lang} />
          </div>
        </nav>
      </div>
    </>
  );
}
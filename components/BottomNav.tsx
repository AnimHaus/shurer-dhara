"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

type NavKey = "home" | "schools" | "professor" | "mfd" | "contact";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function BottomNav({
  labels,
  lang,
}: {
  labels: Record<NavKey, string>;
  lang: string;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const getActive = (): NavKey => {
    if (pathname.endsWith("/professor")) return "professor";
    if (pathname.endsWith("/schools")) return "schools";
    if (pathname.endsWith("/mfd")) return "mfd";
    return "home";
  };

  const activeKey = getActive();

  const navItems: { key: NavKey; href: string }[] = [
    { key: "home", href: `/${lang}` },
    { key: "schools", href: `/${lang}/schools` },
    { key: "professor", href: `/${lang}/professor` },
    { key: "mfd", href: `/${lang}/mfd` },
  ];

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      {/* Menu panel — absolutely positioned above the pill, out of flow */}
      <div
        style={{
          position: "absolute",
          bottom: "calc(100% + 12px)",
          left: "50%",
          transform: open
            ? "translateX(-50%) scale(1) translateY(0)"
            : "translateX(-50%) scale(0.05) translateY(12px)",
          transformOrigin: "bottom center",
          transition: open
            ? `transform 750ms ${EASE}, opacity 500ms ${EASE}, visibility 0s 0s`
            : `transform 750ms ${EASE}, opacity 500ms ${EASE}, visibility 0s 750ms`,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          visibility: open ? "visible" : "hidden",
          willChange: "transform, opacity",
        }}
      >
        <div className="w-72 rounded-2xl bg-parchment/95 backdrop-blur-2xl border border-white/50 text-charcoal p-7 shadow-2xl shadow-charcoal/10">
          <p className="text-[10px] uppercase  text-charcoal/40 mb-5 font-medium">
            Navigate
          </p>
          <nav className="flex flex-col gap-1 mb-8">
            {navItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                style={{ transition: `color 350ms ${EASE}` }}
                className={`text-xl font-light leading-tight py-1 hover:text-crimson ${
                  activeKey === key ? "text-crimson" : "text-charcoal"
                }`}
              >
                {labels[key]}
              </Link>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            style={{ transition: `background 350ms ${EASE}` }}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-crimson/10 hover:bg-crimson/20 text-crimson rounded-xl text-xs font-semibold  uppercase"
          >
            ↳ {labels.contact}
          </a>
        </div>
      </div>

      {/* Pill */}
      <div
        style={{ transition: `all 600ms ${EASE}`, willChange: "width" }}
        className="relative flex items-center rounded-full bg-parchment/80 backdrop-blur-2xl border border-white/60 shadow-2xl shadow-charcoal/10 px-2 py-2"
      >
        {/* Logo */}
        <div
          style={{
            transition: `width 600ms ${EASE}, opacity 400ms ${EASE}, margin 600ms ${EASE}`,
            width: open ? "0px" : "40px",
            opacity: open ? 0 : 1,
            marginRight: open ? "0px" : "8px",
            overflow: "hidden",
            flexShrink: 0,
          }}
          className="flex items-center justify-center h-10 rounded-full bg-apricot/20"
        >
          <Image
            src="/logo.png"
            alt="Shurer Dhara"
            width={24}
            height={24}
            className="w-6 h-6 object-contain flex-shrink-0"
          />
        </div>

        {/* Active label */}
        <span
          style={{
            transition: `max-width 600ms ${EASE}, opacity 350ms ${EASE}, padding 600ms ${EASE}`,
            maxWidth: open ? "0px" : "120px",
            opacity: open ? 0 : 1,
            paddingLeft: open ? "0px" : "8px",
            paddingRight: open ? "0px" : "8px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            display: "block",
          }}
          className="text-charcoal/70 text-xs font-semibold  uppercase"
        >
          {labels[activeKey]}
        </span>

        {/* Toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            marginLeft: open ? "0px" : "8px",
            transition: `margin 600ms ${EASE}, background 350ms ${EASE}`,
            background: open ? "transparent" : undefined,
          }}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            open ? "" : "bg-apricot/20 hover:bg-apricot/40"
          } cursor-pointer`}
          aria-label="Toggle menu"
        >
          <div
            style={{
              transition: `transform 500ms ${EASE}`,
              transform: open ? "rotate(90deg) scale(1.1)" : "rotate(0deg) scale(1)",
            }}
          >
            <FontAwesomeIcon
              icon={open ? faXmark : faBars}
              className="w-4 h-4 text-charcoal"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function SiteFooter({
  footer,
  lang,
}: {
  footer: Dictionary["footer"];
  lang: Locale;
}) {
  return (
    <footer className="relative z-10 py-12 px-8 border-t border-charcoal/10 bg-parchment">
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
            <p className="text-charcoal/50 text-sm max-w-xs">{footer.tagline}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <Link
              href={`/${lang}/schools`}
              className="text-xs uppercase text-charcoal/50 hover:text-charcoal transition-colors duration-300"
            >
              {footer.links.schools}
            </Link>
            <Link
              href={`/${lang}/professor`}
              className="text-xs uppercase text-charcoal/50 hover:text-charcoal transition-colors duration-300"
            >
              {footer.links.professor}
            </Link>
            <Link
              href={`/${lang}/mfd`}
              className="text-xs uppercase text-charcoal/50 hover:text-charcoal transition-colors duration-300"
            >
              {footer.links.mfd}
            </Link>
            <a
              href="#contact"
              className="text-xs uppercase  text-charcoal/50 hover:text-charcoal transition-colors duration-300"
            >
              {footer.links.contact}
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-charcoal/10 flex items-center justify-between">
          <p className="text-charcoal/30 text-xs">
            © {new Date().getFullYear()} {footer.rights}
          </p>
          <a
            href="https://www.musicfordevelopment.net"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-crimson/60 hover:text-crimson transition-colors duration-300  uppercase"
          >
            musicfordevelopment.net
          </a>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_Bengali,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { notFound } from "next/navigation";
import { hasLocale, locales, getDictionary } from "./dictionaries";
import LenisProvider from "@/components/LenisProvider";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import type { Locale } from "@/lib/locales";
import "@/app/globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shurer Dhara | সুরের ধারা",
  description:
    "Shurer Dhara — an initiative by a vocal artist to teach students the timeless art of classical Indian singing.",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`
        ${GeistSans.variable}
        ${cormorantGaramond.variable}
        ${notoSansBengali.variable}
        h-full
      `}
    >
      <body className="min-h-full flex flex-col antialiased bg-parchment text-charcoal">
        <PageTransitionProvider>
        <LenisProvider>
          <SiteHeader
            lang={lang as Locale}
            labels={{
              home: dict.nav.home,
              schools: dict.nav.schools,
              professor: dict.nav.professor,
              mfd: dict.nav.mfd,
            }}
          />
          <main className="relative z-10 flex-1">{children}</main>
          <SiteFooter footer={dict.footer} lang={lang as Locale} />
          <WhatsAppFAB />
        </LenisProvider>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
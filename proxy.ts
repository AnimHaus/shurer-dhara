import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "bn"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

function getLocaleFromRequest(request: NextRequest): Locale {
  // Check Vercel geo header
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  if (vercelCountry === "BD") return "bn";

  // Check Cloudflare header
  const cfCountry = request.headers.get("cf-ipcountry");
  if (cfCountry === "BD") return "bn";

  // Check a custom country header (set by reverse proxy)
  const customCountry = request.headers.get("x-country");
  if (customCountry === "BD") return "bn";

  // Check Accept-Language header as fallback
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  if (acceptLanguage.toLowerCase().includes("bn")) return "bn";

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to locale-prefixed path
  const locale = getLocaleFromRequest(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
};

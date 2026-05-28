import "server-only";
import type { Locale } from "@/lib/locales";

export type { Locale } from "@/lib/locales";
export { locales, defaultLocale } from "@/lib/locales";

import enDict from "@/dictionaries/en.json";

export type Dictionary = typeof enDict;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () =>
    import("@/dictionaries/en.json").then((module) => module.default),
  bn: () =>
    import("@/dictionaries/bn.json").then((module) => module.default) as Promise<Dictionary>,
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

import type { I18nConfig } from "next-i18next/proxy";

import { resourceLoader } from "./i18n/resource-loader";

export const locales: string[] = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

const i18nConfig: I18nConfig = {
  supportedLngs: locales,
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common", "auth"],
  localeInPath: true,
  resourceLoader,
};

export default i18nConfig;

import { AuthTranslations } from "@modules/auth";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { CommonTranslations } from "../locales";

export const i18nResources = {
  en: {
    common: CommonTranslations.en,
    auth: AuthTranslations.en,
  },
  ru: {
    common: CommonTranslations.ru,
    auth: AuthTranslations.ru,
  },
};

export const i18nConfig = {
  resources: i18nResources,
  ns: Object.keys(i18nResources.en),
  lng: "ru",
  fallbackLng: "en",
  defaultNS: "common",
  returnNull: false,
  keySeparator: ".",
  nsSeparator: ":",
  enableSelector: "optimize",
  interpolation: {
    escapeValue: false,
  },
} as const;

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;

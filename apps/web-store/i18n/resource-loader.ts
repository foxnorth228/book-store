import type { I18nConfig } from "next-i18next/proxy";

const loaders = {
  common: (language: string) => import(`../src/_app/i18n/locales/${language}.json`),
  auth: (language: string) => import(`../src/modules/auth/locales/${language}.json`),
} satisfies Record<string, I18nConfig["resourceLoader"]>;

export const resourceLoader: I18nConfig["resourceLoader"] = (language, namespace) => {
  const loader = loaders[namespace as keyof typeof loaders];

  if (!loader) {
    throw new Error(`Unknown translation namespace: ${namespace}`);
  }

  return loader(language);
};

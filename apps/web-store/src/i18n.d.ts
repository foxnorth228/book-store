import "i18next";

import { i18nConfig } from "@app/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof i18nConfig.resources)["en"];
    enableSelector: typeof i18nConfig.enableSelector;

    strictKeyChecks: false;
  }
}

export {};

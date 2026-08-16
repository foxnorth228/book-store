import { Languages } from "@org/localization";
import { TFunction } from "i18next";

export const localeOptions = (t: TFunction) => [
  {
    value: Languages.En,
    label: t((w) => w.languages.en, { ns: "common" }),
  },
  {
    value: Languages.Ru,
    label: t((w) => w.languages.ru, { ns: "common" }),
  },
];

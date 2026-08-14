import { useAppStore } from "@app/storage/use-app-store";
import { FC, PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const language = useAppStore((s) => s.language);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  return children;
};

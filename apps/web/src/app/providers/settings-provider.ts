import { Themes } from "@app/config/theme";
import { useAppStore } from "@app/storage/use-app-store";
import { FC, PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const language = useAppStore((s) => s.language);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  useEffect(() => {
    window.document.documentElement.classList.toggle("dark", theme === Themes.Dark);
  }, [theme]);

  return children;
};

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
    const root = document.documentElement;

    if (theme === Themes.Light) {
      root.classList.remove("dark");
      return;
    }

    if (theme === Themes.Dark) {
      root.classList.add("dark");
      return;
    }

    const applyTheme = (isDark: boolean) => {
      root.classList.toggle("dark", isDark);
    };

    function handleChange(event: MediaQueryListEvent) {
      applyTheme(event.matches);
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(media.matches);
    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return children;
};

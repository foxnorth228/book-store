"use client";

import { useEffect } from "react";
import { useAppStore } from "@app/storage/use-app-store";
import { Themes } from "@app/config/theme";

export const SettingsProvider = () => {
  const theme = useAppStore((s) => s.theme);

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

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      root.classList.toggle("dark", isDark);
    };

    applyTheme(media.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      applyTheme(event.matches);
    };

    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return null;
};

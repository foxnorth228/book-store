import { Themes } from "@app/config/theme";
import { Languages } from "@org/localization";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppValues {
  language: Languages;
  theme: Themes;
}

export interface AppActions {
  setLanguage: (language: AppValues["language"]) => void;
  setTheme: (theme: AppValues["theme"]) => void;
}

export type AppStore = AppValues & AppActions;

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: Languages.En,
      theme: Themes.System,

      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-settings",
    },
  ),
);

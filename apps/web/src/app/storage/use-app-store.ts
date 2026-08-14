import { Languages } from "@org/localization";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppValues {
  language: Languages;
  theme: "light" | "dark";
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
      theme: "light",

      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-settings",
    },
  ),
);

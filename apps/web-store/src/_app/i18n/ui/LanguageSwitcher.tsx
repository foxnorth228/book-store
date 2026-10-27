"use client";

import { useT } from "next-i18next/client";

const languages = [
  {
    code: "en",
    label: "English",
  },
  {
    code: "ru",
    label: "Русский",
  },
];

export function LanguageSwitcher() {
  const { i18n } = useT();

  const changeLanguage = async (language: string) => {
    await i18n.changeLanguage(language);

    localStorage.setItem("language", language);
  };

  return (
    <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
      {languages.map((item) => (
        <option key={item.code} value={item.code}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

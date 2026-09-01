import { Languages, languageSchema } from "@org/localization";
import { Button, DropdownMenu } from "@org/ui";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Themes, themeSchema } from "../../config/theme";
import { useAppStore } from "../../storage/use-app-store";

export const HeaderSettings = () => {
  const { t } = useTranslation();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  return (
    <DropdownMenu.Trigger>
      <Button
        type={"button"}
        size={"icon"}
        className="bg-header text-header-foreground hover:text-header-foreground/80"
        aria-label={t((w) => w.settings, { ns: "common" })}
      >
        <Settings />
      </Button>
      <DropdownMenu>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            {t((w) => w.language, { ns: "common" })}
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group
              selectionMode="single"
              selectedKeys={[language]}
              onSelectionChange={(keys) => {
                const selectedLanguage = [...keys][0];
                let newLanguage: Languages | undefined;
                try {
                  newLanguage = languageSchema.parse(selectedLanguage);
                  setLanguage(newLanguage);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <DropdownMenu.Item id={Languages.En}>
                {t((w) => w.languages.en, { ns: "common" })}
              </DropdownMenu.Item>
              <DropdownMenu.Item id={Languages.Ru}>
                {t((w) => w.languages.ru, { ns: "common" })}
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>{t((w) => w.theme, { ns: "common" })}</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Group
              selectionMode="single"
              selectedKeys={[theme]}
              onSelectionChange={(keys) => {
                const selectedTheme = [...keys][0];
                let newTheme: Themes | undefined;
                try {
                  newTheme = themeSchema.parse(selectedTheme);
                  setTheme(newTheme);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              <DropdownMenu.Item id={Themes.System}>
                {t((w) => w.themes.system, { ns: "common" })}
              </DropdownMenu.Item>
              <DropdownMenu.Item id={Themes.Light}>
                {t((w) => w.themes.light, { ns: "common" })}
              </DropdownMenu.Item>
              <DropdownMenu.Item id={Themes.Dark}>
                {t((w) => w.themes.dark, { ns: "common" })}
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
      </DropdownMenu>
    </DropdownMenu.Trigger>
  );
};

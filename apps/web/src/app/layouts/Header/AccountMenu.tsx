import { signOut } from "@modules/auth";
import { useProfileStore } from "@modules/profile";
import { BaseComponentProps } from "@shared/types";
import { Button, DropdownMenu } from "@org/ui";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type AccountMenuProps = BaseComponentProps;

export const AccountMenu: FC<AccountMenuProps> = () => {
  const { t } = useTranslation();

  const profile = useProfileStore((state) => state.profile);

  return (
    <DropdownMenu.Trigger>
      <Button className="bg-header text-header-foreground hover:text-header-foreground/80">
        {profile?.nickname || "Profile"}
      </Button>
      <DropdownMenu>
        <DropdownMenu.Item
          onAction={async () => {
            await signOut();
          }}
        >
          {t((w) => w.signOut, { ns: "auth" })}
        </DropdownMenu.Item>
      </DropdownMenu>
    </DropdownMenu.Trigger>
  );
};

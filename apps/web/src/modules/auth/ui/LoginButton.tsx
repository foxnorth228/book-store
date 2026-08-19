import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { Button } from "@shared/ui";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface LoginButtonProps extends BaseComponentProps {
  onClick: () => void;
}

export const LoginButton: FC<LoginButtonProps> = ({ onClick, className }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      className={cn("h-fit w-fit bg-transparent px-2 py-1 text-sm font-medium", className)}
      onClick={onClick}
      aria-label={t((w) => w.signIn, { ns: "auth" })}
    >
      {t((w) => w.signIn, { ns: "auth" })}
    </Button>
  );
};

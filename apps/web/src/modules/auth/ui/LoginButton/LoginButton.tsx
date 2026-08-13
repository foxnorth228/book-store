import { cn } from "@shared/lib";
import { Button } from "@shared/ui";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton: FC<LoginButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      className={cn(
        "h-fit w-fit bg-transparent px-2 py-1 text-sm font-medium",
        "text-neutral-700 transition-colors hover:bg-neutral-500 hover:text-neutral-900",
      )}
      onClick={onClick}
      aria-label={t((w) => w.signIn, { ns: "auth" })}
    >
      {t((w) => w.signIn, { ns: "auth" })}
    </Button>
  );
};

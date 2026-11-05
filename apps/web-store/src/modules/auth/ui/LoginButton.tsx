"use client";

import { cn, Button } from "@org/ui";
import { BaseComponentProps } from "@shared/types";
import type { FC } from "react";
import { useT } from "next-i18next/client";

interface LoginButtonProps extends BaseComponentProps {
  onClick: () => void;
}

export const LoginButton: FC<LoginButtonProps> = ({ onClick, className }) => {
  const { t } = useT();

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

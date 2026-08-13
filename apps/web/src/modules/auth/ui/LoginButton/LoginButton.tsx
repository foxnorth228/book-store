import { Button } from "@shared/ui";
import type { FC } from "react";

interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton: FC<LoginButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="button"
      className="h-fit w-fit bg-transparent px-2 py-1 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-500 hover:text-neutral-900"
      onClick={onClick}
    >
      Sign in
    </Button>
  );
};

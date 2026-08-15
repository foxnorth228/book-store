import { Dialog } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { LoginForm } from "./LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange }) => {
  const { t } = useTranslation();
  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Header>
        <Dialog.Title>{t((w) => w.signIn, { ns: "auth" })}</Dialog.Title>
      </Dialog.Header>

      <LoginForm />
    </Dialog>
  );
};

import { Dialog } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginForm } from "./AuthForm/LoginForm";
import { RegisterForm } from "./AuthForm/RegisterForm";

export type AuthModalMode = "login" | "register";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialMode?: AuthModalMode;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange, initialMode = "login" }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AuthModalMode>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Header>
        <Dialog.Title>{t((w) => w.signIn, { ns: "auth" })}</Dialog.Title>
      </Dialog.Header>

      {mode === "login" ? (
        <LoginForm onRegister={() => setMode("register")} />
      ) : (
        <RegisterForm onLogin={() => setMode("login")} />
      )}
    </Dialog>
  );
};

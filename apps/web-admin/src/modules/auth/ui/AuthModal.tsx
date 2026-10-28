import { Dialog } from "@org/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm/RegisterForm";

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
  }, [isOpen]);

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Header>
        <Dialog.Title>
          {mode === "login"
            ? t((w) => w.loginModal.title, { ns: "auth" })
            : t((w) => w.registerModal.title, { ns: "auth" })}
        </Dialog.Title>
      </Dialog.Header>

      {mode === "login" ? (
        <LoginForm onRegister={() => setMode("register")} onFinish={() => onOpenChange(false)} />
      ) : (
        <RegisterForm onLogin={() => setMode("login")} onFinish={() => onOpenChange(false)} />
      )}
    </Dialog>
  );
};

import { Dialog } from "@shared/ui";
import { FC } from "react";

import { LoginForm } from "../AuthForm/LoginForm";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Header>
        <Dialog.Title>Sign in</Dialog.Title>
      </Dialog.Header>

      <LoginForm />
    </Dialog>
  );
};

import { Modal, ModalProps } from "@shared/ui";
import { FC } from "react";

import { LoginForm } from "../AuthForm/LoginForm";

type AuthModalProps = ModalProps;

export const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <LoginForm />
    </Modal>
  );
};

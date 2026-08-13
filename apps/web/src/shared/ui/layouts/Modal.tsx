import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { X } from "lucide-react";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";

import { IconButton } from "../buttons";

export interface ModalProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export const Modal: FC<ModalProps> = ({ open, onClose, title, children, className }) => {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div aria-hidden={true} className="absolute inset-0 bg-neutral-900/50" onClick={onClose} />

      <div
        className={cn(
          "relative z-10 w-full max-w-md bg-white p-6 shadow-[0_25px_50px_rgba(15,23,42,0.15)]",
          className,
        )}
      >
        <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>

          <IconButton aria-label="Close" onClick={onClose}>
            <X />
          </IconButton>
        </header>

        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

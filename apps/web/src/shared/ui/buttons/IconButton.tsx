import { cn } from "@shared/lib";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md",
        "text-neutral-500",
        "transition-colors",
        "hover:bg-neutral-100 hover:text-neutral-900",
        "focus-visible:outline-2",
        "focus-visible:outline-primary-400",
        "focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

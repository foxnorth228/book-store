import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import type { ButtonHTMLAttributes, FC } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseComponentProps;

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-md",
        "bg-primary-600 text-sm font-medium text-neutral-50",
        "transition-colors duration-150",
        "hover:bg-primary-700",
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

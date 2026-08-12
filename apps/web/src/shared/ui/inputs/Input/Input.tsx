import { cn } from "@shared/lib";
import { FC, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: "default" | "error";
}

export const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-neutral-300 px-3 py-3",
        "text-neutral-900",
        "outline-none",
        "transition-colors duration-150",
        "placeholder:text-neutral-400",
        "focus:border-primary-500",
        "focus:ring-primary-100 focus:ring-2",
        "disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
};

import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { FC } from "react";

type ButtonProps = BaseComponentProps;

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "h-11 w-full rounded-md",
        "bg-primary-600 text-sm font-medium text-neutral-50",
        "transition-colors duration-150",
        "hover:bg-primary-700",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
};

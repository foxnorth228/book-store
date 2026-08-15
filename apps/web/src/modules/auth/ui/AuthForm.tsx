import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { Button, Link } from "@shared/ui";
import { ComponentProps, FC } from "react";

export const Form: FC<BaseComponentProps> = ({ children, className, ...props }) => {
  return (
    <form
      className={cn(
        "w-full max-w-105 rounded-xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export const Title: FC<BaseComponentProps> = ({ children }) => {
  return <h1 className="text-[28px] leading-[1.2] font-semibold text-neutral-900">{children}</h1>;
};

export const Description: FC<BaseComponentProps> = ({ children }) => {
  return <p className="mb-6 text-[15px] leading-normal text-neutral-500">{children}</p>;
};

export const SubmitButton: FC<BaseComponentProps & ComponentProps<typeof Button>> = ({
  children,
  ...props
}) => {
  return (
    <Button className="w-full" {...props}>
      {children}
    </Button>
  );
};

export const Footer: FC<BaseComponentProps> = ({ children }) => {
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
      {children}
    </div>
  );
};

export const FooterLink: FC<BaseComponentProps & ComponentProps<typeof Link>> = ({
  children,
  to,
  ...props
}) => {
  return (
    <Link to={to} className="font-medium" {...props}>
      {children}
    </Link>
  );
};

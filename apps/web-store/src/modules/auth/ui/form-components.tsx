import { cn, Button } from "@org/ui";
import { BaseComponentProps } from "@shared/types";
import { Link } from "@shared/ui";
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
  return <h1 className="text-[28px] leading-[1.2] font-semibold">{children}</h1>;
};

export const Description: FC<BaseComponentProps> = ({ children }) => {
  return <p className="mb-2 text-[15px] leading-normal text-neutral-500">{children}</p>;
};

export const FormError: FC<BaseComponentProps> = ({ children }) => (
  <div
    role="alert"
    className="border-destructive/30 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
  >
    <span>{children}</span>
  </div>
);

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
    <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
      {children}
    </div>
  );
};

export const FooterButtonLink: FC<BaseComponentProps & ComponentProps<typeof Button>> = ({
  children,
  ...props
}) => {
  return (
    <Button className="h-fit p-0 font-medium" variant={"link"} {...props}>
      {children}
    </Button>
  );
};

export const FooterLink: FC<BaseComponentProps & ComponentProps<typeof Link>> = ({
  children,
  to,
  ...props
}) => {
  return (
    <Link to={to} className="text-link-text font-medium" {...props}>
      {children}
    </Link>
  );
};

export const BackButton: FC<BaseComponentProps & ComponentProps<typeof Button>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Button
      className={cn("absolute top-3 left-5", className)}
      type="button"
      variant="link"
      {...props}
    >
      {children}
    </Button>
  );
};

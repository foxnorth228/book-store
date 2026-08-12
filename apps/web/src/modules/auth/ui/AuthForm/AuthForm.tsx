import { cn } from "@shared/lib";
import { BaseComponentProps } from "@shared/types";
import { Button, Input, Link } from "@shared/ui";
import { FC } from "react";

export const Form: FC<BaseComponentProps> = ({ children, className, ...props }) => {
  return (
    <form
      className={cn(
        "w-full max-w-[420px] rounded-xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export const Title = () => {
  return <h1 className="text-[28px] leading-[1.2] font-semibold text-neutral-900">Sign in</h1>;
};

export const Description = () => {
  return <p className="mb-6 text-[15px] leading-[1.5] text-neutral-500">Sign in to continue.</p>;
};

export const FormInput = Input;

export const SubmitButton = () => {
  return <Button className="w-full" />;
};

export const Footer = () => {
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5 text-sm text-neutral-500">
      <span>Don't have an account?</span>

      <Link to={""} className="font-medium">
        Register
      </Link>
    </div>
  );
};

export const FooterLink = () => {
  return (
    <Link to="" className="font-medium">
      Register
    </Link>
  );
};

export const SuccessMessage = ({ children, className }: BaseComponentProps) => {
  return (
    <div
      className={cn("bg-success-background text-success-text rounded-md p-3 text-sm", className)}
    >
      {children}
    </div>
  );
};

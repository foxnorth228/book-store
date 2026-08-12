import { cn } from "@shared/lib";
import type { ReactNode } from "react";

interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, error, helperText, children, className }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}

      {children}

      {error && <span className="text-error-text text-[13px]">{error}</span>}

      {!error && helperText && <span className="text-[13px] text-neutral-500">{helperText}</span>}
    </div>
  );
}

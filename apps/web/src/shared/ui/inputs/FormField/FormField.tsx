import { ReactNode } from "react";

import { ErrorText, FieldContainer, HelperText, Label } from "./FormField.styles";

export type FieldStatus = "default" | "error" | "success";

interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;

  status?: FieldStatus;

  children: ReactNode;
}

export function FormField({
  label,
  error,
  helperText,

  children,
}: FormFieldProps) {
  return (
    <FieldContainer>
      {label && <Label>{label}</Label>}

      {children}

      {error && <ErrorText>{error}</ErrorText>}

      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </FieldContainer>
  );
}

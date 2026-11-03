import { Field, cn } from "@org/ui";
import { useId, type ReactNode } from "react";

type TanStackFieldLike = {
  name: string;
  state: {
    meta: {
      isValid: boolean;
      errors: readonly unknown[];
    };
  };
};

export type TanStackFormFieldAdditionalProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
};

export type TanStackFormFieldRenderProps<TField> = {
  field: TField;
  fieldState: {
    invalid: boolean;
    errors: readonly unknown[];
  };
  additionalProps: TanStackFormFieldAdditionalProps;
};

export type TanStackFormFieldProps<TField extends TanStackFieldLike> = {
  field: TField;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  render: (props: TanStackFormFieldRenderProps<TField>) => ReactNode;
};

function normalizeErrors(errors: readonly unknown[]) {
  return errors.map((error) => {
    if (typeof error === "string") {
      return { message: error };
    }

    if (error && typeof error === "object" && "message" in error) {
      return { message: String(error.message) };
    }

    return { message: String(error) };
  });
}

export function TanStackFormField<TField extends TanStackFieldLike>({
  field,
  label,
  description,
  className,
  render,
}: TanStackFormFieldProps<TField>) {
  const generatedId = useId();

  const fieldId = `field-${generatedId}`;
  const labelId = `${fieldId}-label`;
  const descriptionId = `${fieldId}-description`;
  const errorId = `${fieldId}-error`;

  const invalid = !field.state.meta.isValid;
  const errors = field.state.meta.errors;

  const additionalProps: TanStackFormFieldAdditionalProps = {
    id: fieldId,
    "aria-invalid": invalid,
    "aria-describedby":
      [description ? descriptionId : undefined, invalid ? errorId : undefined]
        .filter(Boolean)
        .join(" ") || undefined,
    "aria-labelledby": label ? labelId : undefined,
  };

  return (
    <Field className={cn(className)} data-invalid={invalid}>
      {label && (
        <Field.Label id={labelId} htmlFor={fieldId}>
          {label}
        </Field.Label>
      )}

      {description && <Field.Description id={descriptionId}>{description}</Field.Description>}

      {render({
        field,
        fieldState: {
          invalid,
          errors,
        },
        additionalProps,
      })}

      {invalid && <Field.Error id={errorId} errors={normalizeErrors(errors)} />}
    </Field>
  );
}

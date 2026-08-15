import { ValidationErrorCode } from "@org/errors";
import { Field } from "@shared/ui";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import { RHFFormFieldProps } from "./RHFForm.type";
import { createErrorMessageResolver } from "./utils";

export function RHFFormField<
  T extends FieldValues,
  TErrorCodes extends readonly ValidationErrorCode[] = readonly ValidationErrorCode[],
>({
  name,
  label,
  errorCodes,
  getErrorMessage = (errorCode) => String(errorCode),
  render,
  ...controllerProps
}: RHFFormFieldProps<T, TErrorCodes>) {
  const { control } = useFormContext<T>();

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;

  const errorMessageResolver = createErrorMessageResolver<TErrorCodes>(getErrorMessage, errorCodes);

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const additionalProps: React.InputHTMLAttributes<HTMLInputElement> = {
          id: fieldId,
          "aria-invalid": fieldState.invalid,
          "aria-describedby": fieldState.invalid ? errorId : undefined,
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <Field.Label htmlFor={fieldId}>{label}</Field.Label>}

            {render({
              field,
              fieldState,
              formState,
              additionalProps,
            })}

            {fieldState.invalid && (
              <Field.Error id={errorId} errors={[errorMessageResolver(fieldState.error)]} />
            )}
          </Field>
        );
      }}
    />
  );
}

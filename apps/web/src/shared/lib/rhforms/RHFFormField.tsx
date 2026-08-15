import { parseValidationErrorCode } from "@org/errors";
import { Field } from "@shared/ui";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import { RHFFormFieldProps } from "./RHFForm.type";

export function RHFFormField<T extends FieldValues>({
  name,
  label,
  errorMessagesMapper = {},
  render,
  ...controllerProps
}: RHFFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        console.log(fieldState.error);
        const additionalProps: React.InputHTMLAttributes<HTMLInputElement> = {
          id: fieldId,
          "aria-invalid": fieldState.invalid,
          "aria-describedby": fieldState.invalid ? errorId : undefined,
        };

        const errorCode = parseValidationErrorCode(fieldState.error);

        const errorMessage =
          (errorCode && errorMessagesMapper[errorCode]) ?? fieldState.error?.message;

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
              <Field.Error id={errorId} errors={[{ message: errorMessage }]} />
            )}
          </Field>
        );
      }}
    />
  );
}

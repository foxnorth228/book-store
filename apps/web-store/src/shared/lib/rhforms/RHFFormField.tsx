import { cn, Field } from "@org/ui";
import { Controller, FieldValues, useFormContext } from "react-hook-form";

import { RHFFormFieldProps } from "./RHFForm.type";

export function RHFFormField<T extends FieldValues>({
  name,
  label,
  render,
  className,
  ...controllerProps
}: RHFFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  const fieldId = `field-${name}`;
  const labelId = `${fieldId}-label`;
  const errorId = `${fieldId}-error`;

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const additionalProps = {
          id: fieldId,
          "aria-invalid": fieldState.invalid,
          "aria-describedby": fieldState.invalid ? errorId : undefined,
          "aria-labelledby": label ? labelId : undefined,
        };

        return (
          <Field className={cn(className)} data-invalid={fieldState.invalid}>
            {label && (
              <Field.Label id={labelId} htmlFor={fieldId}>
                {label}
              </Field.Label>
            )}

            {render({
              field,
              fieldState,
              formState,
              additionalProps,
            })}

            {fieldState.invalid && <Field.Error id={errorId} errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

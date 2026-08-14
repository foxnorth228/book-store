import { Field, FieldError, FieldLabel } from "@shared/ui";
import { Controller, ControllerProps, FieldValues, Path, useFormContext } from "react-hook-form";

interface RHFFormFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T, Path<T>>,
  "name" | "control" | "render"
> {
  name: Path<T>;
  label?: string;
  render: ControllerProps<T, Path<T>>["render"];
}

export function RHFFormField<T extends FieldValues>({
  name,
  label,
  render,
  ...controllerProps
}: RHFFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      {...controllerProps}
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          {render({
            field,
            fieldState,
            formState,
          })}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

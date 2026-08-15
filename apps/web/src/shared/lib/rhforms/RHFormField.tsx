import { Field } from "@shared/ui";
import { Controller, ControllerProps, FieldValues, Path, useFormContext } from "react-hook-form";

type RHFFieldRenderProps<T extends FieldValues, TName extends Path<T>> = Parameters<
  ControllerProps<T, TName>["render"]
>[0] & {
  additionalProps: React.InputHTMLAttributes<HTMLInputElement>;
};

interface RHFFormFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T, Path<T>>,
  "name" | "control" | "render"
> {
  name: Path<T>;
  label?: string;
  render: (
    props: RHFFieldRenderProps<T, Path<T>>,
  ) => ReturnType<ControllerProps<T, Path<T>>["render"]>;
}

export function RHFFormField<T extends FieldValues>({
  name,
  label,
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

            {fieldState.invalid && <Field.Error id={errorId} errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}

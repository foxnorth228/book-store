import { FormField } from "@shared/ui";
import { FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";

interface RHFFormFieldRenderProps<T extends FieldValues> {
  field: ReturnType<ReturnType<typeof useFormContext<T>>["register"]>;
  meta: {
    error?: string;
    status: "default" | "error";
  };
}

interface RHFFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  registerOptions?: RegisterOptions<T>;
  render: (props: RHFFormFieldRenderProps<T>) => React.ReactNode;
}

export function RHFFormField<T extends FieldValues>({
  name,
  label,
  registerOptions,
  render,
}: RHFFormFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  const field = register(name, registerOptions);

  return (
    <FormField
      label={label}
      error={error?.message as string | undefined}
      status={error ? "error" : "default"}
    >
      {render({
        field,
        meta: {
          error: error?.message as string | undefined,

          status: error ? "error" : "default",
        },
      })}
    </FormField>
  );
}

import { Field, FieldError, FieldLabel } from "@shared/ui";
import { FieldValues, Path, RegisterOptions, useFormContext } from "react-hook-form";

type RHFFieldControlProps = React.InputHTMLAttributes<HTMLInputElement>;

interface RHFFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  registerOptions?: RegisterOptions<T>;
  children: (props: RHFFieldControlProps) => React.ReactNode;
}

export function RHFFormField<T extends FieldValues>({
  name,
  label,
  registerOptions,
  children,
}: RHFFormFieldProps<T>) {
  const { register, getFieldState } = useFormContext<T>();

  const { error } = getFieldState(name);
  const field = register(name, registerOptions);

  const controlProps: RHFFieldControlProps = {
    ...field,
    "aria-invalid": error ? true : undefined,
  };

  return (
    <Field data-invalid={!!error}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

      {children(controlProps)}

      {error && <FieldError errors={[error]} />}
    </Field>
  );
}

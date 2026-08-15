import { ValidationErrorCode } from "@org/errors";
import { ControllerProps, FieldValues, Path, SubmitHandler, UseFormProps } from "react-hook-form";

export interface RHFFormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export type RHFFieldRenderProps<T extends FieldValues, TName extends Path<T>> = Parameters<
  ControllerProps<T, TName>["render"]
>[0] & {
  additionalProps: React.InputHTMLAttributes<HTMLInputElement>;
};

export type RFHFormFieldErrorMessagesMapper = Partial<Record<ValidationErrorCode, string>>;

export interface RHFFormFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T, Path<T>>,
  "name" | "control" | "render"
> {
  name: Path<T>;
  label?: string;

  errorMessagesMapper?: RFHFormFieldErrorMessagesMapper;

  render: (
    props: RHFFieldRenderProps<T, Path<T>>,
  ) => ReturnType<ControllerProps<T, Path<T>>["render"]>;
}

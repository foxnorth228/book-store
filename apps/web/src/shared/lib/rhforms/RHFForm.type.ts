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

export interface RHFFormFieldProps<
  T extends FieldValues,
  TErrorCodes extends readonly ValidationErrorCode[] = readonly ValidationErrorCode[],
> extends Omit<ControllerProps<T, Path<T>>, "name" | "control" | "render"> {
  name: Path<T>;
  label?: string;

  errorCodes?: TErrorCodes;
  getErrorMessage?: (errorCode: TErrorCodes[number]) => string;

  render: (
    props: RHFFieldRenderProps<T, Path<T>>,
  ) => ReturnType<ControllerProps<T, Path<T>>["render"]>;
}

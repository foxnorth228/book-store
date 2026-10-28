import { ControllerProps, FieldValues, Path, SubmitHandler, UseFormProps } from "react-hook-form";

export interface RHFFormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

export interface RHFFieldAdditionalProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
}

export type RHFFieldRenderProps<T extends FieldValues, TName extends Path<T>> = Parameters<
  ControllerProps<T, TName>["render"]
>[0] & {
  additionalProps: RHFFieldAdditionalProps;
};

export interface RHFFormFieldProps<T extends FieldValues> extends Omit<
  ControllerProps<T, Path<T>>,
  "name" | "control" | "render"
> {
  name: Path<T>;
  label?: string;
  className?: string;
  render: (
    props: RHFFieldRenderProps<T, Path<T>>,
  ) => ReturnType<ControllerProps<T, Path<T>>["render"]>;
}

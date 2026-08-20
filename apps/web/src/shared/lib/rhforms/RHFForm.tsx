import { cn } from "@shared/lib";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

import { RHFFormProps } from "./RHFForm.type";

export function RHFForm<T extends FieldValues>({
  onSubmit,
  children,
  className,
  ...formOptions
}: RHFFormProps<T>) {
  const methods = useForm<T>(formOptions);

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        className={cn("flex flex-col gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

import { cn } from "@shared/lib";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from "react-hook-form";

interface RHFFormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
}

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
        className={cn("flex flex-col gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

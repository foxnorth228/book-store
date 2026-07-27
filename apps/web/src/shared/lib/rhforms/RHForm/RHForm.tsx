import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps } from "react-hook-form";

import { Form } from "./RHForm.styles";

interface RHFFormProps<T extends FieldValues> extends UseFormProps<T> {
  onSubmit: SubmitHandler<T>;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function RHFForm<T extends FieldValues>({
  onSubmit,
  children,
  className,
  as,
  ...formOptions
}: RHFFormProps<T>) {
  const methods = useForm<T>(formOptions);

  return (
    <FormProvider {...methods}>
      <Form as={as} className={className} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { RHFFormField } from "@shared/lib";
import { Input, Link } from "@shared/ui";
import { FormProvider, useForm } from "react-hook-form";

import { RegisterFormData, registerSchema } from "../../model/auth.schema";
import { Description, Footer, FooterLink, Form, SubmitButton, Title } from "./AuthForm.styles";

export function RegisterForm() {
  const formProps = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);

    // await AuthApi.register(data)
  };

  return (
    <FormProvider {...formProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Регистрация</Title>

        <Description>Создайте новый аккаунт для работы с Rift Hub</Description>

        <RHFFormField<RegisterFormData>
          name="email"
          label="Email"
          render={({ field, meta }) => (
            <Input {...field} type="email" placeholder="example@mail.com" status={meta.status} />
          )}
        />

        <RHFFormField<RegisterFormData>
          name="password"
          label="Пароль"
          render={({ field, meta }) => (
            <Input {...field} type="password" placeholder="Введите пароль" status={meta.status} />
          )}
        />

        <RHFFormField<RegisterFormData>
          name="confirmPassword"
          label="Подтверждение пароля"
          render={({ field, meta }) => (
            <Input {...field} type="password" placeholder="Повторите пароль" status={meta.status} />
          )}
        />

        <RHFFormField<RegisterFormData>
          name="region"
          label="Регион"
          render={({ field, meta }) => (
            <Input {...field} placeholder="Например, EUW" status={meta.status} />
          )}
        />

        <SubmitButton type="submit">Создать аккаунт</SubmitButton>

        <Footer>
          <span>Уже есть аккаунт?</span>

          <FooterLink as={Link} to="/login">
            Войти
          </FooterLink>
        </Footer>
      </Form>
    </FormProvider>
  );
}

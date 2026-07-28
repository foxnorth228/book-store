import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";
import { FormProvider, useForm } from "react-hook-form";

import { LoginFormData, loginSchema } from "../../model/auth.schema";
import { Description, Footer, FooterLink, Form, SubmitButton, Title } from "./AuthForm.styles";

export function LoginForm() {
  const formProps = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await AuthApi.login(data);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...formProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Вход</Title>

        <Description>Введите данные своего аккаунта</Description>

        <RHFFormField<LoginFormData>
          name="email"
          label="Email"
          render={({ field, meta }) => (
            <Input {...field} type="email" placeholder="example@mail.com" status={meta.status} />
          )}
        />

        <RHFFormField<LoginFormData>
          name="password"
          label="Пароль"
          render={({ field, meta }) => (
            <Input {...field} type="password" placeholder="Введите пароль" status={meta.status} />
          )}
        />

        <FooterLink to="/forgot-password">Забыли пароль?</FooterLink>

        <SubmitButton type="submit">Войти</SubmitButton>

        <Footer>
          <span>Нет аккаунта?</span>

          <FooterLink to="/register">Создать аккаунт</FooterLink>
        </Footer>
      </Form>
    </FormProvider>
  );
}

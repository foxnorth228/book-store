import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthRegisterReq } from "@org/contracts";
import { RHFFormField } from "@shared/lib";
import { Input, Link } from "@shared/ui";
import { FormProvider, useForm } from "react-hook-form";

import { AuthApi } from "../../api/auth.api";
import { Description, Footer, FooterLink, Form, SubmitButton, Title } from "./AuthForm.styles";

export function RegisterForm() {
  const formProps = useForm<AuthRegisterReq>({
    resolver: zodResolver(authContracts.register.body),
    mode: "onSubmit",
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: AuthRegisterReq) => {
    console.log(data);

    await AuthApi.register(data);
  };

  return (
    <FormProvider {...formProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Регистрация</Title>

        <Description>Создайте новый аккаунт для работы с Rift Hub</Description>

        <RHFFormField<AuthRegisterReq>
          name="email"
          label="Email"
          render={({ field, meta }) => (
            <Input {...field} type="email" placeholder="example@mail.com" status={meta.status} />
          )}
        />

        <RHFFormField<AuthRegisterReq>
          name="password"
          label="Пароль"
          render={({ field, meta }) => (
            <Input {...field} type="password" placeholder="Введите пароль" status={meta.status} />
          )}
        />

        <RHFFormField<AuthRegisterReq>
          name="confirmPassword"
          label="Подтверждение пароля"
          render={({ field, meta }) => (
            <Input {...field} type="password" placeholder="Повторите пароль" status={meta.status} />
          )}
        />

        <RHFFormField<AuthRegisterReq>
          name="language"
          label="Язык"
          render={({ field }) => <Input {...field} disabled value="en" />}
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

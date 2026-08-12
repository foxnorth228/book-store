import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthLoginReq } from "@org/contracts";
import { RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { signIn } from "../../model/sign-in";
import { Description, Footer, FooterLink, Form, SubmitButton, Title } from "./AuthForm";

export function LoginForm() {
  const formProps = useForm<AuthLoginReq>({
    resolver: zodResolver(authContracts.login.body),
    mode: "onSubmit",
  });

  const { handleSubmit } = formProps;

  const onSubmit = async (data: AuthLoginReq) => {
    try {
      const response = await signIn(data);

      console.log(response);
    } catch (error) {
      toast.error("error");
      console.error(error);
    }
  };

  return (
    <FormProvider {...formProps}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Вход</Title>

        <Description>Введите данные своего аккаунта</Description>

        <RHFFormField<AuthLoginReq>
          name="email"
          label="Email"
          render={({ field, meta }) => (
            <Input {...field} type="email" placeholder="example@mail.com" status={meta.status} />
          )}
        />

        <RHFFormField<AuthLoginReq>
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

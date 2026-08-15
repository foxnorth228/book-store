import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthLoginReq } from "@org/contracts";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";
import { toast } from "sonner";

import { signIn } from "../model/sign-in";
import { Description, Footer, FooterLink, SubmitButton, Title } from "./AuthForm";

export function LoginForm() {
  const onSubmit = async (data: AuthLoginReq) => {
    try {
      const response = await signIn(data);

      console.log(response);
    } catch (error) {
      toast("Error", { description: String(error) });
      console.error(error);
    }
  };

  return (
    <RHFForm onSubmit={onSubmit} mode={"onSubmit"} resolver={zodResolver(authContracts.login.body)}>
      <Title>Вход</Title>

      <Description>Введите данные своего аккаунта</Description>

      <RHFFormField<AuthLoginReq>
        name="email"
        label="Email"
        render={({ field, additionalProps }) => (
          <Input {...field} {...additionalProps} type="email" placeholder="example@mail.com" />
        )}
      />

      <RHFFormField<AuthLoginReq>
        name="password"
        label="Пароль"
        render={({ field, additionalProps }) => (
          <Input {...field} {...additionalProps} type="password" placeholder="Введите пароль" />
        )}
      />

      <FooterLink to="/forgot-password">Забыли пароль?</FooterLink>

      <SubmitButton type="submit">Войти</SubmitButton>

      <Footer>
        <span>Нет аккаунта?</span>

        <FooterLink to="/register">Создать аккаунт</FooterLink>
      </Footer>
    </RHFForm>
  );
}

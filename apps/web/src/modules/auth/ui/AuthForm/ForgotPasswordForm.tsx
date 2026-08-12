import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input, Link } from "@shared/ui";
import { useState } from "react";

import { ForgotPasswordFormData, forgotPasswordSchema } from "../../model/reset-password.schema";
import { Description, Footer, FooterLink, SubmitButton, SuccessMessage, Title } from "./AuthForm";

export function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await AuthApi.forgotPassword(data);

    setSuccess(true);
  };

  return (
    <RHFForm<ForgotPasswordFormData>
      resolver={zodResolver(forgotPasswordSchema)}
      mode="onSubmit"
      onSubmit={onSubmit}
    >
      <Title>Восстановление пароля</Title>

      <Description>Введите email, и мы отправим ссылку для восстановления пароля.</Description>

      <RHFFormField<ForgotPasswordFormData>
        name="email"
        label="Email"
        render={({ field, meta }) => (
          <Input {...field} type="email" placeholder="example@mail.com" status={meta.status} />
        )}
      />

      <SubmitButton type="submit">Отправить ссылку</SubmitButton>

      {success && <SuccessMessage>Если аккаунт существует, письмо было отправлено.</SuccessMessage>}

      <Footer>
        <span>Вспомнили пароль?</span>

        <FooterLink as={Link} to="/login">
          Войти
        </FooterLink>
      </Footer>
    </RHFForm>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";

import { ForgotPasswordFormData, forgotPasswordSchema } from "../../model/reset-password.schema";
import { Description, Footer, SubmitButton, Title } from "./auth-form-components";

export function ForgotPasswordForm() {
  const onSubmit = async (data: ForgotPasswordFormData) => {
    await AuthApi.forgotPassword(data);
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
        render={({ field }) => <Input {...field} type="email" placeholder="example@mail.com" />}
      />

      <SubmitButton type="submit">Отправить ссылку</SubmitButton>

      <Footer>
        <span>Вспомнили пароль?</span>
      </Footer>
    </RHFForm>
  );
}

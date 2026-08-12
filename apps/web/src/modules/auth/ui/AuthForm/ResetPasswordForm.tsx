import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";

import { type ResetPasswordFormData, resetPasswordSchema } from "../../model/reset-password.schema";
import { Description, SubmitButton, Title } from "./AuthForm";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  async function handleSubmit(data: ResetPasswordFormData) {
    await AuthApi.resetPassword({
      ...data,
      token,
    });
  }

  return (
    <RHFForm<ResetPasswordFormData>
      resolver={zodResolver(resetPasswordSchema)}
      onSubmit={handleSubmit}
    >
      <Title>Новый пароль</Title>

      <Description>Придумайте новый пароль для вашего аккаунта.</Description>

      <RHFFormField<ResetPasswordFormData>
        name="password"
        label="Новый пароль"
        render={({ field, meta }) => (
          <Input
            {...field}
            type="password"
            placeholder="Введите новый пароль"
            status={meta.status}
          />
        )}
      />

      <RHFFormField<ResetPasswordFormData>
        name="passwordConfirmation"
        label="Повторите пароль"
        render={({ field, meta }) => (
          <Input {...field} type="password" placeholder="Повторите пароль" status={meta.status} />
        )}
      />

      <SubmitButton type="submit">Сохранить пароль</SubmitButton>
    </RHFForm>
  );
}

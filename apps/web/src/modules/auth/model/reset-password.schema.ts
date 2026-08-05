import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Введите корректный email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),

    passwordConfirmation: z.string().min(1, "Повторите пароль"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли не совпадают",
    path: ["passwordConfirmation"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

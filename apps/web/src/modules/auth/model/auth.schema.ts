import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.email("Некорректный email"),
    password: z.string().min(6, "Минимум 6 символов"),
    confirmPassword: z.string(),
    region: z.string().min(2, "Укажите регион"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

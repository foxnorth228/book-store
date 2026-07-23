import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApi } from "@modules/auth/api/auth.api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { LoginFormData, loginSchema } from "../../model/auth.schema";
import { Button, ErrorText, Form, Input, Title } from "./LoginForm.styles";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);

    // позже:
    // await authApi.login(data)
  };

  useEffect(() => {
    console.log("n");
    AuthApi.login({});
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход</Title>

      <Input placeholder="Email" {...register("email")} />

      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Input type="password" placeholder="Пароль" {...register("password")} />

      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Button type="submit">Войти</Button>
    </Form>
  );
}

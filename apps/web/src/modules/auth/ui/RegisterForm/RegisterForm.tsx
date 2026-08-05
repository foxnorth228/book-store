import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { RegisterFormData, registerSchema } from "../../model/auth.schema";
import { Button, ErrorText, Form, Input, Title } from "../LoginForm/LoginForm.styles";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);

    // await authApi.register(data)
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Регистрация</Title>

      <Input placeholder="Email" {...register("email")} />

      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

      <Input type="password" placeholder="Пароль" {...register("password")} />

      <Input type="password" placeholder="Повторите пароль" {...register("confirmPassword")} />

      {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}

      <Input placeholder="Регион" {...register("region")} />

      <Button type="submit">Создать аккаунт</Button>
    </Form>
  );
}

import { z } from "zod";

const passwordSсhema = z
  .string({
    required_error: "Поле не может быть пустым",
  })
  .min(5, { message: "Минимальное количество символов: 5" })
  .regex(/^[A-Za-z0-9!@#$%^&*()_+{}[\]:;<>,.?~/-]+$/, {
    message: "Имя пользователя должно состоять из латинского алфавита",
  });

export const signUpLocalInputSchema = z
  .object({
    email: z
      .string({ required_error: "Необходимо указать email" })
      .min(1, { message: "Необходимо указать email" })
      .email({ message: "Некорректный адрес электронной почты" }),
    password: passwordSсhema,
    repeatedPassword: passwordSсhema,
    acceptPolicy: z.literal<boolean>(true),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "Пароли не совпадают",
    path: ["repeatedPassword"],
  });

export const signInInputSchema = z.object({
  email: z
    .string({ required_error: "Поле не может быть пустым" })
    .email({ message: "Некорректный адрес электронной почты" }),
  password: passwordSсhema,
});

import { z } from "zod";

const passwordSсhema = z
  .string({ required_error: "Поле не может быть пустым" })
  .min(5, { message: "Минимальное количество символов: 5" });

export const resetPasswordInputSchema = z
  .object({
    newPassword: passwordSсhema,
    repeatNewPassword: passwordSсhema,
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Пароли не совпадают",
    path: ["repeatNewPassword"],
  });

import { z } from "zod";

export const forgetPasswordFormSchema = z.object({
  email: z
    .string({ required_error: "Необходимо указать email" })
    .min(1, { message: "Необходимо указать email" })
    .email({ message: "Некорректный адрес электронной почты" }),
});

import { z } from "zod";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    const schema = z.string().uuid();

    await schema.parseAsync(to.params?.forgotten_password_uuid);
  } catch {
    return navigateTo("/");
  }
});

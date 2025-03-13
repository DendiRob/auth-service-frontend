import { z } from "zod";

export default defineNuxtRouteMiddleware(async (to) => {
  const confirmData = {
    user_uuid: to.params?.user_uuid as string,
    confirmation_uuid: to.query?.confirmationUuid as string,
  };
  try {
    const schema = z.object({
      user_uuid: z.string().uuid(),
      confirmation_uuid: z.string().uuid(),
    });

    await schema.parseAsync(confirmData);
  } catch {
    return navigateTo("/");
  }
});

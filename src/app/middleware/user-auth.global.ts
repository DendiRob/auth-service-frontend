import { useUserSession } from "@@/src/entities/user";
import { getLS } from "~/src/shared/lib";

export default defineNuxtRouteMiddleware(async (to) => {
  try {
    if (import.meta.client) {
      const userSessionStore = useUserSession();
      const isUserAuth = getLS("isUserAuth");

      if (to.meta.isPublic) {
        return;
      }

      if (!userSessionStore.isUserAuth && isUserAuth === "true") {
        const { data } = await userSessionStore.getMe();
        userSessionStore.setMe(data.me);
      }

      if (!userSessionStore.isUserAuth && to.path !== "/auth") {
        return navigateTo("/auth");
      }

      if (userSessionStore.isUserAuth && to.path === "/auth") {
        return navigateTo("/dashboard");
      }
    }
  } catch {
    return navigateTo("/auth");
  }
});

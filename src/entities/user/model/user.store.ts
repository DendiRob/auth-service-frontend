import type { TUser } from "@@/src/entities/user";
import { getUserMeQueryOptions, meBaseQuery } from "@@/src/entities/user";
import { clearLS } from "~/src/shared/lib";

export const useUserSession = defineStore("user-session", () => {
  const user = ref<TUser | null>(null);

  const isUserAuth = computed(() => {
    return Boolean(user.value);
  });

  const setMe = (data: TUser) => {
    user.value = data;
  };

  const getMe = async () => {
    const { $queryClient } = useNuxtApp();

    return await $queryClient.fetchQuery(getUserMeQueryOptions());
  };

  const clearUser = async () => {
    const { $queryClient } = useNuxtApp();
    $queryClient.invalidateQueries({ queryKey: [meBaseQuery] });
    user.value = null;
    clearLS();
  };

  return { user, isUserAuth, getMe, clearUser, setMe };
});

<template>
  <div class="wrapper">
    <Button
      type="button"
      class="profile__btn"
      unstyled
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="toggle"
    >
      <Avatar v-if="image" class="profile__avatar" :image="image" />
      <Avatar v-else icon="pi pi-user" class="profile__avatar" />
    </Button>

    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import type { MenuItem } from "primevue/menuitem";
import { useUserSession } from "~/src/entities/user";
import { logout } from "~/src/shared/api/mutations";
import { useGeneralToast } from "~/src/shared/lib";

defineProps<{ image?: string }>();

const { graphqlErrorToast, successToast } = useGeneralToast();
const userSessionStore = useUserSession();

const menu = ref();
const menuItems = computed<MenuItem[]>(() => {
  return [
    {
      label: "Профиль",
      icon: "pi pi-user",
      url: "/profile",
    },
    {
      label: "Выйти",
      icon: "pi pi-sign-out",
      command: () => logoutFn(),
    },
  ];
});

const { mutate: logoutFn } = useMutation({
  mutationFn: () => logout(),
  onSuccess: (res) => {
    userSessionStore.clearUser();
    successToast(res.data?.logout);
    navigateTo({ name: "home-page" });
  },
  onError: (error) => graphqlErrorToast(error),
});

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event);
};
</script>

<style scoped lang="scss">
@import url("Profile.module.scss");
</style>

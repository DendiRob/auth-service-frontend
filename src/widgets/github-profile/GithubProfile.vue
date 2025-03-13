<template>
  <div class="profile">
    <NuxtLink :to="html_url" class="profile__avatar" target="_blank">
      <img :src="avatar_url" alt="github profile" />
    </NuxtLink>
    <h2 class="profile__name">{{ name }}</h2>
    <ul class="profile__contacts">
      <li>
        <NuxtLink :to="tg_link" target="_blank">
          <i class="pi pi-telegram"></i>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="html_url" target="_blank">
          <i class="pi pi-github"></i>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  avatar_url: string;
  html_url: string;
  name: string;
  login: string;
  tg_link: string;
}>();
</script>

<style scoped lang="scss">
@import url(GithubProfile.module.scss);
</style>

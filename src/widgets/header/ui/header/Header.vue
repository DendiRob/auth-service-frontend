<template>
  <header class="header">
    <NuxtLink :to="{ name: 'dashboard' }" class="header__home">
      <i-logo-sportik class="header__logo" />
      <h1 class="title">Sportik</h1>
    </NuxtLink>
    <div class="header__menu">
      <Profile />
      <Button
        unstyled
        icon="pi pi-bars"
        class="header__sidebar-btn"
        :pt="{ label: { style: { display: 'none' } } }"
        @click="emits('openSidebar')"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import Profile from "../profile/Profile.vue";

const emits = defineEmits(["openSidebar"]);
</script>

<style scoped lang="scss">
@import url("Header.module.scss");
</style>

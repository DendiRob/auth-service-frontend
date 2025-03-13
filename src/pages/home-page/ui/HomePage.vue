<template>
  <div class="wrapper">
    <h1 class="title">
      Добро пожаловать на сайт проекта <span>"Sportik"</span>
    </h1>

    <p class="description"></p>

    <CButton
      class="start-btn"
      label="Начать"
      :ui-props="{
        icon: 'pi pi-arrow-right',
        iconPos: 'right',
        as: 'router-link',
        to: '/dashboard',
      }"
    />

    <section class="team" v-if="!error">
      <div v-if="data">
        <h2>Разработчики проекта</h2>
        <div class="developers" v-if="data && !error">
          <GithubProfile v-bind="data" tg_link="https://t.me/loukral" />
        </div>
      </div>
      <Loader v-else />
    </section>
  </div>
</template>

<script setup lang="ts">
import CButton from "~/src/shared/ui/c-button/CButton.vue";
import GithubProfile from "~/src/widgets/github-profile/GithubProfile.vue";
import type { TGithubUser } from "./HomePage.types";

const { data, error } = await useAsyncData<TGithubUser>("DendiRob", () =>
  $fetch("https://api.github.com/users/DendiRob")
);
</script>
<style scoped lang="scss">
@import url("HomePage.module.scss");
</style>

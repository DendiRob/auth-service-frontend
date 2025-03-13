<template>
  <div class="wrapper">
    <Header class="header" @open-sidebar="switchSidebar(true)" />
    <Sidebar :is-sidebar-open="isSidebarOpen" @close="switchSidebar(false)" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Header } from "~/src/widgets/header";
import { Sidebar } from "~/src/widgets/sidebar";

const { switchSidebar, isSidebarOpen } = useSidebar();

function useSidebar() {
  const isSidebarOpen = shallowRef(false);

  const switchSidebar = (state = !isSidebarOpen.value) =>
    (isSidebarOpen.value = state);

  return { switchSidebar, isSidebarOpen };
}
</script>

<style scoped lang="scss">
@import url("default.module.scss");
</style>

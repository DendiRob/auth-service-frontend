<template>
  <Drawer :visible="isSidebarOpen" position="right" :showCloseIcon="false">
    <template #header>
      <div class="sidebar__header">
        <Button
          unstyled
          icon="pi pi-times"
          class="sidebar__close"
          :pt="{ icon: { style: { fontSize: '1.2rem' } } }"
          @click="emits('close')"
        />
      </div>
    </template>
    <Menu :model="menuItems" />
  </Drawer>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

defineProps<{ isSidebarOpen: boolean }>();
const emits = defineEmits(["close"]);

const menuItems = computed<MenuItem[]>(() => {
  return [
    {
      label: "Упражнения",
      items: [
        {
          label: "Список упражнений",
        },
        {
          label: "Конструктор упражнений",
        },
      ],
    },
  ];
});
</script>

<style scoped lang="scss">
@import url(Sidebar.module.scss);
</style>

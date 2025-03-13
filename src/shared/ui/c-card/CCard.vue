<template>
  <Card v-bind="uiProps">
    <template #header>
      <slot name="header" />
    </template>
    <template #title>
      <slot name="title" />
    </template>
    <template #subtitle>
      <slot name="subtitle" />
    </template>
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { CardProps } from "primevue";

defineProps<{ uiProps?: CardProps }>();
</script>

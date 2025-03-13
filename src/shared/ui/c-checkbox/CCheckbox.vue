<template>
  <Checkbox v-model="value" v-bind="uiProps" />
</template>
<script setup lang="ts">
import type { CheckboxProps } from "primevue";
const { name } = defineProps<{ uiProps?: CheckboxProps; name: string }>();

const { value } = useField(name, undefined, {
  syncVModel: true,
});
</script>

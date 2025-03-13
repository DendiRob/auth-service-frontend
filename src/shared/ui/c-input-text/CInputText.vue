<template>
  <InputText v-model="model" v-bind="uiProps" />
</template>

<script setup lang="ts">
import type { InputTextProps } from "primevue";

defineProps<{ uiProps?: InputTextProps }>();

const model = defineModel<string | null>();
</script>

<style scoped lang="scss">
@import url("CInputText.module.scss");
</style>

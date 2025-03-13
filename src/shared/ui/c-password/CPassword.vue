<template>
  <Password v-model="model" toggleMask :feedback="false" v-bind="uiProps" />
</template>

<script setup lang="ts">
import { Password, type PasswordProps } from "primevue";

defineProps<{ uiProps?: PasswordProps }>();

const model = defineModel<string | null>();
</script>

<style scoped lang="scss">
@import url(CPassword.module.scss);
</style>

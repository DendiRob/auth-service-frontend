<template>
  <Button :label="label" v-bind="uiProps">
    <template #default>
      <slot />
    </template>
  </Button>
</template>

<script setup lang="ts">
import type { TCButtonProps } from "./CButton.types";

defineProps<TCButtonProps>();
</script>

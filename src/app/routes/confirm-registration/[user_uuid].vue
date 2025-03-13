<template>
  <ConfirmRegistration />
</template>

<script setup lang="ts">
import {
  ConfirmRegistration,
  validateRouteMiddleware,
} from "~/src/pages/confirm-registartion";

definePageMeta({
  isPublic: true,
  middleware: validateRouteMiddleware,
  layout: false,
});
</script>

<style scoped></style>

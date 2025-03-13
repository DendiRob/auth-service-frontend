<template>
  <ResetPassword />
</template>

<script setup lang="ts">
import {
  ResetPassword,
  validateRouteMiddleware,
} from "~/src/pages/reset-password";

definePageMeta({
  isPublic: true,
  name: "reset-password",
  middleware: validateRouteMiddleware,
  layout: false,
});
</script>

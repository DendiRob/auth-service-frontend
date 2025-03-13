<template>
  <ClientOnly fallbackTag="div">
    <AuthPage />
    <template #fallback>
      <Loader />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { AuthPage } from "~/src/pages/auth";
definePageMeta({
  name: "auth",
  layout: false,
});
</script>

<template>
  <HomePage />
</template>

<script setup>
import { HomePage } from "@/pages/home-page";

definePageMeta({
  isPublic: true,
  name: "home-page",
  layout: false,
});
</script>

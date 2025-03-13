<template>
  <ForgetPasswordEmail />
</template>

<script setup lang="ts">
import { ForgetPasswordEmail } from "~/src/pages/forget-password";
definePageMeta({
  isPublic: true,
  name: "forget-password",
  layout: false,
});
</script>

<template>
  <NuxtLink to="/" aria-label="Rukun">
    <img :src="logoSrc" alt="Rukun Logo" width="180" height="60" />
  </NuxtLink>
</template>

<script setup lang="ts">
import logoSrc from '~/public/logo.png';
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
</style>

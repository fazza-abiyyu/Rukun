<template>
  <div>
    <AppHeader v-if="!isAuthPage" />
    <AppSiderbar v-if="!isAuthPage" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isAuthPage = computed(() => route.path.includes('/auth'));
</script>

<style scoped></style>

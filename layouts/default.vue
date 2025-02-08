<template>
  <div class="page-background">
    <AppHeader />
    <AppSiderbar />
    <ChatModal />
    <slot />
  </div>
</template>

<script setup lang="ts">
import ChatModal from "~/components/modal/ChatModal.vue";
</script>

<style scoped>
.page-background {
  background-color: #F5ECD7;
  min-height: 100vh; /* Agar background menutupi seluruh tinggi halaman */
}
</style>

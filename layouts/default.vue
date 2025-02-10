<template>
  <div>
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

</style>
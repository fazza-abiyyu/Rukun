<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const {initAuth} = useAuth()

onMounted(() => {
  initAuth()
})
</script>
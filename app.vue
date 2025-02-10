<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="#017BFE" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const {initAuth} = useAuth()

onMounted(() => {
  initAuth()
})
</script>
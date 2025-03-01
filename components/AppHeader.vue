<template>
  <header
    class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]">
    <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
      <div class="me-5 lg:me-0 lg:hidden">
        <!-- Logo -->
        <AppLogo />
        <!-- End Logo -->
      </div>

      <div class="w-full flex items-center justify-end ms-auto lg:justify-between gap-x-1 md:gap-x-3">
        <div class="hidden lg:block">

        </div>

        <div class="flex flex-row items-center justify-end gap-1">
          <span class="font-bold text-1xl">{{ greeting }}</span>


          <!-- Dropdown -->
          <div class="hs-dropdown [--placement:bottom-right] relative inline-flex ml-2">
            <button id="hs-dropdown-account" type="button"
              class="size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
              <img class="shrink-0 size-[38px] rounded-full"
                src="https://res.cloudinary.com/dmjb33clr/image/upload/v1733470093/puson_app/profile/avatar.png"
                alt="Avatar">
            </button>

            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-account">
              <div class="py-3 px-5 bg-gray-100 rounded-t-lg">
                <p class="text-sm text-gray-500">Masuk sebagai</p>
                <p class="text-sm font-medium text-gray-800">{{ user?.username }}</p>
              </div>
              <div class="p-1.5 space-y-0.5">
                <NuxtLink
                  class="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  @click="handleLogout">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" x2="9" y1="12" y2="12" />
                  </svg>
                  Keluar
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- End Dropdown -->
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import AppLogo from "~/components/AppLogo.vue";
import type {User} from "~/types/TypesModel";
import { ref, computed, onMounted } from "vue";
import { useNuxtApp } from "#app";

const {$toast} = useNuxtApp();
const {logout, useAuthUser} = useAuth()

const user = computed(() => useAuthUser().value as User)
const greeting = ref("");

const handleLogout = async () => {
  try {
    await logout()
  } catch (error: any) {
    return
  } finally {
    $toast('Berhasil menghapus sesi masuk.', 'success'); // Menampilkan pesan kesalahan menggunakan toast
    navigateTo('/auth/login'); // Setelah logout berhasil, arahkan ke halaman login
  }
}

// Fungsi menentukan ucapan sesuai waktu
const setGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting.value = "Selamat Pagi!";
  } else if (hour < 18) {
    greeting.value = "Selamat Siang!";
  } else {
    greeting.value = "Selamat Malam!";
  }
};
// Panggil ucapan saat komponen dimuat
onMounted(setGreeting);

</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
</style>
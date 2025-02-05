<template>
  <div>
    <!-- ========== HEADER ========== -->
    <header class="flex flex-wrap  md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200">
      <nav
          class="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-3 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center gap-x-1">
          <NuxtLink class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80" to="#"
                    aria-label="Healing">
            <img src="/logo.png" alt="Healing" height="50" width="50" />
          </NuxtLink>

          <!-- Collapse Button -->
          <button type="button"
                  class="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-cyan-800 hover:bg-cyan-100 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-header-base-collapse" aria-expanded="false" aria-controls="hs-header-base"
                  aria-label="Toggle navigation" data-hs-collapse="#hs-header-base">
            <svg class="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6"/>
              <line x1="3" x2="21" y1="12" y2="12"/>
              <line x1="3" x2="21" y1="18" y2="18"/>
            </svg>
            <svg class="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                 stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
          <!-- End Collapse Button -->
        </div>

        <!-- Collapse -->
        <div id="hs-header-base"
             class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "
             aria-labelledby="hs-header-base-collapse">
          <div
              class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-cyan-100 [&::-webkit-scrollbar-thumb]:bg-cyan-300">
            <div class="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
              <div class="grow">
                <div class="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                  <NuxtLink
                      class="p-2 flex items-center text-sm text-cyan-800 hover:bg-cyan-100 rounded-lg focus:outline-none"
                      to="/" aria-current="page" active-class="bg-cyan-100">
                    <svg class="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
                      <path
                          d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </svg>
                    Landing
                  </NuxtLink>

                  <NuxtLink
                      class="p-2 flex items-center text-sm text-cyan-800 hover:bg-cyan-100 rounded-lg focus:outline-none"
                      to="/quizzies" active-class="bg-cyan-100">
                    <svg class="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Quiz
                  </NuxtLink>

                  <NuxtLink
                      v-if="isLogged"
                      class="p-2 flex items-center text-sm text-cyan-800 hover:bg-cyan-100 rounded-lg focus:outline-none"
                      to="/profile" active-class="bg-cyan-100">
                    <svg class="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 12h.01"/>
                      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      <path d="M22 13a18.15 18.15 0 0 1-20 0"/>
                      <rect width="20" height="14" x="2" y="6" rx="2"/>
                    </svg>
                    Profile
                  </NuxtLink>

                  <NuxtLink
                      v-if="!isLogged"
                      class="p-2 flex items-center text-sm text-cyan-800 hover:bg-cyan-100 rounded-lg focus:outline-none"
                      to="/#about-us">
                    <svg class="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    About Us
                  </NuxtLink>
                </div>
              </div>

              <div class="my-2 md:my-0 md:mx-2">
                <div class="w-full h-px md:w-px md:h-4 bg-cyan-100 md:bg-cyan-300"></div>
              </div>

              <!-- Button Group -->
              <div class=" flex flex-wrap items-center gap-x-1.5">
                <template v-if="isLogged">
                  <button type="button"
                          @click="handleLogout"
                          class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none">
                    Logout
                  </button>
                </template>
                <template v-else>
                  <NuxtLink
                      class="py-[7px] px-2.5 inline-flex items-center font-medium text-sm rounded-lg border border-gray-200 bg-white text-cyan-800 shadow-sm hover:bg-cyan-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
                      to="/login">
                    Sign in
                  </NuxtLink>
                  <NuxtLink
                      class="py-2 px-2.5 inline-flex items-center font-medium text-sm rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700 disabled:opacity-50 disabled:pointer-events-none"
                      to="/register">
                    Get started
                  </NuxtLink>
                </template>
              </div>
              <!-- End Button Group -->
            </div>
          </div>
        </div>
        <!-- End Collapse -->
      </nav>
    </header>
    <!-- ========== END HEADER ========== -->
    <ChatModal />
    <div class="h-fit">
      <slot/>
    </div>
    <!-- ========== FOOTER ========== -->
    <footer class="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <!-- Grid -->
      <div class="text-center">
        <div>
          <NuxtLink class="flex-none text-xl font-semibold text-teal-500" to="#" aria-label="Brand">Healing</NuxtLink>
        </div>
        <!-- End Col -->

        <div class="mt-3">
          <p class="text-gray-500">
            © {{ new Date().getFullYear() }} Healing. Semua Hak Dilindungi.
          </p>
        </div>

        <!-- Social Brands -->
        <div class="mt-3 space-x-2">
          <NuxtLink class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </NuxtLink>
          <NuxtLink class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </NuxtLink>
          <NuxtLink class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </NuxtLink>
        </div>
        <!-- End Social Brands -->
      </div>
      <!-- End Grid -->
    </footer>
    <!-- ========== END FOOTER ========== -->
  </div>
</template>

<script setup lang="ts">
import ChatModal from "~/components/modal/ChatModal.vue";

const { $toast } = useNuxtApp();
const {isLoggedIn, logout, useAuthUser} = useAuth()

const isLogged = computed(() => isLoggedIn().value)
const user = computed(() => useAuthUser().value)
const handleLogout = async () => {
  try {
    if (!window.confirm("Are you sure you want to logout?")) return;
    await logout()
    $toast('Berhasil menghapus sesi masuk.', 'success'); // Menampilkan pesan kesalahan menggunakan toast
  } catch (error: any) {
    return
  } finally {
    navigateTo('/login'); // Setelah logout berhasil, arahkan ke halaman login
  }
}
</script>

<style scoped>

</style>
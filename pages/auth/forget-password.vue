<template>
  <div class="w-full min-h-screen flex items-center justify-center md:block px-6 py-10 md:py-[172px]">
    <div class="bg-white sm:border sm:border-gray-200 rounded-xl sm:shadow-sm w-[500px] md:max-w-[500px] mx-auto">
      <div class="p-4 sm:p-10">
        <div class="text-center">
          <AppLogo/>
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Lupa Kata Sandi</h1>
        </div>

        <div class="mt-5">
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-y-4">
              <!-- Form Group -->
              <div>
                <label for="email" class="block text-sm mb-2">Email</label>
                <div class="relative">
                  <input v-model="email" type="email" id="email" name="email" placeholder="Masukan Email"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                         required aria-describedby="email-error">
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
                <p class="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we
                  can get back to you</p>
              </div>
              <!-- End Form Group -->

              <button type="submit"
                      :disabled="isLoading || isDisabled"
                      class="w-full mt-2 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F38200] text-white hover:bg-[#DA6E00] focus:outline-none focus:bg-[#DA6E00] disabled:opacity-50 disabled:pointer-events-none">
                {{ isLoading ? "Loading..." : "Kirim" }}
              </button>
            </div>
          </form>
          <!-- End Form -->
          <p class="mt-5 text-sm text-gray-600 text-center">
            Sudah ingat kata sandi?
            <a href="/auth/login"
               class="text-orange-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">Masuk
              disini</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from "~/components/AppLogo.vue"; // Impor komponen AppLogo untuk digunakan di template

definePageMeta({
  layout: false
})

// Menyediakan akses ke nuxtApp untuk mengambil instance nuxt dan memanfaatkan toast untuk notifikasi
const {$toast} = useNuxtApp();

// Mendeklarasikan state dengan tipe data yang sesuai untuk form login
const email = ref<string | null>(null); // email untuk form login
const isLoading = ref<boolean>(false); // flag untuk menandakan proses loading
const isDisabled = ref<boolean>(false);

// Fungsi untuk menangani submit form forget password
const handleSubmit = async () => {
  try {
    const origin = useRequestURL().origin;
    isLoading.value = true; // Menandakan proses loading saat pengiriman form
    // Melakukan request POST ke endpoint API login dengan data form
    await $fetch('/api/auth/forget-password', {
      method: 'POST',
      body: {
        email: email.value, // Mengirimkan email dari form
        base_url: origin
      }
    });

    $toast('Silahkan periksa email anda.', 'success');
    return navigateTo('/auth/reset-password');
  } catch (error: any) {
    return $toast('Gagal mengirimkan permintaan.', 'error');
  } finally {
    isLoading.value = false;
    isDisabled.value = true;
  }
}
</script>


<style scoped>

</style>
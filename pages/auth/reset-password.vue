<template>
  <div class="w-full min-h-screen flex items-center justify-center md:block px-6 py-10 md:py-[172px]">
    <div class="bg-white sm:border sm:border-gray-200 rounded-xl sm:shadow-sm w-[500px] md:max-w-[500px] mx-auto">
      <div class="p-4 sm:p-10">
        <div class="text-center">
          <AppLogo/>
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Reset Kata Sandi</h1>
        </div>

        <!-- Form Group -->
        <div>
          <label for="otp" class="block text-sm mb-2">Masukan OTP</label>
          <div class="relative">
            <input v-model="otp" id="otp" type="text"
                   class="py-3 ps-4 pe-10 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
                   :class="isOtpValid ? 'border-gray-200 focus:border-orange-500 focus:ring-orange-500' : 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 focus:outline-red-500'"
                   placeholder="Masukan Kode OTP">
          </div>
          <small class="text-red-500 italic px-2">{{ otpError }}</small>
        </div>
        <!-- End Form Group -->

        <div class="mt-5">
          <form @submit.prevent="handleSubmit">
            <div class="grid gap-y-4">
              <!-- Strong Password -->
              <div>
                <div class="flex mb-2">
                  <div class="flex-1">
                    <label for="password" class="block text-sm mb-2">Kata
                      Sandi Baru</label>
                    <div class="relative">
                      <input v-model="password" id="password" type="password"
                             class="py-3 ps-4 pe-10 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                             placeholder="Masukan Kata Sandi Baru">
                      <button type="button" data-hs-toggle-password='{
        "target": "#password"
      }'
                              class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-orange-600">
                        <svg class="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                          <path class="hs-password-active:hidden"
                                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                          <path class="hs-password-active:hidden"
                                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                          <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                          <path class="hidden hs-password-active:block"
                                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                    <div id="hs-strong-password" data-hs-strong-password='{
            "target": "#password",
            "hints": "#hs-strong-password-hints",
            "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-orange-500 opacity-50 mx-1"
          }' class="flex mt-2 -mx-1"></div>
                  </div>
                </div>

                <div id="hs-strong-password-hints" class="mb-3">
                  <div>
                    <span class="text-sm text-gray-800">Level:</span>
                    <span
                        data-hs-strong-password-hints-weakness-text='["Kosong", "Lemah", "Sedang", "Kuat", "Sangat Kuat", "Super Kuat"]'
                        class="text-sm font-semibold text-gray-800"></span>
                  </div>

                  <h4 class="my-2 text-sm font-semibold text-gray-800">
                    kata Sandi Baru Anda harus mengandung:
                  </h4>

                  <ul class="space-y-1 text-sm text-gray-500">
                    <li data-hs-strong-password-hints-rule-text="min-length"
                        class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
        <span class="hidden" data-check="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                      <span data-uncheck="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
                      Jumlah karakter minimum adalah 6.
                    </li>
                    <li data-hs-strong-password-hints-rule-text="lowercase"
                        class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
        <span class="hidden" data-check="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                      <span data-uncheck="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
                      Harus mengandung huruf kecil.
                    </li>
                    <li data-hs-strong-password-hints-rule-text="uppercase"
                        class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
        <span class="hidden" data-check="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                      <span data-uncheck="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
                      Harus mengandung huruf besar.
                    </li>
                    <li data-hs-strong-password-hints-rule-text="numbers"
                        class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
        <span class="hidden" data-check="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                      <span data-uncheck="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
                      Harus mengandung angka.
                    </li>
                    <li data-hs-strong-password-hints-rule-text="special-characters"
                        class="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
        <span class="hidden" data-check="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
                      <span data-uncheck="">
          <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
               fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </span>
                      Harus mengandung karakter khusus.
                    </li>
                  </ul>
                </div>
              </div>
              <!-- End Strong Password -->

              <!-- Form Group -->
              <div>
                <label for="confirm-password" class="block text-sm mb-2">Ulangi Kata Sandi Baru</label>
                <div class="relative">
                  <input v-model="confirmPassword" id="confirm-password" type="password"
                         class="py-3 ps-4 pe-10 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
                         :class="isConfirmPassword ? 'border-gray-200 focus:border-orange-500 focus:ring-orange-500' : 'border-red-500 text-red-600 focus:border-red-500 focus:ring-red-500 focus:outline-red-500'"
                         placeholder="Ulangi Kata Sandi Baru">
                  <button type="button" data-hs-toggle-password='{
        "target": "#confirm-password"
      }'
                          class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-orange-600">
                    <svg class="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path class="hs-password-active:hidden"
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path class="hs-password-active:hidden"
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                      <path class="hidden hs-password-active:block"
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </div>
                <small class="text-red-500 italic px-2">{{ confirmPasswordError }}</small>
              </div>
              <!-- End Form Group -->

              <button type="submit"
                      :disabled="isLoading"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none">
                {{ isLoading ? "Loading..." : "Kirim" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from "~/components/AppLogo.vue";

definePageMeta({
  layout: false
})

// Menyediakan akses ke nuxtApp untuk mengambil instance nuxt dan memanfaatkan toast untuk notifikasi
const {$toast} = useNuxtApp();

// Mendeklarasikan state dengan tipe data yang sesuai untuk form reset
const otp = ref<string | null>(null);
const otpError = ref<string | null>(null);
const password = ref<string | null>(null);
const confirmPassword = ref<string | null>(null);
const isLoading = ref<boolean>(false); // flag untuk menandakan proses loading
const confirmPasswordError = ref<string | null>(null);

const {token} = useRoute().query;

const isConfirmPassword = computed(() => {
  const isSame = password.value === confirmPassword.value;
  if (!isSame) {
    confirmPasswordError.value = "Konfirmasi password tidak sesuai dengan password yang dimasukkan.";
  } else {
    confirmPasswordError.value = null;
  }

  return isSame;
});

const isOtpValid = computed(() => {
  const isValid = otp.value && otp.value.length === 6; // Assuming OTP length is 6
  if (!isValid) {
    otpError.value = "OTP harus terdiri dari 6 digit.";
  } else {
    otpError.value = null;
  }

  return isValid;
});

// Fungsi untuk menangani submit form reset password
const handleSubmit = async () => {
  if (!isOtpValid.value || !isConfirmPassword.value) {
    return;
  }

  try {
    isLoading.value = true; // Menandakan proses loading saat pengiriman form
    // Melakukan request POST ke endpoint API reset-password dengan data form
    await $fetch(`/api/auth/reset-password?token=${token}`, {
      method: 'POST',
      body: {
        otp: otp.value,
        newPassword: password.value,
        confirmNewPassword: confirmPassword.value,
      }
    });

    $toast('Berhasil memperbaharui kata sandi.', 'success');
    return navigateTo('/auth/login');
  } catch (error: any) {
    $toast('Gagal memperbaharui kata sandi.', 'error');
  } finally {
    isLoading.value = false; // Menandakan proses loading selesai, baik berhasil maupun gagal
  }
}
</script>


<style scoped>

</style>
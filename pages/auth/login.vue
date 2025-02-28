
<template>
  <div class="w-full min-h-screen flex items-center justify-center md:block px-6 py-10 md:py-[172px]">
    <div class="bg-white sm:border sm:border-gray-200 rounded-xl sm:shadow-sm w-[500px] md:max-w-[500px] mx-auto">
      <div class="p-4 sm:p-10">
        <div class="text-center">
          <AppLogo/>
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Masuk</h1>
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


              <!-- Form Group -->
              <div>
                <div class="flex justify-between items-center">
                  <label for="password" class="block text-sm mb-2">Kata Sandi</label>
                  <NuxtLink to="/auth/forget-password" class="text-sm text-orange-600">Lupa kata sandi?</NuxtLink>
                </div>
                <div class="relative">
                  <input v-model="password" id="password" type="password"
                         class="py-3 ps-4 pe-10 block w-full border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                         placeholder="Kata Sandi">
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
              </div>
              <!-- End Form Group -->

              <!-- Checkbox -->
              <div class="flex items-center">
                <div class="flex">
                  <input v-model="isRemember" id="remember-me" name="remember-me" type="checkbox"
                         class="shrink-0 mt-0.5 border-gray-200 rounded text-orange-600 focus:ring-orange-500">
                </div>
                <div class="ms-3">
                  <label for="remember-me" class="text-sm">Ingat saya</label>
                </div>
              </div>
              <!-- End Checkbox -->

              <button type="submit"
                      :disabled="isLoading"
                      class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#F38200] text-white hover:bg-[#DA6E00] focus:outline-none focus:bg-[#DA6E00] disabled:opacity-50 disabled:pointer-events-none">
                {{ isLoading ? "Loading..." : "Masuk" }}
              </button>
            </div>
          </form>
          <!-- End Form -->
          <p class="mt-5 text-sm text-gray-600 text-center">
            Belum punya akun?
            <a href="/auth/register"
               class="text-orange-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium">Daftar
              disini</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Mendapatkan instance nuxtApp untuk menggunakan toast
const { $toast } = useNuxtApp();

// Mendeklarasikan state untuk form login
const email = ref<string | null>(null); // Menyimpan email
const password = ref<string | null>(null); // Menyimpan password
const isRemember = ref<boolean>(false); // Flag untuk "Ingat Saya"
const isLoading = ref<boolean>(false); // Flag untuk status loading

// Mengambil fungsi login dari composable useAuth
const { login } = useAuth();

// Fungsi untuk menangani pengiriman form login
const handleSubmit = async () => {
  try {
    // Menandakan proses loading dimulai
    isLoading.value = true;

    // Validasi jika email dan password belum diisi
    if (!email.value || !password.value) {
      return;
    }

    // Melakukan proses login
    await login({
      email: email.value,
      password: password.value
    });

    // Menyimpan atau menghapus email di localStorage jika "Ingat Saya" diaktifkan
    if (isRemember.value && email.value) {
      localStorage.setItem("email", email.value);
    } else {
      localStorage.removeItem("email");
    }

    // Setelah berhasil login, arahkan ke halaman utama
    return navigateTo('/');

  } catch (error: any) {
    // Menangani error dan menampilkan pesan kesalahan
    console.error(error);
    $toast('Email atau kata sandi tidak cocok.', 'error');
  } finally {
    // Menghentikan status loading setelah proses selesai
    isLoading.value = false;
  }
};

// Menyimpan email pengguna di localStorage ketika komponen dipasang
onMounted(() => {
  email.value = localStorage.getItem("email") || null;
});
</script>

<style scoped>

</style>

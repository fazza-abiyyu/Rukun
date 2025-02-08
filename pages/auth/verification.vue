<template>
  <div class="min-h-screen w-full flex items-center justify-center p-6">
    <div class="h-fit w-full p-8 flex flex-col shadow shadow-black/20 rounded-xl">
      <div class="bg-white w-full sm:border sm:border-gray-200 rounded-xl mx-auto sm:!p-8">
        <div class="text-center">
          <AppLogo/>
          <h1 class="block text-2xl font-bold text-gray-800 mt-4">Verifikasi</h1>
        </div>
        <div
            class="mt-10 w-full h-full flex justify-center items-center rounded-xl">
          <form @submit.prevent="" class="w-full">
            <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
              <!-- Form Group full name -->
              <div>
                <label for="full-name" class="block text-sm mb-2">Nama Lengkap</label>
                <div class="relative">
                  <input type="text" id="full-name" name="full-name"
                         placeholder="Masukan Nama Lengkap"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group dob -->
              <div>
                <label for="dob" class="block text-sm mb-2">Tanggal Lahir</label>
                <div class="relative">
                  <input type="date" id="dob" name="dob"
                         placeholder="Masukan Nama Lengkap"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group email -->
              <div>
                <label for="email" class="block text-sm mb-2">Email</label>
                <div class="relative">
                  <input type="email" id="email" name="email" placeholder="Masukan Email"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group no kk -->
              <div>
                <label for="no-kk" class="block text-sm mb-2">Nomer Kartu Keluarga</label>
                <div class="relative">
                  <input type="text" id="no-kk" name="no-kk"
                         placeholder="23839472047728"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group phone -->
              <div>
                <label for="phone" class="block text-sm mb-2">Nomer Telpon</label>
                <div class="relative">
                  <input type="text" id="phone" name="phone"
                         placeholder="0895********"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group nik -->
              <div>
                <label for="nik" class="block text-sm mb-2">Nomer Induk Kependudukan</label>
                <div class="relative">
                  <input type="text" id="nik" name="nik"
                         placeholder="2383947242453"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group Gender -->
              <div>
                <label for="gender" class="block text-sm mb-2">Jenis Kelamin</label>
                <div class="relative">
                  <select id="gender" data-hs-select='{
      "placeholder": "-Pilih-",
      "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
      "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
      "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
    }'>
                    <option value="">Choose</option>
                    <option>Pria</option>
                    <option>Wanita</option>
                  </select>

                  <div class="absolute top-1/2 end-2.5 -translate-y-1/2">
                    <svg class="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                         stroke-linejoin="round">
                      <path d="m7 15 5 5 5-5"></path>
                      <path d="m7 9 5-5 5 5"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group pos -->
              <div>
                <label for="postal-code" class="block text-sm mb-2">Kode Pos</label>
                <div class="relative">
                  <input type="text" id="postal-code" name="postal-code"
                         placeholder="12345"
                         class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                         required>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->

              <!-- Form Group address -->
              <div class="md:col-span-2">
                <label for="address" class="block text-sm mb-2">Alamat</label>
                <div class="relative">
                      <textarea type="text" id="address" name="address"
                                placeholder="Jl. Kantor telpon no 123"
                                class="py-3 px-4 h-32 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                required/>
                  <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                         aria-hidden="true">
                      <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- End Form Group -->
            </div>
          </form>
        </div>
      </div>
      <button type="button"
              class="py-3 px-4 w-full text-center self-center md:w-fit md:self-end gap-x-2 mt-6 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
        Kirim
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import AppLogo from "~/components/AppLogo.vue";

definePageMeta({
  layout: false
})

const email = ref<string | null>(null); // email untuk form login
const password = ref<string | null>(null); // password untuk form login
const ipAddress = ref<string | null>(null); // ipAddress untuk mencatat alamat IP pengguna
const isRemember = ref<boolean>(false); // flag untuk mengingat pengguna (not used dalam kode ini)
const isLoading = ref<boolean>(false); // flag untuk menandakan proses loading

</script>

<style scoped>

</style>
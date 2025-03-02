<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Data Kartu Keluarga</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">

          <!-- Nomor Kartu Keluarga (KK) -->
          <div class="grid sm:grid-cols-3">
            <label for="kk" class="block text-sm font-medium mb-2 w-full">NOMOR KARTU KELUARGA (KK)</label>
            <input type="text" id="kk"
            v-model="kk"
            class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="1234567890">
          </div>
          <!-- Nama Kepala Keluarga -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">NAMA KEPALA KELUARGA</label>
            <input type="text" id="name"
                   v-model="name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Muhammad">
          </div>

          <!-- Submit Button -->
          <div class="space-x-3 self-end">
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    :disabled="isLoading">
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";

const router = useRouter();

const {$toast} = useNuxtApp();

const name = ref<string | null>(null);
const kk = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  name.value = null;
  kk.value = null;
};



// Form submission handler
const handleSubmit = async () => {
  try {
    // Basic validation
    if (!name.value) {
      $toast('Nama Kepala Keluarga harus diisi.', 'error');
      return;
    }
    if (!kk.value) {
      $toast('Nomer Induk Keluarga (NIK) harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API
    const payload = {
      head_of_family: name.value,
      kk: kk.value,
    };

    // API call
    await useFetchApi('/api/auth/kk', {
      method: 'POST',
      body: payload,
    });

    $toast('Data KK berhasil ditambahkan!', 'success');
    clearForm();
    router.push('/kk');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Pengajuan Surat</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <!-- Email -->
        <div class="space-y-4 flex flex-col">
          <div class="grid sm:grid-cols-3">
            <label for="email" class="block text-sm font-medium mb-2 w-full">Email Tujuan</label>
            <input type="text" id="email"
                   v-model="email"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="example@gmail.com">
          </div>
        <!-- Nomer Induk Keluarga -->
          <div class="grid sm:grid-cols-3">
            <label for="nik" class="block text-sm font-medium mb-2 w-full">NOMER INDUK KEPENDUDUKAN (NIK)</label>
            <input type="text" id="nik"
                   v-model="nik"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="xxxx xxxx xxxx xxxx">
          </div>
          <!-- Jenis Surat -->
          <div class="grid sm:grid-cols-3">
            <label for="letter" class="block text-sm font-medium mb-2 w-full">JENIS SURAT</label>
            <select id="letter"
                    v-model="letter"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="SuratPengantarKTP">Surat Pengantar KTP</option>
              <option value="SuratKeteranganDomisili">Surat Keterangan Domisili</option>
              <option value="SuratKeteranganUsaha">Surat Keterangan Usaha</option>
              <option value="SuratPengantarNikah">Surat Pengantar Nikah</option>
              <option value="SuratKeteranganTidakMampu">SuratKeteranganTidakMampu</option>
            </select>
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
const { $toast } = useNuxtApp();
const email = ref<string | null>(null);
const nik = ref<string | null>(null);
const letter = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  email.value = null;
  letter.value = null;
  nik.value = null;
};

// Form submission handler
const handleSubmit = async () => {
  try {
    // Basic validation
    if (!email.value) {
      $toast('Email Tujuan harus diisi.', 'error');
      return;
    }
    if (!nik.value) {
      $toast('Nomer Induk Kependudukan (NIK) harus diisi.', 'error');
      return;
    }
    if (!letter.value) {
      $toast('Jenis Surat harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API
    const payload = {
      toEmail: email.value,
      data_nik: nik.value,
      category_letter: letter.value,
    };

    // Send API request
    const response = await useFetchApi('/api/auth/application-letter', {
      method: 'POST',
      body: payload,
    });

    $toast('Surat Pengajuan Berhasil di Kirim!', 'success');
    clearForm();
    router.push('/application-letter');
  } catch (error: any) {
    $toast('Nomer Induk Kependudukan (NIK) tidak ditemukan.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>


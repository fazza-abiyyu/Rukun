<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pemeriksaan Kesehatan</h2>
    </div>

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Anak untuk Pencarian -->
          <div class="grid sm:grid-cols-3">
            <label for="child" class="block text-sm font-medium mb-2 w-full">Anak</label>
            <ComboBoxChild id="child" @selectedChild="handleSelectChild" />
          </div>

          <!-- Input Berat Badan -->
          <div class="grid sm:grid-cols-3">
            <label for="weight" class="block text-sm font-medium mb-2 w-full">Berat Badan</label>
            <input type="number" id="weight"
                   v-model="weight"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukkan Berat Badan Anak">
          </div>

          <!-- Input Tinggi Badan -->
          <div class="grid sm:grid-cols-3">
            <label for="height" class="block text-sm font-medium mb-2 w-full">Tinggi Badan</label>
            <input type="number" id="height"
                   v-model="height"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukkan Tinggi Badan Anak">
          </div>

          <!-- Input Lingkar Kepala -->
          <div class="grid sm:grid-cols-3">
            <label for="circumference" class="block text-sm font-medium mb-2 w-full">Lingkar Kepala</label>
            <input type="number" id="circumference"
                   v-model="circumference"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukkan Lingkar Kepala Anak">
          </div>

          <!-- Submit Button -->
          <div class="space-x-3 self-end">
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    :disabled="isLoading || !childId">
              Simpan Pemeriksaan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ComboBoxChild from "~/components/form/advanced/ComboBoxChild.vue";

const {$toast} = useNuxtApp();

// State untuk formulir input
const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const circumference = ref<number | null>(null);
const isLoading = ref(false);

// State untuk menyimpan hasil pencarian dan ID anak
const childId = ref<number | null>(null);  // Untuk menyimpan child_id yang dipilih

// Fungsi untuk handle Select Child
const handleSelectChild = (e: any) => {
  childId.value = e.id
}

const clearForm = () => {
  weight.value = null;
  height.value = null;
  circumference.value = null;
  childId.value = null;
}

// Fungsi untuk mengirimkan data pemeriksaan
const handleSubmit = async () => {
  if (!childId.value) {
    $toast('ID anak tidak ditemukan.', 'error');
    return;
  }

  isLoading.value = true;
  try {
    const { deviceType, os, browser } = getDeviceAndBrowserInfo();

    // Kirim data pemeriksaan ke API
    await useFetchApi('/api/auth/med-check-up', {
      method: 'POST',
      body: {
        child_id: childId.value,
        height: height.value ?? 0,  // Data pemeriksaan tinggi badan
        weight: weight.value ?? 0,  // Data pemeriksaan berat badan
        circumference: circumference.value ?? 0,  // Lingkar kepala/lingkar badan
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    });

    $toast('Pemeriksaan berhasil disimpan!', 'success');
  } catch (error) {
    $toast('Gagal menyimpan data pemeriksaan.', 'error');
  } finally {
    clearForm();
    isLoading.value = false;
  }
};
</script>

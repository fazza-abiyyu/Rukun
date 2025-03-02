<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Aktivitas Arus Kas</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Sumber Dana -->
          <div class="grid sm:grid-cols-3">
            <label for="sumber_dana" class="block text-sm font-medium mb-2 w-full">SUMBER DANA</label>
            <input type="text" id="sumber_dana"
                   v-model="sumber_dana"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Kas Bulanan">
          </div>

          <!-- Deskripsi -->
          <div class="grid sm:grid-cols-3">
            <label for="description" class="block text-sm font-medium mb-2 w-full">DESKRIPSI</label>
            <input type="text" id="description"
                   v-model="description"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="....">
          </div>

          <!-- Tanggal -->
          <div class="grid sm:grid-cols-3">
            <label for="tanggal" class="block text-sm font-medium mb-2 w-full">TANGGAL</label>
            <input type="date" id="tanggal"
                   v-model="tanggal"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>

          <!-- Category -->
          <div class="grid sm:grid-cols-3">
            <label for="category" class="block text-sm font-medium mb-2 w-full">KATEGORI</label>
            <select id="category"
                    v-model="category"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="debit">Masuk</option>
              <option value="kredit">Keluar</option>
            </select>
          </div>

          <!-- Jumlah -->
          <div class="grid sm:grid-cols-3">
            <label for="jumlah" class="block text-sm font-medium mb-2 w-full">JUMLAH</label>
            <input type="number" id="jumlah"
                   v-model="jumlah"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Rp. ">
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
import {useNuxtApp} from "#imports";
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";

const router = useRouter();
const {$toast} = useNuxtApp();

const sumber_dana = ref<string | null>(null); // Form input mapped to 'title'
const description = ref<string | null>(null);
const tanggal = ref<string | null>(null);
const category = ref<string | null>(null);
const jumlah = ref<number | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  sumber_dana.value = null;
  description.value = null;
  tanggal.value = null;
  category.value = null;
  jumlah.value = null;
};

const handleSubmit = async () => {
  try {
    // Basic validation
    if (!sumber_dana.value) {
      $toast('Sumber Dana harus diisi.', 'error');
      return;
    }
    if (!description.value) {
      $toast('Deskripsi tidak boleh kosong.', 'error');
      return;
    }
    if (!tanggal.value) {
      $toast('Tanggal harus diisi.', 'error');
      return;
    }
    if (!category.value) {
      $toast('Kategori harus diisi.', 'error');
      return;
    }
    if (!jumlah.value) {
      $toast('Jumlah harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API (map frontend fields to backend expected fields)
    const payload = {
      title: sumber_dana.value, // Mapping 'sumber_dana' to 'title'
      description: description.value,
      date: tanggal.value,      // Mapping 'tanggal' to 'date'
      category: category.value?.charAt(0).toUpperCase() + category.value?.slice(1),
      amount: jumlah.value      // Mapping 'jumlah' to 'amount
    };

    // API call
    await useFetchApi('/api/auth/cashflow', {
      method: 'POST',
      body: payload,
    });

    $toast('Data arus kas berhasil ditambahkan!', 'success');
    clearForm();
    router.push('/cashflow');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="css" scoped>
</style>
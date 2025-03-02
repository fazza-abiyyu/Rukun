<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pemberitahuan</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <!-- Judul -->
        <div class="space-y-4 flex flex-col">
          <div class="grid sm:grid-cols-3">
            <label for="title" class="block text-sm font-medium mb-2 w-full">JUDUL PEMBERITAHUAN</label>
            <input type="text" id="title"
                   v-model="title"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Arisan RT">
          </div>
          <!-- Deskripsi -->
          <div class="grid sm:grid-cols-3">
            <label for="description" class="block text-sm font-medium mb-2 w-full">DESKRIPSI PEMBERITAHUAN</label>
            <textarea id="description"
            v-model="description"
            class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Jl. Raya 1234"/>
          </div>
          <!-- Tanggal Acara -->
          <div class="grid sm:grid-cols-3">
            <label for="event" class="block text-sm font-medium mb-2 w-full">TANGGAL ACARA</label>
            <input type="date" id="event"
                   v-model="event"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
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

const title = ref<string | null>(null);
const description = ref<string | null>(null);
const event = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  title.value = null;
  description.value = null;
  event.value = null;
};

// Form submission handler
const handleSubmit = async () => {
  try {
    // Basic validation
    if (!title.value) {
      $toast('Judul Pemberitahuan harus diisi.', 'error');
      return;
    }
    if (!description.value) {
      $toast('Deskripsi Pemberitahuan harus diisi.', 'error');
      return;
    }
    if (!event.value) {
      $toast('Tanggal Acara harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API
    const payload = {
      title: title.value,
      description: description.value,
      date: event.value,
    };

    // API call
    await useFetchApi('/api/auth/notifications', {
      method: 'POST',
      body: payload,
    });

    $toast('Pemberitahuan Acara berhasil disebarkan!', 'success');
    clearForm();
    router.push('/notifications');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

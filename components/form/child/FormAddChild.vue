<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Anak</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Anak -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Anak</label>
            <input type="text" id="name"
                   v-model="name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Muhammad">
          </div>

          <!-- Tanggal Lahir -->
          <div class="grid sm:grid-cols-3">
            <label for="bod" class="block text-sm font-medium mb-2 w-full">Tanggal Lahir</label>
            <input type="date" id="bod"
                   v-model="bod"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>

          <!-- Jenis Kelamin -->
          <div class="grid sm:grid-cols-3">
            <label for="gender" class="block text-sm font-medium mb-2 w-full">Jenis Kelamin</label>
            <select id="gender"
                    v-model="gender"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>

          <!-- Status Anak -->
          <div class="grid sm:grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">Status</label>
            <select id="status"
                    v-model="status"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="active">Aktif</option>
              <option value="suspend">Suspend</option>
            </select>
          </div>

          <!-- Posyandu Dropdown -->
          <div class="grid sm:grid-cols-3">
            <label for="posyandu_id" class="block text-sm font-medium mb-2 w-full">Posyandu</label>
            <ComboBoxPosyandu class="col-span-2" @selectedPosyandu="handleSelectPosyandu" />
          </div>

          <!-- Nomor Induk Kependudukan (NIK) -->
          <div class="grid sm:grid-cols-3">
            <label for="nik" class="block text-sm font-medium mb-2 w-full">Nomor Induk Kependudukan</label>
            <input type="text" id="nik"
                   v-model="nik"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="1234567890">
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
import ComboBoxPosyandu from "~/components/form/advanced/ComboBoxPosyandu.vue";

const {$toast} = useNuxtApp();

const name = ref<string | null>(null);
const bod = ref<string | null>(null);
const gender = ref<string | null>('male');  // Default gender is male
const status = ref<string | null>('active');  // Default status is active
const nik = ref<string | null>(null); // Added NIK field
const posyandu_id = ref<number | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  name.value = null;
  bod.value = null;
  gender.value = 'male';
  status.value = 'active';
  nik.value = null;
  posyandu_id.value = null;
};

const handleSelectPosyandu = async (e: any) => {
  posyandu_id.value = e.id;  // Handle posyandu selection
};

const handleSubmit = async () => {
  try {
    if (!posyandu_id.value) {
      $toast('Posyandu harus dipilih.', 'error');
      return;
    }

    isLoading.value = true;
    const {deviceType, os, browser} = getDeviceAndBrowserInfo();

    await useFetchApi('/api/auth/child', {
      method: 'POST',
      body: {
        name: name.value,
        bod: new Date(bod.value as string).toISOString(),
        gender: gender.value,
        status: status.value,
        posyandu_id: posyandu_id.value,
        nik: {
          number: nik.value,
          kk_id: posyandu_id.value, // Assuming posyandu_id is linked to KK (Kartu Keluarga)
        },
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    });

    $toast('Berhasil menambahkan data Anak.', 'success');
    clearForm();
  } catch (error) {
    $toast('Gagal menambahkan data Anak.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

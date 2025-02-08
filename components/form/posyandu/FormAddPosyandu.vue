<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Posyandu</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Posyandu -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Posyandu</label>
            <input type="text" id="name"
                   v-model="name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Posyandu Jingga">
          </div>

          <!-- Nomor Telepon -->
          <div class="grid sm:grid-cols-3">
            <label for="phone" class="block text-sm font-medium mb-2 w-full">Nomor Telepon</label>
            <input type="text" id="phone"
                   v-model="phone"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="08xx xxxx xxxx">
          </div>

          <!-- Alamat Posyandu -->
          <div class="grid sm:grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
            <textarea id="address"
                      v-model="address"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Jl. MIqona"/>
          </div>

          <!-- Puskesmas Dropdown -->
          <div class="grid sm:grid-cols-3">
            <label for="puskesmas_id" class="block text-sm font-medium mb-2 w-full">Puskesmas</label>
            <ComboBoxHealthCenter class="col-span-2" @selectedPuskesmas="handleSelectPuskesmas" />
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
import ComboBoxHealthCenter from "~/components/form/advanced/ComboBoxHealthCenter.vue";

const {$toast} = useNuxtApp();

const name = ref<string | null>(null);
const address = ref<string | null>(null);
const phone = ref<string | null>(null);
const puskesmas_id = ref<number | null>(null);
const isLoading = ref<boolean>(false);

const clearForm = () => {
  name.value = null;
  address.value = null;
  phone.value = null;
  puskesmas_id.value = null;
};

const handleSelectPuskesmas = async (e: any) => {
  puskesmas_id.value = e.id
}

const handleSubmit = async () => {
  try {
    if (!puskesmas_id.value) {
      $toast('Puskesmas harus dipilih.', 'error');
      return;
    }

    isLoading.value = true;
    const {deviceType, os, browser} = getDeviceAndBrowserInfo();

    await useFetchApi('/api/auth/posyandu', {
      method: 'POST',
      body: {
        name: name.value,
        address: address.value,
        phone: phone.value,
        puskesmas_id: puskesmas_id.value,
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    });

    $toast('Berhasil menambahkan data Posyandu.', 'success');
    clearForm();
  } catch (error) {
    $toast('Gagal menambahkan data Posyandu.', 'error');
  } finally {
    isLoading.value = false;
  }
};

</script>

<style lang="css" scoped>
</style>

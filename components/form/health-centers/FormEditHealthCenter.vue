<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Puskesmas</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form v-if="selectedPuskesmas" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <div class="grid grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Puskesmas</label>
            <input type="text" id="name"
                   v-model="selectedPuskesmas.name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Puskesmas Raya">
          </div>
          <div class="grid grid-cols-3">
            <label for="phone" class="block text-sm font-medium mb-2 w-full">Nomor telepon</label>
            <input type="text" id="phone"
                   v-model="selectedPuskesmas.phone"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="08xx xxxx xxxx">
          </div>
          <div class="grid grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
            <textarea id="address"
                      v-model="selectedPuskesmas.address"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Jl. Raya 1234"/>
          </div>
          <div class="space-x-3 self-end">
            <button type="button"
                    @click="selectedPuskesmas = null"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-600 bg-transparent text-red-600 hover:bg-red-200 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none">
              Batal
            </button>
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    :disabled="isLoading">
              Simpan
            </button>
          </div>
        </div>
      </form>
      <div v-else>
        <label for="hs-combobox-basic-usage" class="block text-sm font-medium mb-2 w-full">Cari
          Puskesmas</label>
        <ComboBoxHealthCenter @selectedPuskesmas="(e: any) => handleSelectedPuskesmas(e)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ComboBoxHealthCenter from "~/components/form/advanced/ComboBoxHealthCenter.vue";
import type {Puskesmas} from "~/types/TypesModel";

const {$toast} = useNuxtApp();

const selectedPuskesmas = ref<any>(null)
const isLoading = ref<boolean>(false)

const handleSelectedPuskesmas = (puskesmas: Puskesmas) => {
  selectedPuskesmas.value = {
    id: puskesmas.id,
    name: puskesmas.name,
    address: puskesmas.address,
    phone: puskesmas.phone
  }
}

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const {deviceType, os, browser} = getDeviceAndBrowserInfo()
    await useFetchApi(`/api/auth/puskesmas/${selectedPuskesmas.value?.id}`, {
      method: 'PUT',
      body: {
        ...selectedPuskesmas.value,
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    })

    $toast('Berhasil mengubah data puskesmas.', 'success');
    selectedPuskesmas.value = null
  } catch (error) {
    $toast('Gagal mengubah data puskesmas.', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="css" scoped>
</style>
<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Posyandu</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 ">
      <form v-if="selectedPosyandu" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Posyandu -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">Nama Posyandu</label>
            <input type="text" id="name"
                   v-model="selectedPosyandu.name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Posyandu Jingga">
          </div>

          <!-- Nomor Telepon -->
          <div class="grid sm:grid-cols-3">
            <label for="phone" class="block text-sm font-medium mb-2 w-full">Nomor Telepon</label>
            <input type="text" id="phone"
                   v-model="selectedPosyandu.phone"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="08xx xxxx xxxx">
          </div>

          <!-- Alamat Posyandu -->
          <div class="grid sm:grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
            <textarea id="address"
                      v-model="selectedPosyandu.address"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Jl. MIqona"/>
          </div>

          <!-- Puskesmas Dropdown -->
          <div class="grid sm:grid-cols-3">
            <label for="puskesmas_id" class="block text-sm font-medium mb-2 w-full">Puskesmas</label>
            <ComboBoxHealthCenter
                class="col-span-2"
                @selectedPuskesmas="handleSelectPuskesmas"
                :selectedPuskesmas="selectedPosyandu.puskesmas"
            />
          </div>

          <!-- Submit Button -->
          <div class="space-x-3 self-end">
            <button type="button"
                    @click="selectedPosyandu = null"
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
        <label for="hs-combobox-basic-usage" class="block text-sm font-medium mb-2 w-full">Cari Posyandu</label>
        <ComboBoxPosyandu @selectedPosyandu="handleSelectedPosyandu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ComboBoxHealthCenter from "~/components/form/advanced/ComboBoxHealthCenter.vue";
import ComboBoxPosyandu from "~/components/form/advanced/ComboBoxPosyandu.vue";
import type { Posyandu, Puskesmas } from "~/types/TypesModel";

const { $toast } = useNuxtApp();

const selectedPosyandu = ref<Posyandu | null>(null);
const isLoading = ref<boolean>(false);

const handleSelectedPosyandu = (posyandu: any) => {
  selectedPosyandu.value = {
    id: posyandu.id,
    name: posyandu.name,
    phone: posyandu.phone,
    address: posyandu.address,
    puskesmas_id: posyandu.puskesmas_id,
  };
};

const handleSelectPuskesmas = (puskesmas: Puskesmas) => {
  if (selectedPosyandu.value) {
    selectedPosyandu.value.puskesmas = puskesmas;
    selectedPosyandu.value.puskesmas_id = puskesmas.id;
  }
};

const handleSubmit = async () => {
  if (!selectedPosyandu.value?.puskesmas_id) {
    $toast('Puskesmas harus dipilih.', 'error');
    return;
  }

  try {
    isLoading.value = true;
    const { deviceType, os, browser } = getDeviceAndBrowserInfo();

    await useFetchApi(`/api/auth/posyandu/${selectedPosyandu.value?.id}`, {
      method: 'PUT',
      body: {
        ...selectedPosyandu.value,
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    });

    $toast('Berhasil mengubah data Posyandu.', 'success');
    selectedPosyandu.value = null;
  } catch (error) {
    $toast('Gagal mengubah data Posyandu.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

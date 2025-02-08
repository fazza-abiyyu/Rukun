<template>
  <!-- Breadcrumb -->
  <div
      class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
    <div class="flex items-center py-2">
      <!-- Navigation Toggle -->
      <button type="button"
              class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
              aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"/>
          <path d="M15 3v18"/>
          <path d="m8 9 3 3-3 3"/>
        </svg>
      </button>
      <!-- End Navigation Toggle -->

      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-sm text-gray-800">
          Aplikasi
          <svg class="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 " width="16"
               height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round"/>
          </svg>
        </li>
        <li class="text-sm font-semibold text-gray-800 truncate" aria-current="page">
          Puskesmas
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <client-only>
        <DatatablesDataTable
            :title="'Puskesmas'"
            :fields="[
      { label: 'Nama', key: 'name' },
      { label: 'Alamat', key: 'address' },
      { label: 'Nomor telpon', key: 'phone' },
      { label: 'Tanggal ditambahkan', key: 'created_at' },
    ]"
            :data="puskesmas"
            :perPage="pageSize"
            :totalPages="totalPages"
            :currentPage="currentPage"
            :prevPage="prevPage"
            :nextPage="nextPage"
            :isLoading="isLoading"
            :deleteAction="true"
            @fetchData="(e) => handleChangeFetchData(e)"
            @searchData="(e) => handleSearchData(e)"
            @deleteData="(e) => handleDeleteData(e)"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">

// Ambil fungsi untuk penanganan error
import type {Puskesmas} from "~/types/TypesModel";

const {handleError} = useErrorHandling();
const {$toast} = useNuxtApp();

// State untuk pagination dan data Puskesmas
const page = ref(1)
const pageSize = ref(10)
const totalPages = ref(1)
const currentPage = ref(1)
const nextPage = ref()
const prevPage = ref()

// State untuk data Puskesmas dan status loading
const puskesmasData = ref([])
const isLoading = ref<boolean>(false)

// Computed property untuk mengambil data Puskesmas
const puskesmas = computed(() => puskesmasData.value)

// Fungsi untuk mengambil data Puskesmas
const fetchPuskesmas = async () => {
  try {
    isLoading.value = true
    const response: any = await useFetchApi(`/api/auth/puskesmas?page=${page.value}&pagesize=${pageSize.value}`);
    puskesmasData.value = response?.data?.puskesmas;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

// Fungsi untuk menangani perubahan halaman atau pengambilan data berdasarkan URL
const handleChangeFetchData = async (payload: any) => {
  try {
    isLoading.value = true
    const response: any = await useFetchApi(payload.url);
    puskesmasData.value = response?.data?.puskesmas;
    totalPages.value = response?.meta?.totalPages;
    nextPage.value = response?.meta?.next;
    prevPage.value = response?.meta?.prev;
    currentPage.value = payload?.currentPage;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

// Fungsi untuk menangani pencarian data Puskesmas
const handleSearchData = async (query: string) => {
  try {
    // Jika query kosong, ambil data Puskesmas dari awal
    if (query.length === 0) {
      await fetchPuskesmas()
      return
    }
    isLoading.value = true
    const response: any = await useFetchApi(`/api/auth/puskesmas/search?q=${query}`);
    puskesmasData.value = response?.data?.puskesmas;
    totalPages.value = 1;  // Karena pencarian biasanya hanya menghasilkan satu halaman
    nextPage.value = null;
    prevPage.value = null;
  } catch (e) {
    handleError(e)
  } finally {
    isLoading.value = false
  }
}

const handleDeleteData = async (id: number) => {
  try {
    if (!confirm("Anda yakin ingin menghapus ini?")) return
    const {deviceType, os, browser} = getDeviceAndBrowserInfo()
    await useFetchApi(`/api/auth/puskesmas/${id}`, {
      method: 'DELETE',
      body: {
        ip_address: useState('ip_address').value,
        device: `${deviceType}, ${os} on ${browser}`,
        location: "Unknown"
      }
    })
    puskesmasData.value = puskesmasData.value.filter((item: Puskesmas) => item.id !== id)
    $toast('Berhasil mengubah data.', 'success');
  } catch (e) {
    $toast('Gagal mengubah data.', 'error');
  }
}

// Ambil data Puskesmas saat komponen dimuat pertama kali
onMounted(async () => {
  await fetchPuskesmas()
})
</script>

<style scoped>

</style>
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
          Notifikasi
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <DatatablesDataTable
          :title="'Daftar Pemberitahuan'"
          :fields="[
          { label: 'JUDUL', key: 'title' },
          { label: 'TANGGAL', key: 'date' },
          { label: 'DESKRIPSI', key: 'description' },
          { label: 'DIBUAT OLEH', key: 'user.username' },
          { label: 'TANGGAL DITERBITKAN', key: 'create_at' }
          ]"
          :data="notifications"
          :perPage="pageSize"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :prevPage="prevPage"
          :nextPage="nextPage"
          :isLoading="isLoading"
          :add-action="true"
          @fetchData="(e) => handleChangeFetchData(e)"
          @searchData="(e) => handleSearchData(e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const {handleError} = useErrorHandling();

const notifications = ref([])
const pageSize = ref(10);
const currentPage = ref(1);
const totalPages = ref(1);
const prevPage = ref<string | undefined>(undefined);
const nextPage = ref<string | undefined>(undefined);

const isLoading = ref(false);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("access_token="))
        ?.split("=")[1];

    if (!token) {
      console.error("Token tidak ditemukan!");
      return;
    }

    const response = await fetch(
        `/api/auth/notifications?page=${currentPage.value}&pagesize=${pageSize.value}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
    );

    if (response.status === 401) {
      console.error("Unauthorized! Coba login ulang.");
      return;
    }

    const data = await response.json();
    if (data.code === 200) {
      notifications.value = data.data;
      totalPages.value = data.totalPages;
      prevPage.value = data.prev;
      nextPage.value = data.next;
    }
  } catch (error) {
    console.error("Gagal mengambil data notifications:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleChangeFetchData = async (payload: any) => {
  try {
    isLoading.value = true;
    const response: any = await useFetchApi(payload.url);
    notifications.value = response?.data;
    totalPages.value = response?.totalPages;
    nextPage.value = response?.next;
    prevPage.value = response?.prev;
    currentPage.value = payload?.currentPage;
  } catch (e) {
    handleError(e);
  } finally {
    isLoading.value = false;
  }
};


const handleSearchData = async (query: string) => {
  try {
    if (query.length === 0) {
      await fetchData();
      return;
    }

    isLoading.value = true;
    const response: any = await useFetchApi(`/api/auth/notifications/search?q=${query}`);

    notifications.value = response?.data?.cashflow || [];
    totalPages.value = 1;
    nextPage.value = undefined;
    prevPage.value = undefined;
  } catch (e) {
    console.error("Gagal mencari data arus kas:", e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped>

</style>
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
          Arus Kas
        </li>
      </ol>
      <!-- End Breadcrumb -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <DatatablesDataTable
          :title="'Arus Kas'"
          :fields="[
            { label: 'SUMBER DANA', key: 'title' },
            { label: 'DESKRIPSI', key: 'description' },
            { label: 'TANGGAL', key: 'date' },
            { label: 'KATEGORI', key: 'category' },
            { label: 'JUMLAH', key: 'amount' },
            { label: 'DITAMBAHKAN', key: 'create_at' },
          ]"
          :data="cashflow"
          :perPage="pageSize"
          :totalPages="totalPages"
          :currentPage="currentPage"
          :prevPage="prevPage"
          :nextPage="nextPage"
          :isLoading="isLoading"
          :add-action="true"
          :deleteAction="true"
          :edit-action="true"
          @fetchData="(e) => handleChangeFetchData(e)"
          @searchData="(e) => handleSearchData(e)"
          @deleteData="(e) => handleDeleteData(e)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const { handleError } = useErrorHandling();

const cashflow = ref([]);
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
      `/api/auth/cashflow?page=${currentPage.value}&pagesize=${pageSize.value}`,
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
      cashflow.value = data.data;
      totalPages.value = data.totalPages;
      prevPage.value = data.prev;
      nextPage.value = data.next;
    }
  } catch (error) {
    console.error("Gagal mengambil data cashflow:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleChangeFetchData = async (payload: any) => {
  try {
    isLoading.value = true;
    const response: any = await useFetchApi(payload.url);
    cashflow.value = response?.data;
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
      await fetchData(); // Ambil semua data cashflow
      return;
    }

    isLoading.value = true;
    const response: any = await useFetchApi(`/api/auth/cashflow/search?q=${query}`);
    
    cashflow.value = response?.data?.cashflow || [];
    totalPages.value = 1; 
    nextPage.value = undefined;
    prevPage.value = undefined;
  } catch (e) {
    console.error("Gagal mencari data arus kas:", e);
  } finally {
    isLoading.value = false;
  }
};


const handleDeleteData = async (id: string) => {
  if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    return;
  }

  isLoading.value = true;
  try {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      alert("Sesi Anda telah berakhir. Silakan login kembali.");
      window.location.href = "/login";
      return;
    }

    const response = await fetch(`/api/auth/cashflow/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.status === 401) {
      alert("Sesi telah habis atau tidak valid. Silakan login ulang.");
      window.location.href = "/login";
      return;
    }

    if (response.ok && data.code === 200) {
      alert("Data berhasil dihapus!");
      fetchData();
    } else {
      console.error("Gagal menghapus data:", data.message);
      alert("Gagal menghapus data: " + data.message);
    }
  } catch (error) {
    console.error("Kesalahan saat menghapus data:", error);
    alert("Terjadi kesalahan saat menghapus data.");
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped></style>
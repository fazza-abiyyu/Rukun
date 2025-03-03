<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Aktivitas Arus Kas</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 ">
      <form v-if="selectedCashflow" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- SUMBER DANA -->
          <div class="grid sm:grid-cols-3">
            <label for="name" class="block text-sm font-medium mb-2 w-full">SUMBER DANA</label>
            <input type="text" id="name" v-model="selectedCashflow.title"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Masukan sumber dana">
          </div>

          <!-- DESKRIPSI -->
          <div class="grid sm:grid-cols-3">
            <label for="phone" class="block text-sm font-medium mb-2 w-full">DESKRIPSI</label>
            <input type="text" id="phone" v-model="selectedCashflow.description"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Masukan keterangan singkat alokasi dana">
          </div>

          <!-- TANGGAL -->
          <div class="grid grid-cols-3">
            <label for="dob" class="block text-sm font-medium mb-2 w-full">TANGGAL</label>
            <input type="date" id="dob" v-model="selectedCashflow.date"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              required />
          </div>

          <!-- KATEGORI -->
          <div class="grid sm:grid-cols-3">
            <label for="gender" class="block text-sm font-medium mb-2 w-full">KATEGORI</label>
            <select id="gender" v-model="selectedCashflow.category"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="Debit">Masuk</option>
              <option value="Kredit">Keluar</option>
            </select>
          </div>

          <!-- JUMLAH -->
          <div class="grid sm:grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">JUMLAH</label>
            <textarea id="address" v-model="selectedCashflow.amount"
              class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Masukan besaran dana"/>
          </div>


          <!-- Submit Button -->
          <div class="space-x-3 self-end">
            <button type="button" @click="cancel"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cashflow } from "~/types/TypesModel";
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";

const router = useRouter();
const { $toast } = useNuxtApp();

const route = useRoute();
const cashflowId = parseInt(route.params.id as string, 10);

const selectedCashflow = ref< Cashflow | null>(null);
const isLoading = ref(false);

onMounted(async () => {
  await fetchCashflowData();
});


async function fetchCashflowData() {
  isLoading.value = true;
  try {
    const { data } = await useFetchApi(`/api/auth/cashflow/${cashflowId}`, {
      method: "GET",
    }) as { data: Cashflow };
    selectedCashflow.value = {
      id: data.id,
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category,
      amount: data.amount,
    };
  } catch (error) {
    $toast("Gagal mengambil data Warga.", "error");
  } finally {
    isLoading.value = false;
  }
}

const handleSubmit = async () => {
  if (!selectedCashflow.value) return;

  isLoading.value = true;
  try {
    await useFetchApi(`/api/auth/cashflow/${selectedCashflow.value.id}`, {
      method: "PUT",
      body: selectedCashflow.value,
    });
    $toast("Berhasil mengubah data Warga.", "success");
    router.push("/citizen");
  } catch (error) {
    $toast("Gagal mengubah data Warga.", "error");
  } finally {
    isLoading.value = false;
  }
};

const cancel = () => {
  router.push('/cashflow');
};
</script>

<style scoped></style>

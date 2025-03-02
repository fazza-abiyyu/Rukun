<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Data Warga</h2>
    </div>
    <!-- End Header -->
    <hr/>
    <div class="h-full w-full mt-2">
      <form v-if="selectedCitizen" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Lengkap -->
          <div class="grid grid-cols-3">
            <label
                for="full_name"
                class="block text-sm font-medium mb-2 w-full"
            >Nama Lengkap</label
            >
            <input
                type="text"
                id="full_name"
                v-model="selectedCitizen.full_name"
                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nama Lengkap"
                required
            />
          </div>

          <!-- NIK -->
          <div class="grid grid-cols-3">
            <label
                for="nik"
                class="block text-sm font-medium mb-2 w-full"
            >NIK</label
            >
            <input
                type="text"
                id="nik"
                v-model="selectedCitizen.nik"
                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Nomor Induk Kependudukan"
                required
            />
          </div>

          <!-- Tanggal Lahir -->
          <div class="grid grid-cols-3">
            <label
                for="dob"
                class="block text-sm font-medium mb-2 w-full"
            >Tanggal Lahir</label
            >
            <input
                type="date"
                id="dob"
                v-model="selectedCitizen.dob"
                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                required
            />
          </div>

          <!-- Jenis Kelamin -->
          <div class="grid sm:grid-cols-3">
            <label for="gender" class="block text-sm font-medium mb-2 w-full">JENIS KELAMIN</label>
            <select id="gender"
                    v-model="selectedCitizen.gender"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="Male">Laki-laki</option>
              <option value="Female">Perempuan</option>
            </select>
          </div>

          <!-- Alamat -->
          <div class="grid grid-cols-3">
            <label
                for="address"
                class="block text-sm font-medium mb-2 w-full"
            >Alamat</label
            >
            <textarea
                id="address"
                v-model="selectedCitizen.address"
                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Alamat lengkap"
                required
            ></textarea>
          </div>

<!--          &lt;!&ndash; KK ID (Opsional) &ndash;&gt;-->
<!--          <div class="grid grid-cols-3">-->
<!--            <label-->
<!--                for="kk_id"-->
<!--                class="block text-sm font-medium mb-2 w-full"-->
<!--            >KK ID</label-->
<!--            >-->
<!--            <input-->
<!--                type="text"-->
<!--                id="kk_id"-->
<!--                v-model="selectedCitizen.kk_id"-->
<!--                class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"-->
<!--                placeholder="Nomor KK"-->
<!--            />-->
<!--          </div>-->

          <!-- Tombol Aksi -->
          <div class="space-x-3 self-end">
            <button
                type="button"
                @click="cancel"
                class="py-2 px-3 text-sm font-medium rounded-lg border border-red-600 text-red-600 hover:bg-red-200"
            >
              Batal
            </button>
            <button
                type="submit"
                class="py-2 px-3 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700"
                :disabled="isLoading"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Citizen} from "~/types/TypesModel";
import useFetchApi from '~/composables/useFetchApi';
import {useRouter} from "vue-router";

const router = useRouter();
const {$toast} = useNuxtApp();

const route = useRoute();
const citizenId = parseInt(route.params.id as string, 10);

const selectedCitizen = ref<Citizen | null>(null);
const isLoading = ref(false);

onMounted(async () => {
  fetchCitizenData();
});


async function fetchCitizenData() {
  isLoading.value = true;
  try {
    const {data} = await useFetchApi(`/api/auth/citizen/${citizenId}`, {
      method: "GET",
    }) as { data: Citizen };
    selectedCitizen.value = {
      id: data.id,
      full_name: data.full_name,
      dob: new Date(data.dob),
      gender: data.gender,
      address: data.address,
      kk_id: data.kk_id,
      nik: data.nik,
    };
  } catch (error) {
    $toast("Gagal mengambil data Warga.", "error");
  } finally {
    isLoading.value = false;
  }
}

const handleSubmit = async () => {
  if (!selectedCitizen.value) return;

  isLoading.value = true;
  try {
    await useFetchApi(`/api/auth/citizen/${selectedCitizen.value.id}`, {
      method: "PUT",
      body: selectedCitizen.value,
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
  router.push('/citizen');
};
</script>

<style scoped></style>
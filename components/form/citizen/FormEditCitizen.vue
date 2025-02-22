<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Ubah Data Warga</h2>
    </div>
    <!-- End Header -->
    <hr>
    <div class="h-full w-full mt-2">
      <form v-if="citizenData" @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <!-- Nama Lengkap -->
          <div class="grid grid-cols-3">
            <label for="full_name" class="block text-sm font-medium mb-2 w-full">Nama Lengkap</label>
            <input type="text" id="full_name" v-model="citizenData.full_name"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nama Lengkap" required>
          </div>

          <!-- NIK -->
          <div class="grid grid-cols-3">
            <label for="nik" class="block text-sm font-medium mb-2 w-full">NIK</label>
            <input type="text" id="nik" v-model="citizenData.nik"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nomor Induk Kependudukan" required>
          </div>

          <!-- Tanggal Lahir -->
          <div class="grid grid-cols-3">
            <label for="dob" class="block text-sm font-medium mb-2 w-full">Tanggal Lahir</label>
            <input type="date" id="dob" v-model="citizenData.dob"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              required>
          </div>

          <!-- Jenis Kelamin -->
          <div class="grid grid-cols-3">
            <label class="block text-sm font-medium mb-2 w-full">Jenis Kelamin</label>
            <div class="col-span-2 flex items-center space-x-4">
              <label>
                <input type="radio" v-model="citizenData.gender" value="Male" required> Laki-laki
              </label>
              <label>
                <input type="radio" v-model="citizenData.gender" value="Female" required> Perempuan
              </label>
            </div>
          </div>

          <!-- Alamat -->
          <div class="grid grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">Alamat</label>
            <textarea id="address" v-model="citizenData.address"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Alamat lengkap" required></textarea>
          </div>

          <!-- KK ID (Opsional) -->
          <div class="grid grid-cols-3">
            <label for="kk_id" class="block text-sm font-medium mb-2 w-full">KK ID</label>
            <input type="text" id="kk_id" v-model="citizenData.kk_id"
              class="col-span-2 py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Nomor KK (opsional)">
          </div>

          <!-- Tombol Aksi -->
          <div class="space-x-3 self-end">
            <button type="button" @click="$emit('cancel')"
              class="py-2 px-3 text-sm font-medium rounded-lg border border-red-600 text-red-600 hover:bg-red-200">
              Batal
            </button>
            <button type="submit"
              class="py-2 px-3 text-sm font-medium rounded-lg border bg-blue-600 text-white hover:bg-blue-700"
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
import { ref, defineProps, defineEmits, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  citizenData: Object
});

const emit = defineEmits(["update", "cancel"]);
const router = useRouter();
const route = useRoute();
const { $toast } = useNuxtApp();

const citizenData = ref({
  full_name: "",
  dob: "",
  gender: "",
  address: "",
  nik: "",
  kk_id: ""
});

const isLoading = ref(false);

const fetchCitizenData = async () => {
  isLoading.value = true;
  try {
    const citizenId = route.params.id;
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      console.error("Token tidak ditemukan!");
      return;
    }

    const response = await fetch(`/api/auth/citizen/${citizenId}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status === 401) {
      console.error("Unauthorized! Coba login ulang.");
      return;
    }

    const data = await response.json();
    if (data.code === 200) {
      citizenData.value = data.data;
    }
  } catch (error) {
    console.error("Gagal mengambil data warga:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCitizenData);

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const citizenId = route.params.id;
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) {
      console.error("Token tidak ditemukan!");
      return;
    }

    const response = await fetch(`/api/auth/citizen/${citizenId}`, {
      method: "PUT",
      body: JSON.stringify({ ...citizenData.value, create_by: citizenId }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const result = await response.json();
    if (result.code === 200) {
      $toast("Berhasil mengubah data warga.", "success");
      router.push("/citizens");
    } else {
      $toast(result.message || "Gagal mengubah data warga.", "error");
    }
  } catch (error) {
    console.error("Error saat submit data warga:", error);
    $toast("Gagal mengubah data warga.", "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="css" scoped>
</style>
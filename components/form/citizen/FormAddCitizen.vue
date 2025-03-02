<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Warga</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2 overflow-y-auto">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          <div class="grid sm:grid-cols-3">
            <label for="full_name" class="block text-sm font-medium mb-2 w-full">NAMA LENGKAP</label>
            <input type="text" id="full_name"
                   v-model="full_name"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="John Doe">
          </div>
          <div class="grid sm:grid-cols-3">
            <label for="nik" class="block text-sm font-medium mb-2 w-full">NOMER INDUK KELUARGA (NIK)</label>
            <input type="text" id="nik"
                   v-model="nik"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="xxxx xxxx xxxx xxxx">
          </div>
          <!-- Jenis Kelamin -->
          <div class="grid sm:grid-cols-3">
            <label for="gender" class="block text-sm font-medium mb-2 w-full">JENIS KELAMIN</label>
            <select id="gender"
                    v-model="gender"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <!-- Tanggal Lahir -->
          <div class="grid sm:grid-cols-3">
            <label for="bod" class="block text-sm font-medium mb-2 w-full">TANGGAL LAHIR</label>
            <input type="date" id="dob"
                   v-model="dob"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>
          <!-- Alamat -->
          <div class="grid sm:grid-cols-3">
            <label for="address" class="block text-sm font-medium mb-2 w-full">ALAMAT</label>
            <textarea id="address"
                      v-model="address"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Jl. Raya 1234"/>
          </div>
          <!-- KK Dropdown -->
          <div class="grid sm:grid-cols-3">
            <label for="kk_id" class="block text-sm font-medium mb-2 w-full">KARTU KELUARGA (KK)</label>
            <ComboBoxKk class="col-span-2" @selectedKK="handleSelectKKID"/>
          </div>

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
import ComboBoxKk from "~/components/form/advanced/ComboBoxKK.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const {$toast} = useNuxtApp();

// State form
const full_name = ref<string | null>(null);
const nik = ref<string | null>(null); // NIK
const gender = ref<string | null>(null);
const dob = ref<string | null>(null);
const address = ref<string | null>(null);
const kk_id = ref<number | null>(null);
const isLoading = ref<boolean>(false);

// Clear form state
const clearForm = () => {
  full_name.value = null;
  nik.value = null;
  gender.value = null;
  dob.value = null;
  address.value = null;
  kk_id.value = null;
};

const handleSelectKKID = (e: any) => {
  kk_id.value = e.id;
};


// Form submission handler
const handleSubmit = async () => {
  try {
    // Basic validation
    if (!full_name.value) {
      $toast('Nama lengkap harus diisi.', 'error');
      return;
    }
    if (!nik.value) {
      $toast('Nomer Induk Keluarga (NIK) harus diisi.', 'error');
      return;
    }
    if (!gender.value) {
      $toast('Jenis Kelamin harus dipilih.', 'error');
      return;
    }
    if (!dob.value) {
      $toast('Tanggal Lahir harus diisi.', 'error');
      return;
    }
    if (!address.value) {
      $toast('Alamat harus diisi.', 'error');
      return;
    }
    if (!kk_id.value) {
      $toast('KK harus diisi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API
    const payload = {
      full_name: full_name.value,
      nik: nik.value,
      gender: gender.value?.charAt(0).toUpperCase() + gender.value?.slice(1), // Capitalize first letter
      dob: dob.value,
      address: address.value,
      kk_id: kk_id.value,
    };

    // API call
    await useFetchApi('/api/auth/citizen', {
      method: 'POST',
      body: payload,
    });

    $toast('Data warga berhasil ditambahkan!', 'success');
    clearForm();
    router.push('/citizen');
  } catch (error) {
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>
<style lang="css" scoped>
</style>
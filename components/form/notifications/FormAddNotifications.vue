<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Pemberitahuan</h2>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <!-- Judul -->
        <div class="space-y-4 flex flex-col">
          <div class="grid sm:grid-cols-3">
            <label for="title" class="block text-sm font-medium mb-2 w-full">JUDUL PEMBERITAHUAN</label>
            <input type="text" id="title"
                   v-model="title"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Arisan RT">
          </div>
          <!-- Deskripsi -->
          <div class="grid sm:grid-cols-3">
            <label for="description" class="block text-sm font-medium mb-2 w-full">DESKRIPSI PEMBERITAHUAN</label>
            <textarea id="description"
            v-model="description"
            class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Deskripsi acara atau pemberitahuan"/>
          </div>
          
          <!-- Target User Selection -->
          <div class="grid sm:grid-cols-3">
            <label for="userSelection" class="block text-sm font-medium mb-2 w-full">TARGET PENERIMA</label>
            <div class="col-span-2 space-y-3">
              <select id="userSelection" v-model="userSelectionType"
                      class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
                <option value="all">Pilih Semua User</option>
                <option value="manual">Pilih Manual</option>
              </select>
              
              <!-- Manual User Selection -->
              <div v-if="userSelectionType === 'manual'" class="space-y-2">
                <div class="flex items-center space-x-2 mb-2">
                  <input type="checkbox" id="selectAllUsers" v-model="selectAllUsers" @change="toggleAllUsers"
                         class="border-gray-200 rounded text-orange-600 focus:ring-orange-500">
                  <label for="selectAllUsers" class="text-sm text-gray-700">Pilih Semua</label>
                </div>
                <div class="max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2 space-y-1">
                  <div v-for="user in users" :key="user.id" class="flex items-center space-x-2">
                    <input type="checkbox" :id="`user-${user.id}`" v-model="selectedUsers" :value="user.id"
                           class="border-gray-200 rounded text-orange-600 focus:ring-orange-500">
                    <label :for="`user-${user.id}`" class="text-sm text-gray-700">{{ user.username }} ({{ user.email }})</label>
                  </div>
                </div>
                <p class="text-xs text-gray-500">{{ selectedUsers.length }} user dipilih</p>
              </div>
            </div>
          </div>
          
          <!-- Tanggal Acara -->
          <div class="grid sm:grid-cols-3">
            <label for="event" class="block text-sm font-medium mb-2 w-full">TANGGAL ACARA</label>
            <input type="date" id="event"
                   v-model="event"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>
          
          <!-- Waktu Acara -->
          <div class="grid sm:grid-cols-3">
            <label for="eventTime" class="block text-sm font-medium mb-2 w-full">WAKTU ACARA</label>
            <input type="time" id="eventTime"
                   v-model="eventTime"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>
          
          <!-- Lokasi Acara -->
          <div class="grid sm:grid-cols-3">
            <label for="location" class="block text-sm font-medium mb-2 w-full">LOKASI ACARA</label>
            <input type="text" id="location"
                   v-model="location"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Balai Desa, Jl. Raya No. 123">
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
import useFetchApi from '~/composables/useFetchApi';
import { useRouter } from "vue-router";

const router = useRouter();
const {$toast} = useNuxtApp();

// Form data
const title = ref<string | null>(null);
const description = ref<string | null>(null);
const event = ref<string | null>(null);
const eventTime = ref<string | null>(null);
const location = ref<string | null>(null);
const userSelectionType = ref<string>('all');
const selectedUsers = ref<number[]>([]);
const selectAllUsers = ref<boolean>(false);
const isLoading = ref<boolean>(false);

// Users data
const users = ref<any[]>([]);
const isLoadingUsers = ref<boolean>(false);

// Fetch users on component mount
onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    isLoadingUsers.value = true;
    const response = await useFetchApi('/api/auth/users', {
      method: 'GET',
    });
    users.value = response.data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    $toast('Gagal memuat data user', 'error');
  } finally {
    isLoadingUsers.value = false;
  }
};

const toggleAllUsers = () => {
  if (selectAllUsers.value) {
    selectedUsers.value = users.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
};

// Watch selectedUsers to update selectAllUsers checkbox
watch(selectedUsers, (newVal) => {
  selectAllUsers.value = newVal.length === users.value.length && users.value.length > 0;
}, { deep: true });

const clearForm = () => {
  title.value = null;
  description.value = null;
  event.value = null;
  eventTime.value = null;
  location.value = null;
  userSelectionType.value = 'all';
  selectedUsers.value = [];
  selectAllUsers.value = false;
};

// Form submission handler
const handleSubmit = async () => {
  try {
    // Basic validation
    if (!title.value) {
      $toast('Judul Pemberitahuan harus diisi.', 'error');
      return;
    }
    if (!description.value) {
      $toast('Deskripsi Pemberitahuan harus diisi.', 'error');
      return;
    }
    if (!event.value) {
      $toast('Tanggal Acara harus diisi.', 'error');
      return;
    }
    if (!eventTime.value) {
      $toast('Waktu Acara harus diisi.', 'error');
      return;
    }
    if (!location.value) {
      $toast('Lokasi Acara harus diisi.', 'error');
      return;
    }
    
    // Validate user selection
    if (userSelectionType.value === 'manual' && selectedUsers.value.length === 0) {
      $toast('Pilih minimal satu user untuk menerima notifikasi.', 'error');
      return;
    }

    isLoading.value = true;

    // Transform data for API
    const payload = {
      title: title.value,
      description: description.value,
      date: event.value,
      time: eventTime.value,
      location: location.value,
      userSelectionType: userSelectionType.value,
      selectedUsers: userSelectionType.value === 'all' ? users.value.map(user => user.id) : selectedUsers.value,
    };

    // API call
    await useFetchApi('/api/auth/notifications', {
      method: 'POST',
      body: payload,
    });

    $toast('Pemberitahuan Acara berhasil disebarkan!', 'success');
    clearForm();
    router.push('/notifications');
  } catch (error) {
    console.error('Error submitting notification:', error);
    $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>
